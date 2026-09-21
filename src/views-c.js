/* =====================================================================
   views-c.js — ES5 ONLY
   VIEWS.coach, VIEWS.quiz, VIEWS.wordbank, VIEWS.settings, VIEWS.onboarding
   ===================================================================== */

/* ── NOVA COACH ─────────────────────────────────────────────────────────────── */
VIEWS.coach = {
  _history: null, /* loaded lazily from STORE */
  _mode: 'chat',  /* chat | interview | document */
  _interviewQ: 0,
  _activeDoc: null, /* {title, text} when in document mode */

  _getHistory: function () {
    if (!this._history) {
      this._history = STORE.get('novaHistory') || [];
    }
    return this._history;
  },

  _saveHistory: function () {
    var h = this._getHistory();
    /* Cap at 50 turns */
    if (h.length > 50) { h = h.slice(h.length - 50); }
    this._history = h;
    STORE.set('novaHistory', h);
  },

  _clearHistory: function () {
    this._history = [];
    STORE.set('novaHistory', []);
  },

  render: function (el) {
    'use strict';
    var self = this;
    var settings = STORE.get('settings') || {};
    var hasKey = !!(settings.geminiKey && settings.geminiKey.trim().length > 10);
    var history = self._getHistory();

    /* Active document from Doc Studio */
    var docs = STORE.get('docs') || [];
    var activeDoc = null;
    for (var di = 0; di < docs.length; di++) {
      if (docs[di].active) { activeDoc = docs[di]; break; }
    }
    self._activeDoc = activeDoc;

    var docBanner = '';
    if (activeDoc) {
      docBanner = '<div class="nova-doc-banner">'
        + '<span class="doc-banner-icon">📄</span>'
        + '<span class="doc-banner-title">Reading: <strong>' + _esc(activeDoc.title) + '</strong></span>'
        + '<button class="doc-banner-clear" id="nova-clear-doc">× Clear</button>'
        + '</div>';
    }

    var modeDocBtn = activeDoc
      ? '<button class="tab-btn' + (self._mode === 'document' ? ' active' : '') + '" id="mode-document">📄 Doc Agent</button>'
      : '';

    var html = '<div class="view-coach">' +
      '<div class="nova-header">' +
      '<h1>🤖 Nova — AI Coach</h1>' +
      '<button class="btn-ghost btn-sm" id="nova-clear-history" title="Clear conversation">Clear chat</button>' +
      '</div>' +
      '<p class="sub">' + (hasKey
        ? '✅ Gemini connected — real AI active.'
        : '⚠️ No key — rule engine only. Add your free Gemini key in <a href="#/settings">Settings</a>.'
      ) + '</p>' +
      docBanner +
      '<div class="coach-modes">' +
      '<button class="tab-btn' + (self._mode === 'chat' ? ' active' : '') + '" id="mode-chat">💬 Chat</button>' +
      '<button class="tab-btn' + (self._mode === 'interview' ? ' active' : '') + '" id="mode-interview">🎤 Mock Interview</button>' +
      modeDocBtn +
      '</div>' +
      '<div class="chat-window" id="chat-window">';

    if (history.length === 0) {
      html += '<div class="bubble nova"><div class="bubble-label">Nova</div>'
        + '<div class="bubble-text">Hi! I\'m Nova, your English coach. I remember our conversations, so we can pick up right where we left off. Ask me to check grammar, explain vocabulary, or chat naturally. What would you like to work on?</div></div>';
    } else {
      for (var i = 0; i < history.length; i++) {
        var msg = history[i];
        var cls = msg.role === 'user' ? 'user' : 'nova';
        html += '<div class="bubble ' + cls + '"><div class="bubble-label">' + (msg.role === 'user' ? 'You' : 'Nova') + '</div><div class="bubble-text">' + msg.text + '</div></div>';
      }
    }
    html += '</div>'; /* chat-window */

    if (self._mode === 'interview') {
      var q = COACH_INTERVIEW[self._interviewQ % COACH_INTERVIEW.length];
      html += '<div class="interview-q"><span class="q-num">Q' + (self._interviewQ + 1) + '</span> ' + q + '</div>';
    }
    if (self._mode === 'document' && activeDoc) {
      html += '<div class="doc-hint">💡 Ask: "What does X mean here?", "Summarize this section", or "Check my understanding: …"</div>';
    }

    html += '<div class="chat-input-row">';
    if (SPEECH.canListen()) {
      html += '<button class="btn-mic" id="nova-mic">🎤</button>';
    }
    html += '<input type="text" id="nova-input" placeholder="' +
      (self._mode === 'document' ? 'Ask Nova about this document…' : 'Type or speak to Nova…') +
      '" />';
    html += '<button class="btn-primary" id="nova-send">Send</button>';
    html += '</div></div>';

    el.innerHTML = html;

    /* Scroll chat to bottom */
    var chatWin = document.getElementById('chat-window');
    if (chatWin) { chatWin.scrollTop = chatWin.scrollHeight; }

    /* Mode tabs */
    document.getElementById('mode-chat').addEventListener('click', function () {
      self._mode = 'chat'; self.render(el);
    });
    document.getElementById('mode-interview').addEventListener('click', function () {
      self._mode = 'interview'; self._interviewQ = 0; self.render(el);
    });
    var docModeBtn = document.getElementById('mode-document');
    if (docModeBtn) {
      docModeBtn.addEventListener('click', function () {
        self._mode = 'document'; self.render(el);
      });
    }

    /* Clear doc */
    var clearDocBtn = document.getElementById('nova-clear-doc');
    if (clearDocBtn) {
      clearDocBtn.addEventListener('click', function () {
        var docs2 = STORE.get('docs') || [];
        for (var di2 = 0; di2 < docs2.length; di2++) { docs2[di2].active = false; }
        STORE.set('docs', docs2);
        self._mode = 'chat';
        self.render(el);
      });
    }

    /* Clear history */
    document.getElementById('nova-clear-history').addEventListener('click', function () {
      self._clearHistory();
      self.render(el);
    });

    /* Mic */
    var micBtn = document.getElementById('nova-mic');
    if (micBtn) {
      micBtn.addEventListener('click', function () {
        micBtn.textContent = '🔴';
        micBtn.disabled = true;
        SPEECH.listen({
          onresult: function (t) {
            document.getElementById('nova-input').value = t;
            micBtn.textContent = '🎤';
            micBtn.disabled = false;
          },
          onend: function () { micBtn.textContent = '🎤'; micBtn.disabled = false; },
          onerror: function (m) { UI.toast(m, 'error'); micBtn.textContent = '🎤'; micBtn.disabled = false; }
        });
      });
    }

    /* Word lookup on double-click */
    if (chatWin) {
      chatWin.addEventListener('dblclick', function (e) {
        var sel = window.getSelection ? window.getSelection().toString().trim() : '';
        if (!sel || sel.indexOf(' ') !== -1) { return; } /* single word only */
        var word = sel.toLowerCase().replace(/[^a-z]/g, '');
        if (!word) { return; }
        /* Look up in WORDS data */
        var found = null;
        if (typeof WORDS !== 'undefined') {
          for (var wi = 0; wi < WORDS.length; wi++) {
            if (WORDS[wi].w && WORDS[wi].w.toLowerCase() === word) { found = WORDS[wi]; break; }
          }
        }
        var popup = document.createElement('div');
        popup.className = 'word-popup';
        if (found) {
          popup.innerHTML = '<strong>' + _esc(found.w) + '</strong> <span class="ipa">' + (found.ipa || '') + '</span><br><span class="word-def">' + _esc(found.def || found.pos || '') + '</span>'
            + '<button class="word-popup-say" onclick="SPEECH.speak(\'' + _esc(found.w) + '\')">🔊</button>'
            + '<button class="word-popup-close">×</button>';
        } else {
          popup.innerHTML = '<strong>' + _esc(sel) + '</strong><br><span class="word-def">Not in word bank — ask Nova!</span>'
            + '<button class="word-popup-close">×</button>';
        }
        popup.style.cssText = 'position:fixed;bottom:140px;left:50%;transform:translateX(-50%);background:#1e2a3a;border:1px solid rgba(124,58,237,0.5);border-radius:12px;padding:14px 18px;z-index:500;font-size:0.9rem;min-width:220px;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
        document.body.appendChild(popup);
        var closeBtn = popup.querySelector('.word-popup-close');
        if (closeBtn) { closeBtn.addEventListener('click', function () { document.body.removeChild(popup); }); }
        setTimeout(function () { if (popup.parentNode) { popup.parentNode.removeChild(popup); } }, 5000);
      });
    }

    function _send() {
      var input = document.getElementById('nova-input');
      var text = input.value.trim();
      if (!text) { return; }
      input.value = '';
      var h = self._getHistory();
      h.push({role: 'user', text: _esc(text)});
      self._saveHistory();
      _novaRespond(text, self, el);
    }

    document.getElementById('nova-send').addEventListener('click', _send);
    document.getElementById('nova-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { _send(); }
    });
  }
};

