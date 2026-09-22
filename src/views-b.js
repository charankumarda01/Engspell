/* =====================================================================
   views-b.js — ES5 ONLY
   VIEWS.spelling, VIEWS.phrases, VIEWS.scenarios
   ===================================================================== */

/* ── SPELLING TRAINER ───────────────────────────────────────────────── */
VIEWS.spelling = {
  _level: 1,
  _idx: 0,
  _round: [],
  render: function (el) {
    'use strict';
    var self = this;
    var lvlWords = SPELLING.filter(function (s) { return s.lvl === self._level; });
    if (!self._round.length) {
      self._round = lvlWords.slice();
      self._idx = 0;
    }
    var current = self._round[self._idx] || lvlWords[0];

    var levelBtns = '<div class="tab-bar">';
    for (var l = 1; l <= 3; l++) {
      levelBtns += '<button class="tab-btn' + (self._level === l ? ' active' : '') + '" id="spell-lvl-' + l + '">Level ' + l + '</button>';
    }
    levelBtns += '</div>';

    var mastery = STORE.getMastery('spell_' + current.w);

    el.innerHTML = '<div class="view-spelling">' +
      '<h1>🔤 Spelling Trainer</h1>' +
      levelBtns +
      '<div class="spell-game">' +
      '<p class="sub">Listen to the word and type what you hear.</p>' +
      '<div class="spell-progress">' + (self._idx + 1) + ' / ' + self._round.length + '</div>' +
      '<div class="mastery-dots big">' + _masteryDots(mastery) + '</div>' +
      '<button class="btn-primary" id="spell-play">🔊 Hear the Word</button>' +
      '<button class="btn-secondary" id="spell-slow">🐢 Hear Slowly</button>' +
      '<input type="text" id="spell-ans" placeholder="Type the word..." autocomplete="off" autocorrect="off" spellcheck="false" />' +
      '<button class="btn-primary" id="spell-submit">✅ Check</button>' +
      '<div id="spell-feedback"></div>' +
      '</div></div>';

    document.getElementById('spell-play').addEventListener('click', function () {
      SPEECH.speak(current.w);
    });
    document.getElementById('spell-slow').addEventListener('click', function () {
      SPEECH.speakSlow(current.w);
    });

    for (var lvl = 1; lvl <= 3; lvl++) {
      (function (lv) {
        document.getElementById('spell-lvl-' + lv).addEventListener('click', function () {
          self._level = lv;
          self._round = [];
          self.render(el);
        });
      }(lvl));
    }

    document.getElementById('spell-submit').addEventListener('click', function () {
      var ans = document.getElementById('spell-ans').value.trim().toLowerCase();
      var fb = document.getElementById('spell-feedback');
      if (ans === current.w) {
        fb.innerHTML = '<p class="verdict pass">✅ Correct! The word is: <strong>' + current.w + '</strong></p>';
        STORE.master('spell_' + current.w, true);
        TRAINER.log({skill: 'spelling', delta: 2, source: 'spelling/correct'});
        STORE.addXP(5);
        setTimeout(function () {
          self._idx = (self._idx + 1) % self._round.length;
          self.render(el);
        }, 1500);
      } else {
        fb.innerHTML = '<p class="verdict fail">❌ The correct spelling is: <strong>' + current.w + '</strong></p>';
        STORE.master('spell_' + current.w, false);
        TRAINER.log({skill: 'spelling', delta: -1, source: 'spelling/wrong'});
      }
    });

    document.getElementById('spell-ans').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { document.getElementById('spell-submit').click(); }
    });
  }
};

