/* =====================================================================
   views-c.js — ES5 ONLY
   VIEWS.coach, VIEWS.quiz, VIEWS.wordbank, VIEWS.settings, VIEWS.onboarding
   ===================================================================== */

/* ── NOVA COACH ─────────────────────────────────────────────────────────────── */
VIEWS.coach = {
  _history: null, /* loaded lazily from STORE */
  _mode: 'chat',  /* chat | interview | document | drill */
  _interviewQ: 0,
  _activeDoc: null, /* {title, text} when in document mode */
  _drillIdx: 0,
  _drillRaf: null,
  _inFlightReply: false,

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

  _renderDrill: function (el) {
    var self = this;
    var targets = (typeof TWISTERS !== 'undefined' && TWISTERS.length > 0)
      ? TWISTERS
      : ["She sells seashells on the seashore.", "Peter Piper picked a peck of pickled peppers.", "How much wood would a woodchuck chuck?"];
    self._drillIdx = self._drillIdx || 0;
    var target = targets[self._drillIdx % targets.length];

    var html = '<div class="view-coach">'
      + '<div class="nova-header">'
      + '<h1>🎙️ Live Coach — Live Drill</h1>'
      + '<button class="btn-ghost btn-sm" id="drill-back-chat">💬 Back to Chat</button>'
      + '</div>'
      + '<div class="coach-modes">'
      + '<button class="tab-btn" id="mode-chat">💬 Chat</button>'
      + '<button class="tab-btn" id="mode-interview">🎤 Mock Interview</button>'
      + '<button class="tab-btn active" id="mode-drill">🎙️ Live Drill</button>'
      + '</div>'
      + '<div class="live-drill-container" style="padding:16px 0;">'
      + '<div style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-md);padding:18px;margin-bottom:16px;">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">'
      + '<span style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--acc2);font-weight:700;">Target Sentence</span>'
      + '<span class="live-drill-caption" style="font-size:0.75rem;color:var(--mut);">word-level live matching via browser speech recognition</span>'
      + '</div>'
      + '<div id="live-target-sentence" style="font-size:1.25rem;font-weight:600;margin-bottom:14px;color:var(--txt);line-height:1.4;">' + _esc(target) + '</div>'
      + '<div id="live-chips-area" style="margin-bottom:8px;">' + LIVE_COACH.renderChipHTML(target, '') + '</div>'
      + '</div>'
      + '<div id="live-prompt-banner" style="display:none;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.35);border-radius:var(--r-md);padding:14px;margin-bottom:16px;"></div>'
      + '<div id="live-paused-banner" style="display:none;margin-bottom:16px;"><button class="btn-warn" id="live-resume-btn" style="width:100%;padding:10px;">⚠️ Paused — tap to resume</button></div>'
      + '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px;">'
      + '<button class="btn-primary" id="live-mic-btn" style="font-size:1rem;padding:10px 18px;">🎙️ Start Speaking</button>'
      + '<button class="btn-ghost btn-sm" id="live-listen-slow">🐢 Listen Slowly</button>'
      + '<button class="btn-ghost btn-sm" id="live-target-next">🎲 Next Drill</button>'
      + '</div>'
      + '<div style="display:flex;gap:8px;margin-bottom:16px;">'
      + '<input type="text" id="live-typed-input" placeholder="Speech not working? Type here to drill..." style="flex:1;" />'
      + '<button class="btn-secondary" id="live-typed-submit">Check Typed</button>'
      + '</div>'
      + '<div id="live-end-card" style="display:none;margin-top:16px;"></div>'
      + '</div>'
      + '</div>';

    el.innerHTML = html;

    var isListening = false;
    var completed = false;
    var interruptCount = 0;
    var startTime = Date.now();
    var lastPartialTs = Date.now();
    var restartTracker = LIVE_COACH.createRestartTracker({ maxFails: 3, baseDelay: 250 });
    var micBtn = document.getElementById('live-mic-btn');

    document.getElementById('drill-back-chat').addEventListener('click', function () {
      if (isListening) { SPEECH.stopListening(); }
      self._mode = 'chat';
      self.render(el);
    });
    document.getElementById('mode-chat').addEventListener('click', function () {
      if (isListening) { SPEECH.stopListening(); }
      self._mode = 'chat';
      self.render(el);
    });
    document.getElementById('mode-interview').addEventListener('click', function () {
      if (isListening) { SPEECH.stopListening(); }
      self._mode = 'interview';
      self._interviewQ = 0;
      self.render(el);
    });
    document.getElementById('live-target-next').addEventListener('click', function () {
      if (isListening) { SPEECH.stopListening(); }
      self._drillIdx = (self._drillIdx || 0) + 1;
      self._renderDrill(el);
    });
    document.getElementById('live-listen-slow').addEventListener('click', function () {
      SPEECH.speakSlow(target);
    });

    function _finishDrill(success) {
      completed = true;
      isListening = false;
      SPEECH.stopListening();
      if (micBtn) { micBtn.textContent = '🎙️ Start Speaking'; }
      var durationSec = Math.max(1, (Date.now() - startTime) / 1000);
      var tokens = (typeof U !== 'undefined' && U.tokenise) ? U.tokenise(target) : [];
      var wordCount = tokens.length;
      var paceWpm = Math.round((wordCount / durationSec) * 60);
      var firstTryPct = Math.max(0, Math.round(100 - (interruptCount * 33.3)));
      var verdict = (interruptCount === 0) ? 'pass' : (interruptCount === 1 ? 'almost' : 'fail');

      var cStats = STORE.get('coachStats') || {};
      cStats.drills = (cStats.drills || 0) + 1;
      cStats.interrupts = (cStats.interrupts || 0) + interruptCount;
      STORE.set('coachStats', cStats);
      STORE.save();

      TRAINER.log({
        skill: 'pronunciation',
        delta: (verdict === 'pass' ? 5 : (verdict === 'almost' ? 3 : 1)),
        source: 'live-drill',
        ts: Date.now()
      });
      STORE.addXP(verdict === 'pass' ? 20 : 10, 'live-drill');

      if (typeof FLOW !== 'undefined' && FLOW.mark) {
        FLOW.mark(3);
      }

      var endCard = document.getElementById('live-end-card');
      if (endCard) {
        endCard.style.display = 'block';
        var vColor = verdict === 'pass' ? 'var(--ok)' : (verdict === 'almost' ? 'var(--warn)' : 'var(--bad)');
        var vLabel = verdict === 'pass' ? 'Excellent! 🎯' : (verdict === 'almost' ? 'Good Effort! 👍' : 'Needs Practice 🔁');
        endCard.innerHTML = '<div style="border:1px solid ' + vColor + ';border-radius:14px;padding:16px;background:rgba(16,24,48,0.9);">'
          + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">'
          + '<span style="font-size:1.15rem;font-weight:700;color:' + vColor + ';">' + vLabel + '</span>'
          + '<span class="badge" style="background:' + vColor + '22;color:' + vColor + ';">Verdict: ' + verdict.toUpperCase() + '</span>'
          + '</div>'
          + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;text-align:center;">'
          + '<div style="background:var(--bg1);padding:8px;border-radius:8px;"><div style="font-size:1.2rem;font-weight:700;">' + firstTryPct + '%</div><div style="font-size:0.75rem;color:var(--mut);">First-Try Accuracy</div></div>'
          + '<div style="background:var(--bg1);padding:8px;border-radius:8px;"><div style="font-size:1.2rem;font-weight:700;">' + interruptCount + '</div><div style="font-size:0.75rem;color:var(--mut);">Interrupts (max 3)</div></div>'
          + '<div style="background:var(--bg1);padding:8px;border-radius:8px;"><div style="font-size:1.2rem;font-weight:700;">' + paceWpm + '</div><div style="font-size:0.75rem;color:var(--mut);">Pace (WPM)</div></div>'
          + '</div>'
          + '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
          + '<button class="btn-primary btn-sm" id="live-replay-btn">🔊 Corrected Replay</button>'
          + '<button class="btn-ghost btn-sm" id="live-end-next-btn">Next Drill ▸</button>'
          + '</div>'
          + '</div>';

        var rBtn = document.getElementById('live-replay-btn');
        if (rBtn) {
          rBtn.addEventListener('click', function () {
            SPEECH.speak(target);
          });
        }
        var nBtn = document.getElementById('live-end-next-btn');
        if (nBtn) {
          nBtn.addEventListener('click', function () {
            self._drillIdx = (self._drillIdx || 0) + 1;
            self._renderDrill(el);
          });
        }
      }
    }

    function _handleInterrupt(match) {
      interruptCount++;
      isListening = false;
      SPEECH.stopListening();
      if (micBtn) { micBtn.textContent = '🎙️ Resume Speaking'; }

      var info = LIVE_COACH.buildInterruptMessage(target, match);
      var banner = document.getElementById('live-prompt-banner');
      if (banner) {
        banner.style.display = 'block';
        banner.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;">'
          + '<div>🛑 <strong style="color:var(--bad);">Stop!</strong> The word is <em>"' + _esc(info.word) + '"</em> ' + _esc(info.ipa) + '</div>'
          + '<button class="btn-sm btn-ghost" id="live-hear-word">🔊 Hear Word</button>'
          + '</div>'
          + '<div style="margin-top:6px;font-size:0.9rem;color:var(--txt);">' + _esc(info.prompt) + '</div>';
        var hwBtn = document.getElementById('live-hear-word');
        if (hwBtn) {
          hwBtn.addEventListener('click', function () {
            SPEECH.speakSlow(info.word);
          });
        }
      }

      SPEECH.speak("Stop! The word is '" + info.word + "'" + (info.ipa ? " " + info.ipa : "") + ". Listen slowly.");
      setTimeout(function () {
        SPEECH.speakSlow(info.word);
      }, 1600);
    }

    function _startListen() {
      if (!SPEECH.canListen()) {
        UI.toast('Speech recognition not available. Please use the typed fallback.', 'warning');
        return;
      }
      var pausedBanner = document.getElementById('live-paused-banner');
      if (pausedBanner) { pausedBanner.style.display = 'none'; }
      isListening = true;
      if (micBtn) { micBtn.textContent = '⏹️ Stop'; }

      SPEECH.listen({
        interim: true,
        continuous: true,
        onresult: function (transcript, isFinal, alts) {
          if (completed) { return; }
          restartTracker.onSuccess();
          lastPartialTs = Date.now();

          var match = LIVE_COACH.matchPrefix(target, transcript);

          if (self._drillRaf) { cancelAnimationFrame(self._drillRaf); }
          self._drillRaf = requestAnimationFrame(function () {
            var chipsEl = document.getElementById('live-chips-area');
            if (chipsEl) {
              chipsEl.innerHTML = LIVE_COACH.renderChipHTML(target, match);
            }
          });

          if (match.isComplete) {
            _finishDrill(true);
            return;
          }

          var silence = Date.now() - lastPartialTs;
          if (LIVE_COACH.shouldInterrupt({
            interruptCount: interruptCount,
            silenceMs: Math.max(silence, 500),
            match: match
          })) {
            _handleInterrupt(match);
          }
        },
        onend: function () {
          if (completed) { return; }
          var res = restartTracker.onEnd(false);
          if (res.shouldRestart) {
            setTimeout(function () {
              if (!completed && isListening) { _startListen(); }
            }, res.delay);
          } else if (res.paused) {
            isListening = false;
            if (micBtn) { micBtn.textContent = '🎙️ Start Speaking'; }
            var pb = document.getElementById('live-paused-banner');
            if (pb) { pb.style.display = 'block'; }
          }
        },
        onerror: function (msg, code) {
          if (completed) { return; }
          if (code === 'not-allowed' || code === 'not-supported') {
            isListening = false;
            if (micBtn) { micBtn.textContent = '🎙️ Start Speaking'; }
            UI.toast(msg, 'warning');
          }
        }
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', function () {
        if (isListening) {
          isListening = false;
          SPEECH.stopListening();
          micBtn.textContent = '🎙️ Start Speaking';
        } else {
          completed = false;
          _startListen();
        }
      });
    }

    var resumeBtn = document.getElementById('live-resume-btn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', function () {
        restartTracker.resume();
        _startListen();
      });
    }

    function _checkTyped() {
      var input = document.getElementById('live-typed-input');
      var val = input ? input.value.trim() : '';
      if (!val) { return; }
      var match = LIVE_COACH.matchPrefix(target, val);
      var chipsEl = document.getElementById('live-chips-area');
      if (chipsEl) {
        chipsEl.innerHTML = LIVE_COACH.renderChipHTML(target, match);
      }
      if (match.isComplete) {
        _finishDrill(true);
      } else {
        _handleInterrupt(match);
      }
    }

    var typedBtn = document.getElementById('live-typed-submit');
    if (typedBtn) { typedBtn.addEventListener('click', _checkTyped); }
    var typedInput = document.getElementById('live-typed-input');
    if (typedInput) {
      typedInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { _checkTyped(); }
      });
    }
  },

  render: function (el) {
    'use strict';
    var self = this;
    if (self._mode === 'drill') {
      self._renderDrill(el);
      return;
    }
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
      '<div style="display:flex;gap:8px;">' +
      '<button class="btn-ghost btn-sm" id="nova-quick-drill">🎙️ Live Drill</button>' +
      '<button class="btn-ghost btn-sm" id="nova-clear-history" title="Clear conversation">Clear chat</button>' +
      '</div>' +
      '</div>' +
      '<p class="sub">' + (hasKey
        ? '✅ ' + (settings.llmProvider || 'gemini').toUpperCase() + ' connected — real AI active. <span class="coach-provider-chip" style="margin-left:6px;padding:2px 8px;border-radius:10px;background:rgba(124,92,255,0.2);color:var(--acc2);font-size:0.75rem;font-weight:700;">' + (settings.llmProvider || 'gemini') + '</span>'
        : '⚠️ No key — rule engine only. Add your free Gemini / Groq / OpenRouter key in <a href="#/settings">Settings</a>.'
      ) + '</p>' +
      docBanner +
      '<div class="coach-modes">' +
      '<button class="tab-btn' + (self._mode === 'chat' ? ' active' : '') + '" id="mode-chat">💬 Chat</button>' +
      '<button class="tab-btn' + (self._mode === 'interview' ? ' active' : '') + '" id="mode-interview">🎤 Mock Interview</button>' +
      '<button class="tab-btn' + (self._mode === 'drill' ? ' active' : '') + '" id="mode-drill">🎙️ Live Drill</button>' +
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
    var drillBtn = document.getElementById('mode-drill');
    if (drillBtn) {
      drillBtn.addEventListener('click', function () {
        self._mode = 'drill'; self.render(el);
      });
    }
    var quickDrill = document.getElementById('nova-quick-drill');
    if (quickDrill) {
      quickDrill.addEventListener('click', function () {
        self._mode = 'drill'; self.render(el);
      });
    }
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

      /* Part B: Free Talk Live */
      var settings = STORE.get('settings') || {};
      if (settings.liveCorrect) {
        var fixes = [];
        var words = (typeof U !== 'undefined' && U.tokenise) ? U.tokenise(text).length : text.split(/\s+/).filter(Boolean).length;
        for (var ri = 0; ri < COACH_RULES.length; ri++) {
          if (COACH_RULES[ri].pat.test(text)) {
            fixes.push(COACH_RULES[ri].fix);
          }
        }
        var honest = (typeof isHonest === 'function') ? isHonest() : false;
        var liveChipText = '';
        if (honest) {
          var score = Math.max(1, Math.min(10, 10 - (fixes.length * 2) - (words < 4 ? 2 : 0)));
          var color = score < 6 ? '#ef4444' : (score <= 8 ? '#f59e0b' : '#10b981');
          liveChipText = '<span class="live-verdict-chip" style="display:inline-block;margin-top:6px;font-size:0.75rem;padding:2px 8px;border-radius:10px;background:' + color + '22;color:' + color + ';border:1px solid ' + color + ';">⚡ Live Score: ' + score + '/10' + (fixes.length > 0 ? ' · ' + _esc(fixes[0]) : '') + '</span>';
        } else if (fixes.length > 0) {
          liveChipText = '<span class="live-verdict-chip" style="display:inline-block;margin-top:6px;font-size:0.75rem;padding:2px 8px;border-radius:10px;background:rgba(245,158,11,0.15);color:var(--warn);border:1px solid rgba(245,158,11,0.3);">⚡ Live Correction: ' + _esc(fixes[0]) + '</span>';
        }

        if (settings.bargeIn) {
          var hiFix = LIVE_COACH.detectHighSeverityFix(text);
          if (hiFix) {
            if (LIVE_COACH.bargeInThrottle.canExecute(Date.now(), self._inFlightReply)) {
              SPEECH.speak(hiFix.spoken);
              LIVE_COACH.bargeInThrottle.record(Date.now());
            } else {
              liveChipText += '<span class="live-barge-chip" style="display:inline-block;margin-top:4px;margin-left:6px;font-size:0.72rem;padding:1px 6px;border-radius:8px;background:rgba(124,92,255,0.15);color:var(--acc2);">🎙️ ' + _esc(hiFix.spoken) + '</span>';
            }
          }
        }

        if (liveChipText && chatWin) {
          var userBubbles = chatWin.querySelectorAll('.bubble.user');
          if (userBubbles.length > 0) {
            var lastBubble = userBubbles[userBubbles.length - 1];
            var chipDiv = document.createElement('div');
            chipDiv.innerHTML = liveChipText;
            lastBubble.appendChild(chipDiv);
          }
        }
      }

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
    if (typeof FLOW !== 'undefined' && FLOW.recordNovaTurn) {
      FLOW.recordNovaTurn();
    }
    SPEECH.speak(reply);
    self.render(el);
  }
}

