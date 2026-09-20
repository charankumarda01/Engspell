/* =====================================================================
   views-a.js — ES5 ONLY
   VIEWS.home, VIEWS.foundations, VIEWS.pronunciation
   ===================================================================== */

/* ── HOME ──────────────────────────────────────────────────────────── */
VIEWS.home = {
  render: function (el) {
    'use strict';
    var xp = STORE.get('xp') || 0;
    var streak = STORE.get('streak') || 0;
    var user = STORE.get('user') || {};
    var completed = STORE.get('completed') || [];
    var name = user.name || 'Learner';
    var goal = STORE.get('settings') ? (STORE.get('settings').dailyGoal || 10) : 10;
    var weak = TRAINER.weakestFirst();
    var nextSkill = weak.length ? weak[0].skill : 'pronunciation';

    var routeMap = {
      pronunciation: 'pronunciation', grammar: 'atlas', vocab: 'idioms',
      spelling: 'spelling', fluency: 'path', listening: 'listening'
    };
    var nextRoute = routeMap[nextSkill] || 'daily';

    var history = TRAINER.xpHistory();
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
      if (srs.hasOwnProperty(k) && srs[k].due && srs[k].due <= now) { dueCount++; }
    }

    el.innerHTML = '<div class="view-home">' +
      '<div class="home-header">' +
      '<div class="greeting"><h1>Hello, ' + name + '! 👋</h1><p class="sub">Your English gym is ready.</p></div>' +
      '<div class="stat-pills">' +
      '<div class="stat-pill xp-pill">⚡ ' + U.fmtXP(xp) + ' XP</div>' +
      '<div class="stat-pill streak-pill">🔥 ' + streak + ' day streak</div>' +
      (dueCount > 0 ? '<a class="stat-pill due-pill" href="#/review">🔁 ' + dueCount + ' due</a>' : '') +
      '</div></div>' +
      '<div class="cards-row">' +
      '<div class="card card-next" onclick="navigate(\'' + nextRoute + '\')">' +
      '<div class="card-icon">' + (SKILL_META[nextSkill] ? SKILL_META[nextSkill].icon : '🎯') + '</div>' +
      '<div class="card-body"><h3>Next up</h3><p>Work on your <strong>' + nextSkill + '</strong> — your weakest skill right now.</p></div>' +
      '<div class="card-arrow">→</div>' +
      '</div>' +
      '<div class="card card-daily" onclick="navigate(\'daily\')">' +
      '<div class="card-icon">☀️</div>' +
      '<div class="card-body"><h3>Today\'s Dose</h3><p>Twister · Power Word · Idiom · Quote</p></div>' +
      '<div class="card-arrow">→</div>' +
      '</div>' +
      '</div>' +
      '<div class="section-title">📊 XP Last 7 Days</div>' +
      '<div class="week-chart">' + (chartBars || '<p class="muted">Start practising to see your progress here.</p>') + '</div>' +
      '<div class="section-title">📈 Progress</div>' +
      '<div class="progress-row">' +
      '<div class="prog-item"><span class="prog-num">' + completed.length + '</span><span class="prog-label">Lessons Done</span></div>' +
      '<div class="prog-item"><span class="prog-num">' + (32 - completed.length) + '</span><span class="prog-label">Remaining</span></div>' +
      '<div class="prog-item"><span class="prog-num">' + streak + '</span><span class="prog-label">Day Streak</span></div>' +
      '</div>' +
      '<div class="home-links">' +
      '<a href="#/assessment" class="btn-link">📋 Speaking Assessment</a>' +
      '<a href="#/trainer" class="btn-link">📊 My Trainer</a>' +
      '<a href="#/quiz" class="btn-link">🎓 Level Test</a>' +
      '</div>' +
      '</div>';
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
      '<div class="section-title">📝 Spell Anything</div>' +
      '<div class="spell-tool">' +
      '<input type="text" id="spell-input" placeholder="Type a word to spell it out..." />' +
      '<button id="spell-btn" class="btn-primary">🔊 Spell it</button>' +
      '</div>' +
      '<div id="spell-result"></div>' +
      '</div>';

    document.getElementById('spell-btn').addEventListener('click', function () {
      var word = document.getElementById('spell-input').value.trim();
      if (!word) { return; }
      var letters = word.split('');
      var ipa = '';
      for (var i = 0; i < letters.length; i++) {
        var found = null;
        for (var j = 0; j < WORDS.length; j++) {
          if (WORDS[j].w === letters[i].toLowerCase()) { found = WORDS[j].ipa; break; }
        }
        ipa += '<span class="chip ok">' + letters[i] + '</span> ';
      }
      document.getElementById('spell-result').innerHTML = '<div class="spell-chips">' + ipa + '</div>';
      SPEECH.speak(word.split('').join(', '));
    });
  }
};