function _esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function _novaRespond(userText, self, el) {
  var settings = STORE.get('settings') || {};
  var key = settings.geminiKey || '';

  if (key && key.trim().length > 10) {
    _novaGemini(userText, self, el, key.trim());
  } else {
    var reply = _novaRules(userText);
    var h = self._getHistory();
    h.push({role: 'nova', text: _esc(reply)});
    self._saveHistory();
    STORE.get('coachStats').messages = (STORE.get('coachStats').messages || 0) + 1;
    STORE.save();
    TRAINER.log({skill: 'fluency', delta: 1, source: 'coach/chat'});
    SPEECH.speak(reply);
    self.render(el);
  }
}

function _novaRules(text) {
  var t = text.toLowerCase();

  /* Grammar rule checks */
  for (var ri = 0; ri < COACH_RULES.length; ri++) {
    if (COACH_RULES[ri].pat.test(text)) {
      return '⚠️ Grammar note: ' + COACH_RULES[ri].fix;
    }
  }

  /* Vocabulary upgrade */
  for (var ui = 0; ui < COACH_UPGRADES.length; ui++) {
    var up = COACH_UPGRADES[ui];
    if (t.indexOf(up.basic.toLowerCase()) !== -1) {
      return '💡 Upgrade: Instead of "' + up.basic + '" try "' + up.better + '" (B1) or "' + up.adv + '" (C1).';
    }
  }

  /* Intent matching */
  for (var ii = 0; ii < COACH_INTENTS.length; ii++) {
    var intent = COACH_INTENTS[ii];
    var keys = intent.k.split('|');
    for (var ki = 0; ki < keys.length; ki++) {
      if (t.indexOf(keys[ki].trim()) !== -1) {
        return intent.r;
      }
    }
  }

  return 'Good effort! Keep practising. For real AI feedback on grammar, pronunciation, and more — add your free Gemini key in Settings. Double-click any word in my replies to look it up instantly.';
}