/* ── PHRASE BUILDER ─────────────────────────────────────────────────── */
var PHRASE_BUILDS = [
  {prompt:'Build a sentence about your work using Present Perfect.', starter:'I have...', eg:'I have been working on this project for two weeks.'},
  {prompt:'Describe a past habit using "used to".', starter:'I used to...', eg:'I used to wake up at five every morning.'},
  {prompt:'Make a polite request using "Could you please".', starter:'Could you please...', eg:'Could you please send me the updated report?'},
  {prompt:'Express a regret using third conditional.', starter:'If I had...', eg:'If I had studied harder, I would have passed the exam.'},
  {prompt:'Give advice using "should have".', starter:'You should have...', eg:'You should have called me before making the decision.'},
  {prompt:'Make a prediction using "By [year], I will have".', starter:'By 2030, I will have...', eg:'By 2030, I will have built my own business.'},
  {prompt:'Describe a skill using "I have been [verb]ing for".', starter:'I have been...', eg:'I have been learning English seriously for six months.'},
  {prompt:'Express contrast using "Although".', starter:'Although...', eg:'Although the work was difficult, I managed to complete it on time.'},
  {prompt:'Give a reason using "due to" (formal).', starter:'Due to...', eg:'Due to heavy traffic, I arrived twenty minutes late.'},
  {prompt:'Hedge a claim using "It could be argued that".', starter:'It could be argued that...', eg:'It could be argued that technology is changing education forever.'},
  {prompt:'Start an opinion with a discourse marker.', starter:'In my view,...', eg:'In my view, consistent practice is more important than talent.'},
  {prompt:'Describe a trend using "There has been a rise in".', starter:'There has been a rise in...', eg:'There has been a rise in the number of remote workers globally.'},
  {prompt:'Express obligation using "ought to".', starter:'We ought to...', eg:'We ought to respect different cultures and opinions.'},
  {prompt:'Describe a process using passive voice.', starter:'The data is...', eg:'The data is collected, analysed, and reported monthly.'},
  {prompt:'Use a relative clause to add information about a person.', starter:'She is the kind of person who...', eg:'She is the kind of person who always finds a solution.'},
  {prompt:'Express a wish about the present.', starter:'I wish I...', eg:'I wish I had more time to read every day.'},
  {prompt:'Make a concession using "While I understand".', starter:'While I understand...', eg:'While I understand your concern, I think we should proceed.'},
  {prompt:'Express a condition using "provided that".', starter:'I will agree, provided that...', eg:'I will agree, provided that all conditions are clearly outlined.'},
  {prompt:'Describe future plans using "I\'m planning to".', starter:'I\'m planning to...', eg:'I\'m planning to attend an advanced English course next year.'},
  {prompt:'Summarise using "In summary, what I mean is".', starter:'In summary,...', eg:'In summary, what I mean is that consistent effort leads to lasting results.'},
  {prompt:'Build a complex sentence with "not only... but also".', starter:'Not only...', eg:'Not only did she finish the work on time, but she also exceeded expectations.'},
  {prompt:'Describe a hypothetical with "Suppose".', starter:'Suppose you...', eg:'Suppose you were offered a promotion — what would you say?'},
  {prompt:'Describe a skill you are developing.', starter:'I am in the process of...', eg:'I am in the process of developing my public speaking skills.'},
  {prompt:'Close a formal email politely.', starter:'I look forward to...', eg:'I look forward to hearing from you at your earliest convenience.'}
];

var GRAMMAR_BLANKS = [
  {sent:'She __ been working here since 2020.', blank:'has', opts:['have','has','is','was'], ans:1},
  {sent:'If I __ you, I would apologise.', blank:'were', opts:['am','was','were','be'], ans:2},
  {sent:'Neither of them __ coming tonight.', blank:'is', opts:['are','is','be','were'], ans:1},
  {sent:'She is used to __ in front of large audiences.', blank:'speaking', opts:['speak','spoke','speaking','to speak'], ans:2},
  {sent:'By the time she arrived, I __ waiting for two hours.', blank:'had been', opts:['was','am','have been','had been'], ans:3},
  {sent:'He __ have called before coming — it\'s basic courtesy.', blank:'should', opts:['must','could','should','would'], ans:2},
  {sent:'The report __ submitted by Friday.', blank:'must be', opts:['must','must be','should','will'], ans:1},
  {sent:'It was the training __ made the difference.', blank:'that', opts:['which','who','that','where'], ans:2},
  {sent:'She asked me __ I was available on Monday.', blank:'whether', opts:['that','if whether','whether','when'], ans:2},
  {sent:'Under no circumstances __ I agree to that.', blank:'will', opts:['do','will','can','am'], ans:1},
  {sent:'He came across __ very confident and prepared.', blank:'as', opts:['like','as','than','of'], ans:1},
  {sent:'Despite __ hard, she didn\'t pass.', blank:'trying', opts:['try','tried','to try','trying'], ans:3},
  {sent:'Not only did she pass, __ she also got the highest marks.', blank:'but', opts:['and','but','however','so'], ans:1},
  {sent:'The data __ collected from 500 participants.', blank:'was', opts:['is','are','was','were'], ans:2},
  {sent:'I suggest __ a second opinion before deciding.', blank:'getting', opts:['to get','get','getting','got'], ans:2},
  {sent:'Had I known earlier, I __ acted differently.', blank:'would have', opts:['will have','would have','had','have'], ans:1},
  {sent:'Rarely __ we see such dedication.', blank:'do', opts:['does','do','are','have'], ans:1},
  {sent:'She is the person __ I told you about.', blank:'whom', opts:['who','which','whose','whom'], ans:3}
];

