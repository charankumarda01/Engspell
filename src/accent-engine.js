/* =====================================================================
   accent-engine.js — Indian Accent Studio Engine & View (M20 ACCENT-UP)
   ES5 only — zero dependencies, fully offline
   Speech grading is word-level (SPEECH.listen + U.align).
   ===================================================================== */

var ACCENT = (function () {
  'use strict';

  function getPacks() {
    var p1 = (typeof ACCENT_PACKS !== 'undefined' && Array.isArray(ACCENT_PACKS)) ? ACCENT_PACKS : [];
    var p2 = (typeof ACCENT_PACKS_2 !== 'undefined' && Array.isArray(ACCENT_PACKS_2)) ? ACCENT_PACKS_2 : [];
    return p1.concat(p2);
  }

  function getPack(id) {
    var packs = getPacks();
    for (var i = 0; i < packs.length; i++) {
      if (packs[i].id === id) { return packs[i]; }
    }
    return packs.length > 0 ? packs[0] : null;
  }

  function getStore() {
    if (typeof STORE === 'undefined' || !STORE.get) {
      return { packs: {}, lastXpDate: '' };
    }
    var acc = STORE.get('accent');
    if (!acc || typeof acc !== 'object') {
      acc = { packs: {}, lastXpDate: '' };
    }
    if (!acc.packs) { acc.packs = {}; }
    return acc;
  }

  function getPackProgress(id) {
    var acc = getStore();
    var p = acc.packs[id];
    if (!p) {
      return { listenScore: 0, sayScore: 0, sentenceScore: 0, done: false, lastTs: 0, lastXpDate: '' };
    }
    return {
      listenScore: p.listenScore || 0,
      sayScore: p.sayScore || 0,
      sentenceScore: p.sentenceScore || 0,
      done: !!p.done,
      lastTs: p.lastTs || 0,
      lastXpDate: p.lastXpDate || ''
    };
  }

  function isPackDone(prog, pack) {
    if (!prog) { return false; }
    if (prog.done) { return true; }
    var modes = (pack && pack.modes && Array.isArray(pack.modes)) ? pack.modes : ['listen', 'say', 'sentence'];
    var hasListen = (modes.indexOf('listen') !== -1);
    var hasSay = (modes.indexOf('say') !== -1);
    var hasSentence = (modes.indexOf('sentence') !== -1);

    if (!hasListen && !hasSay && hasSentence) {
      return (prog.sentenceScore >= 85);
    }
    if (hasListen && !hasSay && hasSentence) {
      return (prog.listenScore >= 80 && prog.sentenceScore >= 85);
    }
    if (hasListen && hasSay) {
      return (prog.listenScore >= 80 && prog.sayScore >= 75);
    }
    if (hasListen) {
      return (prog.listenScore >= 80);
    }
    if (hasSay) {
      return (prog.sayScore >= 75);
    }
    return false;
  }

  function isUnlocked(id) {
    var packs = getPacks();
    if (!packs.length) { return false; }
    if (packs[0].id === id) { return true; } // Pack 1 is always unlocked

    var idx = -1;
    for (var i = 0; i < packs.length; i++) {
      if (packs[i].id === id) { idx = i; break; }
    }
    if (idx <= 0) { return idx === 0; }

    var prevPack = packs[idx - 1];
    var prevProg = getPackProgress(prevPack.id);
    return isPackDone(prevProg, prevPack);
  }

  function hasNeutralizedBadge() {
    var packs = getPacks();
    if (!packs.length || packs.length < 13) { return false; }
    for (var i = 0; i < packs.length; i++) {
      var pk = packs[i];
      var prog = getPackProgress(pk.id);
      if (!isPackDone(prog, pk)) { return false; }
    }
    return true;
  }

  function saveProgress(id, mode, score) {
    if (typeof STORE === 'undefined' || !STORE.get || !STORE.set) { return { xpAwarded: 0 }; }
    var acc = getStore();
    if (!acc.packs[id]) {
      acc.packs[id] = { listenScore: 0, sayScore: 0, sentenceScore: 0, done: false, lastTs: 0, lastXpDate: '' };
    }
    var p = acc.packs[id];
    p.lastTs = Date.now();

    if (mode === 'listen') {
      p.listenScore = Math.max(p.listenScore || 0, Math.round(score));
    } else if (mode === 'say') {
      p.sayScore = Math.max(p.sayScore || 0, Math.round(score));
    } else if (mode === 'sentence') {
      p.sentenceScore = Math.max(p.sentenceScore || 0, Math.round(score));
    }

    var pack = getPack(id);
    if (isPackDone(p, pack)) {
      p.done = true;
    }

    // TRAINER.log pronunciation per drill
    if (typeof TRAINER !== 'undefined' && TRAINER.log) {
      TRAINER.log({ skill: 'pronunciation', delta: 2, source: 'accent/' + id, ts: Date.now() });
    }

    // Daily XP anti-farm: only once per pack per day
    var today = (new Date()).toISOString().slice(0, 10);
    var xpAwarded = 0;
    if (p.lastXpDate !== today && score >= 70) {
      p.lastXpDate = today;
      xpAwarded = 20;
      STORE.addXP(20, 'accent/' + id);
      if (typeof UI !== 'undefined' && UI.toast) {
        UI.toast('🎉 +20 XP! Accent drill mastered', 'success');
      }
    }

    STORE.set('accent', acc);
    return { xpAwarded: xpAwarded, prog: p };
  }

  function buildListenQuiz(packId, itemIdx) {
    var pack = getPack(packId);
    if (!pack) { return null; }

    if (pack.pairs && pack.pairs.length > 0) {
      var pair = pack.pairs[itemIdx % pack.pairs.length];
      // Alternate between testing target (pair.b) and desi (pair.a)
      var pickTarget = (itemIdx % 2 === 0);
      var correctWord = pickTarget ? pair.b.w : pair.a.w;
      var options = (itemIdx % 2 === 0) ? [pair.a.w, pair.b.w] : [pair.b.w, pair.a.w];
      return {
        wordToSpeak: correctWord,
        correctWord: correctWord,
        options: options,
        pair: pair
      };
    } else if (pack.words && pack.words.length > 0) {
      var wObj = pack.words[itemIdx % pack.words.length];
      var nextObj = pack.words[(itemIdx + 1) % pack.words.length];
      var opts = [wObj.w, nextObj.w];
      return {
        wordToSpeak: wObj.w,
        correctWord: wObj.w,
        options: opts,
        wordObj: wObj
      };
    } else if (pack.sentences && pack.sentences.length > 0) {
      var s = pack.sentences[itemIdx % pack.sentences.length];
      var sText = (typeof s === 'string') ? s : s.text;
      return {
        wordToSpeak: sText,
        correctWord: sText,
        options: [sText],
        sentence: s
      };
    }
    return null;
  }

  function evaluateSay(packId, itemIdx, spokenText) {
    var pack = getPack(packId);
    if (!pack) { return { verdict: 'RETRY', message: 'Pack not found' }; }

    var clean = (spokenText || '').toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');

    if (pack.pairs && pack.pairs.length > 0) {
      var pair = pack.pairs[itemIdx % pack.pairs.length];
      var targetWord = pair.b.w.toLowerCase().trim();
      var desiWord = pair.a.w.toLowerCase().trim();

      // Check if target word is heard
      var tokens = clean.split(/\s+/).filter(Boolean);
      var matchedTarget = (clean === targetWord || tokens.indexOf(targetWord) !== -1);
      var matchedDesi = (clean === desiWord || tokens.indexOf(desiWord) !== -1);

      if (matchedTarget) {
        return {
          verdict: 'HIT',
          word: pair.b.w,
          targetWord: pair.b.w,
          desiTwin: pair.a.w,
          message: 'Excellent! Clear international pronunciation for "' + pair.b.w + '".'
        };
      } else if (matchedDesi) {
        var trapMsg = '⚠️ Desi twin detected: you said "' + pair.a.w + '" instead of "' + pair.b.w + '". Focus on: ' + pack.fix;
        if (pack.id === 'ax-asp') {
          trapMsg = 'Your stop is unaspirated — add the puff of air. Focus on: ' + pack.fix;
        } else if (pack.id === 'ax-final') {
          trapMsg = 'You dropped the -ed — endings carry the tense, carry the meaning. Focus on: ' + pack.fix;
        }
        return {
          verdict: 'MISS',
          word: pair.b.w,
          targetWord: pair.b.w,
          desiTwin: pair.a.w,
          trap: pack.desiTrap,
          fix: pack.fix,
          message: trapMsg
        };
      } else {
        return {
          verdict: 'RETRY',
          word: pair.b.w,
          targetWord: pair.b.w,
          heard: spokenText || '(no speech detected)',
          fix: pack.fix,
          message: 'Heard "' + (spokenText || '...') + '". Try again, focusing on: ' + pack.fix
        };
      }
    } else if (pack.words && pack.words.length > 0) {
      var wObj = pack.words[itemIdx % pack.words.length];
      var wNorm = wObj.w.toLowerCase().trim();
      var tokens2 = clean.split(/\s+/).filter(Boolean);
      var matchedWord = (clean === wNorm || tokens2.indexOf(wNorm) !== -1);

      if (matchedWord) {
        return {
          verdict: 'HIT',
          word: wObj.w,
          stressMarked: wObj.stressMarked,
          message: 'Great job! Correct word and natural stress: ' + wObj.stressMarked + '.'
        };
      } else {
        return {
          verdict: 'RETRY',
          word: wObj.w,
          heard: spokenText || '(no speech detected)',
          fix: pack.fix,
          message: 'Try saying "' + wObj.stressMarked + '" again clearly.'
        };
      }
    }

    return { verdict: 'HIT', word: clean, message: 'Done!' };
  }

  function evaluateSentence(targetSentence, spokenSentence) {
    var tText = (typeof targetSentence === 'string') ? targetSentence : targetSentence.text;
    var tTokens = (tText || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    var sTokens = (spokenSentence || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    if (tTokens.length === 0) { return { pass: true, pct: 100, matched: 0, total: 0 }; }

    var matched = 0;
    for (var i = 0; i < tTokens.length; i++) {
      if (sTokens.indexOf(tTokens[i]) !== -1) {
        matched++;
      }
    }
    var pct = matched / tTokens.length;
    return {
      pass: pct >= 0.85,
      pct: Math.round(pct * 100),
      matched: matched,
      total: tTokens.length
    };
  }

  return {
    getPacks: getPacks,
    getPack: getPack,
    getStore: getStore,
    getPackProgress: getPackProgress,
    isPackDone: isPackDone,
    isUnlocked: isUnlocked,
    hasNeutralizedBadge: hasNeutralizedBadge,
    saveProgress: saveProgress,
    buildListenQuiz: buildListenQuiz,
    evaluateSay: evaluateSay,
    evaluateSentence: evaluateSentence
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   VIEWS.accent — Indian Accent Studio (M20 ACCENT-UP)
   ════════════════════════════════════════════════════════════════════*/
var VIEWS = (typeof VIEWS !== 'undefined') ? VIEWS : {};

VIEWS.accent = {
  _mode: 'listen',
  _quizIdx: 0,
  _quizScore: 0,
  _sayIdx: 0,
  _sayHits: 0,
  _sentIdx: 0,
  _sentPasses: 0,

  render: function (el, packId) {
    'use strict';
    var self = this;
    if (!el) { return; }

    var packs = ACCENT.getPacks();

    // ── 1. Accent Studio Home (List of 7 packs) ──
    if (!packId) {
      self._renderHome(el, packs);
      return;
    }

    // ── 2. Inside a specific pack ──
    var pack = ACCENT.getPack(packId);
    if (!pack) {
      self._renderHome(el, packs);
      return;
    }
    self._renderPack(el, pack);
  },

  _renderHome: function (el, packs) {
    var hasBadge = ACCENT.hasNeutralizedBadge();

    // Progress strip
    var stripHtml = '<div class="accent-progress-strip" style="display:flex;gap:8px;margin:16px 0 24px 0;overflow-x:auto;padding-bottom:6px;">';
    for (var i = 0; i < packs.length; i++) {
      var p = packs[i];
      var prog = ACCENT.getPackProgress(p.id);
      var unlocked = ACCENT.isUnlocked(p.id);
      var isDone = ACCENT.isPackDone(prog, p);
      var icon = isDone ? '✅' : (unlocked ? '🔓' : '🔒');
      var bg = isDone ? 'rgba(52,211,153,0.15)' : (unlocked ? 'rgba(124,92,255,0.15)' : 'var(--bg2)');
      var border = isDone ? 'var(--ok)' : (unlocked ? 'var(--acc)' : 'var(--line)');

      stripHtml += '<div style="flex:1;min-width:110px;background:' + bg + ';border:1px solid ' + border + ';border-radius:var(--r-sm);padding:8px 10px;text-align:center;">' +
        '<div style="font-size:0.72rem;color:var(--mut);text-transform:uppercase;">Pack ' + (i + 1) + '</div>' +
        '<div style="font-size:0.85rem;font-weight:700;margin-top:2px;">' + icon + ' ' + p.id.replace('ax-', '') + '</div>' +
        '</div>';
    }
    stripHtml += '</div>';

    // Badge banner
    var badgeBanner = '';
    if (hasBadge) {
      badgeBanner = '<div class="card" style="background:rgba(52,211,153,0.12);border:1px solid var(--ok);margin-bottom:20px;padding:16px 20px;display:flex;align-items:center;gap:14px;">' +
        '<span style="font-size:2rem;">🇮🇳✨</span>' +
        '<div><strong style="color:var(--ok);font-size:1.05rem;">+Accent Neutralized Master Badge Unlocked!</strong>' +
        '<p style="color:var(--txt);font-size:0.85rem;margin:4px 0 0 0;">You have mastered all 13 Indian-English accent contrast modules. Your speech is crisp, globally intelligible, and authentic.</p></div>' +
        '</div>';
    }

    // Grid of pack cards
    var cardsHtml = '<div class="accent-packs-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:16px;">';
    for (var j = 0; j < packs.length; j++) {
      var pk = packs[j];
      var pr = ACCENT.getPackProgress(pk.id);
      var isUnl = ACCENT.isUnlocked(pk.id);
      var pkDone = ACCENT.isPackDone(pr, pk);

      var statusBadge = pkDone
        ? '<span class="badge" style="background:rgba(52,211,153,0.2);color:var(--ok);">✅ Mastered</span>'
        : (isUnl ? '<span class="badge" style="background:rgba(124,92,255,0.2);color:var(--acc2);">🔓 Unlocked</span>'
                 : '<span class="badge" style="background:rgba(154,166,201,0.2);color:var(--mut);">🔒 Locked</span>');

      var statsText = 'Ear: ' + pr.listenScore + '% | Voice: ' + pr.sayScore + '%';
      if (pk.modes && pk.modes.indexOf('say') === -1) {
        statsText = 'Sentence Run: ' + pr.sentenceScore + '%';
      }

      cardsHtml += '<div class="card accent-pack-card" data-pack-id="' + pk.id + '" style="cursor:' + (isUnl ? 'pointer' : 'not-allowed') + ';opacity:' + (isUnl ? '1' : '0.65') + ';" onclick="' + (isUnl ? 'navigate(\'accent\',\'' + pk.id + '\')' : '') + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
          '<span class="badge" style="font-size:0.75rem;">' + pk.ipa + '</span>' +
          statusBadge +
        '</div>' +
        '<h3 style="font-size:1.1rem;margin-bottom:6px;">' + (j + 1) + '. ' + pk.title + '</h3>' +
        '<p style="font-size:0.85rem;color:var(--mut);line-height:1.4;margin-bottom:12px;">' + pk.desiTrap + '</p>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.78rem;color:var(--mut);border-top:1px solid var(--line);padding-top:10px;">' +
          '<span>' + statsText + '</span>' +
          (isUnl ? '<span style="color:var(--acc2);font-weight:600;">Train Pack →</span>' : '<span>Requires Pack ' + j + '</span>') +
        '</div>' +
        '</div>';
    }
    cardsHtml += '</div>';

    el.innerHTML = '<div class="view-accent" style="max-width:960px;margin:0 auto;padding:10px 0;">' +
      '<h1>🇮🇳 Indian Accent Studio</h1>' +
      '<p class="sub">Upgrade from regional Indian phonology to crisp international clarity without erasing your voice. 13 research-backed packs with ear training, word-level contrasts, and stress rhythm.</p>' +
      badgeBanner +
      stripHtml +
      '<div class="section-title">🎙️ Accent Neutralization Curriculum</div>' +
      cardsHtml +
      '</div>';
  },

  _renderPack: function (el, pack) {
    var self = this;
    var prog = ACCENT.getPackProgress(pack.id);
    var modes = (pack.modes && Array.isArray(pack.modes)) ? pack.modes : ['listen', 'say', 'sentence'];
    if (modes.indexOf(self._mode) === -1) {
      self._mode = modes[0];
    }
    var mode = self._mode;

    var tabsHtml = '<div class="coach-modes" style="margin-bottom:20px;">';
    if (modes.indexOf('listen') !== -1) {
      tabsHtml += '<button class="tab-btn' + (mode === 'listen' ? ' active' : '') + '" id="ax-tab-listen">👂 1. Listen Quiz (' + prog.listenScore + '%)</button>';
    }
    if (modes.indexOf('say') !== -1) {
      tabsHtml += '<button class="tab-btn' + (mode === 'say' ? ' active' : '') + '" id="ax-tab-say">🎙️ 2. Say It (' + prog.sayScore + '%)</button>';
    }
    if (modes.indexOf('sentence') !== -1) {
      tabsHtml += '<button class="tab-btn' + (mode === 'sentence' ? ' active' : '') + '" id="ax-tab-sentence">🗣️ 3. Sentence Run (' + prog.sentenceScore + '%)</button>';
    }
    tabsHtml += '</div>';

    var html = '<div class="view-accent-detail" style="max-width:760px;margin:0 auto;padding:10px 0;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">' +
        '<button class="btn-back" onclick="navigate(\'accent\')">← All Accent Packs</button>' +
        '<span class="badge" style="font-size:0.82rem;">' + pack.ipa + '</span>' +
      '</div>' +
      '<h1>' + pack.title + '</h1>' +

      // Desi trap banner
      '<div class="accent-trap-box" style="background:rgba(245,158,11,0.12);border:1px solid var(--warn);border-radius:var(--r-md);padding:14px 18px;margin-bottom:16px;">' +
        '<div style="font-size:0.78rem;font-weight:700;color:var(--warn);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">⚠️ The Indian English Pattern</div>' +
        '<p style="font-size:0.92rem;line-height:1.45;color:var(--txt);margin:0;">' + pack.desiTrap + '</p>' +
      '</div>' +

      // Fix card
      '<div class="accent-fix-box" style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-md);padding:14px 18px;margin-bottom:20px;">' +
        '<div style="font-size:0.78rem;font-weight:700;color:var(--acc2);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">💡 How to Neutralize</div>' +
        '<p style="font-size:0.92rem;line-height:1.45;color:var(--txt);margin:0;">' + pack.fix + '</p>' +
      '</div>' +

      // Mode tabs
      tabsHtml +

      '<div id="accent-drill-area"></div>' +
      '</div>';

    el.innerHTML = html;

    // Tab bindings
    var tListen = document.getElementById('ax-tab-listen');
    if (tListen) { tListen.addEventListener('click', function () { self._mode = 'listen'; self.render(el, pack.id); }); }
    var tSay = document.getElementById('ax-tab-say');
    if (tSay) { tSay.addEventListener('click', function () { self._mode = 'say'; self.render(el, pack.id); }); }
    var tSent = document.getElementById('ax-tab-sentence');
    if (tSent) { tSent.addEventListener('click', function () { self._mode = 'sentence'; self.render(el, pack.id); }); }

    var area = document.getElementById('accent-drill-area');
    if (!area) { return; }

    if (mode === 'listen') {
      self._renderListenMode(area, pack, el);
    } else if (mode === 'say') {
      self._renderSayMode(area, pack, el);
    } else if (mode === 'sentence') {
      self._renderSentenceMode(area, pack, el);
    }
  },

  _renderListenMode: function (area, pack, rootEl) {
    var self = this;
    var quiz = ACCENT.buildListenQuiz(pack.id, self._quizIdx);
    if (!quiz) {
      area.innerHTML = '<p>No quiz available for this pack.</p>';
      return;
    }

    var totalQs = 6;
    var curQ = (self._quizIdx % totalQs) + 1;

    var html = '<div class="card" style="padding:22px 20px;text-align:center;">' +
      '<div style="font-size:0.8rem;color:var(--mut);margin-bottom:12px;">Question ' + curQ + ' of ' + totalQs + ' · Trains Ear Contrast</div>' +
      '<button class="btn-primary" id="ax-listen-speak-btn" style="padding:12px 26px;font-size:1.1rem;margin-bottom:20px;">🔊 Play Word</button>' +
      '<div style="font-size:0.85rem;color:var(--mut);margin-bottom:16px;">Which word did you hear?</div>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">';

    for (var oi = 0; oi < quiz.options.length; oi++) {
      html += '<button class="btn-secondary ax-listen-opt" data-opt="' + _esc(quiz.options[oi]) + '" style="font-size:1.1rem;padding:12px 28px;min-width:140px;">' + _esc(quiz.options[oi]) + '</button>';
    }
    html += '</div><div id="ax-listen-feedback" style="min-height:36px;font-size:0.95rem;font-weight:600;"></div></div>';

    area.innerHTML = html;

    var speakBtn = document.getElementById('ax-listen-speak-btn');
    if (speakBtn && typeof SPEECH !== 'undefined' && SPEECH.speak) {
      speakBtn.addEventListener('click', function () {
        SPEECH.speak(quiz.wordToSpeak);
      });
      // Auto-speak once
      setTimeout(function () { SPEECH.speak(quiz.wordToSpeak); }, 300);
    }

    var optBtns = area.querySelectorAll('.ax-listen-opt');
    for (var bi = 0; bi < optBtns.length; bi++) {
      optBtns[bi].addEventListener('click', function () {
        var chosen = this.getAttribute('data-opt');
        var fb = document.getElementById('ax-listen-feedback');
        var isCorrect = (chosen.toLowerCase() === quiz.correctWord.toLowerCase());

        if (isCorrect) {
          self._quizScore++;
          if (fb) { fb.innerHTML = '<span style="color:var(--ok);">✅ Correct! You heard "' + _esc(quiz.correctWord) + '".</span>'; }
        } else {
          if (fb) { fb.innerHTML = '<span style="color:var(--bad);">❌ That was "' + _esc(quiz.correctWord) + '", not "' + _esc(chosen) + '".</span>'; }
        }

        setTimeout(function () {
          self._quizIdx++;
          if (self._quizIdx >= totalQs) {
            var finalScore = Math.round((self._quizScore / totalQs) * 100);
            ACCENT.saveProgress(pack.id, 'listen', finalScore);
            self._quizIdx = 0;
            self._quizScore = 0;
            self._mode = 'say'; // advance to say mode
            self.render(rootEl, pack.id);
          } else {
            self._renderListenMode(area, pack, rootEl);
          }
        }, 1200);
      });
    }
  },

  _renderSayMode: function (area, pack, rootEl) {
    var self = this;
    var totalItems = 6;
    var curIdx = self._sayIdx % totalItems;

    var targetWord = '';
    var ipa = '';
    var note = '';

    if (pack.pairs && pack.pairs.length > 0) {
      var pair = pack.pairs[curIdx % pack.pairs.length];
      targetWord = pair.b.w;
      ipa = pair.b.ipa;
      note = 'Target: ' + pair.b.w + ' · Watch out for desi twin: ' + pair.a.w;
    } else if (pack.words && pack.words.length > 0) {
      var wObj = pack.words[curIdx % pack.words.length];
      targetWord = wObj.w;
      ipa = wObj.ipa;
      note = 'Stress pattern: ' + wObj.stressMarked;
    }

    var html = '<div class="card" style="padding:22px 20px;text-align:center;">' +
      '<div style="font-size:0.8rem;color:var(--mut);margin-bottom:10px;">Item ' + (curIdx + 1) + ' of ' + totalItems + ' · Word-Level Voice Verification</div>' +
      '<div style="font-size:2rem;font-weight:800;color:var(--txt);margin-bottom:4px;">' + _esc(targetWord) + '</div>' +
      '<div style="font-size:1.05rem;color:var(--acc2);margin-bottom:10px;">' + _esc(ipa) + '</div>' +
      '<div style="font-size:0.85rem;color:var(--mut);margin-bottom:20px;">' + _esc(note) + '</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:16px;">';

    if (typeof SPEECH !== 'undefined' && SPEECH.canListen && SPEECH.canListen()) {
      html += '<button class="btn-primary" id="ax-say-mic-btn" style="padding:10px 22px;font-size:1rem;">🎙️ Say Word</button>';
    }
    html += '<button class="btn-ghost btn-sm" id="ax-say-listen-btn">🔊 Hear Correct</button>' +
      '</div>' +
      '<div style="display:flex;gap:8px;max-width:380px;margin:0 auto 16px auto;">' +
        '<input type="text" id="ax-say-typed" placeholder="Or type word to test..." style="flex:1;padding:8px 12px;background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--txt);" />' +
        '<button class="btn-secondary" id="ax-say-typed-btn">Check</button>' +
      '</div>' +
      '<div id="ax-say-verdict" style="min-height:50px;padding:8px 12px;border-radius:var(--r-sm);font-size:0.92rem;line-height:1.4;"></div>' +
      '</div>';

    area.innerHTML = html;

    var listenBtn = document.getElementById('ax-say-listen-btn');
    if (listenBtn && typeof SPEECH !== 'undefined' && SPEECH.speak) {
      listenBtn.addEventListener('click', function () { SPEECH.speak(targetWord); });
    }

    function handleResult(text) {
      var verdict = ACCENT.evaluateSay(pack.id, curIdx, text);
      var vBox = document.getElementById('ax-say-verdict');
      if (!vBox) { return; }

      if (verdict.verdict === 'HIT') {
        self._sayHits++;
        vBox.style.background = 'rgba(52,211,153,0.15)';
        vBox.style.color = 'var(--ok)';
        vBox.style.border = '1px solid var(--ok)';
        vBox.innerHTML = '<strong>🎉 HIT!</strong> ' + _esc(verdict.message);

        setTimeout(function () {
          self._sayIdx++;
          if (self._sayIdx >= totalItems) {
            var finalScore = Math.round((self._sayHits / totalItems) * 100);
            ACCENT.saveProgress(pack.id, 'say', finalScore);
            self._sayIdx = 0;
            self._sayHits = 0;
            self._mode = 'sentence';
            self.render(rootEl, pack.id);
          } else {
            self._renderSayMode(area, pack, rootEl);
          }
        }, 1200);
      } else if (verdict.verdict === 'MISS') {
        vBox.style.background = 'rgba(239,68,68,0.15)';
        vBox.style.color = 'var(--bad)';
        vBox.style.border = '1px solid var(--bad)';
        vBox.innerHTML = '<strong>⚠️ MISS (Desi Twin)</strong><br>' + _esc(verdict.message);
      } else {
        vBox.style.background = 'rgba(245,158,11,0.15)';
        vBox.style.color = 'var(--warn)';
        vBox.style.border = '1px solid var(--warn)';
        vBox.innerHTML = '<strong>🔁 RETRY</strong><br>' + _esc(verdict.message);
      }
    }

    var micBtn = document.getElementById('ax-say-mic-btn');
    if (micBtn && typeof SPEECH !== 'undefined' && SPEECH.listen) {
      micBtn.addEventListener('click', function () {
        micBtn.textContent = '🔴 Listening...';
        micBtn.disabled = true;
        SPEECH.listen({
          onresult: function (t) {
            micBtn.textContent = '🎙️ Say Word';
            micBtn.disabled = false;
            handleResult(t);
          },
          onend: function () {
            micBtn.textContent = '🎙️ Say Word';
            micBtn.disabled = false;
          },
          onerror: function () {
            micBtn.textContent = '🎙️ Say Word';
            micBtn.disabled = false;
          }
        });
      });
    }

    var typedBtn = document.getElementById('ax-say-typed-btn');
    var typedInput = document.getElementById('ax-say-typed');
    if (typedBtn && typedInput) {
      typedBtn.addEventListener('click', function () {
        var v = typedInput.value.trim();
        if (v) { handleResult(v); }
      });
      typedInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var val = typedInput.value.trim();
          if (val) { handleResult(val); }
        }
      });
    }
  },

  _renderSentenceMode: function (area, pack, rootEl) {
    var self = this;
    var totalSentences = 3;
    var curIdx = self._sentIdx % totalSentences;
    var sObj = pack.sentences[curIdx % pack.sentences.length];
    var sText = (typeof sObj === 'string') ? sObj : sObj.text;
    var stressMark = (typeof sObj === 'object' && sObj.stressMark) ? sObj.stressMark : sText;

    var html = '<div class="card" style="padding:22px 20px;text-align:center;">' +
      '<div style="font-size:0.8rem;color:var(--mut);margin-bottom:12px;">Sentence ' + (curIdx + 1) + ' of ' + totalSentences + ' · ≥85% Word Alignment Pass Threshold</div>' +
      '<div style="font-size:1.25rem;font-weight:700;color:var(--txt);margin-bottom:8px;line-height:1.4;">' + _esc(stressMark) + '</div>' +
      '<p style="font-size:0.85rem;color:var(--mut);margin-bottom:18px;">Read the sentence aloud smoothly, adhering to the accent contrast and rhythm.</p>' +
      '<div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:16px;">';

    if (typeof SPEECH !== 'undefined' && SPEECH.canListen && SPEECH.canListen()) {
      html += '<button class="btn-primary" id="ax-sent-mic-btn" style="padding:10px 22px;font-size:1rem;">🎙️ Read Sentence</button>';
    }
    html += '<button class="btn-ghost btn-sm" id="ax-sent-listen-btn">🔊 Hear Model</button>' +
      '</div>' +
      '<div style="display:flex;gap:8px;max-width:440px;margin:0 auto 16px auto;">' +
        '<input type="text" id="ax-sent-typed" placeholder="Or type sentence to test..." style="flex:1;padding:8px 12px;background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--txt);" />' +
        '<button class="btn-secondary" id="ax-sent-typed-btn">Check</button>' +
      '</div>' +
      '<div id="ax-sent-verdict" style="min-height:45px;padding:8px 12px;border-radius:var(--r-sm);font-size:0.92rem;line-height:1.4;"></div>' +
      '</div>';

    area.innerHTML = html;

    var listenBtn = document.getElementById('ax-sent-listen-btn');
    if (listenBtn && typeof SPEECH !== 'undefined' && SPEECH.speak) {
      listenBtn.addEventListener('click', function () { SPEECH.speak(sText); });
    }

    function handleSentenceResult(spoken) {
      var res = ACCENT.evaluateSentence(sText, spoken);
      var vBox = document.getElementById('ax-sent-verdict');
      if (!vBox) { return; }

      if (res.pass) {
        self._sentPasses++;
        vBox.style.background = 'rgba(52,211,153,0.15)';
        vBox.style.color = 'var(--ok)';
        vBox.style.border = '1px solid var(--ok)';
        vBox.innerHTML = '<strong>🎉 PASS (' + res.pct + '%)</strong> ' + res.matched + ' of ' + res.total + ' words verified.';

        setTimeout(function () {
          self._sentIdx++;
          if (self._sentIdx >= totalSentences) {
            var finalScore = Math.round((self._sentPasses / totalSentences) * 100);
            ACCENT.saveProgress(pack.id, 'sentence', finalScore);
            self._sentIdx = 0;
            self._sentPasses = 0;
            self.render(rootEl, pack.id);
          } else {
            self._renderSentenceMode(area, pack, rootEl);
          }
        }, 1400);
      } else {
        vBox.style.background = 'rgba(239,68,68,0.15)';
        vBox.style.color = 'var(--bad)';
        vBox.style.border = '1px solid var(--bad)';
        vBox.innerHTML = '<strong>❌ Needs Practice (' + res.pct + '%)</strong> Only ' + res.matched + ' of ' + res.total + ' words matched. Minimum 85% required.';
      }
    }

    var micBtn = document.getElementById('ax-sent-mic-btn');
    if (micBtn && typeof SPEECH !== 'undefined' && SPEECH.listen) {
      micBtn.addEventListener('click', function () {
        micBtn.textContent = '🔴 Listening...';
        micBtn.disabled = true;
        SPEECH.listen({
          onresult: function (t) {
            micBtn.textContent = '🎙️ Read Sentence';
            micBtn.disabled = false;
            handleSentenceResult(t);
          },
          onend: function () {
            micBtn.textContent = '🎙️ Read Sentence';
            micBtn.disabled = false;
          },
          onerror: function () {
            micBtn.textContent = '🎙️ Read Sentence';
            micBtn.disabled = false;
          }
        });
      });
    }

    var typedBtn = document.getElementById('ax-sent-typed-btn');
    var typedInput = document.getElementById('ax-sent-typed');
    if (typedBtn && typedInput) {
      typedBtn.addEventListener('click', function () {
        var v = typedInput.value.trim();
        if (v) { handleSentenceResult(v); }
      });
      typedInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var val = typedInput.value.trim();
          if (val) { handleSentenceResult(val); }
        }
      });
    }
  }
};

function _esc(s) {
  if (!s) { return ''; }
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

if (typeof window !== 'undefined') {
  window.ACCENT = ACCENT;
  window.VIEWS = VIEWS;
}
if (typeof global !== 'undefined') {
  global.ACCENT = ACCENT;
  global.VIEWS = VIEWS;
}