function _novaBuildSystemPrompt(self) {
  'use strict';
  var user = STORE.get('user') || {};
  var settings = STORE.get('settings') || {};
  var radar = (typeof TRAINER !== 'undefined' && TRAINER.radar) ? TRAINER.radar() : [];

  /* Find weakest skill */
  var weakSkill = 'fluency';
  var weakScore = 100;
  for (var ri = 0; ri < radar.length; ri++) {
    if (radar[ri].val < weakScore) { weakScore = radar[ri].val; weakSkill = radar[ri].skill; }
  }

  var name = user.name ? user.name : 'the learner';
  var level = user.level || 'A2';
  var mode = self._mode || 'chat';

  var base = 'You are Nova, an expert English speaking coach specialising in helping Indian learners.' +
    ' The student\'s name is ' + name + ' and their current CEFR level is ' + level + '.' +
    ' Their weakest skill right now is ' + weakSkill + ' — prioritise that in your coaching.' +
    ' Mode: ' + mode + '.' +
    ' Rules: correct grammar gently by quoting the error then giving the fix; suggest vocabulary upgrades when appropriate;' +
    ' be warm, direct, and concise (2–4 sentences unless asked for more).' +
    ' Never say you are an AI. You are Nova.';

  /* Document context */
  if (mode === 'document' && self._activeDoc) {
    var excerpt = self._activeDoc.text ? self._activeDoc.text.slice(0, 1200) : '';
    base += ' The student is currently reading a document titled "' + self._activeDoc.title + '".' +
      ' Here is an excerpt for context:\n---\n' + excerpt + '\n---' +
      ' When the student asks about a word or phrase, quote the surrounding sentence from the excerpt before explaining.' +
      ' When asked to summarise, produce a 3-bullet summary of the excerpt.';
  }

  return base;
}