VIEWS.phrases = {
  _tab: 'builds',
  _buildIdx: 0,
  _blankIdx: 0,
  render: function (el) {
    'use strict';
    var self = this;
    var tab = self._tab;

    var tabBar = '<div class="tab-bar">' +
      '<button class="tab-btn' + (tab === 'builds' ? ' active' : '') + '" id="tab-builds">Sentence Builds</button>' +
      '<button class="tab-btn' + (tab === 'blanks' ? ' active' : '') + '" id="tab-blanks">Grammar Blanks</button>' +
      '<button class="tab-btn' + (tab === 'phrasebook' ? ' active' : '') + '" id="tab-phrasebook">Phrasebook</button>' +
      '</div>';

    var content = '';
    if (tab === 'builds') {
      var build = PHRASE_BUILDS[self._buildIdx];
      content = '<div class="phrase-build">' +
        '<div class="phrase-num">' + (self._buildIdx + 1) + ' / ' + PHRASE_BUILDS.length + '</div>' +
        '<p class="phrase-prompt">' + build.prompt + '</p>' +
        '<div class="phrase-starter"><strong>Starter:</strong> ' + build.starter + '</div>' +
        '<textarea id="phrase-input" rows="3" placeholder="Complete the sentence..."></textarea>' +
        '<div class="phrase-btns">' +
        '<button class="btn-primary" id="phrase-speak">🎤 Say it</button>' +
        '<button class="btn-secondary" id="phrase-show">💡 See Example</button>' +
        '<button class="btn-link" id="phrase-next">Next →</button>' +
        '</div>' +
        '<div id="phrase-eg" style="display:none" class="eg-box"><strong>Example:</strong> ' + build.eg + '</div>' +
        '</div>';
    } else if (tab === 'blanks') {
      var blank = GRAMMAR_BLANKS[self._blankIdx];
      var sentDisplay = blank.sent.replace('__', '<span class="blank-slot">___</span>');
      var optsHtml = '';
      for (var oi = 0; oi < blank.opts.length; oi++) {
        optsHtml += '<button class="opt-btn" id="blank-opt-' + oi + '">' + blank.opts[oi] + '</button>';
      }
      content = '<div class="grammar-blank">' +
        '<div class="phrase-num">' + (self._blankIdx + 1) + ' / ' + GRAMMAR_BLANKS.length + '</div>' +
        '<p class="blank-sent">' + sentDisplay + '</p>' +
        '<div class="opts-row">' + optsHtml + '</div>' +
        '<div id="blank-fb"></div>' +
        '</div>';
    } else {
      // Phrasebook groups
      var groups = [
        {label:'Agreeing', phrases:['Absolutely.','That makes sense.','I couldn\'t agree more.','You\'re right on that.','That\'s a valid point.']},
        {label:'Disagreeing Politely', phrases:['I see your point, but...','I\'d look at it differently.','That\'s one way to see it, though I think...','With respect, I disagree.','I\'m not entirely convinced.']},
        {label:'Clarifying', phrases:['What I mean is...','Let me put it another way.','To clarify,...','In other words,...','What I\'m trying to say is...']},
        {label:'Buying Time', phrases:['That\'s a great question.','Let me think about that.','That\'s interesting...','Give me a moment.','Could you expand on that?']},
        {label:'Formal Openers', phrases:['I am writing to enquire about...','Further to our conversation,...','With reference to your email,...','I would be grateful if you could...','Please find attached...']}
      ];
      content = '<div class="phrasebook">';
      for (var gi = 0; gi < groups.length; gi++) {
        content += '<div class="phrase-group"><h3>' + groups[gi].label + '</h3><ul>';
        for (var pi = 0; pi < groups[gi].phrases.length; pi++) {
          content += '<li class="phrase-item" data-say="' + groups[gi].phrases[pi] + '">' + groups[gi].phrases[pi] + ' <button class="btn-sm" data-say="' + groups[gi].phrases[pi] + '">🔊</button></li>';
        }
        content += '</ul></div>';
      }
      content += '</div>';
    }

    el.innerHTML = '<div class="view-phrases"><h1>💬 Phrase Builder</h1>' + tabBar + '<div class="tab-content">' + content + '</div></div>';

    document.getElementById('tab-builds').addEventListener('click', function () { self._tab = 'builds'; self.render(el); });
    document.getElementById('tab-blanks').addEventListener('click', function () { self._tab = 'blanks'; self.render(el); });
    document.getElementById('tab-phrasebook').addEventListener('click', function () { self._tab = 'phrasebook'; self.render(el); });

    if (tab === 'builds') {
      document.getElementById('phrase-show').addEventListener('click', function () {
        var eg = document.getElementById('phrase-eg');
        eg.style.display = eg.style.display === 'none' ? 'block' : 'none';
      });
      document.getElementById('phrase-next').addEventListener('click', function () {
        self._buildIdx = (self._buildIdx + 1) % PHRASE_BUILDS.length;
        self.render(el);
      });
      document.getElementById('phrase-speak').addEventListener('click', function () {
        var text = document.getElementById('phrase-input').value.trim();
        if (text) { SPEECH.speak(text); }
      });
    }

    if (tab === 'blanks') {
      (function () {
        var blank = GRAMMAR_BLANKS[self._blankIdx];
        for (var oi = 0; oi < blank.opts.length; oi++) {
          (function (idx) {
            var btn = document.getElementById('blank-opt-' + idx);
            if (!btn) { return; }
            btn.addEventListener('click', function () {
              var fb = document.getElementById('blank-fb');
              if (idx === blank.ans) {
                fb.innerHTML = '<p class="verdict pass">✅ Correct! <strong>' + blank.blank + '</strong></p>';
                TRAINER.log({skill: 'grammar', delta: 2, source: 'phrases/blank'});
                STORE.addXP(3);
                setTimeout(function () {
                  self._blankIdx = (self._blankIdx + 1) % GRAMMAR_BLANKS.length;
                  self.render(el);
                }, 1500);
              } else {
                fb.innerHTML = '<p class="verdict fail">❌ The answer is: <strong>' + blank.blank + '</strong></p>';
                TRAINER.log({skill: 'grammar', delta: -1, source: 'phrases/blank'});
              }
            });
          }(oi));
        }
      }());
    }
  }
};

