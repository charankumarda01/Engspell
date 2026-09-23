/* =====================================================================
   views-a.js — ES5 ONLY
   VIEWS.home, VIEWS.foundations, VIEWS.pronunciation
   ===================================================================== */

/* ── HOME ──────────────────────────────────────────────────────────── */
function _escA(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function _renderFlowCard() {
  if (typeof FLOW === 'undefined' || !FLOW.get) { return ''; }
  var flow = FLOW.get();
  var cur = FLOW.current();
  var defs = FLOW.stepDefs;
  var doneCount = 0;
  for (var d = 0; d < flow.steps.length; d++) {
    if (flow.steps[d]) { doneCount++; }
  }
  var isAllDone = (doneCount === 5);

  var h = '<div class="flow-card">' +
    '<div class="flow-card-header">' +
      '<div class="flow-card-title">' +
        (isAllDone ? '🌟 <span>Today\'s Flow Complete!</span>' : '⚡ <span>Today\'s Flow</span>') +
      '</div>' +
      '<div class="flow-card-badge' + (isAllDone ? ' complete' : '') + '">' +
        (isAllDone ? '5/5 Done · Daily Star Earned 🔥' : doneCount + '/5 Complete · Next: ' + cur.label) +
      '</div>' +
    '</div>' +
    '<div class="flow-steps">';

  for (var i = 0; i < defs.length; i++) {
    var stepDef = defs[i];
    var isDone = !!flow.steps[i];
    var isUnlocked = FLOW.isStepUnlocked(i + 1);
    var isActive = (!isDone && isUnlocked);
    var isLocked = !isUnlocked;

    var stepCls = 'flow-step';
    if (isDone) { stepCls += ' done'; }
    else if (isActive) { stepCls += ' active'; }
    else if (isLocked) { stepCls += ' locked'; }

    var numText = isDone ? '✓' : (isLocked ? '🔒' : String(i + 1));
    var actionHtml = '';
    if (isDone) {
      actionHtml = '<button type="button" class="flow-step-btn" onclick="FLOW.openStep(' + (i + 1) + ')">Review ✓</button>';
    } else if (isActive) {
      actionHtml = '<button type="button" class="flow-step-btn" onclick="FLOW.openStep(' + (i + 1) + ')">Start →</button>';
    } else {
      actionHtml = '<button type="button" class="flow-step-btn" onclick="FLOW.openStep(' + (i + 1) + ')" title="' + stepDef.reason + '">Locked 🔒</button>';
    }

    h += '<div class="' + stepCls + '" data-step="' + (i + 1) + '">' +
      '<div class="flow-step-top">' +
        '<div class="flow-step-num">' + numText + '</div>' +
        '<div class="flow-step-status">' + (isDone ? '✅ Done' : (isActive ? '▶ Next' : '🔒 Locked')) + '</div>' +
      '</div>' +
      '<div class="flow-step-title">' + (i + 1) + '. ' + stepDef.label + '</div>' +
      '<div class="flow-step-desc">' + (isLocked ? stepDef.reason : stepDef.title) + '</div>' +
      actionHtml +
    '</div>';
  }

  h += '</div></div>';
  return h;
}

VIEWS.home = {
  render: function (el) {
    'use strict';
    var xp = STORE.get('xp') || 0;
    var streak = STORE.get('streak') || 0;
    var user = STORE.get('user') || {};
    var completed = STORE.get('completed') || [];
    var name = user.name || 'Learner';
    var goal = STORE.get('settings') ? (STORE.get('settings').dailyGoal || 10) : 10;
    var weak = TRAINER.weakestFirst ? TRAINER.weakestFirst() : [];
    var nextSkill = weak.length ? weak[0].skill : 'pronunciation';
    var level = user.cefr || (xp >= 3000 ? 'B2' : xp >= 1500 ? 'B1' : xp >= 500 ? 'A2' : 'A1');

    var routeMap = {
      pronunciation: 'pronunciation', grammar: 'atlas', vocab: 'idioms',
      spelling: 'spelling', fluency: 'path', listening: 'listening',
      reading: 'read', writing: 'resume'
    };
    var nextRoute = routeMap[nextSkill] || 'daily';

    var history = TRAINER.xpHistory ? TRAINER.xpHistory() : [];
    var chartBars = '';
    var maxXP = 1;
    for (var h = 0; h < history.length; h++) { if (history[h].xp > maxXP) { maxXP = history[h].xp; } }
    for (var i = Math.max(0, history.length - 7); i < history.length; i++) {
      var pct = Math.round((history[i].xp / maxXP) * 100);
      var d = history[i].date.slice(5);
      chartBars += '<div class="bar-col"><div class="bar" style="height:' + pct + '%"></div><span class="bar-label">' + d + '</span></div>';
    }

    var dueCount = 0;
    var srs = STORE.get('srs') || {};
    var now = Date.now();
    for (var k in srs) {
      if (srs.hasOwnProperty(k) && srs[k] && srs[k].due && srs[k].due <= now) { dueCount++; }
    }

    var allLessons = (typeof DATA_MERGE !== 'undefined') ? DATA_MERGE.allLessons() : ((typeof COURSE !== 'undefined' && COURSE.length) ? COURSE : []);
    var totalLessons = allLessons.length || 68;
    var remaining = Math.max(0, totalLessons - completed.length);
    var nextUncompleted = null;
    for (var uli = 0; uli < allLessons.length; uli++) {
      if (completed.indexOf(allLessons[uli].id) === -1) {
        nextUncompleted = allLessons[uli];
        break;
      }
    }


    var docs = STORE.get('docs') || [];
    var docSub = '';
    if (docs.length === 0) {
      docSub = 'Upload any book, novel, or document to train vocabulary & comprehension with your AI coach.';
    } else {
      var latestDoc = docs[docs.length - 1];
      var docTitle = (latestDoc && latestDoc.title) ? latestDoc.title : 'Document';
      var docLen = (latestDoc && latestDoc.text) ? latestDoc.text.length : 0;
      var docPos = (latestDoc && latestDoc.readPos) ? latestDoc.readPos : 0;
      var pctRead = docLen > 0 ? Math.min(100, Math.round((docPos / docLen) * 100)) : 0;
      docSub = 'Continue reading: "' + _escA(docTitle) + '" · ' + pctRead + '% completed';
    }

    var heroesHtml = '<div class="home-heroes">' +
      '<div class="card home-hero-card" id="hero-live-coach" onclick="navigate(\'coach\'); if(typeof VIEWS.coach!==\'undefined\'){VIEWS.coach._mode=\'drill\';}">' +
        '<div class="hero-card-badge">⚡ Real-Time Speech Matching</div>' +
        '<div class="hero-card-title">🎙️ Live Coach — speak, get stopped, get corrected</div>' +
        '<div class="hero-card-sub">Instant offline feedback with word-by-word matching, interrupt engine, and live pronunciation coaching.</div>' +
        '<span class="hero-card-action">Launch Live Drill →</span>' +
      '</div>' +
      '<div class="card home-hero-card" id="hero-doc-agent" onclick="navigate(\'docstudio\')">' +
        '<div class="hero-card-badge">📄 Personal Document Studio</div>' +
        '<div class="hero-card-title">📄 Learn from YOUR book — upload anything</div>' +
        '<div class="hero-card-sub" id="hero-doc-sub">' + docSub + '</div>' +
        '<span class="hero-card-action">Open Document Studio →</span>' +
      '</div>' +
    '</div>';

    var weeklyStripHtml = '';
    if (typeof WEEKLY !== 'undefined' && WEEKLY.getRollup) {
      var rollup = WEEKLY.getRollup();
      if (rollup.locked) {
        weeklyStripHtml = '<div class="home-weekly-strip" id="home-weekly-strip" style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);padding:8px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;font-size:0.82rem;color:var(--mut);">' +
          '<span>📈 <strong>Weekly Trend:</strong> ' + _escA(rollup.message) + ' (' + rollup.totalSessions + '/3 done)</span>' +
          '<a href="#/path" style="color:var(--acc2);text-decoration:none;font-weight:600;">View progress →</a>' +
        '</div>';
      } else {
        var wCur = rollup.thisWeek || {};
        var wD = rollup.deltas || {};
        weeklyStripHtml = '<div class="home-weekly-strip" id="home-weekly-strip" style="background:var(--bg2);border:1px solid var(--line);border-radius:var(--r-sm);padding:8px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;font-size:0.82rem;color:var(--txt);flex-wrap:wrap;gap:8px;">' +
          '<span>📈 <strong>This Week:</strong> ' + _escA(rollup.story) + ' · ' + (wCur.wpm || 0) + ' WPM (' + (wD.wpm ? wD.wpm.text : '') + ') · ' + (wCur.honestScore || 0) + '/10 honest</span>' +
          '<a href="#/path" style="color:var(--acc2);text-decoration:none;font-weight:600;">View progress →</a>' +
        '</div>';
      }
    }

    var html = '<div class="view-home">' +
      '<div class="card home-greeting-band">' +
        '<div class="greeting-content">' +
          '<h1>Hello, ' + name + '! 👋</h1>' +
          '<p class="sub">Your English mastery studio is ready.</p>' +
        '</div>' +
        '<div class="stat-pills">' +
          '<div class="stat-pill xp-pill" title="Experience Points">⚡ ' + U.fmtXP(xp) + ' XP</div>' +
          '<div class="stat-pill streak-pill" title="Daily Streak">🔥 ' + streak + ' day' + (streak === 1 ? '' : 's') + '</div>' +
          '<div class="stat-pill level-pill" title="Target / CEFR Level">🎓 Level ' + level + '</div>' +
          (dueCount > 0 ? '<a class="stat-pill due-pill" href="#/review" title="SRS Review Items Due">🔁 ' + dueCount + ' due</a>' : '') +
        '</div>' +
      '</div>' +
      _renderFlowCard() +
      heroesHtml +
      weeklyStripHtml +
      '<div class="section-title">🚀 Start Here</div>' +
      '<div class="start-here-grid">' +
        '<div class="card start-card" onclick="navigate(\'daily\')">' +
          '<div class="start-card-icon">☀️</div>' +
          '<div class="start-card-body">' +
            '<h3>Today\'s Dose</h3>' +
            '<p>Twister · Power Word · Idiom · Quote</p>' +
          '</div>' +
          '<span class="start-card-action">Daily Ritual →</span>' +
        '</div>' +

        '<div class="card start-card" id="home-next-lesson-card"' + (nextUncompleted ? ' data-lesson-id="' + nextUncompleted.id + '"' : '') + ' onclick="navigate(\'' + (nextRoute === 'path' && nextUncompleted ? 'lesson' : nextRoute) + '\'' + (nextRoute === 'path' && nextUncompleted ? ',\'' + nextUncompleted.id + '\'' : '') + ')">' +
          '<div class="start-card-icon">' + ((typeof SKILL_META !== 'undefined' && SKILL_META[nextSkill]) ? SKILL_META[nextSkill].icon : '📖') + '</div>' +
          '<div class="start-card-body">' +
            '<h3>Next Lesson</h3>' +
            '<p>' + (nextUncompleted ? '<strong>' + nextUncompleted.id + '</strong>: ' + _escA(nextUncompleted.title) : 'Level up <strong>' + nextSkill + '</strong> (weakest skill)') + '</p>' +
          '</div>' +
          '<span class="start-card-action">Continue →</span>' +
        '</div>' +

        '<div class="card start-card" id="home-accent-card" onclick="navigate(\'accent\')">' +
          '<div class="start-card-icon">🇮🇳</div>' +
          '<div class="start-card-body">' +
            '<h3>Accent Studio</h3>' +
            '<p>Train Indian→neutral, 13 accent packs</p>' +
          '</div>' +
          '<span class="start-card-action">Start Accent →</span>' +
        '</div>' +

        '<div class="card start-card" onclick="navigate(\'coach\')">' +
          '<div class="start-card-icon">🤖</div>' +
          '<div class="start-card-body">' +
            '<h3>Nova AI Coach</h3>' +
            '<p>Voice & chat interactive conversational coaching</p>' +
          '</div>' +
          '<span class="start-card-action">Talk to Nova →</span>' +
        '</div>' +

        '<div class="card start-card" onclick="navigate(\'review\')">' +
          '<div class="start-card-icon">🔁</div>' +
          '<div class="start-card-body">' +
            '<h3>Spaced Review</h3>' +
            '<p>' + (dueCount > 0 ? '<strong>' + dueCount + '</strong> cards due for retention review' : 'All reviews current! Practice memory retention') + '</p>' +
          '</div>' +
          '<span class="start-card-action">' + (dueCount > 0 ? dueCount + ' Due →' : 'Review →') + '</span>' +
        '</div>' +
      '</div>' +

      '<div class="home-analytics-row">' +
        '<div class="card analytics-card">' +
          '<div class="section-title" style="margin-top:0">📊 XP Last 7 Days</div>' +
          '<div class="week-chart">' + (chartBars || '<p class="muted">Start practising to see your progress here.</p>') + '</div>' +
        '</div>' +
        '<div class="card analytics-card">' +
          '<div class="section-title" style="margin-top:0">📈 Learning Stats</div>' +
          '<div class="progress-row">' +
            '<div class="prog-item"><span class="prog-num">' + completed.length + '</span><span class="prog-label">Lessons Done</span></div>' +
            '<div class="prog-item"><span class="prog-num">' + remaining + '</span><span class="prog-label">Remaining</span></div>' +
            '<div class="prog-item"><span class="prog-num">' + streak + '</span><span class="prog-label">Day Streak</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="home-links">' +
        '<a href="#/accent" class="btn btn-ghost">🇮🇳 Accent Studio</a>' +
        '<a href="#/assessment" class="btn btn-ghost">📋 Speaking Assessment</a>' +
        '<a href="#/trainer" class="btn btn-ghost">📊 My Trainer</a>' +
        '<a href="#/quiz" class="btn btn-ghost">🎓 Level Test</a>' +
        '<a href="#/docstudio" class="btn btn-ghost">📄 Doc Studio</a>' +
        '<a href="#/resume" class="btn btn-ghost">📝 Resume Analyzer</a>' +
      '</div>' +
    '</div>';

    el.innerHTML = html;
  }
};

/* ── FOUNDATIONS ──────────────────────────────────────────────────── */
VIEWS.foundations = {
  render: function (el) {
    'use strict';
    var vowels = SOUNDS.filter(function (s) { return s.type === 'vowel'; });
    var consonants = SOUNDS.filter(function (s) { return s.type === 'consonant'; });

    var vowelRows = '';
    for (var v = 0; v < vowels.length; v++) {
      var s = vowels[v];
      vowelRows += '<tr><td><span class="ipa-sym" data-say="' + s.eg + '">' + s.sym + '</span></td><td>' + s.eg + '</td><td><button class="btn-sm" data-say="' + s.eg + '">🔊</button></td></tr>';
    }

    var conRows = '';
    for (var c = 0; c < consonants.length; c++) {
      var sc = consonants[c];
      conRows += '<tr><td><span class="ipa-sym" data-say="' + sc.eg + '">' + sc.sym + '</span></td><td>' + sc.eg + '</td><td><button class="btn-sm" data-say="' + sc.eg + '">🔊</button></td></tr>';
    }

    var letterBtns = '';
    for (var l = 0; l < LETTERS.length; l++) {
      letterBtns += '<button class="letter-btn" data-say="' + LETTERS[l] + '">' + LETTERS[l].toUpperCase() + '</button>';
    }

    el.innerHTML = '<div class="view-foundations">' +
      '<h1>🔡 Foundations</h1>' +
      '<p class="sub">The building blocks of English pronunciation and spelling.</p>' +
      '<div class="section-title">🔤 The Alphabet</div>' +
      '<div class="alphabet-grid">' + letterBtns + '</div>' +
      '<div class="section-title">🗣️ 20 Vowel Sounds</div>' +
      '<table class="sounds-table"><thead><tr><th>IPA</th><th>Example</th><th>Listen</th></tr></thead><tbody>' + vowelRows + '</tbody></table>' +
      '<div class="section-title">🔊 24 Consonant Sounds</div>' +
      '<table class="sounds-table"><thead><tr><th>IPA</th><th>Example</th><th>Listen</th></tr></thead><tbody>' + conRows + '</tbody></table>' +
      '<div class="section-title">📝 Spell Anything (Letter-by-Letter Bee)</div>' +
      '<div class="spell-tool">' +
      '<input type="text" id="spell-input" placeholder="Type a word to spell it out (e.g. rhythm, queue)..." />' +
      '<button id="spell-btn" class="btn-primary">🔊 Spell it</button>' +
      '</div>' +
      '<div id="spell-result" style="margin-top:12px;"></div>' +
      '<div id="spell-practice-slot" style="margin-top:12px;"></div>' +
      '</div>';

    var spellBtn = document.getElementById('spell-btn');
    if (spellBtn) {
      spellBtn.addEventListener('click', function () {
        var word = document.getElementById('spell-input').value.trim();
        if (!word) { return; }
        var letters = word.toUpperCase().split('');
        var chips = '';
        for (var i = 0; i < letters.length; i++) {
          chips += '<button class="chip ok" data-say="' + letters[i] + '" style="font-weight:700;font-size:1.1rem;cursor:pointer;padding:6px 10px;" title="Click to hear letter">' + letters[i] + '</button> ';
        }
        var spellRes = document.getElementById('spell-result');
        if (spellRes) {
          spellRes.innerHTML = '<div style="margin-bottom:8px;font-size:0.85rem;color:var(--mut);">Spelling out <strong>' + _escA(word) + '</strong>:</div><div class="spell-chips" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">' + chips + '</div>';
        }
        SPEECH.speak(letters.join(', '));
        var slot = document.getElementById('spell-practice-slot');
        if (slot && typeof UI !== 'undefined' && UI.practiceBar) {
          UI.practiceBar(slot, {
            prompt: 'Spell it out loud: "' + letters.join(' ') + '"',
            expected: letters.join(' '),
            skill: 'spelling',
            onPass: function () {
              STORE.addXP(5);
              UI.toast('Spelling bee mastered! +5 XP', 'success');
            }
          });
        }
      });
    }
  }
};

/* ── PRONUNCIATION LAB ──────────────────────────────────────────────── */
VIEWS.pronunciation = {
  _tab: 'words',
  _earPairIdx: 0,
  _earMysteryWord: '',
  render: function (el) {
    'use strict';
    var self = this;
    var tab = self._tab;

    var tabBar = '<div class="tab-bar">' +
      '<button class="tab-btn' + (tab === 'words' ? ' active' : '') + '" id="tab-words">Words</button>' +
      '<button class="tab-btn' + (tab === 'pairs' ? ' active' : '') + '" id="tab-pairs">Minimal Pairs & Ear Quiz</button>' +
      '<button class="tab-btn' + (tab === 'twisters' ? ' active' : '') + '" id="tab-twisters">Twisters & Speed Ladder</button>' +
      '</div>';

    var content = '';
    if (tab === 'words') {
      var levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
      for (var li = 0; li < levels.length; li++) {
        var lvl = levels[li];
        var wds = WORDS.filter(function (w) { return w.lvl === lvl; });
        if (!wds.length) { continue; }
        content += '<div class="section-title">' + lvl + ' Level</div><div class="word-grid">';
        for (var wi = 0; wi < wds.length; wi++) {
          var w = wds[wi];
          var m = STORE.getMastery('spell_' + w.w);
          content += '<div class="word-card" id="word-card-' + _escA(w.w) + '">' +
            '<div class="word-text" data-say="' + _escA(w.w) + '">' + _escA(w.w) + '</div>' +
            '<div class="word-ipa">' + _escA(w.ipa || '') + '</div>' +
            '<div class="mastery-dots">' + _masteryDots(m) + '</div>' +
            '<div style="display:flex;gap:4px;margin-top:8px;justify-content:center;">' +
            '<button class="btn-sm btn-ghost" data-say="' + _escA(w.w) + '" title="Listen">🔊</button>' +
            '<button class="btn-sm btn-primary pron-word-mic" data-word="' + _escA(w.w) + '" title="Practice Speaking">🎤 Practice</button>' +
            '</div>' +
            '<div class="word-inline-practice" id="practice-slot-' + _escA(w.w) + '" style="margin-top:8px;"></div>' +
            '</div>';
        }
        content += '</div>';
      }
    } else if (tab === 'pairs') {
      var pair = PAIRS[self._earPairIdx % PAIRS.length];
      self._earMysteryWord = self._earMysteryWord || (Math.random() > 0.5 ? pair.a : pair.b);

      var earQuizHtml = '<div class="card ear-quiz-card" style="background:rgba(124,92,255,0.08);border:1px solid rgba(124,92,255,0.35);padding:18px;margin-bottom:20px;border-radius:var(--r-md);">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">' +
        '<div style="font-weight:700;font-size:1.05rem;color:var(--txt);">👂 Minimal Pair Ear Quiz</div>' +
        '<span style="font-size:0.8rem;color:var(--acc2);font-weight:600;">Pair ' + (self._earPairIdx + 1) + ' of ' + PAIRS.length + '</span>' +
        '</div>' +
        '<p style="font-size:0.9rem;color:var(--mut);margin-bottom:14px;">Listen to the secret sound without looking, then identify which word was spoken!</p>' +
        '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">' +
        '<button class="btn-primary" id="ear-play-btn" style="font-size:1rem;padding:8px 18px;">🔊 Play Mystery Sound</button>' +
        '<button class="btn-ghost btn-sm" id="ear-next-btn">🎲 Next Pair</button>' +
        '</div>' +
        '<div style="display:flex;gap:12px;margin-bottom:12px;">' +
        '<button class="btn-secondary ear-choice-btn" id="ear-opt-a" data-choice="' + _escA(pair.a) + '" style="flex:1;padding:12px;font-size:1.1rem;font-weight:700;">' + _escA(pair.a) + '</button>' +
        '<button class="btn-secondary ear-choice-btn" id="ear-opt-b" data-choice="' + _escA(pair.b) + '" style="flex:1;padding:12px;font-size:1.1rem;font-weight:700;">' + _escA(pair.b) + '</button>' +
        '</div>' +
        '<div id="ear-quiz-feedback"></div>' +
        '</div>';

      content = earQuizHtml + '<div class="section-title">All Minimal Contrast Pairs</div><div class="pairs-grid">';
      for (var pi = 0; pi < PAIRS.length; pi++) {
        var p = PAIRS[pi];
        content += '<div class="pair-card">' +
          '<div class="pair-words"><span class="pair-word" data-say="' + _escA(p.a) + '">' + _escA(p.a) + ' 🔊</span>' +
          '<span class="pair-sep">vs</span>' +
          '<span class="pair-word" data-say="' + _escA(p.b) + '">' + _escA(p.b) + ' 🔊</span></div>' +
          '<div class="pair-tip">' + _escA(p.tip) + '</div>' +
          '<div style="margin-top:10px;display:flex;justify-content:center;">' +
          '<button class="btn-sm btn-ghost pair-practice-btn" data-a="' + _escA(p.a) + '" data-b="' + _escA(p.b) + '">🎤 Practice Contrast</button>' +
          '</div>' +
          '<div class="pair-practice-slot" id="pair-slot-' + pi + '" style="margin-top:8px;"></div>' +
          '</div>';
      }
      content += '</div>';
    } else {
      content = '<div class="card" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.3);padding:16px;border-radius:var(--r-md);margin-bottom:18px;">' +
        '<div style="font-weight:700;font-size:1.05rem;color:var(--txt);margin-bottom:6px;">⚡ Speed Ladder Challenge</div>' +
        '<p style="font-size:0.85rem;color:var(--mut);">Practice tongue agility across 3 speeds: 1.0x (Precision), 1.25x (Conversational), and 1.5x (Speed Demon).</p>' +
        '</div>' +
        '<div class="twisters-list">';
      for (var ti = 0; ti < TWISTERS.length; ti++) {
        var twText = TWISTERS[ti];
        content += '<div class="twister-card" id="twister-card-' + ti + '">' +
          '<p class="twister-text" data-say="' + _escA(twText) + '">' + _escA(twText) + '</p>' +
          '<div class="twister-btns" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">' +
          '<button class="btn-sm btn-ghost" data-say="' + _escA(twText) + '">🔊 1.0x Normal</button>' +
          '<button class="btn-sm btn-ghost tw-fast-btn" data-text="' + _escA(twText) + '">⚡ 1.25x Fast</button>' +
          '<button class="btn-sm btn-primary tw-practice-btn" data-twister="' + _escA(twText) + '" data-idx="' + ti + '">🎤 Speed Challenge</button>' +
          '</div>' +
          '<div class="twister-practice-slot" id="tw-slot-' + ti + '" style="margin-top:10px;"></div>' +
          '</div>';
      }
      content += '</div>';
    }

    el.innerHTML = '<div class="view-pronunciation"><h1>🗣️ Pronunciation Lab & Fluency Studio</h1>' + tabBar + '<div class="tab-content">' + content + '</div></div>';

    document.getElementById('tab-words').addEventListener('click', function () { self._tab = 'words'; self.render(el); });
    document.getElementById('tab-pairs').addEventListener('click', function () { self._tab = 'pairs'; self.render(el); });
    document.getElementById('tab-twisters').addEventListener('click', function () { self._tab = 'twisters'; self.render(el); });

    /* Word voice triggers */
    var wordMicBtns = el.querySelectorAll ? el.querySelectorAll('.pron-word-mic') : [];
    for (var wmi = 0; wmi < wordMicBtns.length; wmi++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var targetWord = btn.getAttribute('data-word');
          var slot = document.getElementById('practice-slot-' + targetWord);
          if (slot) {
            if (slot.innerHTML.trim().length > 0) {
              slot.innerHTML = '';
            } else {
              UI.practiceBar(slot, {
                prompt: 'Pronounce "' + targetWord + '"',
                expected: targetWord,
                skill: 'pronunciation',
                onPass: function () {
                  STORE.master('spell_' + targetWord, true);
                  STORE.addXP(10);
                  UI.toast('Pronunciation mastered! +10 XP', 'success');
                }
              });
            }
          }
        });
      }(wordMicBtns[wmi]));
    }

    /* Ear quiz events */
    if (tab === 'pairs') {
      var playBtn = document.getElementById('ear-play-btn');
      if (playBtn) {
        playBtn.addEventListener('click', function () {
          SPEECH.speak(self._earMysteryWord);
        });
      }
      var nextEarBtn = document.getElementById('ear-next-btn');
      if (nextEarBtn) {
        nextEarBtn.addEventListener('click', function () {
          self._earPairIdx = (self._earPairIdx + 1) % PAIRS.length;
          self._earMysteryWord = '';
          self.render(el);
        });
      }
      var choiceBtns = el.querySelectorAll ? el.querySelectorAll('.ear-choice-btn') : [];
      for (var cbi = 0; cbi < choiceBtns.length; cbi++) {
        (function (cBtn) {
          cBtn.addEventListener('click', function () {
            var chosen = cBtn.getAttribute('data-choice');
            var fbEl = document.getElementById('ear-quiz-feedback');
            if (chosen === self._earMysteryWord) {
              if (typeof SOUND_FX !== 'undefined') { SOUND_FX.play('success'); }
              if (typeof CONFETTI !== 'undefined') { CONFETTI.burst(); }
              STORE.addXP(10);
              TRAINER.log({skill: 'listening', delta: 2, source: 'earQuiz'});
              if (fbEl) {
                fbEl.innerHTML = '<div style="background:rgba(52,211,153,0.15);border:1px solid var(--ok);color:var(--ok);padding:10px;border-radius:8px;font-weight:700;">✅ Correct! You heard "' + _escA(chosen) + '"! +10 XP</div>';
              }
            } else {
              if (typeof SOUND_FX !== 'undefined') { SOUND_FX.play('fail'); }
              if (fbEl) {
                fbEl.innerHTML = '<div style="background:rgba(248,113,113,0.15);border:1px solid var(--bad);color:var(--bad);padding:10px;border-radius:8px;font-weight:700;">❌ That was "' + _escA(self._earMysteryWord) + '". Tap "Play Mystery Sound" and compare carefully!</div>';
              }
            }
          });
        }(choiceBtns[cbi]));
      }

      /* Minimal pair contrast practice buttons */
      var pairBtns = el.querySelectorAll ? el.querySelectorAll('.pair-practice-btn') : [];
      for (var pbi = 0; pbi < pairBtns.length; pbi++) {
        (function (pBtn, pIndex) {
          pBtn.addEventListener('click', function () {
            var wordA = pBtn.getAttribute('data-a');
            var wordB = pBtn.getAttribute('data-b');
            var pairSlot = document.getElementById('pair-slot-' + pIndex);
            if (pairSlot) {
              if (pairSlot.innerHTML.trim().length > 0) {
                pairSlot.innerHTML = '';
              } else {
                UI.practiceBar(pairSlot, {
                  prompt: 'Say the contrast pair: "' + wordA + ' ' + wordB + '"',
                  expected: wordA + ' ' + wordB,
                  skill: 'pronunciation',
                  onPass: function () {
                    STORE.addXP(10);
                    UI.toast('Contrast neutralized! +10 XP', 'success');
                  }
                });
              }
            }
          });
        }(pairBtns[pbi], pbi));
      }
    }

    /* Twister fast & practice events */
    if (tab === 'twisters') {
      var fastBtns = el.querySelectorAll ? el.querySelectorAll('.tw-fast-btn') : [];
      for (var fbi = 0; fbi < fastBtns.length; fbi++) {
        (function (fBtn) {
          fBtn.addEventListener('click', function () {
            var txt = fBtn.getAttribute('data-text');
            SPEECH.speak(txt, { rate: 1.25 });
          });
        }(fastBtns[fbi]));
      }
      var twBtns = el.querySelectorAll ? el.querySelectorAll('.tw-practice-btn') : [];
      for (var tbi = 0; tbi < twBtns.length; tbi++) {
        (function (tBtn) {
          tBtn.addEventListener('click', function () {
            var twText = tBtn.getAttribute('data-twister');
            var twIdx = tBtn.getAttribute('data-idx');
            var slot = document.getElementById('tw-slot-' + twIdx);
            if (slot) {
              if (slot.innerHTML.trim().length > 0) {
                slot.innerHTML = '';
              } else {
                UI.practiceBar(slot, {
                  prompt: 'Speed Drill: "' + twText + '"',
                  expected: twText,
                  skill: 'fluency',
                  onPass: function () {
                    STORE.addXP(15);
                    UI.toast('Speed Demon Agility! +15 XP', 'success');
                  }
                });
              }
            }
          });
        }(twBtns[tbi]));
      }
    }
  }
};

function _masteryDots(m) {
  var s = '';
  for (var i = 0; i < 5; i++) {
    s += '<span class="dot' + (i < m ? ' filled' : '') + '">●</span>';
  }
  return s;
}
