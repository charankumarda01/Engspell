/* =====================================================================
   core.js — ES5 ONLY
   STORE (localStorage, schema v3, migrations), TRAINER (events/radar),
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
  var VERSION = 8;

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
    coachStats: {messages: 0, corrections: 0, sessions: 0, drills: 0, interrupts: 0},
    settings: {voice: '', rate: 1.0, dailyGoal: 10, geminiKey: '', honestMode: false, liveCorrect: false, bargeIn: false, llmProvider: 'gemini', remindHour: '19:00', remindOn: false},
    srs: {},  /* INV-5: MISSION 2 SRS */
    docs: [],           /* INV-5: v3 — Document Studio uploaded docs */
    novaHistory: [],    /* INV-5: v3 — persisted Nova chat (capped 50 turns) */
    resumeReports: [],  /* INV-5: v3 — Resume analysis report history */
    flow: {             /* INV-5: v4 — Today's Flow enforced 5-step daily sequence */
      date: '',
      steps: [false, false, false, false, false],
      streakRewarded: false,
      novaTurns: 0,
      srsReviews: 0
    },
    weeklyHistory: [],  /* INV-5: v7 — Weekly progress session history (M17) */
    accent: {           /* INV-5: v8 — Indian Accent Studio (M20) */
      packs: {},
      lastXpDate: ''
    }
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
    // v2 → v3: add docs, novaHistory, resumeReports
    if (v < 3) {
      if (!data.docs) { data.docs = []; }
      if (!data.novaHistory) { data.novaHistory = []; }
      if (!data.resumeReports) { data.resumeReports = []; }
      data.version = 3;
    }
    // v3 → v4: add flow
    if (v < 4) {
      if (!data.flow || !Array.isArray(data.flow.steps)) {
        data.flow = {
          date: '',
          steps: [false, false, false, false, false],
          streakRewarded: false,
          novaTurns: 0,
          srsReviews: 0
        };
      }
      data.version = 4;
    }
    // v4 → v5: add llmProvider
    if (v < 5) {
      if (!data.settings) { data.settings = {}; }
      if (!data.settings.llmProvider) { data.settings.llmProvider = 'gemini'; }
      data.version = 5;
    }
    // v5 → v6: add remindHour, remindOn (M12)
    if (v < 6) {
      if (!data.settings) { data.settings = {}; }
      if (data.settings.remindHour === undefined) { data.settings.remindHour = '19:00'; }
      if (data.settings.remindOn === undefined) { data.settings.remindOn = false; }
      data.version = 6;
    }
    // v6 → v7: add weeklyHistory (M17)
    if (v < 7) {
      if (!data.weeklyHistory) { data.weeklyHistory = []; }
      data.version = 7;
    }
    // v7 → v8: add accent (M20)
    if (v < 8) {
      if (!data.accent) { data.accent = { packs: {}, lastXpDate: '' }; }
      data.version = 8;
    }
    if (!data.accent) { data.accent = { packs: {}, lastXpDate: '' }; }
    if (!data.accent.packs) { data.accent.packs = {}; }
    if (!data.weeklyHistory) { data.weeklyHistory = []; }
    if (!data.settings) { data.settings = {}; }
    if (data.settings.honestMode === undefined) { data.settings.honestMode = false; }
    if (data.settings.liveCorrect === undefined) { data.settings.liveCorrect = false; }
    if (data.settings.bargeIn === undefined) { data.settings.bargeIn = false; }
    if (!data.settings.llmProvider) { data.settings.llmProvider = 'gemini'; }
    if (data.settings.remindHour === undefined) { data.settings.remindHour = '19:00'; }
    if (data.settings.remindOn === undefined) { data.settings.remindOn = false; }
    if (!data.coachStats) {
      data.coachStats = {messages: 0, corrections: 0, sessions: 0, drills: 0, interrupts: 0};
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
    _data.lastLogin = today;
    if (!_data.days) { _data.days = []; }
    if (_data.days.indexOf(today) === -1) { _data.days.push(today); }
    save();
    return _data.streak || 0;
  }

  function _rewardFlowStreak(dateStr) {
    if (!_data) { load(); }
    var today = dateStr || new Date().toISOString().slice(0, 10);
    if (!_data.flow) {
      _data.flow = {
        date: today,
        steps: [false, false, false, false, false],
        streakRewarded: false,
        novaTurns: 0,
        srsReviews: 0
      };
    }
    if (_data.flow.streakRewarded) {
      return _data.streak || 0;
    }
    _data.flow.streakRewarded = true;
    _data.streak = (_data.streak || 0) + 1;
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
    if (typeof FLOW !== 'undefined' && FLOW.mark) {
      FLOW.mark(2);
    }
  }

  function isCompleted(id) {
    if (!_data) { load(); }
    return _data.completed.indexOf(id) !== -1;
  }

  function addAssessment(report) {
    if (!_data) { load(); }
    _data.assessments.push(report);
    save();
    if (typeof FLOW !== 'undefined' && FLOW.mark) {
      FLOW.mark(5);
    }
    if (typeof WEEKLY !== 'undefined' && WEEKLY.recordFromAssessment) {
      WEEKLY.recordFromAssessment(report);
    }
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

  function isHonest() {
    if (!_data) { load(); }
    var s = _data.settings;
    return !!(s && s.honestMode);
  }

  function computeHonestScore(fixes, words) {
    var f = typeof fixes === 'number' ? fixes : 0;
    var w = typeof words === 'number' ? words : 10;
    var s = 10 - (f * 2) - (w < 4 ? 2 : 0);
    return Math.max(1, Math.min(10, s));
  }

  /* Init */
  load();

  return {
    VERSION: VERSION,
    def: def,
    get: get,
    set: set,
    load: load,
    init: load,
    reload: reload,
    save: save,
    addXP: addXP,
    touchStreak: touchStreak,
    _rewardFlowStreak: _rewardFlowStreak,
    master: master,
    getMastery: getMastery,
    completeLesson: completeLesson,
    isCompleted: isCompleted,
    addAssessment: addAssessment,
    resetAll: resetAll,
    exportJSON: exportJSON,
    isHonest: isHonest,
    computeHonestScore: computeHonestScore
  };
}());

if (typeof window !== 'undefined') { window.STORE = STORE; }
if (typeof global !== 'undefined') { global.STORE = STORE; }


/* ══════════════════════════════════════════════════════════════════════
   TRAINER — skill event bus + radar aggregator
   TRAINER_EVENTS schema: { skill, delta, source, ts }
   ════════════════════════════════════════════════════════════════════*/