/* ── PRONUNCIATION LAB ──────────────────────────────────────────────── */
VIEWS.pronunciation = {
  _tab: 'words',
  render: function (el) {
    'use strict';
    var self = this;
    var tab = self._tab;

    var tabBar = '<div class="tab-bar">' +
      '<button class="tab-btn' + (tab === 'words' ? ' active' : '') + '" id="tab-words">Words</button>' +
      '<button class="tab-btn' + (tab === 'pairs' ? ' active' : '') + '" id="tab-pairs">Minimal Pairs</button>' +
      '<button class="tab-btn' + (tab === 'twisters' ? ' active' : '') + '" id="tab-twisters">Twisters</button>' +
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
          content += '<div class="word-card">' +
            '<div class="word-text" data-say="' + w.w + '">' + w.w + '</div>' +
            '<div class="word-ipa">' + w.ipa + '</div>' +
            '<div class="mastery-dots">' + _masteryDots(m) + '</div>' +
            '<button class="btn-sm" data-say="' + w.w + '">🔊</button>' +
            '</div>';
        }
        content += '</div>';
      }
    } else if (tab === 'pairs') {
      content = '<div class="pairs-grid">';
      for (var pi = 0; pi < PAIRS.length; pi++) {
        var p = PAIRS[pi];
        content += '<div class="pair-card">' +
          '<div class="pair-words"><span class="pair-word" data-say="' + p.a + '">' + p.a + ' 🔊</span>' +
          '<span class="pair-sep">vs</span>' +
          '<span class="pair-word" data-say="' + p.b + '">' + p.b + ' 🔊</span></div>' +
          '<div class="pair-tip">' + p.tip + '</div>' +
          '</div>';
      }
      content += '</div>';
    } else {
      content = '<div class="twisters-list">';
      for (var ti = 0; ti < TWISTERS.length; ti++) {
        content += '<div class="twister-card">' +
          '<p class="twister-text" data-say="' + TWISTERS[ti] + '">' + TWISTERS[ti] + '</p>' +
          '<div class="twister-btns">' +
          '<button class="btn-sm" data-say="' + TWISTERS[ti] + '">🔊 Normal</button>' +
          '</div></div>';
      }
      content += '</div>';
    }

    el.innerHTML = '<div class="view-pronunciation"><h1>🗣️ Pronunciation Lab</h1>' + tabBar + '<div class="tab-content">' + content + '</div></div>';

    document.getElementById('tab-words').addEventListener('click', function () { self._tab = 'words'; self.render(el); });
    document.getElementById('tab-pairs').addEventListener('click', function () { self._tab = 'pairs'; self.render(el); });
    document.getElementById('tab-twisters').addEventListener('click', function () { self._tab = 'twisters'; self.render(el); });
  }
};

function _masteryDots(m) {
  var s = '';
  for (var i = 0; i < 5; i++) {
    s += '<span class="dot' + (i < m ? ' filled' : '') + '">●</span>';
  }
  return s;
}