function _novaRules(text) {
  var t = text.toLowerCase();
  var honest = (typeof isHonest === 'function') ? isHonest() : false;

  if (honest) {
    var fixes = [];
    var words = (typeof U !== 'undefined' && U.tokenise) ? U.tokenise(text).length : text.split(/\s+/).filter(Boolean).length;

    /* Collect ALL grammar rule checks */
    for (var ri = 0; ri < COACH_RULES.length; ri++) {
      if (COACH_RULES[ri].pat.test(text)) {
        fixes.push('Grammar: ' + COACH_RULES[ri].fix);
      }
    }

    /* Collect ALL vocabulary upgrades */
    for (var ui = 0; ui < COACH_UPGRADES.length; ui++) {
      var up = COACH_UPGRADES[ui];
      if (t.indexOf(up.basic.toLowerCase()) !== -1) {
        fixes.push('Upgrade "' + up.basic + '" → "' + up.better + '" (or "' + up.adv + '")');
      }
    }

    var score = Math.max(1, Math.min(10, 10 - (fixes.length * 2) - (words < 4 ? 2 : 0)));
    var color = score < 6 ? '#ef4444' : (score <= 8 ? '#f59e0b' : '#10b981');
    var chipHtml = '<span class="honest-score-chip" style="background:' + color + '22;color:' + color + ';border:1px solid ' + color + ';border-radius:12px;padding:2px 8px;font-weight:700;font-size:0.82rem;">' + score + '/10</span>';

    var out = chipHtml + ' <strong>Score: ' + score + '/10</strong>\n';
    if (fixes.length > 0) {
      out += 'Mistakes to fix:\n';
      for (var fi = 0; fi < fixes.length; fi++) {
        out += '▸ ' + fixes[fi] + '\n';
      }
      out += 'Exact corrected sentence required. Under 90 words.';
    } else {
      if (words < 4) {
        out += '▸ Too brief. Express a complete sentence (at least 4 words) to score higher.';
      } else {
        out += 'Zero glaring errors detected. Well structured.';
      }
    }
    return out;
  }

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
  var mode = self ? self._mode || 'chat' : 'chat';

  var base = 'You are Nova, an expert English speaking coach specialising in helping Indian learners.' +
    ' The student\'s name is ' + name + ' and their current CEFR level is ' + level + '.' +
    ' Their weakest skill right now is ' + weakSkill + ' — prioritise that in your coaching.' +
    ' Mode: ' + mode + '.' +
    ' Rules: correct grammar gently by quoting the error then giving the fix; suggest vocabulary upgrades when appropriate;' +
    ' be warm, direct, and concise (2–4 sentences unless asked for more).' +
    ' Never say you are an AI. You are Nova.';

  /* Document context */
  if (mode === 'document' && self && self._activeDoc) {
    var excerpt = self._activeDoc.text ? self._activeDoc.text.slice(0, 1200) : '';
    base += ' The student is currently reading a document titled "' + self._activeDoc.title + '".' +
      ' Here is an excerpt for context:\n---\n' + excerpt + '\n---' +
      ' When the student asks about a word or phrase, quote the surrounding sentence from the excerpt before explaining.' +
      ' When asked to summarise, produce a 3-bullet summary of the excerpt.';
  }

  /* M7 Brutal Honesty Mode */
  if (typeof isHonest === 'function' ? isHonest() : (settings.honestMode)) {
    base += ' BRUTAL HONESTY mode: start each reply with strict score \'N/10\'; list EVERY mistake one per line with ▸; never praise below 8/10; give the exact corrected sentence; under 90 words.';
  }

  return base;
}