function _novaGemini(userText, self, el, key) {
  var hist = self._getHistory().slice(-12); /* last 12 turns for context */
  var messages = [];
  for (var i = 0; i < hist.length - 1; i++) { /* exclude the just-pushed user message */
    messages.push({
      role: hist[i].role === 'user' ? 'user' : 'model',
      parts: [{text: hist[i].text}]
    });
  }

  var systemPrompt = _novaBuildSystemPrompt(self);

  var body = {
    system_instruction: {parts: [{text: systemPrompt}]},
    contents: messages.concat([{role: 'user', parts: [{text: userText}]}])
  };

  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key;

  /* Show typing indicator */
  var h = self._getHistory();
  h.push({role: 'nova', text: '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>'});
  self.render(el);
  /* Remove the typing indicator entry (it will be replaced by real reply) */
  h.pop();

  if (typeof fetch === 'function') {
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then(function (res) {
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      return res.json();
    }).then(function (resp) {
      var reply = '';
      try { reply = resp.candidates[0].content.parts[0].text; }
      catch (e) { reply = 'Nova had trouble reading the response. ' + _novaRules(userText); }
      h.push({role: 'nova', text: _esc(reply)});
      self._saveHistory();
      TRAINER.log({skill: 'fluency', delta: 1, source: 'coach/gemini'});
      STORE.save();
      SPEECH.speak(reply);
      self.render(el);
    }).catch(function () {
      var reply = _novaRules(userText) + ' (offline — no connection)';
      h.push({role: 'nova', text: _esc(reply)});
      self._saveHistory();
      self.render(el);
    });
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    var reply = '';
    try {
      var resp = JSON.parse(xhr.responseText);
      reply = resp.candidates[0].content.parts[0].text;
    } catch (e) {
      reply = 'Nova had trouble connecting. ' + _novaRules(userText);
    }
    h.push({role: 'nova', text: _esc(reply)});
    self._saveHistory();
    TRAINER.log({skill: 'fluency', delta: 1, source: 'coach/gemini'});
    STORE.save();
    SPEECH.speak(reply);
    self.render(el);
  };
  xhr.onerror = function () {
    var reply = _novaRules(userText) + ' (offline fallback)';
    h.push({role: 'nova', text: _esc(reply)});
    self._saveHistory();
    self.render(el);
  };
  xhr.send(JSON.stringify(body));
}

VIEWS.coach.respond = function (userText, el) {
  _novaRespond(userText, VIEWS.coach, el || { innerHTML: '', scrollTop: 0 });
};
VIEWS.coach._novaGemini = _novaGemini;
VIEWS.coach._novaRules = _novaRules;

/* ── LEVEL TEST (QUIZ) ─────────────────────────────────────────────── */
VIEWS.quiz = {
  _questions: [],
  _idx: 0,
  _answers: [],
  render: function (el, arg) {
    'use strict';
    var self = this;

    if (arg === 'result') {
      _renderQuizResult(el, self._answers, self._questions);
      return;
    }

    if (self._idx === 0 || arg === 'start') {
      // Shuffle and pick 15
      var pool = QUIZ_BANK.slice();
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      self._questions = pool.slice(0, 15);
      self._idx = 0;
      self._answers = [];
    }

    if (self._idx >= self._questions.length) {
      _renderQuizResult(el, self._answers, self._questions);
      return;
    }

    var q = self._questions[self._idx];
    var optsHtml = '';
    for (var oi = 0; oi < q.opts.length; oi++) {
      optsHtml += '<button class="opt-btn" id="quiz-opt-' + oi + '">' + q.opts[oi] + '</button>';
    }

    el.innerHTML = '<div class="view-quiz">' +
      '<h1>🎓 Level Test</h1>' +
      '<div class="quiz-progress">Question ' + (self._idx + 1) + ' / ' + self._questions.length + '</div>' +
      '<div class="quiz-skill">Skill: ' + q.skill + '</div>' +
      '<div class="quiz-q"><p>' + q.q + '</p></div>' +
      '<div class="quiz-opts">' + optsHtml + '</div>' +
      '<div id="quiz-fb"></div>' +
      '</div>';

    for (var oi2 = 0; oi2 < q.opts.length; oi2++) {
      (function (idx) {
        var btn = document.getElementById('quiz-opt-' + idx);
        if (!btn) { return; }
        btn.addEventListener('click', function () {
          var fb = document.getElementById('quiz-fb');
          var correct = idx === q.ans;
          self._answers.push({q: q, chosen: idx, correct: correct});
          if (correct) {
            fb.innerHTML = '<p class="verdict pass">✅ Correct!</p>';
            TRAINER.log({skill: q.skill, delta: 2, source: 'quiz/correct'});
            STORE.addXP(5);
          } else {
            fb.innerHTML = '<p class="verdict fail">❌ Correct answer: ' + q.opts[q.ans] + '</p>';
            TRAINER.log({skill: q.skill, delta: -1, source: 'quiz/wrong'});
          }
          // Disable all opts
          for (var k = 0; k < q.opts.length; k++) {
            var b = document.getElementById('quiz-opt-' + k);
            if (b) { b.disabled = true; }
          }
          setTimeout(function () {
            self._idx++;
            self.render(el);
          }, 1200);
        });
      }(oi2));
    }
  }
};

