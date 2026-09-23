/* =====================================================================
   views-b.js — ES5 ONLY
   VIEWS.spelling, VIEWS.phrases, VIEWS.scenarios
   ===================================================================== */

function _escB(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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
    var clueHtml = current.def ? ('<div class="spell-clue" style="font-size:0.9rem;color:var(--txt);background:var(--bg1);padding:8px 12px;border-radius:8px;margin-bottom:12px;border:1px solid var(--border);">💡 <strong>Definition clue:</strong> ' + _escB(current.def) + '</div>') : '';

    el.innerHTML = '<div class="view-spelling">' +
      '<h1>🔤 Spelling Trainer</h1>' +
      levelBtns +
      '<div class="spell-game">' +
      '<p class="sub">Listen to the word and type what you hear.</p>' +
      clueHtml +
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
        var ruleHtml = current.rule ? ('<div style="margin-top:6px;font-size:0.85rem;color:var(--ok);">💡 <strong>Rule:</strong> ' + _escB(current.rule) + '</div>') : '';
        fb.innerHTML = '<p class="verdict pass">✅ Correct! The word is: <strong>' + _escB(current.w) + '</strong></p>' + ruleHtml;
        STORE.master('spell_' + current.w, true);
        TRAINER.log({skill: 'spelling', delta: 2, source: 'spelling/correct'});
        STORE.addXP(5);
        setTimeout(function () {
          self._idx = (self._idx + 1) % self._round.length;
          self.render(el);
        }, 1500);
      } else {
        var wrongRuleHtml = current.rule ? ('<div style="margin-top:8px;padding:8px 12px;background:rgba(245,158,11,0.1);border-left:4px solid var(--warn);border-radius:6px;font-size:0.9rem;color:var(--txt);text-align:left;">💡 <strong>Spelling rule / mnemonic:</strong> ' + _escB(current.rule) + '</div>') : '';
        fb.innerHTML = '<p class="verdict fail">❌ The correct spelling is: <strong>' + _escB(current.w) + '</strong></p>' + wrongRuleHtml;
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
      // Phrasebook groups with situational clarity
      var groups = [
        {
          label: '🤝 Agreeing with Poise',
          items: [
            {p: 'That makes sense.', m: 'Acknowledge logic calmly without over-committing', sit: 'Design reviews when a coworker explains their approach.'},
            {p: 'I couldn\'t agree more.', m: 'Show enthusiastic 100% alignment', sit: 'When an executive or client shares a vision you strongly support.'},
            {p: 'Absolutely.', m: 'Fast, confident affirmative reply', sit: 'Replying on client calls or when asked if you can meet a deadline.'},
            {p: 'You\'re right on that point.', m: 'Concede a specific valid argument', sit: 'Debates when the other person raises an undeniable truth.'},
            {p: 'That aligns with our goals.', m: 'Connect an idea to company strategy', sit: 'Sprint planning and executive steering meetings.'}
          ]
        },
        {
          label: '🛡️ Disagreeing Politely & Professionally',
          items: [
            {p: 'I see your point, but let\'s consider the trade-offs.', m: 'Soft pushback that invites balanced analysis', sit: 'Architecture debates without making the other person defensive.'},
            {p: 'I\'d look at it slightly differently.', m: 'Introduce an alternative perspective respectfully', sit: 'Offering a counter-proposal to leadership.'},
            {p: 'With respect, I have concerns about the timeline.', m: 'Formal and firm pushback', sit: 'When an unrealistic deadline is proposed by management.'},
            {p: 'I\'m not entirely convinced that will scale.', m: 'Technical hesitation backed by reason', sit: 'Code and infrastructure design reviews.'},
            {p: 'That\'s one valid approach; another angle is...', m: 'Broaden the discussion constructively', sit: 'Collaborative brainstorming sessions.'}
          ]
        },
        {
          label: '🔍 Clarifying & Checking Understanding',
          items: [
            {p: 'What I mean is — let me rephrase that.', m: 'Recover and simplify your point', sit: 'When you notice the listener looks confused.'},
            {p: 'To clarify, are you asking about the budget or timeline?', m: 'Pinpoint the exact question before answering', sit: 'Q&A sessions after presentations.'},
            {p: 'If I understand you correctly, the priority is stability.', m: 'Mirror the client\'s priority to ensure 100% alignment', sit: 'Client requirement gathering calls.'},
            {p: 'In other words, we need to refactor first.', m: 'Distill complex technical jargon into plain business impact', sit: 'Talking to non-technical product managers.'},
            {p: 'Could you expand a bit on what you mean by that?', m: 'Politely ask for more details instead of guessing', sit: 'When receiving vague requirements or feedback.'}
          ]
        },
        {
          label: '⏳ Buying Time to Think with Poise',
          items: [
            {p: 'That\'s a really good question. Let me think for a moment.', m: 'Gracefully pause without awkward silence or "umm/aah"', sit: 'Tough interview questions or unexpected client queries.'},
            {p: 'Let me pull up the latest numbers so I give you the exact figure.', m: 'Buy 30 seconds while checking dashboard/docs', sit: 'Live status meetings.'},
            {p: 'Give me just a second to check the release notes.', m: 'Natural, professional pause indicator', sit: 'Customer support or Zoom screen shares.'},
            {p: 'That\'s an interesting angle — let me process that.', m: 'Validate the question while formulating your response', sit: 'Strategy workshops and debates.'},
            {p: 'I don\'t have that off the top of my head, but I will find out today.', m: 'Confident honesty instead of bluffing or guessing', sit: 'Executive reviews and interviews.'}
          ]
        },
        {
          label: '✉️ Professional Email & Slack Openers',
          items: [
            {p: 'I hope you are having a productive week.', m: 'Warm, respectful professional greeting', sit: 'Mid-week emails to clients or external partners.'},
            {p: 'Further to our discussion earlier today,...', m: 'Reference a past call with precision', sit: 'Sending follow-up action items after a meeting.'},
            {p: 'I would be grateful if you could review the attached draft.', m: 'Polite request for review without sounding demanding', sit: 'Submitting documents or PRs for senior approval.'},
            {p: 'Please let me know if you need any additional context.', m: 'Helpful and proactive closing line', sit: 'Delivering reports or technical summaries.'},
            {p: 'I look forward to our sync tomorrow.', m: 'Enthusiastic and clear confirmation', sit: 'Confirming calendar invites the day before.'}
          ]
        }
      ];
      content = '<div class="phrasebook">';
      for (var gi = 0; gi < groups.length; gi++) {
        var grp = groups[gi];
        content += '<div class="phrase-group" style="margin-bottom:24px;"><h3 style="margin-bottom:12px;color:var(--pri);">' + grp.label + '</h3><div style="display:flex;flex-direction:column;gap:10px;">';
        for (var pi = 0; pi < grp.items.length; pi++) {
          var itm = grp.items[pi];
          var pStr = itm.p || itm;
          var mStr = itm.m || '';
          var sStr = itm.sit || '';
          content += '<div class="phrase-card" style="background:var(--bg1);border:1px solid var(--border);border-radius:12px;padding:14px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">' +
            '<span class="phrase-text" style="font-size:1.05rem;font-weight:700;color:var(--txt);" data-say="' + _escB(pStr) + '">' + _escB(pStr) + '</span>' +
            '<div style="display:flex;gap:6px;align-items:center;">' +
            '<button class="btn-sm btn-ghost" data-say="' + _escB(pStr) + '" title="Hear native pronunciation">🔊 Hear</button>' +
            '<button class="btn-sm btn-primary pb-practise-phrase-btn" data-phrase="' + _escB(pStr) + '">🎤 Practice</button>' +
            '</div>' +
            '</div>' +
            (mStr ? '<div style="font-size:0.9rem;color:var(--mut);margin-bottom:4px;">💡 <strong>What it means:</strong> ' + _escB(mStr) + '</div>' : '') +
            (sStr ? '<div style="font-size:0.85rem;color:var(--ok);">🎯 <strong>When to use:</strong> ' + _escB(sStr) + '</div>' : '') +
            '<div class="phrase-inline-practice" style="display:none;margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);"></div>' +
            '</div>';
        }
        content += '</div></div>';
      }
      content += '</div>';
    }

    el.innerHTML = '<div class="view-phrases"><h1>💬 Phrase Builder & Situational Guide</h1>' + tabBar + '<div class="tab-content">' + content + '</div></div>';

    document.getElementById('tab-builds').addEventListener('click', function () { self._tab = 'builds'; self.render(el); });
    document.getElementById('tab-blanks').addEventListener('click', function () { self._tab = 'blanks'; self.render(el); });
    document.getElementById('tab-phrasebook').addEventListener('click', function () { self._tab = 'phrasebook'; self.render(el); });

    if (tab === 'phrasebook') {
      var practiceBtns = el.querySelectorAll ? el.querySelectorAll('.pb-practise-phrase-btn') : [];
      for (var pbi = 0; pbi < practiceBtns.length; pbi++) {
        (function (pBtn) {
          pBtn.addEventListener('click', function () {
            var phrase = pBtn.getAttribute('data-phrase');
            var card = pBtn.closest ? pBtn.closest('.phrase-card') : null;
            if (card) {
              var box = card.querySelector('.phrase-inline-practice');
              if (box) {
                if (box.style.display === 'none') {
                  box.style.display = 'block';
                  UI.practiceBar(box, { prompt: 'Say: "' + phrase + '"', expected: phrase, skill: 'fluency' });
                  pBtn.textContent = '✕ Close';
                } else {
                  box.style.display = 'none';
                  box.innerHTML = '';
                  pBtn.textContent = '🎤 Practice';
                }
              }
            }
          });
        }(practiceBtns[pbi]));
      }
    }

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
      cards += '<div class="scenario-card" data-scenario-id="' + s.id + '" onclick="navigate(\'scenarios\',\'' + s.id + '\')">' +
        '<div class="sc-level">' + s.level + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.context + '</p>' +
        '<div class="sc-phrases"><strong>Key phrases:</strong> ' + s.keyPhrases.join(' · ') + '</div>' +
        '<button class="btn-primary">Start Role-Play →</button>' +
        '</div>';
    }
    el.innerHTML = '<div class="view-scenarios"><h1>🎭 Conversations</h1><p class="sub">' + allScenarios.length + ' real-life English conversations & role-plays.</p><div class="scenario-grid">' + cards + '</div></div>';
  }
};

function _renderScenario(el, sc) {
  var turnIdx = 0;
  var scores = [];

  function renderTurn() {
    var turn = sc.turns[turnIdx];
    var html = '<div class="scenario-play" data-scenario-id="' + sc.id + '">' +
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
        micBtn.classList.add('pulse');
        SPEECH.listen({
          interim: true,
          continuous: true,
          onresult: function (t, isFinal) {
            var inp = document.getElementById('sc-input');
            if (inp) { inp.value = t; }
            if (isFinal) {
              micBtn.textContent = '🎤 Speak';
              micBtn.disabled = false;
              micBtn.classList.remove('pulse');
            }
          },
          onend: function () {
            micBtn.textContent = '🎤 Speak';
            micBtn.disabled = false;
            micBtn.classList.remove('pulse');
          },
          onerror: function (m, code) {
            micBtn.textContent = '🎤 Speak';
            micBtn.disabled = false;
            micBtn.classList.remove('pulse');
            if (code !== 'aborted') { UI.toast(m, 'error'); }
          }
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
