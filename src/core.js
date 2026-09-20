/* =====================================================================
   core.js — ES5 ONLY
   STORE (localStorage, schema v2, migrations), TRAINER (events/radar),
   U (text utilities: norm, contractions, LCS align, verdict),
   UI (toast, practiceBar, scoreHTML), router, nav
   ===================================================================== */

/* ══════════════════════════════════════════════════════════════════════
   STORE — localStorage wrapper
   Key: engspell_v1  (also reads legacy fluentup_v1 and migrates)
   ════════════════════════════════════════════════════════════════════*/
var STORE = (function () {
  'use strict';

  var KEY = 'engspell_v1';
  var LEGACY_KEY = 'fluentup_v1';
  var VERSION = 2;

  var def = {
    version: VERSION,
    user: {name: '', goal: '', level: 'A2', placementTag: ''},
    xp: 0,
    streak: 0,
    days: [],
    lastLogin: null,
    mastery: {},
    completed: [],
    path: {current: 0, stage: 1},
    daily: {date: '', twisterIdx: 0, wordIdx: 0, idiomIdx: 0, quoteIdx: 0, done: []},
    assessments: [],
    coachStats: {messages: 0, corrections: 0, sessions: 0},
    settings: {voice: '', rate: 1.0, dailyGoal: 10, geminiKey: ''},
    srs: {}   /* INV-5: new key for MISSION 2 SRS — appended, not replacing */
  };

  function _raw() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) { return JSON.parse(s); }
      // Legacy migration
      var leg = localStorage.getItem(LEGACY_KEY);
      if (leg) { return JSON.parse(leg); }
    } catch (e) { /* ignore */ }
    return null;
  }

  function _migrate(data) {
    var v = data.version || 1;
    // v1 → v2: add srs key, placementTag
    if (v < 2) {
      if (!data.srs) { data.srs = {}; }
      if (data.user && !data.user.placementTag) { data.user.placementTag = ''; }
      data.version = 2;
    }
    return data;
  }

  function _defaults(target, source) {
    for (var k in source) {
      if (!source.hasOwnProperty(k)) { continue; }
      if (target[k] === undefined || target[k] === null) {
        target[k] = source[k];
      } else if (typeof source[k] === 'object' && !Array.isArray(source[k]) && source[k] !== null && typeof target[k] === 'object' && target[k] !== null && !Array.isArray(target[k])) {
        _defaults(target[k], source[k]);
      }
    }
    return target;
  }

  var _data = null;

  function load() {
    var raw = _raw();
    if (raw) {
      raw = _migrate(raw);
      _data = _defaults(raw, JSON.parse(JSON.stringify(def)));
    } else {
      _data = JSON.parse(JSON.stringify(def));
    }
    return _data;
  }

  function reload() { return load(); }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(_data)); } catch (e) { /* ignore */ }
  }

  function get(key) {
    if (!_data) { load(); }
    return key ? _data[key] : _data;
  }

  function set(key, val) {
    if (!_data) { load(); }
    _data[key] = val;
    save();
  }

  function addXP(n) {
    if (!_data) { load(); }
    _data.xp = (_data.xp || 0) + n;
    save();
    return _data.xp;
  }

  function touchStreak() {
    if (!_data) { load(); }
    var today = new Date().toISOString().slice(0, 10);
    if (_data.lastLogin === today) { return _data.streak; }
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (_data.lastLogin === yesterday) {
      _data.streak = (_data.streak || 0) + 1;
    } else if (_data.lastLogin !== today) {
      _data.streak = 1;
    }
    _data.lastLogin = today;
    if (_data.days.indexOf(today) === -1) { _data.days.push(today); }
    save();
    return _data.streak;
  }

  /**
   * master(prefixedKey, ok)
   * ok = true (correct) → increment towards mastery
   * ok = false → decrement
   * Returns mastery level 0–5
   * Stable prefixes: spell_, idn_, pv_, lsn_, read_
   */
  function master(prefixedKey, ok) {
    if (!_data) { load(); }
    var m = _data.mastery[prefixedKey] || 0;
    m = ok ? Math.min(5, m + 1) : Math.max(0, m - 1);
    _data.mastery[prefixedKey] = m;
    save();
    return m;
  }

  function getMastery(prefixedKey) {
    if (!_data) { load(); }
    return _data.mastery[prefixedKey] || 0;
  }

  function completeLesson(id) {
    if (!_data) { load(); }
    if (_data.completed.indexOf(id) === -1) { _data.completed.push(id); }
    save();
  }

  function isCompleted(id) {
    if (!_data) { load(); }
    return _data.completed.indexOf(id) !== -1;
  }

  function addAssessment(report) {
    if (!_data) { load(); }
    _data.assessments.push(report);
    save();
  }

  function resetAll() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
    _data = null;
    load();
  }

  function exportJSON() {
    return JSON.stringify(_data, null, 2);
  }

  /* Init */
  load();

  return {
    VERSION: VERSION,
    def: def,
    get: get,
    set: set,
    load: load,
    reload: reload,
    save: save,
    addXP: addXP,
    touchStreak: touchStreak,
    master: master,
    getMastery: getMastery,
    completeLesson: completeLesson,
    isCompleted: isCompleted,
    addAssessment: addAssessment,
    resetAll: resetAll,
    exportJSON: exportJSON
  };
}());