/* ── SCENARIOS (Conversations) ────────────────────────────────────── */
VIEWS.scenarios = {
  render: function (el, arg) {
    'use strict';
    var self = this;
    var allScenarios = (typeof DATA_MERGE !== 'undefined') ? DATA_MERGE.allScenarios() : (typeof SCENARIOS !== 'undefined' ? SCENARIOS : []);
    if (arg) {
      var sc = null;
      for (var i = 0; i < allScenarios.length; i++) {
        if (allScenarios[i].id === arg) { sc = allScenarios[i]; break; }
      }
      if (!sc) { navigate('scenarios'); return; }
      _renderScenario(el, sc);
      return;
    }

    var cards = '';
    for (var si = 0; si < allScenarios.length; si++) {
      var s = allScenarios[si];
      cards += '<div class="scenario-card" onclick="navigate(\'scenarios\',\'' + s.id + '\')">' +
        '<div class="sc-level">' + s.level + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.context + '</p>' +
        '<div class="sc-phrases"><strong>Key phrases:</strong> ' + s.keyPhrases.join(' · ') + '</div>' +
        '<button class="btn-primary">Start Role-Play →</button>' +
        '</div>';
    }
    el.innerHTML = '<div class="view-scenarios"><h1>🎭 Conversations</h1><p class="sub">Practice real-life English conversations.</p><div class="scenario-grid">' + cards + '</div></div>';
  }
};