function _renderQuizResult(el, answers, questions) {
  var correct = 0;
  var skillScores = {};
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].correct) { correct++; }
    var sk = answers[i].q.skill;
    skillScores[sk] = skillScores[sk] || {ok: 0, total: 0};
    skillScores[sk].total++;
    if (answers[i].correct) { skillScores[sk].ok++; }
  }
  var pct = Math.round((correct / questions.length) * 100);
  var cefr = pct >= 90 ? 'C1' : pct >= 75 ? 'B2' : pct >= 55 ? 'B1' : pct >= 35 ? 'A2' : 'A1';

  var skillRows = '';
  for (var sk in skillScores) {
    if (skillScores.hasOwnProperty(sk)) {
      var s = skillScores[sk];
      var bar = Math.round((s.ok / s.total) * 100);
      skillRows += '<div class="skill-row"><span class="skill-name">' + sk + '</span><div class="skill-bar"><div class="skill-fill" style="width:' + bar + '%"></div></div><span class="skill-pct">' + bar + '%</span></div>';
    }
  }

  el.innerHTML = '<div class="view-quiz-result">' +
    '<h1>🎓 Level Test Results</h1>' +
    '<div class="cefr-badge">' + cefr + '</div>' +
    '<p><strong>' + correct + ' / ' + questions.length + '</strong> correct (' + pct + '%)</p>' +
    '<div class="skill-breakdown">' + skillRows + '</div>' +
    '<div class="result-btns">' +
    '<button onclick="VIEWS.quiz._idx=0; VIEWS.quiz.render(document.getElementById(\'view\'), \'start\')" class="btn-primary">Retake Test</button>' +
    '<a href="#/trainer" class="btn-link">View My Trainer →</a>' +
    '</div></div>';

  var user = STORE.get('user') || {};
  user.level = cefr;
  STORE.set('user', user);
  STORE.addXP(20);
  UI.toast('Level Test complete! You are ' + cefr + '. +20 XP', 'success');
}

/* ── WORD BANK ─────────────────────────────────────────────────────── */
VIEWS.wordbank = {
  _search: '',
  render: function (el) {
    'use strict';
    var self = this;
    var query = self._search.toLowerCase();
    var filtered = query
      ? WORDS.filter(function (w) { return w.w.indexOf(query) !== -1; })
      : WORDS;

    var rows = '';
    for (var i = 0; i < filtered.length; i++) {
      var w = filtered[i];
      var m = STORE.getMastery('spell_' + w.w);
      rows += '<tr>' +
        '<td class="wb-word" data-say="' + w.w + '">' + w.w + '</td>' +
        '<td class="wb-ipa">' + w.ipa + '</td>' +
        '<td class="wb-lvl"><span class="level-badge ' + w.lvl + '">' + w.lvl + '</span></td>' +
        '<td class="wb-mastery">' + _masteryDots(m) + '</td>' +
        '<td><button class="btn-sm" data-say="' + w.w + '">🔊</button></td>' +
        '</tr>';
    }

    el.innerHTML = '<div class="view-wordbank">' +
      '<h1>📖 Word Bank</h1>' +
      '<div class="wb-search-row">' +
      '<input type="search" id="wb-search" value="' + self._search + '" placeholder="Search words..." />' +
      '<span class="wb-count">' + filtered.length + ' words</span>' +
      '</div>' +
      '<table class="wb-table"><thead><tr><th>Word</th><th>IPA</th><th>Level</th><th>Mastery</th><th>Listen</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table>' +
      '</div>';

    document.getElementById('wb-search').addEventListener('input', function () {
      self._search = this.value;
      self.render(el);
    });
  }
};