/* ══════════════════════════════════════════════════════════════════════
   TRAINER — skill event bus + radar aggregator
   TRAINER_EVENTS schema: { skill, delta, source, ts }
   ════════════════════════════════════════════════════════════════════*/
var TRAINER = (function () {
  'use strict';

  var SKILLS = ['pronunciation', 'grammar', 'vocab', 'spelling', 'fluency', 'listening'];
  var EVENTS_KEY = 'engspell_trainer_events';
  var MAX_EVENTS = 500;

  function _loadEvents() {
    try {
      return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    } catch (e) { return []; }
  }

  function _saveEvents(events) {
    try { localStorage.setItem(EVENTS_KEY, JSON.stringify(events)); } catch (e) {}
  }

  /**
   * log(event) — INV-7: only path to modify skill scores
   * event: { skill, delta, source }
   */
  function log(event) {
    if (!event || SKILLS.indexOf(event.skill) === -1) { return; }
    var ev = {
      skill: event.skill,
      delta: event.delta || 0,
      source: event.source || 'unknown',
      ts: Date.now()
    };
    var events = _loadEvents();
    events.push(ev);
    if (events.length > MAX_EVENTS) { events = events.slice(-MAX_EVENTS); }
    _saveEvents(events);
  }

  /** Returns {skill: cumulativeScore} capped 0–100 */
  function aggregate() {
    var events = _loadEvents();
    var scores = {};
    for (var i = 0; i < SKILLS.length; i++) { scores[SKILLS[i]] = 50; }
    for (var j = 0; j < events.length; j++) {
      var ev = events[j];
      if (scores[ev.skill] !== undefined) {
        scores[ev.skill] = Math.max(0, Math.min(100, scores[ev.skill] + ev.delta));
      }
    }
    return scores;
  }

  /** Returns array of {skill, score} sorted weakest first */
  function weakestFirst() {
    var scores = aggregate();
    var arr = [];
    for (var s in scores) {
      if (scores.hasOwnProperty(s)) { arr.push({skill: s, score: scores[s]}); }
    }
    arr.sort(function (a, b) { return a.score - b.score; });
    return arr;
  }

  /** Returns mastery keys for a given skill prefix */
  function keysFor(skill, mastery) {
    var map = {
      spelling: 'spell_',
      vocab: ['idn_', 'pv_'],
      listening: 'lsn_',
      reading: 'read_'
    };
    var prefix = map[skill];
    if (!prefix) { return []; }
    var prefixes = Array.isArray(prefix) ? prefix : [prefix];
    var keys = [];
    for (var k in mastery) {
      if (!mastery.hasOwnProperty(k)) { continue; }
      for (var p = 0; p < prefixes.length; p++) {
        if (k.indexOf(prefixes[p]) === 0) { keys.push(k); break; }
      }
    }
    return keys;
  }

  /** 30-day XP history: [{date, xp}] for bar chart */
  function xpHistory() {
    var events = _loadEvents();
    var map = {};
    for (var i = 0; i < events.length; i++) {
      var d = new Date(events[i].ts).toISOString().slice(0, 10);
      map[d] = (map[d] || 0) + Math.max(0, events[i].delta);
    }
    var out = [];
    for (var k in map) {
      if (map.hasOwnProperty(k)) { out.push({date: k, xp: map[k]}); }
    }
    out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    return out.slice(-30);
  }

  function clearEvents() {
    localStorage.removeItem(EVENTS_KEY);
  }

  return {
    SKILLS: SKILLS,
    log: log,
    aggregate: aggregate,
    weakestFirst: weakestFirst,
    keysFor: keysFor,
    xpHistory: xpHistory,
    clearEvents: clearEvents
  };
}());