function _novaGemini(userText, self, el, key) {
  var settings = STORE.get('settings') || {};
  var provider = settings.llmProvider || 'gemini';
  var hist = self._getHistory().slice(-12); /* last 12 turns for context */
  var messages = [];
  for (var i = 0; i < hist.length - 1; i++) { /* exclude the just-pushed user message */
    messages.push({
      role: hist[i].role === 'user' ? 'user' : 'model',
      content: hist[i].text
    });
  }
  messages.push({ role: 'user', content: userText });

  var systemPrompt = _novaBuildSystemPrompt(self);

  /* Show typing indicator */
  var h = self._getHistory();
  h.push({role: 'nova', text: '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>'});
  self.render(el);
  /* Remove the typing indicator entry (it will be replaced by real reply) */
  h.pop();

  self._inFlightReply = true;

  llmAsk({
    provider: provider,
    key: key,
    systemPrompt: systemPrompt,
    messages: messages
  }).then(function (reply) {
    self._inFlightReply = false;
    h.push({role: 'nova', text: _esc(reply)});
    self._saveHistory();
    TRAINER.log({skill: 'fluency', delta: 1, source: 'coach/' + provider});
    if (typeof FLOW !== 'undefined' && FLOW.recordNovaTurn) {
      FLOW.recordNovaTurn();
    }
    STORE.save();
    SPEECH.speak(reply);
    self.render(el);
  }).catch(function (err) {
    self._inFlightReply = false;
    if (typeof UI !== 'undefined' && UI.toast) {
      UI.toast('⚠️ ' + provider + ' unavailable. Switching to offline engine.', 'warning');
    }
    if (typeof NOVA !== 'undefined' && typeof NOVA.fail === 'function') {
      NOVA.fail(err);
    } else if (typeof VIEWS.coach.fail === 'function') {
      VIEWS.coach.fail(err);
    }
    var reply = _novaRules(userText) + ' (offline — no connection)';
    h.push({role: 'nova', text: _esc(reply)});
    self._saveHistory();
    self.render(el);
  });
}