/* ── SETTINGS ─────────────────────────────────────────────────────── */
VIEWS.settings = {
  render: function (el) {
    'use strict';
    var settings = STORE.get('settings') || {};
    var voices = SPEECH.getVoices();
    var voiceOpts = '<option value="">Default</option>';
    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      voiceOpts += '<option value="' + _esc(v.name) + '"' + (settings.voice === v.name ? ' selected' : '') + '>' + _esc(v.name) + ' (' + v.lang + ')</option>';
    }

    el.innerHTML = '<div class="view-settings">' +
      '<h1>⚙️ Settings</h1>' +

      '<div class="setting-group">' +
      '<label>Speech Voice</label>' +
      '<select id="s-voice">' + voiceOpts + '</select>' +
      '</div>' +

      '<div class="setting-group">' +
      '<label>Speech Rate: <span id="rate-val">' + (settings.rate || 1.0) + 'x</span></label>' +
      '<input type="range" id="s-rate" min="0.5" max="2" step="0.1" value="' + (settings.rate || 1.0) + '" />' +
      '</div>' +

      '<div class="setting-group">' +
      '<label>Daily Goal (minutes)</label>' +
      '<input type="number" id="s-goal" min="5" max="120" value="' + (settings.dailyGoal || 10) + '" />' +
      '</div>' +

      '<div class="setting-group">' +
      '<label>Gemini API Key <small>(<a href="https://aistudio.google.com" target="_blank" rel="noopener">Get free key ↗</a>)</small></label>' +
      '<input type="password" id="s-gemini" value="' + _esc(settings.geminiKey || '') + '" placeholder="Paste your Gemini API key here..." />' +
      '<p class="setting-hint">Your key never leaves your device. It\'s only used for Nova\'s AI chat (INV-8).</p>' +
      '</div>' +

      '<button class="btn-primary" id="s-save">💾 Save Settings</button>' +

      '<div class="setting-group danger-zone">' +
      '<h3>🗑️ Danger Zone</h3>' +
      '<button class="btn-danger" id="s-reset">Reset All Progress</button>' +
      '<button class="btn-secondary" id="s-export">📤 Export Data (JSON)</button>' +
      '</div></div>';

    document.getElementById('s-rate').addEventListener('input', function () {
      document.getElementById('rate-val').textContent = this.value + 'x';
    });

    document.getElementById('s-save').addEventListener('click', function () {
      var voice = document.getElementById('s-voice').value;
      var rate = parseFloat(document.getElementById('s-rate').value);
      var goal = parseInt(document.getElementById('s-goal').value, 10);
      var geminiKey = document.getElementById('s-gemini').value.trim();
      STORE.set('settings', {voice: voice, rate: rate, dailyGoal: goal, geminiKey: geminiKey});
      SPEECH.setRate(rate);
      if (voice) { SPEECH.setVoiceByName(voice); }
      UI.toast('Settings saved!', 'success');
    });

    document.getElementById('s-reset').addEventListener('click', function () {
      if (confirm('This will erase ALL your progress. Are you sure?')) {
        STORE.resetAll();
        navigate('onboarding');
      }
    });

    document.getElementById('s-export').addEventListener('click', function () {
      var blob = new Blob([STORE.exportJSON()], {type: 'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'engspell-backup.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
};

/* ── ONBOARDING ─────────────────────────────────────────────────────── */
VIEWS.onboarding = {
  _step: 0,
  _answers: {},
  render: function (el) {
    'use strict';
    var self = this;
    var step = self._step;

    var steps = [
      {
        q: 'What\'s your name?',
        type: 'text',
        key: 'name',
        placeholder: 'Enter your first name',
        hint: 'We\'ll personalise your experience.'
      },
      {
        q: 'What\'s your main goal?',
        type: 'opts',
        key: 'goal',
        opts: ['Speak confidently at work', 'Ace job interviews', 'Study abroad preparation', 'Improve grammar & accent', 'Daily conversation fluency']
      },
      {
        q: 'Which best describes your English?',
        type: 'opts',
        key: 'placement',
        opts: [
          'I know basic sentences (A2)',
          'I can have simple conversations (B1)',
          'I speak well but want to be more precise (B2)',
          'I am nearly fluent (C1)',
          'I am a complete beginner (A1)'
        ]
      },
      {
        q: 'How many minutes can you practise daily?',
        type: 'opts',
        key: 'dailyGoal',
        opts: ['5 minutes', '10 minutes', '20 minutes', '30 minutes', '60 minutes']
      },
      {
        q: 'Quick check — which sentence is correct?',
        type: 'opts',
        key: 'q1',
        opts: ['She don\'t like tea.', 'She doesn\'t like tea.', 'She not like tea.'],
        correct: 1
      }
    ];

    if (step >= steps.length) {
      // Save and go home
      var cefrMap = {'I know basic sentences (A2)': 'A2', 'I can have simple conversations (B1)': 'B1', 'I speak well but want to be more precise (B2)': 'B2', 'I am nearly fluent (C1)': 'C1', 'I am a complete beginner (A1)': 'A1'};
      var goalStr = self._answers.goal || '';
      var level = cefrMap[self._answers.placement] || 'A2';
      var goalMin = parseInt((self._answers.dailyGoal || '10').replace(/\D/g, ''), 10) || 10;
      STORE.set('user', {name: self._answers.name || 'Learner', goal: goalStr, level: level, placementTag: level});
      STORE.set('settings', {voice: '', rate: 1.0, dailyGoal: goalMin, geminiKey: ''});
      STORE.touchStreak();
      navigate('home');
      return;
    }

    var s = steps[step];
    var content = '';
    if (s.type === 'text') {
      content = '<input type="text" id="ob-input" placeholder="' + (s.placeholder || '') + '" value="' + (self._answers[s.key] || '') + '" />' +
        '<button class="btn-primary" id="ob-next">Continue →</button>';
    } else {
      content = '<div class="ob-opts">';
      for (var oi = 0; oi < s.opts.length; oi++) {
        content += '<button class="ob-opt" id="ob-opt-' + oi + '">' + s.opts[oi] + '</button>';
      }
      content += '</div>';
    }

    el.innerHTML = '<div class="view-onboarding">' +
      '<div class="ob-logo">✨ EngSpell</div>' +
      '<div class="ob-progress"><div class="ob-prog-fill" style="width:' + Math.round((step / steps.length) * 100) + '%"></div></div>' +
      '<h2>' + s.q + '</h2>' +
      (s.hint ? '<p class="ob-hint">' + s.hint + '</p>' : '') +
      content +
      '</div>';

    if (s.type === 'text') {
      document.getElementById('ob-input').focus();
      document.getElementById('ob-next').addEventListener('click', function () {
        var val = document.getElementById('ob-input').value.trim();
        if (!val) { UI.toast('Please enter an answer.', 'error'); return; }
        self._answers[s.key] = val;
        self._step++;
        self.render(el);
      });
      document.getElementById('ob-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { document.getElementById('ob-next').click(); }
      });
    } else {
      for (var oi2 = 0; oi2 < s.opts.length; oi2++) {
        (function (idx) {
          var btn = document.getElementById('ob-opt-' + idx);
          if (!btn) { return; }
          btn.addEventListener('click', function () {
            self._answers[s.key] = s.opts[idx];
            if (s.correct !== undefined) {
              if (idx === s.correct) {
                UI.toast('Correct! Well done.', 'success');
              } else {
                UI.toast('The correct answer was: ' + s.opts[s.correct], 'info');
              }
            }
            self._step++;
            setTimeout(function () { self.render(el); }, s.correct !== undefined ? 800 : 0);
          });
        }(oi2));
      }
    }
  }
};