var TRAINER = (function () {
  'use strict';

  var SKILLS = ['pronunciation', 'grammar', 'vocab', 'spelling', 'fluency', 'listening', 'reading', 'writing'];
  /* INV-7: reading fires from docstudio (read_ mastery prefix, already in keysFor).
     writing fires from resume analyzer. No write_ mastery prefix exists yet in STORE
     because writing quality is assessed holistically (resume reports), not per-item.
     When per-word writing mastery is added, add 'write_' prefix here. */
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

    /* M6 Daily Flow: drill completion hook */
    if (typeof FLOW !== 'undefined' && FLOW.mark && ev.delta > 0) {
      var drillSources = [
        'spelling/correct', 'listening/comp', 'listening/dict',
        'atlas/detective', 'idioms/', 'doctor/clean', 'practiceBar',
        'daily/twister', 'daily/word', 'daily/idiom', 'daily/quote',
        'docstudio/train', 'resume/analyze', 'phrases/blank'
      ];
      var isDrill = false;
      for (var d = 0; d < drillSources.length; d++) {
        if (ev.source.indexOf(drillSources[d]) !== -1) { isDrill = true; break; }
      }
      if (isDrill) {
        var f = FLOW.get();
        if (!f.steps[0]) {
          FLOW.mark(1);
        } else if (f.steps[1] && !f.steps[2]) {
          FLOW.mark(3);
        }
      }
    }
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
      spelling:  'spell_',
      vocab:     ['idn_', 'pv_', 'read_'],
      listening: 'lsn_',
      reading:   'read_',
      /* writing: no per-item mastery prefix yet — holistic score only via resume reports */
      writing:   []
    };
    var prefix = map[skill];
    if (prefix === undefined || prefix === null) { return []; }
    /* Empty-array shorthand for skills with no mastery prefix */
    if (Array.isArray(prefix) && prefix.length === 0) { return []; }
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

if (typeof window !== 'undefined') { window.TRAINER = TRAINER; }
if (typeof global !== 'undefined') { global.TRAINER = TRAINER; }


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

if (typeof window !== 'undefined') { window.U = U; }
if (typeof global !== 'undefined') { global.U = U; }


/* ══════════════════════════════════════════════════════════════════════
   FLOW — Enforced Daily Structure (M6)
   5 steps in sequence: Diagnose → Learn → Drill → Apply → Prove
   ════════════════════════════════════════════════════════════════════*/
var FLOW = (function () {
  'use strict';

  var STEP_DEFS = [
    {
      id: 1,
      key: 'diagnose',
      label: 'Diagnose',
      title: 'Placement Quiz or Weakest Drill',
      desc: 'Test your baseline or re-assess your weakest skill',
      route: 'quiz',
      getRoute: function () {
        var user = STORE.get('user');
        if (!user || !user.placementTag) { return 'quiz'; }
        var weak = (typeof TRAINER !== 'undefined' && TRAINER.weakestFirst) ? TRAINER.weakestFirst() : [];
        var skill = weak.length ? weak[0].skill : 'pronunciation';
        var map = {
          pronunciation: 'pronunciation', grammar: 'atlas', vocab: 'idioms',
          spelling: 'spelling', fluency: 'clarity', listening: 'listening',
          reading: 'read', writing: 'resume'
        };
        return map[skill] || 'quiz';
      },
      reason: 'Start your daily flow here.'
    },
    {
      id: 2,
      key: 'learn',
      label: 'Learn',
      title: 'Next Learn Path Lesson',
      desc: 'Work through the structured course step by step',
      route: 'path',
      getRoute: function () { return 'path'; },
      reason: 'Complete Step 1 (Diagnose) first.'
    },
    {
      id: 3,
      key: 'drill',
      label: 'Drill',
      title: 'Weakest Skill Drill',
      desc: 'Targeted practice in your lowest-scoring skill lab',
      route: 'trainer',
      getRoute: function () {
        var weak = (typeof TRAINER !== 'undefined' && TRAINER.weakestFirst) ? TRAINER.weakestFirst() : [];
        var skill = weak.length ? weak[0].skill : 'pronunciation';
        var map = {
          pronunciation: 'pronunciation', grammar: 'atlas', vocab: 'idioms',
          spelling: 'spelling', fluency: 'clarity', listening: 'listening',
          reading: 'read', writing: 'resume'
        };
        return map[skill] || 'trainer';
      },
      reason: 'Complete Step 2 (Learn) first.'
    },
    {
      id: 4,
      key: 'apply',
      label: 'Apply',
      title: 'Scenario or 3 Nova Turns',
      desc: 'Put English to work in real-world dialogue or AI conversation',
      route: 'scenarios',
      getRoute: function () { return 'scenarios'; },
      reason: 'Complete Step 3 (Drill) first.'
    },
    {
      id: 5,
      key: 'prove',
      label: 'Prove',
      title: 'Assessment or 5 SRS Reviews',
      desc: 'Prove retention through speaking test or spaced flashcards',
      route: 'review',
      getRoute: function () {
        var srs = STORE.get('srs') || {};
        var due = 0;
        var now = Date.now();
        for (var k in srs) {
          if (srs[k] && srs[k].due && srs[k].due <= now) { due++; }
        }
        return due >= 5 ? 'review' : 'assessment';
      },
      reason: 'Complete Step 4 (Apply) first.'
    }
  ];

  var _fixtureDate = null;

  function setDate(d) {
    _fixtureDate = d || null;
  }

  function checkRollover(optDate) {
    if (optDate) { _fixtureDate = optDate; }
    var today = optDate || _fixtureDate || new Date().toISOString().slice(0, 10);
    var flow = STORE.get('flow');
    if (!flow || typeof flow !== 'object' || !Array.isArray(flow.steps)) {
      flow = {
        date: today,
        steps: [false, false, false, false, false],
        streakRewarded: false,
        novaTurns: 0,
        srsReviews: 0
      };
      STORE.set('flow', flow);
      return flow;
    }
    if (flow.date !== today) {
      flow.date = today;
      flow.steps = [false, false, false, false, false];
      flow.streakRewarded = false;
      flow.novaTurns = 0;
      flow.srsReviews = 0;
      STORE.set('flow', flow);
    }
    return flow;
  }

  function get(optDate) {
    return checkRollover(optDate);
  }

  function isStepUnlocked(step, optDate) {
    var idx = (step >= 1 && step <= 5) ? (step - 1) : (step === 0 ? 0 : -1);
    if (idx < 0 || idx > 4) { return false; }
    if (idx === 0) { return true; }
    var flow = checkRollover(optDate);
    return !!flow.steps[idx - 1];
  }

  function current(optDate) {
    var flow = checkRollover(optDate);
    for (var i = 0; i < flow.steps.length; i++) {
      if (!flow.steps[i]) {
        var def = STEP_DEFS[i];
        return {
          id: def.id,
          key: def.key,
          label: def.label,
          title: def.title,
          desc: def.desc,
          route: def.getRoute(),
          allDone: false
        };
      }
    }
    var last = STEP_DEFS[4];
    return {
      id: last.id,
      key: last.key,
      label: last.label,
      title: last.title,
      desc: last.desc,
      route: last.getRoute(),
      allDone: true
    };
  }

  function mark(step, optDate) {
    var idx = (step >= 1 && step <= 5) ? (step - 1) : (step === 0 ? 0 : -1);
    if (idx < 0 || idx > 4) { return false; }
    var flow = checkRollover(optDate);
    if (flow.steps[idx]) { return true; }
    // Enforce sequence: step idx cannot complete if previous step not complete
    if (idx > 0 && !flow.steps[idx - 1]) {
      return false;
    }
    flow.steps[idx] = true;
    var allDone = true;
    for (var i = 0; i < flow.steps.length; i++) {
      if (!flow.steps[i]) { allDone = false; break; }
    }
    if (allDone && !flow.streakRewarded) {
      if (STORE._rewardFlowStreak) {
        STORE._rewardFlowStreak(flow.date);
      }
      flow.streakRewarded = true;
    }
    STORE.set('flow', flow);
    if (typeof updateFlowChip === 'function') {
      updateFlowChip();
    } else if (typeof window !== 'undefined' && typeof window.updateFlowChip === 'function') {
      window.updateFlowChip();
    }
    return true;
  }

  function openStep(step) {
    var idx = (step >= 1 && step <= 5) ? (step - 1) : (step === 0 ? 0 : -1);
    if (idx < 0 || idx > 4) { return; }
    var def = STEP_DEFS[idx];
    if (!isStepUnlocked(idx + 1)) {
      if (typeof UI !== 'undefined' && UI.toast) {
        UI.toast('🔒 Step ' + (idx + 1) + ' locked: ' + def.reason, 'warning');
      }
      return;
    }
    var r = def.getRoute();
    if (typeof navigate === 'function') {
      navigate(r);
    } else if (typeof window !== 'undefined' && window.location) {
      window.location.hash = '#/' + r;
    }
  }

  function openCurrent() {
    var cur = current();
    openStep(cur.id);
  }

  function recordNovaTurn() {
    var flow = checkRollover();
    flow.novaTurns = (flow.novaTurns || 0) + 1;
    STORE.set('flow', flow);
    if (flow.novaTurns >= 3) {
      mark(4);
    }
    return flow.novaTurns;
  }

  function recordSrsReview() {
    var flow = checkRollover();
    flow.srsReviews = (flow.srsReviews || 0) + 1;
    STORE.set('flow', flow);
    if (flow.srsReviews >= 5) {
      mark(5);
    }
    return flow.srsReviews;
  }

  return {
    stepDefs: STEP_DEFS,
    checkRollover: checkRollover,
    setDate: setDate,
    get: get,
    isStepUnlocked: isStepUnlocked,
    current: current,
    mark: mark,
    openStep: openStep,
    openCurrent: openCurrent,
    recordNovaTurn: recordNovaTurn,
    recordSrsReview: recordSrsReview
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   LIVE_COACH — Word-level speech matching, prefix alignment,
   interrupt decision engine, throttle & Android restart state machine (M9)
   Honest copy: "word-level live matching via browser speech recognition"
   ════════════════════════════════════════════════════════════════════*/
var LIVE_COACH = (function () {
  'use strict';

  var HIGH_SEVERITY_RULES = [
    { pat: /\b(i|he|she|they|we|you)\s+(going|doing|coming|working|waiting|trying)\b/i, fix: "say 'am/is/are' before verb", speak: "Add 'is' or 'are'." },
    { pat: /\ba\s+(apple|orange|egg|elephant|hour|umbrella|idea|interview|honest|urgent)\b/i, fix: "use 'an' before vowel sounds", speak: "Use 'an' before vowels." },
    { pat: /\ban\s+(car|dog|cat|house|university|european|union|job|person)\b/i, fix: "use 'a' before consonant sounds", speak: "Use 'a' here." },
    { pat: /\bdid\s+(went|came|saw|ate|had|spoke|wrote)\b/i, fix: "use base verb after 'did'", speak: "Use base verb with did." },
    { pat: /\b(he|she|it)\s+(don't|dont)\b/i, fix: "use 'does not' with he/she/it", speak: "Say 'does not' for he." }
  ];

  function matchPrefix(target, partial) {
    var targetTokens = (typeof U !== 'undefined' && U.tokenise) ? U.tokenise(target || '') : [];
    var partialTokens = (typeof U !== 'undefined' && U.tokenise) ? U.tokenise(partial || '') : [];
    var aligned = (typeof U !== 'undefined' && U.align) ? U.align(target || '', partial || '') : [];

    var matchedCount = 0;
    for (var i = 0; i < aligned.length; i++) {
      if (aligned[i].ok) {
        matchedCount++;
      } else {
        break;
      }
    }

    var isComplete = (targetTokens.length > 0 && matchedCount === targetTokens.length);
    var nextExpected = matchedCount < targetTokens.length ? targetTokens[matchedCount] : null;

    var candidate = null;
    var mismatch = false;
    var unexpectedCount = 0;

    if (partialTokens.length > matchedCount) {
      unexpectedCount = partialTokens.length - matchedCount;
      candidate = partialTokens[matchedCount];
      if (nextExpected && candidate !== nextExpected) {
        mismatch = true;
      }
    }

    return {
      target: target,
      partial: partial,
      targetTokens: targetTokens,
      partialTokens: partialTokens,
      matchedCount: matchedCount,
      matchedWords: targetTokens.slice(0, matchedCount),
      nextExpected: nextExpected,
      candidate: candidate,
      mismatch: mismatch,
      unexpectedCount: unexpectedCount,
      isComplete: isComplete
    };
  }

  function shouldInterrupt(state) {
    if (!state) { return false; }
    var max = (state.maxInterrupts !== undefined) ? state.maxInterrupts : 3;
    var count = state.interruptCount || 0;
    if (count >= max) {
      return false;
    }
    var match = state.match;
    if (!match || match.isComplete) {
      return false;
    }
    var silenceMs = (state.silenceMs !== undefined) ? state.silenceMs : 0;
    if (silenceMs < 500) {
      return false;
    }
    var leaked = (match.unexpectedCount >= 2);
    var mismatched = (match.mismatch === true && match.candidate !== null);
    return leaked || mismatched;
  }

  function getChipStates(target, partial) {
    var match = (partial && typeof partial === 'object' && partial.targetTokens)
      ? partial
      : matchPrefix(target, partial || '');
    var tokens = match.targetTokens;
    var matchedCount = match.matchedCount;
    var chips = [];

    for (var i = 0; i < tokens.length; i++) {
      var state = 'upcoming';
      if (i < matchedCount) {
        state = 'matched';
      } else if (i === matchedCount) {
        state = 'current';
      }
      chips.push({
        word: tokens[i],
        state: state,
        index: i
      });
    }
    return chips;
  }

  function renderChipHTML(target, partial) {
    var chips = getChipStates(target, partial);
    var html = '<div class="live-drill-chips" id="live-drill-chips">';
    for (var i = 0; i < chips.length; i++) {
      var c = chips[i];
      html += '<span class="live-chip chip-' + c.state + '" data-word="' + c.word + '" data-state="' + c.state + '">' + c.word + '</span>';
    }
    html += '</div>';
    return html;
  }

  function createThrottle(windowMs) {
    var win = (windowMs !== undefined) ? windowMs : 20000;
    var lastTs = -Infinity;

    return {
      canExecute: function (nowTs, isInFlight) {
        if (isInFlight) { return false; }
        var now = (nowTs !== undefined) ? nowTs : Date.now();
        return (now - lastTs) >= win;
      },
      record: function (nowTs) {
        lastTs = (nowTs !== undefined) ? nowTs : Date.now();
      },
      reset: function () {
        lastTs = -Infinity;
      },
      getLastTs: function () { return lastTs; },
      getWindow: function () { return win; }
    };
  }

  function createRestartTracker(opts) {
    opts = opts || {};
    var maxFails = (opts.maxFails !== undefined) ? opts.maxFails : 3;
    var baseDelay = (opts.baseDelay !== undefined) ? opts.baseDelay : 250;
    var fails = 0;
    var paused = false;

    return {
      onSuccess: function () {
        fails = 0;
        paused = false;
        return { fails: 0, paused: false };
      },
      onEnd: function (isExpected) {
        if (isExpected) {
          fails = 0;
          return { shouldRestart: false, delay: 0, paused: false, failCount: 0 };
        }
        fails++;
        if (fails > maxFails) {
          paused = true;
          return { shouldRestart: false, delay: 0, paused: true, failCount: fails, message: 'paused — tap to resume' };
        }
        var delay = baseDelay * Math.pow(2, fails - 1);
        return { shouldRestart: true, delay: delay, paused: false, failCount: fails };
      },
      resume: function () {
        fails = 0;
        paused = false;
        return { fails: 0, paused: false };
      },
      isPaused: function () { return paused; },
      getFails: function () { return fails; },
      getMaxFails: function () { return maxFails; }
    };
  }

  function detectHighSeverityFix(text) {
    if (!text) { return null; }
    for (var i = 0; i < HIGH_SEVERITY_RULES.length; i++) {
      var r = HIGH_SEVERITY_RULES[i];
      if (r.pat.test(text)) {
        return {
          fix: r.fix,
          spoken: r.speak
        };
      }
    }
    return null;
  }

  function lookupWordIpa(word) {
    if (!word || typeof WORDS === 'undefined') { return ''; }
    var w = word.toLowerCase().trim();
    for (var i = 0; i < WORDS.length; i++) {
      if (WORDS[i].w && WORDS[i].w.toLowerCase() === w) {
        return WORDS[i].ipa ? '/' + WORDS[i].ipa + '/' : '';
      }
    }
    return '';
  }

  function buildInterruptMessage(target, match) {
    var nextWord = match ? match.nextExpected : '';
    var ipa = lookupWordIpa(nextWord);
    var spoken = "Stop! The word is '" + nextWord + "'" + (ipa ? " " + ipa : "") + ". Listen slowly.";
    var lastWords = (match && match.matchedWords && match.matchedWords.length > 0)
      ? match.matchedWords.slice(-3).join(' ')
      : '';
    var prompt = lastWords ? "Again from: '…" + lastWords + "…'" : "Again from: '" + ((match && match.targetTokens && match.targetTokens[0]) || '') + "…'";
    return {
      word: nextWord,
      ipa: ipa,
      spoken: spoken,
      prompt: prompt
    };
  }

  var bargeInThrottle = createThrottle(20000);

  return {
    HIGH_SEVERITY_RULES: HIGH_SEVERITY_RULES,
    matchPrefix: matchPrefix,
    shouldInterrupt: shouldInterrupt,
    getChipStates: getChipStates,
    renderChipHTML: renderChipHTML,
    createThrottle: createThrottle,
    createRestartTracker: createRestartTracker,
    detectHighSeverityFix: detectHighSeverityFix,
    lookupWordIpa: lookupWordIpa,
    buildInterruptMessage: buildInterruptMessage,
    bargeInThrottle: bargeInThrottle
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   LLM_PROVIDERS & llmAsk — Multi-provider free LLM architecture (M10)
   Providers: Gemini 2.0 Flash | Groq Llama 3.1 8B | OpenRouter Llama 3.1 8B
   Unified request-shaping, response normalization, zero-dollar fallback floor
   ════════════════════════════════════════════════════════════════════*/
var LLM_PROVIDERS = {
  gemini: {
    id: 'gemini',
    name: 'Gemini 2.0 Flash',
    urlFor: function (key) {
      return 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + encodeURIComponent(key);
    },
    buildRequest: function (key, systemPrompt, messages) {
      var contents = [];
      for (var i = 0; i < messages.length; i++) {
        var m = messages[i];
        var role = (m.role === 'user') ? 'user' : 'model';
        var text = m.content || (m.parts && m.parts[0] && m.parts[0].text) || (m.text || '');
        contents.push({
          role: role,
          parts: [{ text: text }]
        });
      }
      var body = {
        system_instruction: { parts: [{ text: systemPrompt || '' }] },
        contents: contents,
        generationConfig: { maxOutputTokens: 250, temperature: 0.7 }
      };
      return {
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + encodeURIComponent(key),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      };
    },
    parseResponse: function (data) {
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text || '';
      }
      return '';
    }
  },

  groq: {
    id: 'groq',
    name: 'Groq (Llama 3.1 8B Instant)',
    buildRequest: function (key, systemPrompt, messages) {
      var chatMessages = [];
      if (systemPrompt) {
        chatMessages.push({ role: 'system', content: systemPrompt });
      }
      for (var i = 0; i < messages.length; i++) {
        var m = messages[i];
        var role = (m.role === 'user') ? 'user' : 'assistant';
        var text = m.content || (m.parts && m.parts[0] && m.parts[0].text) || (m.text || '');
        chatMessages.push({ role: role, content: text });
      }
      var body = {
        model: 'llama-3.1-8b-instant',
        messages: chatMessages,
        max_tokens: 250,
        temperature: 0.7
      };
      return {
        url: 'https://api.groq.com/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key
        },
        body: body
      };
    },
    parseResponse: function (data) {
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content || '';
      }
      return '';
    }
  },

  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter (Llama 3.1 8B Free)',
    buildRequest: function (key, systemPrompt, messages) {
      var chatMessages = [];
      if (systemPrompt) {
        chatMessages.push({ role: 'system', content: systemPrompt });
      }
      for (var i = 0; i < messages.length; i++) {
        var m = messages[i];
        var role = (m.role === 'user') ? 'user' : 'assistant';
        var text = m.content || (m.parts && m.parts[0] && m.parts[0].text) || (m.text || '');
        chatMessages.push({ role: role, content: text });
      }
      var body = {
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: chatMessages,
        max_tokens: 250,
        temperature: 0.7
      };
      return {
        url: 'https://openrouter.ai/api/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key,
          'HTTP-Referer': 'https://engspell.ai',
          'X-Title': 'EngSpell'
        },
        body: body
      };
    },
    parseResponse: function (data) {
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content || '';
      }
      return '';
    }
  }
};

function llmAsk(opts) {
  opts = opts || {};
  var settings = (typeof STORE !== 'undefined' && STORE.get) ? (STORE.get('settings') || {}) : {};
  var provider = (opts.provider || settings.llmProvider || 'gemini').toLowerCase();
  var key = (opts.key !== undefined) ? opts.key : (settings.geminiKey || '');
  var systemPrompt = opts.systemPrompt || '';
  var rawMessages = opts.messages || [];

  var provDef = LLM_PROVIDERS[provider] || LLM_PROVIDERS.gemini;
  var req = provDef.buildRequest(key ? key.trim() : '', systemPrompt, rawMessages);

  if (typeof fetch !== 'function') {
    var noFetchErr = new Error('fetch API not available in this environment');
    if (typeof opts.onError === 'function') { opts.onError(noFetchErr); }
    if (typeof Promise !== 'undefined') { return Promise.reject(noFetchErr); }
    return null;
  }

  return fetch(req.url, {
    method: req.method || 'POST',
    headers: req.headers,
    body: JSON.stringify(req.body)
  }).then(function (res) {
    if (!res.ok) {
      throw new Error(provider + ' error: HTTP ' + res.status);
    }
    return res.json();
  }).then(function (data) {
    var text = provDef.parseResponse(data);
    if (!text || typeof text !== 'string') {
      throw new Error(provider + ' returned empty or invalid response');
    }
    text = text.trim();
    if (typeof opts.onDone === 'function') {
      opts.onDone(text);
    }
    return text;
  }).catch(function (err) {
    if (typeof opts.onError === 'function') {
      opts.onError(err);
    }
    throw err;
  });
}

/* ══════════════════════════════════════════════════════════════════════
   REMINDERS — Local Daily Reminders Engine (M12: NTFY-01)
   Aligned hour scheduling, local notifications, zero-permission on load
   ════════════════════════════════════════════════════════════════════*/
var REMINDERS = (function () {
  'use strict';
  var _timer = null;
  var _isArming = false;
  var _lastScheduledTargetMs = 0;
  var _visibilityAttached = false;

  function parseHourMin(hourStr) {
    var parts = String(hourStr || '19:00').split(':');
    var h = parseInt(parts[0], 10);
    var m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    if (isNaN(h) || h < 0 || h > 23) { h = 19; }
    if (isNaN(m) || m < 0 || m > 59) { m = 0; }
    return { hour: h, minute: m };
  }

  function computeNextFireMs(targetHourStr, nowMs) {
    var now = (nowMs !== undefined) ? new Date(nowMs) : new Date();
    var hm = parseHourMin(targetHourStr);
    var target = new Date(now.getTime());
    target.setHours(hm.hour, hm.minute, 0, 0);

    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    return target.getTime() - now.getTime();
  }

  function canNotify() {
    return (typeof Notification !== 'undefined') || (typeof navigator !== 'undefined' && 'serviceWorker' in navigator);
  }

  function getPermission() {
    if (typeof Notification === 'undefined') { return 'unsupported'; }
    return Notification.permission;
  }

  function hasShowTrigger() {
    return (typeof Notification !== 'undefined' && 'showTrigger' in Notification.prototype) ||
           (typeof TimestampTrigger !== 'undefined') ||
           (typeof window !== 'undefined' && typeof window.TimestampTrigger !== 'undefined');
  }

  function getRemainingStepsSummary() {
    var flow = (typeof STORE !== 'undefined' && STORE.get) ? (STORE.get('flow') || {}) : {};
    var steps = (flow && Array.isArray(flow.steps)) ? flow.steps : [false, false, false, false, false];
    var done = 0;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i]) { done++; }
    }
    var remaining = Math.max(0, 5 - done);
    if (remaining === 0) {
      return 'All 5 Flow steps completed today! Streak preserved 🔥';
    }
    return remaining + ' step' + (remaining === 1 ? '' : 's') + ' left in today\'s Flow to keep your streak!';
  }

  function _showViaPage(title, options) {
    try {
      if (typeof Notification !== 'undefined' && typeof Notification === 'function') {
        var n = new Notification(title, options);
        n.onclick = function () {
          if (typeof window !== 'undefined') {
            if (window.focus) { window.focus(); }
            window.location.hash = '#/home';
          }
          if (n.close) { n.close(); }
        };
        return n;
      }
    } catch (e) {
      /* ignore Android new Notification() restriction */
    }
    return null;
  }

  function _toPromise(val) {
    if (val && typeof val.then === 'function') { return val; }
    if (typeof Promise !== 'undefined' && Promise.resolve) { return Promise.resolve(val); }
    return {
      then: function (cb) {
        var r = cb ? cb(val) : val;
        return _toPromise(r);
      }
    };
  }

  function fireNotification(tag) {
    if (getPermission() !== 'granted') { return null; }
    var title = 'EngSpell — your Flow is waiting 🔥';
    var body = getRemainingStepsSummary();
    var options = {
      body: body,
      icon: 'icons/icon-192.png',
      tag: tag || 'engspell-dose'
    };

    if (typeof navigator !== 'undefined' && navigator.serviceWorker && navigator.serviceWorker.ready) {
      return _toPromise(navigator.serviceWorker.ready).then(function (reg) {
        if (reg && reg.showNotification) {
          return reg.showNotification(title, options);
        }
        return _showViaPage(title, options);
      });
    }
    return _showViaPage(title, options);
  }

  function schedule() {
    _ensureVisibilityListener();
    if (_timer) { clearTimeout(_timer); _timer = null; }
    if (typeof STORE === 'undefined' || !STORE.get) { return _toPromise(null); }
    var settings = STORE.get('settings') || {};
    if (!settings.remindOn) { return _toPromise(null); }
    if (getPermission() !== 'granted') { return _toPromise(null); }

    var delayMs = computeNextFireMs(settings.remindHour || '19:00');
    var targetFireMs = Date.now() + delayMs;

    // Check for Notification Triggers support (Chrome/Android TimestampTrigger)
    if (hasShowTrigger() && typeof navigator !== 'undefined' && navigator.serviceWorker && navigator.serviceWorker.ready) {
      if (_isArming) {
        return _toPromise(null);
      }
      _isArming = true;
      return _toPromise(navigator.serviceWorker.ready).then(function (reg) {
        if (!reg || !reg.showNotification) {
          _isArming = false;
          _fallbackLegacySchedule(delayMs);
          return null;
        }

        var getNotesCall = (reg.getNotifications)
          ? reg.getNotifications({ tag: 'engspell-dose', includeTriggered: true })
          : [];

        return _toPromise(getNotesCall).then(function (notes) {
          var hasTag = false;
          if (notes && notes.length) {
            for (var i = 0; i < notes.length; i++) {
              if (notes[i] && notes[i].tag === 'engspell-dose') {
                hasTag = true;
                break;
              }
            }
          }
          if (hasTag) {
            _isArming = false;
            return null; // Dedupe: tag already registered/armed!
          }

          var trigger = null;
          if (typeof TimestampTrigger !== 'undefined') {
            trigger = new TimestampTrigger(targetFireMs);
          } else if (typeof window !== 'undefined' && typeof window.TimestampTrigger !== 'undefined') {
            trigger = new window.TimestampTrigger(targetFireMs);
          } else {
            trigger = { timestamp: targetFireMs };
          }

          var title = 'EngSpell — your Flow is waiting 🔥';
          var opts = {
            body: getRemainingStepsSummary(),
            icon: 'icons/icon-192.png',
            tag: 'engspell-dose',
            showTrigger: trigger
          };

          return _toPromise(reg.showNotification(title, opts)).then(function (res) {
            _isArming = false;
            _lastScheduledTargetMs = targetFireMs;
            return res;
          });
        });
      });
    }

    // Legacy fallback (no showTrigger, e.g. Firefox)
    _fallbackLegacySchedule(delayMs);
    return _toPromise(null);
  }

  function _fallbackLegacySchedule(delayMs) {
    if (_timer) { clearTimeout(_timer); _timer = null; }
    _timer = setTimeout(function () {
      fireNotification('engspell-dose');
      schedule(); // reschedule for next day
    }, delayMs);
  }

  function _ensureVisibilityListener() {
    if (_visibilityAttached) { return; }
    if (typeof document !== 'undefined' && document.addEventListener) {
      _visibilityAttached = true;
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
          schedule();
        }
      });
    }
  }

  function clear() {
    if (_timer) { clearTimeout(_timer); _timer = null; }
    _isArming = false;
    _lastScheduledTargetMs = 0;
    if (typeof navigator !== 'undefined' && navigator.serviceWorker && navigator.serviceWorker.ready) {
      Promise.resolve(navigator.serviceWorker.ready).then(function (reg) {
        if (reg && reg.getNotifications) {
          reg.getNotifications({ tag: 'engspell-dose', includeTriggered: true }).then(function (notes) {
            if (notes && notes.length) {
              for (var i = 0; i < notes.length; i++) {
                if (notes[i] && notes[i].close) {
                  notes[i].close();
                }
              }
            }
          }).catch(function () {});
        }
      }).catch(function () {});
    }
  }

  function enable(bool, hourStr) {
    if (typeof STORE === 'undefined' || !STORE.get) { return; }
    var s = STORE.get('settings') || {};
    s.remindOn = !!bool;
    if (hourStr) { s.remindHour = hourStr; }
    STORE.set('settings', s);
    if (STORE.save) { STORE.save(); }
    if (bool) {
      schedule();
    } else {
      clear();
    }
  }

  function isEnabled() {
    if (typeof STORE === 'undefined' || !STORE.get) { return false; }
    var s = STORE.get('settings') || {};
    return !!s.remindOn;
  }

  return {
    parseHourMin: parseHourMin,
    computeNextFireMs: computeNextFireMs,
    canNotify: canNotify,
    getPermission: getPermission,
    hasShowTrigger: hasShowTrigger,
    getRemainingStepsSummary: getRemainingStepsSummary,
    fireNotification: fireNotification,
    schedule: schedule,
    clear: clear,
    enable: enable,
    isEnabled: isEnabled
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   WEEKLY — "So What" Progress Rollups & Weekly History (M17: WEEKLY-01)
   ISO-week bucketing, deltas, CEFR story, cap at 500 oldest-pruned
   ════════════════════════════════════════════════════════════════════*/
var WEEKLY = (function () {
  'use strict';

  function getIsoWeekYearAndWeek(d) {
    var date;
    if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}/.test(d)) {
      var y = parseInt(d.slice(0, 4), 10);
      var m = parseInt(d.slice(5, 7), 10) - 1;
      var day = parseInt(d.slice(8, 10), 10);
      date = new Date(Date.UTC(y, m, day));
    } else {
      var dt = (typeof d === 'number' || typeof d === 'string') ? new Date(d) : d;
      if (!dt || isNaN(dt.getTime())) { dt = new Date(); }
      date = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()));
    }
    var dayNr = date.getUTCDay();
    if (dayNr === 0) { dayNr = 7; }
    date.setUTCDate(date.getUTCDate() + 4 - dayNr);
    var isoYear = date.getUTCFullYear();
    var yearStart = new Date(Date.UTC(isoYear, 0, 1));
    var weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return { year: isoYear, week: weekNo };
  }

  function isoWeekOf(tsOrDate) {
    if (!tsOrDate) { tsOrDate = new Date(); }
    var res = getIsoWeekYearAndWeek(tsOrDate);
    var wStr = res.week < 10 ? '0' + res.week : '' + res.week;
    return res.year + '-W' + wStr;
  }

  function getPrevIsoWeek(isoWeekStr) {
    var parts = (isoWeekStr || '').split('-W');
    if (parts.length === 2) {
      var y = parseInt(parts[0], 10);
      var w = parseInt(parts[1], 10);
      var d = new Date(Date.UTC(y, 0, 4 + (w - 1) * 7));
      var prev = new Date(d.getTime() - 7 * 86400000);
      return isoWeekOf(prev);
    }
    return isoWeekOf(Date.now() - 7 * 86400000);
  }

  function record(entry) {
    if (!entry) { entry = {}; }
    var ts = entry.ts || Date.now();
    var wpm = typeof entry.wpm === 'number' ? Math.round(entry.wpm) : 110;
    var fillersPerMin = typeof entry.fillersPerMin === 'number' ? Math.round(entry.fillersPerMin * 10) / 10 : 0;
    var honestScore = typeof entry.honestScore === 'number' ? Math.round(entry.honestScore * 10) / 10 : 7;
    var lessonsDone = typeof entry.lessonsDone === 'number' ? entry.lessonsDone : ((STORE.get('completed') || []).length);
    var xp = typeof entry.xp === 'number' ? entry.xp : (STORE.get('xp') || 0);

    var clean = {
      ts: ts,
      wpm: wpm,
      fillersPerMin: fillersPerMin,
      honestScore: honestScore,
      lessonsDone: lessonsDone,
      xp: xp
    };

    var hist = STORE.get('weeklyHistory') || [];
    hist.push(clean);
    if (hist.length > 500) {
      hist = hist.slice(hist.length - 500);
    }
    STORE.set('weeklyHistory', hist);
    return clean;
  }

  function recordFromAssessment(report) {
    if (!report) { return null; }
    var ts = report.date ? new Date(report.date).getTime() : Date.now();
    var wpm = report.avgWpm || report.wpm || 110;
    var fillersPerMin = 0;
    if (typeof report.fillersPerMin === 'number') {
      fillersPerMin = report.fillersPerMin;
    } else if (typeof report.fillerRate === 'number') {
      fillersPerMin = Math.round(report.fillerRate * wpm * 10) / 10;
    } else if (Array.isArray(report.results) && report.results.length) {
      var totalFillers = 0;
      for (var i = 0; i < report.results.length; i++) {
        totalFillers += (report.results[i].fillers || 0);
      }
      fillersPerMin = Math.round((totalFillers / (report.results.length * 0.5)) * 10) / 10;
    }
    var honestScore = 7;
    if (typeof report.honestScore === 'number') {
      honestScore = report.honestScore;
    } else if (report.band) {
      var bMap = { 'C2': 10, 'C1': 9, 'B2': 8, 'B1': 7, 'A2': 5, 'A1': 3 };
      honestScore = bMap[report.band] || 7;
    }
    var lessonsDone = (STORE.get('completed') || []).length;
    var xp = STORE.get('xp') || 0;
    return record({
      ts: ts,
      wpm: wpm,
      fillersPerMin: fillersPerMin,
      honestScore: honestScore,
      lessonsDone: lessonsDone,
      xp: xp
    });
  }

  function recordFixerSession(opts) {
    if (!opts) { opts = {}; }
    var ts = opts.ts || Date.now();
    var wpm = typeof opts.wpm === 'number' ? opts.wpm : 120;
    var fillersPerMin = typeof opts.fillersPerMin === 'number' ? opts.fillersPerMin : 0;
    var honestScore = 7;
    if (typeof opts.honestScore === 'number') {
      honestScore = opts.honestScore;
    } else if (typeof opts.issuesCount === 'number') {
      var wc = typeof opts.wordCount === 'number' ? opts.wordCount : 12;
      honestScore = STORE.computeHonestScore(opts.issuesCount, wc);
    }
    var lessonsDone = typeof opts.lessonsDone === 'number' ? opts.lessonsDone : ((STORE.get('completed') || []).length);
    var xp = typeof opts.xp === 'number' ? opts.xp : (STORE.get('xp') || 0);
    return record({
      ts: ts,
      wpm: wpm,
      fillersPerMin: fillersPerMin,
      honestScore: honestScore,
      lessonsDone: lessonsDone,
      xp: xp
    });
  }

  function getBuckets(hist) {
    if (!hist) { hist = STORE.get('weeklyHistory') || []; }
    var buckets = {};
    for (var i = 0; i < hist.length; i++) {
      var it = hist[i];
      var wk = isoWeekOf(it.ts);
      if (!buckets[wk]) { buckets[wk] = []; }
      buckets[wk].push(it);
    }
    return buckets;
  }

  function summarizeBucket(items) {
    if (!items || !items.length) { return null; }
    var sumWpm = 0, sumFillers = 0, sumHonest = 0;
    var maxLessons = 0, minLessons = Infinity;
    var maxXP = 0, minXP = Infinity;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      sumWpm += (it.wpm || 0);
      sumFillers += (it.fillersPerMin || 0);
      sumHonest += (it.honestScore || 0);
      var ld = (it.lessonsDone || 0);
      if (ld > maxLessons) { maxLessons = ld; }
      if (ld < minLessons) { minLessons = ld; }
      var x = (it.xp || 0);
      if (x > maxXP) { maxXP = x; }
      if (x < minXP) { minXP = x; }
    }
    var cnt = items.length;
    var avgWpm = Math.round(sumWpm / cnt);
    var avgFillers = Math.round((sumFillers / cnt) * 10) / 10;
    var avgHonest = Math.round((sumHonest / cnt) * 10) / 10;
    var latestItem = items[items.length - 1];
    return {
      sessionCount: cnt,
      wpm: avgWpm,
      fillersPerMin: avgFillers,
      fillers: avgFillers,
      honestScore: avgHonest,
      lessonsDone: latestItem.lessonsDone || 0,
      lessons: latestItem.lessonsDone || 0,
      lessonsGained: (minLessons !== Infinity && maxLessons >= minLessons) ? (maxLessons - minLessons) : 0,
      xp: latestItem.xp || 0,
      xpGained: (minXP !== Infinity && maxXP >= minXP) ? (maxXP - minXP) : 0
    };
  }

  function getDelta(curVal, prevVal, isHigherBetter) {
    if (prevVal === undefined || prevVal === null) {
      return {
        delta: 0,
        direction: 'no-prior-week',
        text: '—',
        improved: false,
        isGood: false
      };
    }
    var d = Math.round((curVal - prevVal) * 10) / 10;
    var dir = 'flat';
    if (d > 0) {
      dir = 'up';
    } else if (d < 0) {
      dir = 'down';
    }
    var isGood = isHigherBetter === false ? (d < 0) : (d > 0);
    var sign = d > 0 ? '+' : '';
    return {
      delta: d,
      direction: dir,
      text: sign + d,
      improved: isGood,
      isGood: isGood
    };
  }

  function getCefrStory(curWpm, curFillerRate, prevWpm, prevFillerRate) {
    var curBand = (typeof bandOf === 'function') ? bandOf(curWpm, curFillerRate) : 'B1';
    var bands = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    var curIdx = bands.indexOf(curBand);
    var nextBand = curIdx < bands.length - 1 ? bands[curIdx + 1] : null;

    var prevBand = null;
    if (prevWpm !== undefined && prevWpm !== null) {
      prevBand = (typeof bandOf === 'function') ? bandOf(prevWpm, prevFillerRate) : null;
    }

    var wpmDelta = (prevWpm !== undefined && prevWpm !== null) ? (curWpm - prevWpm) : 0;
    var sign = wpmDelta > 0 ? '+' : '';

    var statusPart = '';
    if (!prevBand) {
      statusPart = 'reached ' + curBand;
    } else if (curBand === prevBand) {
      statusPart = 'held ' + curBand;
    } else {
      var prevIdx = bands.indexOf(prevBand);
      if (curIdx > prevIdx) {
        statusPart = 'promoted to ' + curBand;
      } else {
        statusPart = 'slipped to ' + curBand;
      }
    }

    var progressPart = '';
    if (nextBand) {
      if (prevWpm !== undefined && prevWpm !== null && wpmDelta !== 0) {
        progressPart = ', ' + sign + wpmDelta + ' WPM toward ' + nextBand;
      } else if (wpmDelta === 0 && prevWpm !== undefined && prevWpm !== null) {
        progressPart = ', steady pace toward ' + nextBand;
      } else {
        progressPart = ', pacing toward ' + nextBand;
      }
    } else {
      progressPart = ', top tier';
    }

    return statusPart + progressPart;
  }

  function getRollup(customDate) {
    var hist = STORE.get('weeklyHistory') || [];
    var totalSessions = hist.length;
    if (totalSessions < 3) {
      return {
        locked: true,
        totalSessions: totalSessions,
        needed: 3 - totalSessions,
        message: 'finish 3 sessions to unlock your weekly trend'
      };
    }

    var refDate = customDate ? new Date(customDate) : new Date();
    var curWeekKey = isoWeekOf(refDate);
    var prevWeekKey = getPrevIsoWeek(curWeekKey);

    var buckets = getBuckets(hist);
    var thisItems = buckets[curWeekKey] || [];
    if (!thisItems.length) {
      var allWeeks = Object.keys(buckets).sort();
      if (allWeeks.length) {
        curWeekKey = allWeeks[allWeeks.length - 1];
        thisItems = buckets[curWeekKey] || [];
        prevWeekKey = getPrevIsoWeek(curWeekKey);
      }
    }
    var prevItems = buckets[prevWeekKey] || [];

    var thisSum = summarizeBucket(thisItems);
    var prevSum = summarizeBucket(prevItems);

    var deltas = {
      wpm: getDelta(thisSum ? thisSum.wpm : 0, prevSum ? prevSum.wpm : null, true),
      fillersPerMin: getDelta(thisSum ? thisSum.fillersPerMin : 0, prevSum ? prevSum.fillersPerMin : null, false),
      fillers: getDelta(thisSum ? thisSum.fillersPerMin : 0, prevSum ? prevSum.fillersPerMin : null, false),
      honestScore: getDelta(thisSum ? thisSum.honestScore : 0, prevSum ? prevSum.honestScore : null, true),
      lessons: getDelta(thisSum ? thisSum.lessons : 0, prevSum ? prevSum.lessons : null, true),
      lessonsDone: getDelta(thisSum ? thisSum.lessonsDone : 0, prevSum ? prevSum.lessonsDone : null, true),
      xp: getDelta(thisSum ? thisSum.xp : 0, prevSum ? prevSum.xp : null, true),
      XP: getDelta(thisSum ? thisSum.xp : 0, prevSum ? prevSum.xp : null, true)
    };

    var curFillerFraction = thisSum ? (thisSum.fillersPerMin / (thisSum.wpm || 100)) : 0.03;
    var prevFillerFraction = prevSum ? (prevSum.fillersPerMin / (prevSum.wpm || 100)) : null;
    var cefrStory = getCefrStory(
      thisSum ? thisSum.wpm : 100,
      curFillerFraction,
      prevSum ? prevSum.wpm : null,
      prevFillerFraction
    );

    var curBand = (typeof bandOf === 'function') ? bandOf(thisSum ? thisSum.wpm : 100, curFillerFraction) : 'B1';

    return {
      locked: false,
      totalSessions: totalSessions,
      curWeek: curWeekKey,
      prevWeek: prevWeekKey,
      thisWeek: thisSum,
      lastWeek: prevSum,
      deltas: deltas,
      band: curBand,
      story: cefrStory
    };
  }

  if (typeof window !== 'undefined') { window.WEEKLY = { isoWeekOf: isoWeekOf, getPrevIsoWeek: getPrevIsoWeek, record: record, recordFromAssessment: recordFromAssessment, recordFixerSession: recordFixerSession, getBuckets: getBuckets, summarizeBucket: summarizeBucket, getDelta: getDelta, getCefrStory: getCefrStory, getRollup: getRollup }; }
  if (typeof global !== 'undefined') { global.WEEKLY = { isoWeekOf: isoWeekOf, getPrevIsoWeek: getPrevIsoWeek, record: record, recordFromAssessment: recordFromAssessment, recordFixerSession: recordFixerSession, getBuckets: getBuckets, summarizeBucket: summarizeBucket, getDelta: getDelta, getCefrStory: getCefrStory, getRollup: getRollup }; }

  return {
    isoWeekOf: isoWeekOf,
    getPrevIsoWeek: getPrevIsoWeek,
    record: record,
    recordFromAssessment: recordFromAssessment,
    recordFixerSession: recordFixerSession,
    getBuckets: getBuckets,
    summarizeBucket: summarizeBucket,
    getDelta: getDelta,
    getCefrStory: getCefrStory,
    getRollup: getRollup
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   DATA_MERGE — content merge helper (M15 CNT-GEN)
   Merges generated content packs (DATA4) into core data collections
   ════════════════════════════════════════════════════════════════════*/
var DATA_MERGE = (function () {
  'use strict';
  var _merged = false;

  function mergeAll() {
    if (_merged) { return; }
    if (typeof DATA4 !== 'undefined' && DATA4 && typeof DATA4.merge === 'function') {
      DATA4.merge();
    }
    _merged = true;
  }

  function allLessons() {
    mergeAll();
    return (typeof COURSE !== 'undefined') ? COURSE : [];
  }

  function allScenarios() {
    mergeAll();
    return (typeof SCENARIOS !== 'undefined') ? SCENARIOS : [];
  }

  function allPassages() {
    mergeAll();
    return (typeof PASSAGES !== 'undefined') ? PASSAGES : [];
  }

  // Attempt merge on load if DATA4 is available
  mergeAll();

  return {
    merged: true,
    mergeAll: mergeAll,
    allLessons: allLessons,
    allScenarios: allScenarios,
    allPassages: allPassages
  };
}());

if (typeof window !== 'undefined') {
  window.DATA_MERGE = DATA_MERGE;
  window.allLessons = DATA_MERGE.allLessons;
  window.allScenarios = DATA_MERGE.allScenarios;
  window.allPassages = DATA_MERGE.allPassages;
}
if (typeof global !== 'undefined') {
  global.DATA_MERGE = DATA_MERGE;
  global.allLessons = DATA_MERGE.allLessons;
  global.allScenarios = DATA_MERGE.allScenarios;
  global.allPassages = DATA_MERGE.allPassages;
}

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

if (typeof window !== 'undefined') { window.UI = UI; }
if (typeof global !== 'undefined') { global.UI = UI; }

/* ══════════════════════════════════════════════════════════════════════
   VIEWS namespace (populated by views-*.js)
   ════════════════════════════════════════════════════════════════════*/
var VIEWS = {};

if (typeof window !== 'undefined') { window.VIEWS = VIEWS; }
if (typeof global !== 'undefined') { global.VIEWS = VIEWS; }


/* ══════════════════════════════════════════════════════════════════════
   ROUTER + NAV
   ════════════════════════════════════════════════════════════════════*/
var NAV_SECTIONS = [
  {
    title: 'TODAY',
    items: [
      {route:'home',          label:'Home',          icon:'🏠'},
      {route:'daily',         label:'Daily',         icon:'☀️'},
      {route:'coach',         label:'Nova',          icon:'🤖'}
    ]
  },
  {
    title: 'LEARN',
    items: [
      {route:'path',          label:'Path',          icon:'📖'},
      {route:'foundations',   label:'Foundations',   icon:'🔡'},
      {route:'atlas',         label:'Atlas',         icon:'📐'},
      {route:'read',          label:'Read',          icon:'📚'},
      {route:'listening',     label:'Listen',        icon:'👂'},
      {route:'docstudio',     label:'Doc Studio',    icon:'📄'}
    ]
  },
  {
    title: 'PRACTISE',
    items: [
      {route:'pronunciation', label:'Pronunciation', icon:'🗣️'},
      {route:'accent',        label:'Accent Studio', icon:'🇮🇳'},
      {route:'spelling',      label:'Spelling',      icon:'🔤'},
      {route:'phrases',       label:'Phrases',       icon:'💬'},
      {route:'idioms',        label:'Idioms',        icon:'📜'},
      {route:'clarity',       label:'Clarity',       icon:'🎯'},
      {route:'doctor',        label:'Doctor',        icon:'🩺'},
      {route:'scenarios',     label:'Scenarios',     icon:'🎭'}
    ]
  },
  {
    title: 'PROGRESS',
    items: [
      {route:'trainer',       label:'Trainer',       icon:'📊'},
      {route:'review',        label:'Review',        icon:'🔁'},
      {route:'assessment',    label:'Assessment',    icon:'🏆'},
      {route:'wordbank',      label:'Wordbank',      icon:'📖'},
      {route:'quiz',          label:'Level Test',    icon:'🎓'}
    ]
  },
  {
    title: 'TOOLS',
    items: [
      {route:'resume',        label:'Resume',        icon:'📝'},
      {route:'settings',      label:'Settings',      icon:'⚙️'}
    ]
  }
];

var NAVITEMS = [];
for (var _s = 0; _s < NAV_SECTIONS.length; _s++) {
  for (var _it = 0; _it < NAV_SECTIONS[_s].items.length; _it++) {
    NAVITEMS.push(NAV_SECTIONS[_s].items[_it]);
  }
}

(function () {
  'use strict';

  var viewEl = document.getElementById('view');
  var navEl = document.getElementById('nav');
  var sidebarEl = document.getElementById('sidebar');
  /* FIX-3: guard so data-say delegation is bound exactly once, not per _route() call */
  var _saySbound = false;

  function _buildNav() {
    if (!navEl) { return; }
    var html = '';
    for (var s = 0; s < NAV_SECTIONS.length; s++) {
      var sec = NAV_SECTIONS[s];
      html += '<div class="nav-section">';
      html += '<div class="nav-section-label">' + sec.title + '</div>';
      html += '<div class="nav-section-body">';
      for (var i = 0; i < sec.items.length; i++) {
        var item = sec.items[i];
        html += '<a class="nav-item" href="#/' + item.route + '" data-route="' + item.route + '" id="nav-' + item.route + '">';
        html += '<span class="nav-icon">' + item.icon + '</span>';
        html += '<span class="nav-label">' + item.label + '</span>';
        html += '</a>';
      }
      html += '</div></div>';
    }
    navEl.innerHTML = html;
    updateReviewBadge();
  }

  function updateReviewBadge() {
    var targets = [
      document.getElementById('nav-review'),
      document.getElementById('mob-nav-review')
    ];
    var srs = (typeof STORE !== 'undefined' && STORE.get) ? (STORE.get('srs') || {}) : {};
    var now = Date.now();
    var count = 0;
    for (var k in srs) {
      if (srs.hasOwnProperty(k) && srs[k] && srs[k].due && srs[k].due <= now) {
        count++;
      }
    }
    for (var t = 0; t < targets.length; t++) {
      var navItem = targets[t];
      if (!navItem) { continue; }
      var existing = navItem.querySelector ? navItem.querySelector('.nav-badge') : null;
      if (existing && navItem.removeChild) { navItem.removeChild(existing); }
      if (count > 0 && document.createElement) {
        var badge = document.createElement('span');
        badge.className = 'nav-badge';
        badge.textContent = count;
        if (navItem.appendChild) { navItem.appendChild(badge); }
      }
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
    var mobSlots = document.querySelectorAll ? document.querySelectorAll('.mob-slot') : [];
    for (var m = 0; m < mobSlots.length; m++) {
      mobSlots[m].classList.remove('active');
      if (mobSlots[m].getAttribute('data-route') === route) {
        mobSlots[m].classList.add('active');
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

  function _initMobileBar() {
    var moreBtn = document.getElementById('mob-more-btn');
    var sheet = document.getElementById('nav-more-sheet');
    var backdrop = document.getElementById('sheet-backdrop');
    var closeBtn = document.getElementById('sheet-close-btn');
    var sheetContent = document.getElementById('sheet-content');

    if (sheetContent && !sheetContent.hasChildNodes()) {
      var sHtml = '';
      for (var s = 0; s < NAV_SECTIONS.length; s++) {
        var sec = NAV_SECTIONS[s];
        sHtml += '<div class="sheet-section">';
        sHtml += '<div class="sheet-sec-label">' + sec.title + '</div>';
        sHtml += '<div class="sheet-grid">';
        for (var i = 0; i < sec.items.length; i++) {
          var it = sec.items[i];
          sHtml += '<a class="sheet-item" href="#/' + it.route + '">';
          sHtml += '<span>' + it.icon + '</span>';
          sHtml += '<span>' + it.label + '</span>';
          sHtml += '</a>';
        }
        sHtml += '</div></div>';
      }
      sheetContent.innerHTML = sHtml;
    }

    function closeSheet() {
      if (sheet && sheet.classList) {
        sheet.classList.remove('open');
      }
    }

    function openSheet() {
      if (sheet && sheet.classList) {
        sheet.classList.add('open');
      }
    }

    if (moreBtn && !moreBtn._bound) {
      moreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openSheet();
      });
      moreBtn._bound = true;
    }
    if (backdrop && !backdrop._bound) {
      backdrop.addEventListener('click', closeSheet);
      backdrop._bound = true;
    }
    if (closeBtn && !closeBtn._bound) {
      closeBtn.addEventListener('click', closeSheet);
      closeBtn._bound = true;
    }
    if (sheetContent && !sheetContent._bound) {
      sheetContent.addEventListener('click', function (e) {
        var a = e.target.closest ? e.target.closest('a') : null;
        if (a) { closeSheet(); }
      });
      sheetContent._bound = true;
    }
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
    // Scroll to top
    if (viewEl.scrollTop !== undefined) { viewEl.scrollTop = 0; }

    // Smooth transition
    if (viewEl.classList && viewEl.classList.add) {
      viewEl.classList.add('view-entering');
      if (viewEl.offsetWidth !== undefined) { void viewEl.offsetWidth; }
      viewEl.classList.remove('view-entering');
    }

    updateReviewBadge();
    updateFlowChip();
  }

  function updateFlowChip() {
    var chip = document.getElementById('flow-chip');
    if (!chip || typeof FLOW === 'undefined' || !FLOW.get) { return; }
    var flow = FLOW.get();
    var cur = FLOW.current();
    var doneCount = 0;
    for (var i = 0; i < flow.steps.length; i++) {
      if (flow.steps[i]) { doneCount++; }
    }
    if (doneCount === 5) {
      chip.className = 'flow-chip all-done';
      chip.innerHTML = '<span class="chip-spark">🌟</span><span class="chip-text">Flow 5/5</span><span class="chip-next"> · All Done! 🎉</span><span class="chip-arrow">✓</span>';
    } else {
      chip.className = 'flow-chip';
      chip.innerHTML = '<span class="chip-spark">⚡</span><span class="chip-text">Flow ' + doneCount + '/5</span><span class="chip-next"> · Next: ' + (cur.label || 'Diagnose') + '</span><span class="chip-arrow">▸</span>';
    }
  }

  window.addEventListener('hashchange', _route);
  window.addEventListener('load', function () {
    _buildNav();
    _initMobileBar();
    /* FIX-3: bind data-say delegation once on viewEl, not inside _route() */
    if (viewEl && !_saySbound) {
      viewEl.addEventListener('click', function (e) {
        var t = e.target;
        if (t && t.getAttribute && t.getAttribute('data-say')) {
          SPEECH.speakSlow(t.getAttribute('data-say'));
        }
      });
      _saySbound = true;
    }
    _route();
    updateFlowChip();
    if (typeof REMINDERS !== 'undefined') {
      REMINDERS.schedule();
    }
  });

  /* Expose globally */
  window.NAV_SECTIONS = NAV_SECTIONS;
  window.NAVITEMS = NAVITEMS;
  window.navigate = navigate;
  window.updateReviewBadge = updateReviewBadge;
  window.updateFlowChip = updateFlowChip;
  window.FLOW = FLOW;
  window.LIVE_COACH = LIVE_COACH;
  window.LLM_PROVIDERS = LLM_PROVIDERS;
  window.llmAsk = llmAsk;
  window.REMINDERS = REMINDERS;
  window.WEEKLY = WEEKLY;
  window.DATA_MERGE = DATA_MERGE;
  window.allLessons = DATA_MERGE.allLessons;
  window.allScenarios = DATA_MERGE.allScenarios;
  window.allPassages = DATA_MERGE.allPassages;
  window.isHonest = STORE.isHonest;
  window.computeHonestScore = STORE.computeHonestScore;

  if (typeof global !== 'undefined') {
    global.updateFlowChip = updateFlowChip;
    global.updateReviewBadge = updateReviewBadge;
    global.FLOW = FLOW;
    global.LIVE_COACH = LIVE_COACH;
    global.LLM_PROVIDERS = LLM_PROVIDERS;
    global.llmAsk = llmAsk;
    global.REMINDERS = REMINDERS;
    global.WEEKLY = WEEKLY;
    global.DATA_MERGE = DATA_MERGE;
    global.allLessons = DATA_MERGE.allLessons;
    global.allScenarios = DATA_MERGE.allScenarios;
    global.allPassages = DATA_MERGE.allPassages;
    global.isHonest = STORE.isHonest;
    global.computeHonestScore = STORE.computeHonestScore;
  }

}());