VIEWS.coach.respond = function (userText, el) {
  _novaRespond(userText, VIEWS.coach, el || { innerHTML: '', scrollTop: 0 });
};
VIEWS.coach.fail = function (err) {
  this._lastError = err;
};
VIEWS.coach._novaGemini = _novaGemini;
VIEWS.coach._novaRules = _novaRules;
var NOVA = VIEWS.coach;
if (typeof window !== 'undefined') { window.NOVA = VIEWS.coach; }
if (typeof global !== 'undefined') { global.NOVA = VIEWS.coach; }

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
  if (typeof FLOW !== 'undefined' && FLOW.mark) {
    FLOW.mark(1);
  }
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
      '<label>AI Provider</label>' +
      '<select id="s-provider">' +
      '<option value="gemini"' + (settings.llmProvider === 'gemini' || !settings.llmProvider ? ' selected' : '') + '>Gemini (Google 2.0 Flash — Free)</option>' +
      '<option value="groq"' + (settings.llmProvider === 'groq' ? ' selected' : '') + '>Groq (Llama 3.1 8B Instant — Ultra Fast)</option>' +
      '<option value="openrouter"' + (settings.llmProvider === 'openrouter' ? ' selected' : '') + '>OpenRouter (Llama 3.1 8B Free)</option>' +
      '</select>' +
      '<p class="setting-hint">Select your free AI backend (₹0 free tier on all three).</p>' +
      '</div>' +

      '<div class="setting-group">' +
      '<label>API Key <small>(<a href="https://aistudio.google.com" target="_blank" rel="noopener">Get Gemini key ↗</a>)</small></label>' +
      '<input type="password" id="s-gemini" value="' + _esc(settings.geminiKey || '') + '" placeholder="Paste your API key here..." />' +
      '<p class="setting-hint">One key field for whichever provider you choose. Stays in your local browser storage (INV-8).</p>' +
      '<div style="margin-top:8px;display:flex;align-items:center;gap:10px;">' +
      '<button class="btn-secondary btn-sm" id="s-test-llm">🧪 Test & activate</button>' +
      '<span id="s-test-status" style="font-size:0.85rem;"></span>' +
      '</div>' +
      '</div>' +

      '<div class="setting-group">' +
      '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;">' +
      '<input type="checkbox" id="s-honest"' + (settings.honestMode ? ' checked' : '') + ' style="width:18px;height:18px;" />' +
      '<span>🗡️ Brutal honesty mode — Nova scores you hard</span>' +
      '</label>' +
      '<p class="setting-hint">When enabled, Nova scores every message out of 10, lists every mistake with ▸, and gives zero sugarcoated praise.</p>' +
      '</div>' +

      '<div class="setting-group">' +
      '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;">' +
      '<input type="checkbox" id="s-live-correct"' + (settings.liveCorrect ? ' checked' : '') + ' style="width:18px;height:18px;" />' +
      '<span>⚡ Live corrections while I talk</span>' +
      '</label>' +
      '<p class="setting-hint">Instantly evaluates your speech after each utterance and posts inline chips.</p>' +
      '<div style="margin-left:26px;margin-top:8px;">' +
      '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;">' +
      '<input type="checkbox" id="s-barge-in"' + (settings.bargeIn ? ' checked' : '') + ' style="width:18px;height:18px;" />' +
      '<span>🎙️ Barge-in speech alerts (high severity only)</span>' +
      '</label>' +
      '<p class="setting-hint">Nova speaks short ≤6-word voice corrections (throttled to 1 per 20s) for missing verbs, auxiliaries, or articles.</p>' +
      '</div>' +
      '</div>' +

      '<div class="setting-group" id="s-group-reminders">' +
      '<label>🔔 Daily Reminder</label>' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">' +
      '<input type="time" id="s-remind-hour" value="' + _esc(settings.remindHour || '19:00') + '" style="padding:8px 12px;background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--txt);" />' +
      '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;">' +
      '<input type="checkbox" id="s-remind-on"' + (settings.remindOn ? ' checked' : '') + ' style="width:18px;height:18px;" />' +
      '<span>Enable reminder</span>' +
      '</label>' +
      '</div>' +
      ((typeof Notification === 'undefined' || Notification.permission === 'denied')
        ? '<p class="setting-hint" id="s-remind-note" style="color:var(--warn);">Reminders not supported here — streak chip is your reminder.</p>'
        : '<p class="setting-hint" id="s-remind-note">Receive a local notification when today\'s Flow has remaining steps.</p>'
      ) +
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

    var honestEl = document.getElementById('s-honest');
    if (honestEl) {
      honestEl.addEventListener('change', function () {
        var s = STORE.get('settings') || {};
        s.honestMode = this.checked;
        STORE.set('settings', s);
        UI.toast(this.checked ? '🗡️ Brutal honesty mode ON' : 'Brutal honesty mode OFF', 'info');
      });
    }

    var liveEl = document.getElementById('s-live-correct');
    if (liveEl) {
      liveEl.addEventListener('change', function () {
        var s = STORE.get('settings') || {};
        s.liveCorrect = this.checked;
        STORE.set('settings', s);
        UI.toast(this.checked ? '⚡ Live corrections ON' : 'Live corrections OFF', 'info');
      });
    }

    var bargeEl = document.getElementById('s-barge-in');
    if (bargeEl) {
      bargeEl.addEventListener('change', function () {
        var s = STORE.get('settings') || {};
        s.bargeIn = this.checked;
        STORE.set('settings', s);
        UI.toast(this.checked ? '🎙️ Barge-in alerts ON' : 'Barge-in alerts OFF', 'info');
      });
    }

    var remindHourEl = document.getElementById('s-remind-hour');
    var remindOnEl = document.getElementById('s-remind-on');
    var remindNoteEl = document.getElementById('s-remind-note');

    if (remindOnEl) {
      remindOnEl.addEventListener('change', function () {
        var isChecked = this.checked;
        var s = STORE.get('settings') || {};
        var h = remindHourEl ? remindHourEl.value : (s.remindHour || '19:00');
        s.remindHour = h;

        if (isChecked) {
          if (typeof Notification === 'undefined') {
            this.checked = false;
            s.remindOn = false;
            STORE.set('settings', s);
            if (remindNoteEl) {
              remindNoteEl.textContent = 'Reminders not supported here — streak chip is your reminder.';
              remindNoteEl.style.color = 'var(--warn)';
            }
            UI.toast('Notifications not supported in this browser.', 'warning');
            return;
          }
          if (Notification.permission === 'denied') {
            this.checked = false;
            s.remindOn = false;
            STORE.set('settings', s);
            if (remindNoteEl) {
              remindNoteEl.textContent = 'Reminders not supported here — streak chip is your reminder.';
              remindNoteEl.style.color = 'var(--warn)';
            }
            UI.toast('Notification permission was blocked in browser settings.', 'warning');
            return;
          }
          if (Notification.permission === 'granted') {
            s.remindOn = true;
            STORE.set('settings', s);
            STORE.save();
            if (typeof REMINDERS !== 'undefined') { REMINDERS.schedule(); }
            UI.toast('🔔 Daily reminder set for ' + h, 'success');
          } else if (typeof Notification.requestPermission === 'function') {
            var toggle = this;
            Notification.requestPermission().then(function (perm) {
              if (perm === 'granted') {
                s.remindOn = true;
                STORE.set('settings', s);
                STORE.save();
                if (typeof REMINDERS !== 'undefined') { REMINDERS.schedule(); }
                UI.toast('🔔 Daily reminder set for ' + h, 'success');
              } else {
                toggle.checked = false;
                s.remindOn = false;
                STORE.set('settings', s);
                STORE.save();
                if (remindNoteEl) {
                  remindNoteEl.textContent = 'Reminders not supported here — streak chip is your reminder.';
                  remindNoteEl.style.color = 'var(--warn)';
                }
                UI.toast('Notification permission was denied.', 'warning');
              }
            });
          }
        } else {
          s.remindOn = false;
          STORE.set('settings', s);
          STORE.save();
          if (typeof REMINDERS !== 'undefined') { REMINDERS.clear(); }
          UI.toast('Daily reminder disabled', 'info');
        }
      });
    }

    if (remindHourEl) {
      remindHourEl.addEventListener('change', function () {
        var s = STORE.get('settings') || {};
        s.remindHour = this.value;
        STORE.set('settings', s);
        if (s.remindOn && typeof REMINDERS !== 'undefined') {
          REMINDERS.schedule();
        }
      });
    }

    var provEl = document.getElementById('s-provider');
    if (provEl) {
      provEl.addEventListener('change', function () {
        var s = STORE.get('settings') || {};
        s.llmProvider = this.value;
        STORE.set('settings', s);
        UI.toast('AI provider set to ' + this.value, 'info');
      });
    }

    var testLlmBtn = document.getElementById('s-test-llm');
    if (testLlmBtn) {
      testLlmBtn.addEventListener('click', function () {
        var selProv = document.getElementById('s-provider') ? document.getElementById('s-provider').value : 'gemini';
        var keyInput = document.getElementById('s-gemini');
        var k = keyInput ? keyInput.value.trim() : '';
        var statusEl = document.getElementById('s-test-status');
        if (!k) {
          UI.toast('Please enter an API key first.', 'warning');
          return;
        }
        if (statusEl) { statusEl.textContent = 'Testing connection...'; }
        llmAsk({
          provider: selProv,
          key: k,
          systemPrompt: 'You are an automated ping test. Reply with OK.',
          messages: [{ role: 'user', content: 'Ping' }]
        }).then(function (reply) {
          if (statusEl) { statusEl.innerHTML = '<strong style="color:var(--ok);">✅ Verified & Active!</strong>'; }
          UI.toast('✅ ' + selProv.toUpperCase() + ' verified & active!', 'success');
          var s = STORE.get('settings') || {};
          s.geminiKey = k;
          s.llmProvider = selProv;
          STORE.set('settings', s);
          STORE.save();
        }).catch(function (err) {
          if (statusEl) { statusEl.innerHTML = '<strong style="color:var(--bad);">❌ Failed</strong>'; }
          UI.toast('⚠️ Connection failed: ' + (err.message || 'Check key'), 'error');
        });
      });
    }

    document.getElementById('s-save').addEventListener('click', function () {
      var voice = document.getElementById('s-voice').value;
      var rate = parseFloat(document.getElementById('s-rate').value);
      var goal = parseInt(document.getElementById('s-goal').value, 10);
      var geminiKey = document.getElementById('s-gemini').value.trim();
      var honestMode = document.getElementById('s-honest') ? document.getElementById('s-honest').checked : false;
      var liveCorrect = document.getElementById('s-live-correct') ? document.getElementById('s-live-correct').checked : false;
      var bargeIn = document.getElementById('s-barge-in') ? document.getElementById('s-barge-in').checked : false;
      var llmProvider = document.getElementById('s-provider') ? document.getElementById('s-provider').value : 'gemini';
      var remindHour = document.getElementById('s-remind-hour') ? document.getElementById('s-remind-hour').value : '19:00';
      var remindOn = document.getElementById('s-remind-on') ? document.getElementById('s-remind-on').checked : false;
      var curSettings = STORE.get('settings') || {};
      curSettings.voice = voice;
      curSettings.rate = rate;
      curSettings.dailyGoal = goal;
      curSettings.geminiKey = geminiKey;
      curSettings.honestMode = honestMode;
      curSettings.liveCorrect = liveCorrect;
      curSettings.bargeIn = bargeIn;
      curSettings.llmProvider = llmProvider;
      curSettings.remindHour = remindHour;
      curSettings.remindOn = remindOn;
      STORE.set('settings', curSettings);
      SPEECH.setRate(rate);
      if (voice) { SPEECH.setVoiceByName(voice); }
      if (typeof REMINDERS !== 'undefined') {
        if (remindOn) { REMINDERS.schedule(); } else { REMINDERS.clear(); }
      }
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

/* ── ONBOARDING (M11: First-5-Minutes 4-Screen Flow) ─────────────────────── */
VIEWS.onboarding = {
  _screen: 0, /* 0: Welcome, 1: Placement, 2: Instant Win Live Drill, 3: Power-up Cloud Brain */
  _answers: { name: '', placementTag: 'A2', level: 'A2', geminiKey: '' },
  _placementQIndex: 0,
  _placementScore: 0,
  _drillSentence: '',
  _drillMatched: false,
  _drillFirstWordCelebrated: false,
  _lastPartial: '',

  mapPlacementScore: function (score) {
    if (score >= 5) { return 'B1'; }
    if (score === 4) { return 'A2+'; }
    if (score === 3) { return 'A2'; }
    return 'A1';
  },

  getSentenceForLevel: function (level) {
    if (level === 'B1') {
      return 'Clear communication creates incredible new career opportunities.';
    }
    if (level === 'A2+') {
      return 'Practice makes pronunciation clearer every single day.';
    }
    if (level === 'A2') {
      return 'She speaks English with confidence and clarity.';
    }
    return 'I want to speak English clearly.';
  },

  skipTour: function (el) {
    var u = STORE.get('user') || {};
    u.name = (this._answers && this._answers.name) ? this._answers.name : (u.name || 'Learner');
    u.level = (this._answers && this._answers.level) ? this._answers.level : (u.level || 'A2');
    u.placementTag = (this._answers && this._answers.placementTag) ? this._answers.placementTag : (u.placementTag || u.level);
    if (!u.goal) { u.goal = 'Daily conversation fluency'; }
    STORE.set('user', u);
    STORE.save();
    if (typeof navigate === 'function') {
      navigate('home');
    }
  },

  goToScreen: function (n, el) {
    this._screen = Math.max(0, Math.min(3, n));
    if (el) { this.render(el); }
  },

  render: function (el) {
    'use strict';
    var self = this;
    var screen = self._screen || 0;

    var placementPool = [
      (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[0]) || { q: 'Which sentence is correct?', opts: ["She don't like tea.", "She doesn't like tea.", "She not like tea."], ans: 1, skill: 'grammar' },
      (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[8]) || { q: 'What does "meticulous" mean?', opts: ['careless', 'showing great attention to detail', 'slow'], ans: 1, skill: 'vocab' },
      (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[15]) || { q: 'Which word has the stress on the first syllable?', opts: ['believe', 'attract', 'manage'], ans: 2, skill: 'pronunciation' },
      (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[19]) || { q: '"Under the weather" means:', opts: ['it is raining', 'feeling unwell', 'outdoors'], ans: 1, skill: 'vocab' },
      (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[21]) || { q: 'She hasn\'t seen them ___ Monday.', opts: ['for', 'since', 'during'], ans: 1, skill: 'grammar' }
    ];

    var html = '<div class="view-onboarding" style="max-width:560px;margin:30px auto;padding:28px 24px;background:var(--bg1);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--sh2);">';

    /* Header with step counter & skip tour link */
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">'
      + '<span style="font-weight:800;color:var(--txt);font-size:1.05rem;">✨ EngSpell</span>'
      + '<a href="#skip" id="ob-skip-tour" style="color:var(--mut);font-size:0.85rem;text-decoration:none;">Skip tour →</a>'
      + '</div>';

    /* Progress bar */
    var pct = Math.round(((screen + 1) / 4) * 100);
    html += '<div style="height:6px;background:var(--bg3);border-radius:999px;overflow:hidden;margin-bottom:20px;">'
      + '<div style="height:100%;width:' + pct + '%;background:var(--grad);transition:width 0.3s ease;"></div>'
      + '</div>'
      + '<div style="font-size:0.75rem;font-weight:700;color:var(--acc2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Step ' + (screen + 1) + ' of 4</div>';

    /* SCREEN 1: Welcome */
    if (screen === 0) {
      html += '<h1 style="font-size:1.6rem;font-weight:800;margin-bottom:8px;line-height:1.3;">Welcome to EngSpell</h1>'
        + '<p style="color:var(--mut);margin-bottom:24px;font-size:0.95rem;line-height:1.5;">Master clear English pronunciation, speaking fluency, and confidence — 100% free, offline-first, and private.</p>'
        + '<div style="margin-bottom:20px;">'
        + '<label style="display:block;font-size:0.85rem;font-weight:600;color:var(--txt);margin-bottom:6px;">What should we call you?</label>'
        + '<input type="text" id="ob-name-input" placeholder="Enter your first name" value="' + _esc(self._answers.name || '') + '" style="width:100%;padding:12px 14px;font-size:1rem;background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--txt);" />'
        + '</div>'
        + '<button class="btn-primary btn-lg" id="ob-s1-next" style="width:100%;padding:12px;font-size:1rem;cursor:pointer;">Start 2-Minute Setup →</button>';
    }

    /* SCREEN 2: Placement */
    else if (screen === 1) {
      var qIdx = self._placementQIndex || 0;
      var curQ = placementPool[qIdx] || placementPool[0];
      html += '<h1 style="font-size:1.4rem;font-weight:800;margin-bottom:4px;">Quick Level Placement</h1>'
        + '<p style="color:var(--mut);font-size:0.85rem;margin-bottom:16px;">Question ' + (qIdx + 1) + ' of 5 · Skill: <span style="color:var(--acc2);text-transform:capitalize;">' + _esc(curQ.skill || 'grammar') + '</span></p>'
        + '<div style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-md);padding:18px;margin-bottom:18px;">'
        + '<h2 style="font-size:1.05rem;font-weight:600;margin-bottom:16px;color:var(--txt);">' + _esc(curQ.q) + '</h2>'
        + '<div style="display:flex;flex-direction:column;gap:10px;">';
      for (var oi = 0; oi < curQ.opts.length; oi++) {
        html += '<button class="btn-secondary ob-placement-opt" data-opt="' + oi + '" style="text-align:left;padding:12px 14px;font-size:0.95rem;justify-content:flex-start;">' + _esc(curQ.opts[oi]) + '</button>';
      }
      html += '</div></div>';
    }

    /* SCREEN 3: Instant Win — Live Drill */
    else if (screen === 2) {
      var tag = self._answers.placementTag || 'A2';
      var target = self._drillSentence || self.getSentenceForLevel(tag);
      self._drillSentence = target;

      html += '<h1 style="font-size:1.4rem;font-weight:800;margin-bottom:4px;">🎙️ Instant Win — First Live Drill</h1>'
        + '<p style="color:var(--mut);font-size:0.85rem;margin-bottom:14px;">Calibrated for your level: <strong style="color:var(--acc2);">' + _esc(tag) + '</strong>. Speak or type to see word-level live matching.</p>'
        + '<div id="ob-xp-pop" style="display:' + (self._drillFirstWordCelebrated ? 'block' : 'none') + ';background:rgba(52,211,153,0.15);border:1px solid var(--ok);border-radius:var(--r-sm);padding:10px 14px;color:var(--ok);font-weight:700;text-align:center;margin-bottom:14px;">'
        + '🎉 +10 XP! First word unlocked! Flow Step 1 (Diagnose) marked DONE!'
        + '</div>'
        + '<div style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-md);padding:18px;margin-bottom:16px;text-align:center;">'
        + '<div style="font-size:0.75rem;color:var(--mut);text-transform:uppercase;margin-bottom:8px;">Target sentence</div>'
        + '<div id="ob-chips-container" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0;">'
        + (typeof LIVE_COACH !== 'undefined' ? LIVE_COACH.renderChipHTML(target, self._lastPartial || '') : _esc(target))
        + '</div>'
        + '</div>';

      if (SPEECH.canListen()) {
        html += '<div style="text-align:center;margin-bottom:14px;">'
          + '<button class="btn-primary" id="ob-mic-btn" style="padding:10px 20px;font-size:1rem;">🎙️ Start Speaking</button>'
          + '<p style="font-size:0.78rem;color:var(--mut);margin-top:6px;">Microphone access is used strictly in-browser for speech recognition (never recorded or sent to any server).</p>'
          + '</div>';
      }

      html += '<div style="display:flex;gap:8px;margin-bottom:16px;">'
        + '<input type="text" id="ob-typed-input" placeholder="Or type the sentence to practice..." style="flex:1;padding:10px 12px;background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--txt);" />'
        + '<button class="btn-secondary" id="ob-typed-submit">Check</button>'
        + '</div>'
        + '<button class="btn-primary" id="ob-s3-next" style="width:100%;padding:12px;' + (self._drillFirstWordCelebrated ? '' : 'opacity:0.6;') + '">' + (self._drillFirstWordCelebrated ? 'Continue to Power-up →' : 'Continue →') + '</button>';
    }

    /* SCREEN 4: Power-up (Cloud Brain) */
    else if (screen === 3) {
      var currentKey = (STORE.get('settings') || {}).geminiKey || '';
      html += '<h1 style="font-size:1.4rem;font-weight:800;margin-bottom:4px;">⚡ Power-Up: Nova\'s Cloud Brain</h1>'
        + '<p style="color:var(--mut);font-size:0.85rem;margin-bottom:16px;">Nova works 100% offline out-of-the-box. Connect your free Google Gemini API key to unlock nuanced conversation and live accent coaching.</p>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">'
        + '<div style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px;font-size:0.8rem;">'
        + '<div style="font-weight:700;color:var(--acc2);margin-bottom:4px;">⚡ Real AI Active</div>'
        + '<div style="color:var(--mut);line-height:1.4;">Nuanced corrections, idiom coaching, Indian English accent tips, dynamic roleplay.</div>'
        + '</div>'
        + '<div style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px;font-size:0.8rem;">'
        + '<div style="font-weight:700;color:var(--ok);margin-bottom:4px;">🛡️ Offline Rules</div>'
        + '<div style="color:var(--mut);line-height:1.4;">Grammar rules, pronunciation lab, word bank, and SRS review always free forever.</div>'
        + '</div>'
        + '</div>'
        + '<div style="margin-bottom:16px;">'
        + '<label style="display:block;font-size:0.82rem;font-weight:600;margin-bottom:6px;color:var(--txt);">Gemini API Key <small>(<a href="https://aistudio.google.com" target="_blank" rel="noopener" style="color:var(--acc2);">Get free key at Google AI Studio ↗</a>)</small></label>'
        + '<input type="password" id="ob-gemini-key" placeholder="Paste your Gemini key here..." value="' + _esc(currentKey) + '" style="width:100%;padding:10px 12px;background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--txt);margin-bottom:8px;" />'
        + '<div style="display:flex;align-items:center;gap:10px;">'
        + '<button class="btn-secondary btn-sm" id="ob-test-llm">🧪 Test & activate</button>'
        + '<span id="ob-test-status" style="font-size:0.85rem;">' + (currentKey ? '<strong style="color:var(--ok);">✅ Active</strong>' : '') + '</span>'
        + '</div>'
        + '</div>'
        + '<button class="btn-primary" id="ob-finish" style="width:100%;padding:12px;font-size:1rem;margin-bottom:8px;cursor:pointer;">Start Learning (Flow 1/5 Lit) →</button>'
        + '<div style="text-align:center;">'
        + '<button class="btn-ghost btn-sm" id="ob-skip-cloud" style="color:var(--mut);">Skip — works offline too</button>'
        + '</div>';
    }

    html += '</div>'; /* view-onboarding */

    el.innerHTML = html;

    /* Bind skip tour */
    var skipLink = document.getElementById('ob-skip-tour');
    if (skipLink) {
      skipLink.addEventListener('click', function (e) {
        if (e && e.preventDefault) { e.preventDefault(); }
        self.skipTour(el);
      });
    }

    /* Screen 1 event handlers */
    if (screen === 0) {
      var nameInput = document.getElementById('ob-name-input');
      var s1Next = document.getElementById('ob-s1-next');
      function _submitS1() {
        var n = nameInput ? nameInput.value.trim() : '';
        self._answers.name = n || 'Learner';
        var u = STORE.get('user') || {};
        u.name = self._answers.name;
        STORE.set('user', u);
        STORE.save();
        self._screen = 1;
        self.render(el);
      }
      if (s1Next) { s1Next.addEventListener('click', _submitS1); }
      if (nameInput) {
        if (nameInput.focus) { nameInput.focus(); }
        nameInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { _submitS1(); }
        });
      }
    }

    /* Screen 2 event handlers */
    else if (screen === 1) {
      var optBtns = el.querySelectorAll('.ob-placement-opt');
      for (var bi = 0; bi < optBtns.length; bi++) {
        (function (b) {
          b.addEventListener('click', function () {
            var selectedIdx = parseInt(b.getAttribute('data-opt'), 10);
            var qIdx = self._placementQIndex || 0;
            var curQ = placementPool[qIdx] || placementPool[0];
            if (selectedIdx === curQ.ans) {
              self._placementScore = (self._placementScore || 0) + 1;
              UI.toast('Correct!', 'success');
            } else {
              UI.toast('Good try!', 'info');
            }
            self._placementQIndex = qIdx + 1;
            if (self._placementQIndex >= 5) {
              var tag = self.mapPlacementScore(self._placementScore);
              self._answers.placementTag = tag;
              self._answers.level = tag;
              var u = STORE.get('user') || {};
              u.placementTag = tag;
              u.level = tag;
              STORE.set('user', u);
              STORE.save();
              TRAINER.log({ skill: 'fluency', delta: self._placementScore, source: 'onboarding/placement', ts: Date.now() });
              self._drillSentence = self.getSentenceForLevel(tag);
              self._screen = 2;
              setTimeout(function () { self.render(el); }, 250);
            } else {
              setTimeout(function () { self.render(el); }, 200);
            }
          });
        }(optBtns[bi]));
      }
    }

    /* Screen 3 event handlers */
    else if (screen === 2) {
      var tag2 = self._answers.placementTag || 'A2';
      var target2 = self._drillSentence || self.getSentenceForLevel(tag2);
      var micBtn = document.getElementById('ob-mic-btn');
      var typedInput = document.getElementById('ob-typed-input');
      var typedSubmit = document.getElementById('ob-typed-submit');
      var s3Next = document.getElementById('ob-s3-next');
      var isListening = false;

      function _onPartialMatch(text) {
        self._lastPartial = text;
        var chipsContainer = document.getElementById('ob-chips-container');
        if (chipsContainer && typeof LIVE_COACH !== 'undefined') {
          chipsContainer.innerHTML = LIVE_COACH.renderChipHTML(target2, text);
        }
        var match = (typeof LIVE_COACH !== 'undefined') ? LIVE_COACH.matchPrefix(target2, text) : { matchedCount: 0 };
        if (match.matchedCount >= 1 && !self._drillFirstWordCelebrated) {
          self._drillFirstWordCelebrated = true;
          STORE.addXP(10, 'onboarding-drill');
          if (typeof FLOW !== 'undefined' && FLOW.mark) {
            FLOW.mark(1);
          }
          var popEl = document.getElementById('ob-xp-pop');
          if (popEl) { popEl.style.display = 'block'; }
          if (s3Next) {
            s3Next.style.opacity = '1';
            s3Next.textContent = 'Continue to Power-up →';
          }
          UI.toast('🎉 First word matched! +10 XP & Step 1 Done!', 'success');
        }
      }

      if (typedSubmit && typedInput) {
        typedSubmit.addEventListener('click', function () {
          var val = typedInput.value.trim();
          if (!val) { return; }
          _onPartialMatch(val);
        });
        typedInput.addEventListener('input', function () {
          _onPartialMatch(this.value);
        });
      }

      if (micBtn && SPEECH.canListen()) {
        micBtn.addEventListener('click', function () {
          if (isListening) {
            SPEECH.stopListening();
            isListening = false;
            micBtn.textContent = '🎙️ Start Speaking';
            return;
          }
          isListening = true;
          micBtn.textContent = '🛑 Listening... speak now';
          SPEECH.listen({
            onresult: function (transcript, isFinal) {
              _onPartialMatch(transcript);
              if (isFinal) {
                isListening = false;
                if (micBtn) { micBtn.textContent = '🎙️ Start Speaking'; }
              }
            },
            onerror: function (err) {
              isListening = false;
              if (micBtn) { micBtn.textContent = '🎙️ Start Speaking'; }
              UI.toast('Mic note: ' + err, 'warning');
            }
          });
        });
      }

      if (s3Next) {
        s3Next.addEventListener('click', function () {
          if (isListening) { SPEECH.stopListening(); }
          /* Ensure step 1 is marked if not already */
          if (!self._drillFirstWordCelebrated) {
            self._drillFirstWordCelebrated = true;
            STORE.addXP(10, 'onboarding-drill');
            if (typeof FLOW !== 'undefined' && FLOW.mark) {
              FLOW.mark(1);
            }
          }
          self._screen = 3;
          self.render(el);
        });
      }
    }

    /* Screen 4 event handlers */
    else if (screen === 3) {
      var testBtn = document.getElementById('ob-test-llm');
      var keyInput = document.getElementById('ob-gemini-key');
      var statusEl = document.getElementById('ob-test-status');
      var finishBtn = document.getElementById('ob-finish');
      var skipCloudBtn = document.getElementById('ob-skip-cloud');

      if (testBtn && keyInput) {
        testBtn.addEventListener('click', function () {
          var k = keyInput.value.trim();
          if (!k) {
            UI.toast('Please enter a Gemini key first.', 'warning');
            return;
          }
          if (statusEl) { statusEl.textContent = 'Testing connection...'; }
          if (typeof llmAsk === 'function') {
            llmAsk({
              provider: 'gemini',
              key: k,
              systemPrompt: 'Automated test. Reply OK.',
              messages: [{ role: 'user', content: 'Ping' }]
            }).then(function () {
              if (statusEl) { statusEl.innerHTML = '<strong style="color:var(--ok);">✅ Verified & Active!</strong>'; }
              UI.toast('✅ Gemini verified & active!', 'success');
              var s = STORE.get('settings') || {};
              s.geminiKey = k;
              s.llmProvider = 'gemini';
              STORE.set('settings', s);
              STORE.save();
              if (typeof NOVA !== 'undefined') { NOVA.ready = true; }
              if (typeof VIEWS.coach !== 'undefined') { VIEWS.coach.ready = true; }
            }).catch(function (err) {
              if (statusEl) { statusEl.innerHTML = '<strong style="color:var(--bad);">❌ Failed</strong>'; }
              UI.toast('Connection failed: ' + (err.message || 'Check key'), 'error');
            });
          }
        });
      }

      function _completeAll() {
        var k = keyInput ? keyInput.value.trim() : '';
        if (k) {
          var s = STORE.get('settings') || {};
          s.geminiKey = k;
          s.llmProvider = 'gemini';
          STORE.set('settings', s);
          if (typeof NOVA !== 'undefined') { NOVA.ready = true; }
          if (typeof VIEWS.coach !== 'undefined') { VIEWS.coach.ready = true; }
        }
        var u = STORE.get('user') || {};
        if (!u.name) { u.name = self._answers.name || 'Learner'; }
        if (!u.level) { u.level = self._answers.level || 'A2'; }
        if (!u.placementTag) { u.placementTag = self._answers.placementTag || u.level; }
        if (!u.goal) { u.goal = 'Daily conversation fluency'; }
        STORE.set('user', u);
        STORE.save();
        if (typeof navigate === 'function') {
          navigate('home');
        }
      }

      if (finishBtn) { finishBtn.addEventListener('click', _completeAll); }
      if (skipCloudBtn) { skipCloudBtn.addEventListener('click', _completeAll); }
    }
  }
};