function _renderScenario(el, sc) {
  var turnIdx = 0;
  var scores = [];

  function renderTurn() {
    var turn = sc.turns[turnIdx];
    var html = '<div class="scenario-play">' +
      '<div class="sc-header"><button onclick="navigate(\'scenarios\')" class="btn-back">← Back</button><h2>' + sc.title + '</h2></div>' +
      '<div class="sc-turn">' + (turnIdx + 1) + ' / ' + sc.turns.length + '</div>';

    if (turn.speaker === 'i') {
      html += '<div class="bubble interviewer">' +
        '<div class="bubble-label">Interviewer</div>' +
        '<div class="bubble-text" data-say="' + turn.text + '">' + turn.text + ' <button class="btn-sm" data-say="' + turn.text + '">🔊</button></div>' +
        '</div>' +
        '<button class="btn-primary" id="sc-next">Continue →</button>';
    } else {
      html += '<div class="bubble prompt">' +
        '<div class="bubble-label">Your turn</div>' +
        '<div class="bubble-text">' + turn.prompt + '</div>' +
        '</div>';

      if (SPEECH.canListen()) {
        html += '<button class="btn-mic" id="sc-mic">🎤 Speak</button>';
      }
      html += '<textarea id="sc-input" rows="2" placeholder="Type your response..."></textarea>' +
        '<button class="btn-primary" id="sc-submit">Submit</button>' +
        '<div id="sc-fb"></div>';
    }
    html += '</div>';
    el.innerHTML = html;

    var nextBtn = document.getElementById('sc-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        turnIdx++;
        if (turnIdx >= sc.turns.length) { _showScResult(el, sc, scores); return; }
        renderTurn();
      });
    }

    var micBtn = document.getElementById('sc-mic');
    if (micBtn) {
      micBtn.addEventListener('click', function () {
        micBtn.textContent = '🔴 Listening…';
        micBtn.disabled = true;
        SPEECH.listen({
          onresult: function (t) {
            document.getElementById('sc-input').value = t;
            micBtn.textContent = '🎤 Speak';
            micBtn.disabled = false;
          },
          onend: function () { micBtn.textContent = '🎤 Speak'; micBtn.disabled = false; },
          onerror: function (m) { UI.toast(m, 'error'); micBtn.textContent = '🎤 Speak'; micBtn.disabled = false; }
        });
      });
    }

    var submitBtn = document.getElementById('sc-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var resp = document.getElementById('sc-input').value.trim();
        if (!resp) { UI.toast('Please say or type a response.', 'error'); return; }
        var fb = document.getElementById('sc-fb');
        var words = U.tokenise(resp).length;
        scores.push(words);
        fb.innerHTML = '<p class="verdict pass">✅ Good! ' + words + ' words. Moving on...</p>';
        TRAINER.log({skill: 'fluency', delta: 2, source: 'scenarios/turn'});
        STORE.addXP(5);
        setTimeout(function () {
          turnIdx++;
          if (turnIdx >= sc.turns.length) { _showScResult(el, sc, scores); return; }
          renderTurn();
        }, 1200);
      });
    }
  }

  renderTurn();
}

function _showScResult(el, sc, scores) {
  var total = 0;
  for (var i = 0; i < scores.length; i++) { total += scores[i]; }
  el.innerHTML = '<div class="scenario-result">' +
    '<h2>🎉 Role-Play Complete!</h2>' +
    '<p><strong>' + sc.title + '</strong></p>' +
    '<p>Total words spoken: <strong>' + total + '</strong></p>' +
    '<p>Turns completed: <strong>' + scores.length + '</strong></p>' +
    '<div class="result-btns">' +
    '<button onclick="navigate(\'scenarios\')" class="btn-primary">← Back to Scenarios</button>' +
    '</div></div>';
  STORE.addXP(20);
  UI.toast('Scenario complete! +20 XP', 'success');
  if (typeof FLOW !== 'undefined' && FLOW.mark) {
    FLOW.mark(4);
  }
}