/* ══════════════════════════════════════════════════════════════════════
   U — text utility belt
   norm, contractions, LCS word-align, verdict
   ════════════════════════════════════════════════════════════════════*/
var U = (function () {
  'use strict';

  var CONTRACTIONS = {
    "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
    "won't": 'will not', "wouldn't": 'would not', "couldn't": 'could not',
    "shouldn't": 'should not', "can't": 'cannot', "isn't": 'is not',
    "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not',
    "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not',
    "i'm": 'i am', "i've": 'i have', "i'll": 'i will', "i'd": 'i would',
    "you're": 'you are', "you've": 'you have', "you'll": 'you will',
    "he's": 'he is', "she's": 'she is', "it's": 'it is',
    "we're": 'we are', "we've": 'we have', "we'll": 'we will',
    "they're": 'they are', "they've": 'they have', "they'll": 'they will',
    "that's": 'that is', "there's": 'there is', "here's": 'here is',
    "let's": 'let us', "who's": 'who is', "what's": 'what is',
    "needn't": 'need not', "mustn't": 'must not'
  };

  function norm(text) {
    if (!text) { return ''; }
    return text.toLowerCase()
      .replace(/['']/g, "'")
      .replace(/[""]/g, '"')
      .replace(/[^\w\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function expandContractions(text) {
    var words = norm(text).split(' ');
    var out = [];
    for (var i = 0; i < words.length; i++) {
      out.push(CONTRACTIONS[words[i]] || words[i]);
    }
    return out.join(' ');
  }

  function tokenise(text) {
    return expandContractions(norm(text)).split(' ').filter(function (w) { return w.length > 0; });
  }

  /** LCS word alignment: returns [{word, ok}] for rendering score chips */
  function align(expected, heard) {
    var exp = tokenise(expected);
    var hrd = tokenise(heard);
    var m = exp.length;
    var n = hrd.length;

    // Build LCS table
    var dp = [];
    for (var i = 0; i <= m; i++) {
      dp[i] = [];
      for (var j = 0; j <= n; j++) { dp[i][j] = 0; }
    }
    for (var a = 1; a <= m; a++) {
      for (var b = 1; b <= n; b++) {
        dp[a][b] = (exp[a-1] === hrd[b-1]) ? dp[a-1][b-1] + 1 : Math.max(dp[a-1][b], dp[a][b-1]);
      }
    }

    // Backtrack
    var result = [];
    var ia = m, ib = n;
    while (ia > 0 && ib > 0) {
      if (exp[ia-1] === hrd[ib-1]) {
        result.unshift({word: exp[ia-1], ok: true});
        ia--; ib--;
      } else if (dp[ia-1][ib] > dp[ia][ib-1]) {
        result.unshift({word: exp[ia-1], ok: false});
        ia--;
      } else {
        ib--;
      }
    }
    while (ia > 0) {
      result.unshift({word: exp[ia-1], ok: false});
      ia--;
    }

    return result;
  }

  /** Returns 'pass' / 'almost' / 'fail' based on aligned tokens */
  function verdict(aligned) {
    if (!aligned || aligned.length === 0) { return 'fail'; }
    var ok = aligned.filter(function (t) { return t.ok; }).length;
    var ratio = ok / aligned.length;
    if (ratio >= 0.85) { return 'pass'; }
    if (ratio >= 0.55) { return 'almost'; }
    return 'fail';
  }

  /** Score 0–100 from aligned tokens */
  function score(aligned) {
    if (!aligned || aligned.length === 0) { return 0; }
    var ok = aligned.filter(function (t) { return t.ok; }).length;
    return Math.round((ok / aligned.length) * 100);
  }

  /** Format XP: 1200 → "1.2K" */
  function fmtXP(n) {
    if (n >= 1000) { return (n / 1000).toFixed(1) + 'K'; }
    return String(n);
  }

  /** Date-seeded deterministic pick from an array */
  function dailyPick(arr) {
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return arr[seed % arr.length];
  }

  /** Seeded pick with offset for different item types same day */
  function dailyPickN(arr, offset) {
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + (offset || 0);
    return arr[seed % arr.length];
  }

  return {
    norm: norm,
    expandContractions: expandContractions,
    tokenise: tokenise,
    align: align,
    verdict: verdict,
    score: score,
    fmtXP: fmtXP,
    dailyPick: dailyPick,
    dailyPickN: dailyPickN
  };
}());

/* ══════════════════════════════════════════════════════════════════════
   UI — primitive components
   ════════════════════════════════════════════════════════════════════*/
var UI = (function () {
  'use strict';

  var _toastTimer = null;

  function toast(msg, type) {
    var el = document.getElementById('toast');
    if (!el) { return; }
    el.textContent = msg;
    el.className = 'toast show ' + (type || 'info');
    if (_toastTimer) { clearTimeout(_toastTimer); }
    _toastTimer = setTimeout(function () {
      el.className = 'toast';
    }, 2800);
  }

  /**
   * scoreHTML(aligned) — render green/red token chips
   * Red chips emit data-say attribute for slow-replay on click
   */
  function scoreHTML(aligned) {
    if (!aligned || aligned.length === 0) { return ''; }
    var html = '<div class="score-chips">';
    for (var i = 0; i < aligned.length; i++) {
      var t = aligned[i];
      if (t.ok) {
        html += '<span class="chip ok">' + t.word + '</span>';
      } else {
        html += '<span class="chip bad" data-say="' + t.word + '" title="Click to hear slowly">' + t.word + ' 🔊</span>';
      }
    }
    html += '</div>';
    return html;
  }

  /**
   * practiceBar(el, opts)
   * opts: { expected, onPass, onFail, xp, skill }
   * Renders a mic/text fallback practice UI into el
   */
  function practiceBar(el, opts) {
    var canListen = SPEECH.canListen();
    var html = '<div class="practice-bar">';
    html += '<p class="practice-prompt"><strong>Say it:</strong> ' + opts.expected + '</p>';
    if (canListen) {
      html += '<button class="btn-mic" id="pb-mic">🎤 Start Speaking</button>';
    }
    html += '<div class="pb-typing" id="pb-typing-area">';
    html += '<input type="text" id="pb-input" placeholder="Type if mic unavailable..." />';
    html += '<button class="btn-check" id="pb-check">Check</button>';
    html += '</div>';
    html += '<div id="pb-result"></div>';
    html += '</div>';
    el.innerHTML = html;

    var resultEl = document.getElementById('pb-result');
    var inputEl = document.getElementById('pb-input');

    function _evaluate(heard) {
      var aligned = U.align(opts.expected, heard);
      var v = U.verdict(aligned);
      resultEl.innerHTML = scoreHTML(aligned);
      if (v === 'pass') {
        resultEl.innerHTML += '<p class="verdict pass">✅ Excellent!</p>';
        TRAINER.log({skill: opts.skill || 'fluency', delta: 2, source: 'practiceBar'});
        if (opts.onPass) { opts.onPass(); }
      } else if (v === 'almost') {
        resultEl.innerHTML += '<p class="verdict almost">🟡 Almost! Try again.</p>';
        TRAINER.log({skill: opts.skill || 'fluency', delta: 1, source: 'practiceBar'});
      } else {
        resultEl.innerHTML += '<p class="verdict fail">❌ Keep trying — click red words to hear them slowly.</p>';
        TRAINER.log({skill: opts.skill || 'fluency', delta: -1, source: 'practiceBar'});
        if (opts.onFail) { opts.onFail(); }
      }
    }

    if (canListen) {
      var micBtn = document.getElementById('pb-mic');
      micBtn.addEventListener('click', function () {
        micBtn.textContent = '🔴 Listening…';
        micBtn.disabled = true;
        SPEECH.listen({
          interim: false,
          onresult: function (transcript) {
            inputEl.value = transcript;
            _evaluate(transcript);
            micBtn.textContent = '🎤 Start Speaking';
            micBtn.disabled = false;
          },
          onend: function () {
            micBtn.textContent = '🎤 Start Speaking';
            micBtn.disabled = false;
          },
          onerror: function (msg) {
            UI.toast(msg, 'error');
            micBtn.textContent = '🎤 Start Speaking';
            micBtn.disabled = false;
          }
        });
      });
    }

    var checkBtn = document.getElementById('pb-check');
    checkBtn.addEventListener('click', function () {
      _evaluate(inputEl.value);
    });
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { _evaluate(inputEl.value); }
    });
  }

  /** Render a XP pop animation near an element */
  function xpPop(amount, nearEl) {
    var pop = document.createElement('span');
    pop.className = 'xp-pop';
    pop.textContent = '+' + amount + ' XP';
    var rect = nearEl ? nearEl.getBoundingClientRect() : {top: 100, left: 100};
    pop.style.left = (rect.left + window.scrollX) + 'px';
    pop.style.top = (rect.top + window.scrollY - 20) + 'px';
    document.body.appendChild(pop);
    setTimeout(function () { if (pop.parentNode) { pop.parentNode.removeChild(pop); } }, 1500);
  }

  return {
    toast: toast,
    scoreHTML: scoreHTML,
    practiceBar: practiceBar,
    xpPop: xpPop
  };
}());

/* ══════════════════════════════════════════════════════════════════════
   VIEWS namespace (populated by views-*.js)
   ════════════════════════════════════════════════════════════════════*/
var VIEWS = {};

/* ══════════════════════════════════════════════════════════════════════
   ROUTER + NAV
   ════════════════════════════════════════════════════════════════════*/
var NAVITEMS = [
  {route:'home',    label:'Home',       icon:'🏠'},
  {route:'daily',   label:'Daily',      icon:'☀️'},
  {route:'path',    label:'Learn',      icon:'📖'},
  {route:'coach',   label:'Nova',       icon:'🤖'},
  {route:'trainer', label:'Trainer',    icon:'📊'},
  {route:'review',  label:'Review',     icon:'🔁'},
  {route:'pronunciation', label:'Sounds', icon:'🗣️'},
  {route:'spelling', label:'Spelling',  icon:'🔤'},
  {route:'phrases',  label:'Phrases',   icon:'💬'},
  {route:'idioms',   label:'Idioms',    icon:'📜'},
  {route:'clarity',  label:'Clarity',   icon:'🎯'},
  {route:'listening',label:'Listen',    icon:'👂'},
  {route:'doctor',   label:'Doctor',    icon:'🩺'},
  {route:'scenarios',label:'Chat',      icon:'🎭'},
  {route:'atlas',    label:'Grammar',   icon:'📐'},
  {route:'assessment',label:'Assess',   icon:'🏆'},
  {route:'quiz',     label:'Level Test',icon:'🎓'},
  {route:'wordbank', label:'Words',     icon:'📖'},
  {route:'foundations',label:'Basics',  icon:'🔡'},
  {route:'settings', label:'Settings',  icon:'⚙️'}
];

(function () {
  'use strict';

  var viewEl = document.getElementById('view');
  var navEl = document.getElementById('nav');
  var sidebarEl = document.getElementById('sidebar');

  function _buildNav() {
    if (!navEl) { return; }
    var html = '';
    for (var i = 0; i < NAVITEMS.length; i++) {
      var item = NAVITEMS[i];
      html += '<a class="nav-item" href="#/' + item.route + '" data-route="' + item.route + '" id="nav-' + item.route + '">';
      html += '<span class="nav-icon">' + item.icon + '</span>';
      html += '<span class="nav-label">' + item.label + '</span>';
      html += '</a>';
    }
    navEl.innerHTML = html;
    updateReviewBadge();
  }

  function updateReviewBadge() {
    var navItem = document.getElementById('nav-review');
    if (!navItem) { return; }
    var srs = (typeof STORE !== 'undefined' && STORE.get) ? (STORE.get('srs') || {}) : {};
    var now = Date.now();
    var count = 0;
    for (var k in srs) {
      if (srs.hasOwnProperty(k) && srs[k] && srs[k].due && srs[k].due <= now) {
        count++;
      }
    }
    var existing = navItem.querySelector ? navItem.querySelector('.nav-badge') : null;
    if (existing && navItem.removeChild) { navItem.removeChild(existing); }
    if (count > 0 && document.createElement) {
      var badge = document.createElement('span');
      badge.className = 'nav-badge';
      badge.textContent = count;
      if (navItem.appendChild) { navItem.appendChild(badge); }
    }
  }

  function _setActive(route) {
    var items = navEl ? navEl.querySelectorAll('.nav-item') : [];
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
      if (items[i].getAttribute('data-route') === route) {
        items[i].classList.add('active');
      }
    }
  }

  function _parseHash() {
    var hash = window.location.hash || '#/home';
    var parts = hash.replace('#/', '').split('/');
    return {route: parts[0] || 'home', arg: parts[1] || ''};
  }

  function navigate(route, arg) {
    window.location.hash = '#/' + route + (arg ? '/' + arg : '');
  }

  function _route() {
    if (!viewEl) { return; }
    // Check onboarding gate
    var user = STORE.get('user');
    var p = _parseHash();
    if ((!user || !user.name) && p.route !== 'onboarding') {
      navigate('onboarding');
      return;
    }
    STORE.touchStreak();
    _setActive(p.route);
    var view = VIEWS[p.route];
    if (view && typeof view.render === 'function') {
      viewEl.innerHTML = '';
      view.render(viewEl, p.arg);
    } else {
      viewEl.innerHTML = '<div class="not-found"><h2>Page not found</h2><p>Route: #/' + p.route + '</p></div>';
    }
    // data-say delegation
    viewEl.addEventListener('click', function _say(e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-say')) {
        SPEECH.speakSlow(t.getAttribute('data-say'));
      }
    });
    // Scroll to top
    if (viewEl.scrollTop !== undefined) { viewEl.scrollTop = 0; }
    updateReviewBadge();
  }

  window.addEventListener('hashchange', _route);
  window.addEventListener('load', function () {
    _buildNav();
    _route();
  });

  /* Expose globally */
  window.navigate = navigate;
  window.updateReviewBadge = updateReviewBadge;
}());
