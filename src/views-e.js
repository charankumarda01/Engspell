/* =====================================================================
   views-e.js — ES6 allowed
   VIEWS.trainer, VIEWS.assessment, VIEWS.listening, VIEWS.atlas,
   VIEWS.review (MISSION 2 — SRS review queue)
   ===================================================================== */

/* ── SRS HELPERS (MISSION 2) ─────────────────────────────────────────── */
const SRS_INTERVALS = [1, 3, 7, 16, 35]; // days, strictly monotonic

function srsSchedule(prefixedKey, correct) {
  const srs = STORE.get('srs') || {};
  const item = srs[prefixedKey] || {interval: 0, due: Date.now()};
  let interval;
  if (correct) {
    // Move to next interval bracket
    const nextIdx = Math.min(item.interval + 1, SRS_INTERVALS.length - 1);
    interval = nextIdx;
  } else {
    // Reset to first interval
    interval = 0;
  }
  srs[prefixedKey] = {
    interval: interval,
    due: Date.now() + SRS_INTERVALS[interval] * 86400000
  };
  STORE.set('srs', srs);
  return srs[prefixedKey];
}

function srsDueItems() {
  const srs = STORE.get('srs') || {};
  const mastery = STORE.get('mastery') || {};
  const now = Date.now();
  const due = [];
  for (const k in srs) {
    if (srs.hasOwnProperty(k) && srs[k].due && srs[k].due <= now) {
      due.push({ key: k, mastery: mastery[k] || 0, srs: srs[k] });
    }
  }
  return due;
}

/* ── REVIEW QUEUE (MISSION 2) ───────────────────────────────────────── */
VIEWS.review = {
  _idx: 0,
  render(el, arg) {
    const dueItems = srsDueItems();

    if (dueItems.length === 0) {
      el.innerHTML = `
      <div class="view-review">
        <h1>🔁 Review Queue</h1>
        <div class="review-empty">
          <div class="review-empty-icon">🎉</div>
          <h2>All caught up!</h2>
          <p>No items due for review right now. Come back tomorrow.</p>
          <a href="#/home" class="btn-primary">← Back to Home</a>
        </div>
      </div>`;
      return;
    }

    if (this._idx >= dueItems.length) {
      el.innerHTML = `
      <div class="view-review">
        <h1>🔁 Review Complete!</h1>
        <div class="review-empty">
          <div class="review-empty-icon">✅</div>
          <h2>Session done!</h2>
          <p>You reviewed <strong>${dueItems.length}</strong> items. Next review in 1–35 days based on your performance.</p>
          <a href="#/home" class="btn-primary">← Back to Home</a>
        </div>
      </div>`;
      this._idx = 0;
      return;
    }

    const item = dueItems[this._idx];
    const self = this;

    // Determine display info from prefix
    let word = item.key, displayText = item.key, displayType = '';
    if (item.key.startsWith('spell_')) {
      word = item.key.replace('spell_', '');
      const wEntry = WORDS.find(w => w.w === word);
      displayText = word;
      displayType = 'spelling';
    } else if (item.key.startsWith('idn_')) {
      const id = item.key.replace('idn_', '');
      const idiom = IDIOMS.find(i => i.id === id);
      displayText = idiom ? idiom.text : id;
      displayType = 'idiom';
    } else if (item.key.startsWith('pv_')) {
      const id = item.key.replace('pv_', '');
      const pv = PVS.find(p => p.id === id);
      displayText = pv ? pv.text : id;
      displayType = 'phrasal verb';
    } else if (item.key.startsWith('lsn_')) {
      displayText = item.key.replace('lsn_', '');
      displayType = 'listening';
    } else if (item.key.startsWith('read_')) {
      displayText = item.key.replace('read_', '');
      displayType = 'reading';
    }

    const nextInterval = SRS_INTERVALS[Math.min(item.srs.interval + 1, SRS_INTERVALS.length - 1)];
    const resetInterval = SRS_INTERVALS[0];

    el.innerHTML = `
    <div class="view-review">
      <h1>🔁 Review Queue</h1>
      <div class="review-progress">${this._idx + 1} / ${dueItems.length}</div>

      <div class="review-card">
        <div class="rc-type">${displayType}</div>
        <div class="rc-text" data-say="${displayText}">${displayText}</div>
        <div class="mastery-dots big">${_masteryDots(item.mastery)}</div>
        <button class="btn-sm" data-say="${displayText}">🔊 Hear it</button>
      </div>

      <div class="review-prompt">Do you remember this?</div>
      <div class="review-btns">
        <button class="btn-danger" id="rv-no">😅 Hard — show again in ${resetInterval}d</button>
        <button class="btn-primary" id="rv-yes">✅ Got it! — next in ${nextInterval}d</button>
      </div>
    </div>`;

    const btnYes = (el.querySelector ? el.querySelector('#rv-yes') : null) || document.getElementById('rv-yes');
    if (btnYes && btnYes.addEventListener) {
      btnYes.addEventListener('click', () => {
        srsSchedule(item.key, true);
        STORE.master(item.key, true);
        const skill = item.key.startsWith('spell_') ? 'spelling' : 'vocab';
        TRAINER.log({skill: skill, delta: 2, source: 'review/correct'});
        STORE.addXP(3);
        if (typeof updateReviewBadge === 'function') { updateReviewBadge(); }
        self._idx++;
        self.render(el);
      });
    }

    const btnNo = (el.querySelector ? el.querySelector('#rv-no') : null) || document.getElementById('rv-no');
    if (btnNo && btnNo.addEventListener) {
      btnNo.addEventListener('click', () => {
        srsSchedule(item.key, false);
        STORE.master(item.key, false);
        const skill = item.key.startsWith('spell_') ? 'spelling' : 'vocab';
        TRAINER.log({skill: skill, delta: -1, source: 'review/hard'});
        if (typeof updateReviewBadge === 'function') { updateReviewBadge(); }
        self._idx++;
        self.render(el);
      });
    }
  }
};

/* ── MY TRAINER ─────────────────────────────────────────────────────── */
VIEWS.trainer = {
  render(el) {
    const scores = TRAINER.aggregate();
    const weak = TRAINER.weakestFirst();
    const history = TRAINER.xpHistory();

    // SVG radar
    const skills = TRAINER.SKILLS;
    const cx = 140, cy = 140, r = 110;
    const n = skills.length;
    const radarPoints = skills.map((s, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const val = (scores[s] || 50) / 100;
      return {
        x: cx + r * val * Math.cos(angle),
        y: cy + r * val * Math.sin(angle),
        lx: cx + (r + 24) * Math.cos(angle),
        ly: cy + (r + 24) * Math.sin(angle),
        label: SKILL_META[s] ? SKILL_META[s].label : s,
        score: scores[s],
        color: SKILL_META[s] ? SKILL_META[s].color : '#7c3aed'
      };
    });

    const gridLevels = [0.25, 0.5, 0.75, 1.0];
    let gridSvg = '';
    gridLevels.forEach(lvl => {
      const pts = skills.map((s, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        return `${cx + r * lvl * Math.cos(angle)},${cy + r * lvl * Math.sin(angle)}`;
      }).join(' ');
      gridSvg += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    });
    skills.forEach((s, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      gridSvg += `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(angle)}" y2="${cy + r * Math.sin(angle)}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    });

    const radarPoly = radarPoints.map(p => `${p.x},${p.y}`).join(' ');
    const dots = radarPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${p.color}"/>`).join('');
    const labels = radarPoints.map(p => `<text x="${p.lx}" y="${p.ly}" fill="white" font-size="10" text-anchor="middle" dominant-baseline="middle">${p.label}</text>`).join('');

    const radarSvg = `<svg viewBox="0 0 280 280" class="radar-svg">
      ${gridSvg}
      <polygon points="${radarPoly}" fill="rgba(124,58,237,0.35)" stroke="#7c3aed" stroke-width="2"/>
      ${dots}
      ${labels}
    </svg>`;

    // Weakness plan
    const planItems = weak.slice(0, 3).map(item => {
      const meta = SKILL_META[item.skill] || {};
      const routeMap = {pronunciation:'pronunciation',grammar:'atlas',vocab:'idioms',spelling:'spelling',fluency:'path',listening:'listening'};
      return `<div class="plan-item">
        <span class="plan-icon">${meta.icon || '🎯'}</span>
        <div class="plan-info">
          <strong>${meta.label || item.skill}</strong>
          <span>Score: ${item.score}/100</span>
        </div>
        <a href="#/${routeMap[item.skill] || 'home'}" class="btn-sm">Train →</a>
      </div>`;
    }).join('');

    // XP bar chart (30 days)
    let maxXP = 1;
    history.forEach(h => { if (h.xp > maxXP) maxXP = h.xp; });
    const barChart = `<div class="xp-chart">` +
      history.slice(-30).map(h => {
        const pct = Math.round((h.xp / maxXP) * 100);
        return `<div class="bar-col"><div class="bar" style="height:${pct}%" title="${h.date}: ${h.xp} XP"></div><span class="bar-label">${h.date.slice(8)}</span></div>`;
      }).join('') + `</div>`;

    // Skill score rows
    const skillRows = skills.map(s => {
      const meta = SKILL_META[s] || {};
      const sc = scores[s] || 50;
      return `<div class="skill-row">
        <span class="skill-name">${meta.icon || ''} ${meta.label || s}</span>
        <div class="skill-bar"><div class="skill-fill" style="width:${sc}%;background:${meta.color || '#7c3aed'}"></div></div>
        <span class="skill-pct">${sc}</span>
      </div>`;
    }).join('');

    el.innerHTML = `
    <div class="view-trainer">
      <h1>📊 My Trainer</h1>
      <p class="sub">Your adaptive skill radar — powered by every action you take.</p>

      <div class="trainer-grid">
        <div class="radar-wrap">${radarSvg}</div>
        <div class="trainer-right">
          <h3>🎯 Your Plan (weakest first)</h3>
          <div class="plan-list">${planItems || '<p class="muted">Keep practising to build your radar.</p>'}</div>
        </div>
      </div>

      <div class="section-title">📈 Skill Scores</div>
      <div class="skill-breakdown">${skillRows}</div>

      <div class="section-title">⚡ XP — Last 30 Days</div>
      ${history.length ? barChart : '<p class="muted">Start practising to see your XP chart.</p>'}
    </div>`;
  }
};

/* ── SPEAKING ASSESSMENT ─────────────────────────────────────────────── */
VIEWS.assessment = {
  _task: 0,
  _results: [],
  render(el, arg) {
    const self = this;

    if (arg === 'history') {
      _renderAssessHistory(el);
      return;
    }

    const tasks = [
      { type: 'read', label: 'Read Aloud', prompt: 'Read this passage aloud:', text: PASSAGES[0].text.slice(0, 200) + '...' },
      { type: 'topic', label: 'Free Topic', prompt: ASSESSMENT_POOLS.topics[0], text: null },
      { type: 'scene', label: 'Role Scene', prompt: ASSESSMENT_POOLS.scenes[0].role, text: null },
      { type: 'topic', label: 'Random Topic', prompt: ASSESSMENT_POOLS.topics[2], text: null },
      { type: 'scene', label: 'Pitch Scene', prompt: ASSESSMENT_POOLS.scenes[4].role, text: null }
    ];

    if (self._task >= tasks.length) {
      _renderAssessResult(el, self._results);
      self._task = 0;
      return;
    }

    const task = tasks[self._task];
    el.innerHTML = `
    <div class="view-assessment">
      <div class="assess-header">
        <h1>🏆 Speaking Assessment</h1>
        <button onclick="navigate('assessment','history')" class="btn-link">View History</button>
      </div>
      <div class="assess-progress">Task ${self._task + 1} / ${tasks.length}: ${task.label}</div>
      <div class="assess-prompt">${task.prompt}</div>
      ${task.text ? `<div class="assess-passage">${task.text}</div>` : ''}
      <div class="assess-timer" id="assess-timer">00:30</div>
      ${SPEECH.canListen()
        ? `<button class="btn-primary" id="assess-start">🎤 Start Recording (30s)</button>`
        : `<div><textarea id="assess-typed" rows="4" placeholder="Type your response (mic not available)..."></textarea><button class="btn-primary" id="assess-typed-submit">Submit</button></div>`
      }
      <div id="assess-fb"></div>
    </div>`;

    if (SPEECH.canListen()) {
      document.getElementById('assess-start').addEventListener('click', () => {
        const startBtn = document.getElementById('assess-start');
        const timerEl = document.getElementById('assess-timer');
        startBtn.disabled = true;
        startBtn.textContent = '🔴 Recording…';
        let seconds = 30;
        let words = [], fillers = 0;
        const FILLERS = ['um','uh','er','ah','like','you know','basically','actually','literally'];
        const timer = setInterval(() => {
          seconds--;
          timerEl.textContent = '00:' + String(seconds).padStart(2, '0');
          if (seconds <= 0) { clearInterval(timer); SPEECH.stopListening(); }
        }, 1000);

        SPEECH.listen({
          interim: true,
          onresult: (t, isFinal) => {
            if (isFinal) {
              words = U.tokenise(t);
              fillers = words.filter(w => FILLERS.indexOf(w) !== -1).length;
            }
          },
          onend: () => {
            clearInterval(timer);
            const wpm = Math.round(words.length * 2); // ~30s session
            const fillerRate = words.length ? fillers / words.length : 0;
            self._results.push({task: task.label, wpm, fillerRate, words: words.length, fillers});
            document.getElementById('assess-fb').innerHTML = `<p>✅ Recorded. WPM ≈ ${wpm} · Fillers: ${fillers}</p>`;
            setTimeout(() => { self._task++; self.render(el); }, 1500);
          },
          onerror: msg => { clearInterval(timer); UI.toast(msg, 'error'); startBtn.disabled = false; startBtn.textContent = '🎤 Start Recording (30s)'; }
        });
      });
    } else {
      document.getElementById('assess-typed-submit').addEventListener('click', () => {
        const text = document.getElementById('assess-typed').value.trim();
        const words = U.tokenise(text);
        self._results.push({task: task.label, wpm: words.length * 2, fillerRate: 0, words: words.length, fillers: 0});
        self._task++;
        self.render(el);
      });
    }
  }
};

function _renderAssessResult(el, results) {
  let totalWpm = 0, totalFillers = 0, totalWords = 0;
  results.forEach(r => { totalWpm += r.wpm; totalFillers += r.fillers; totalWords += r.words; });
  const avgWpm = Math.round(totalWpm / results.length);
  const fillerRate = totalWords ? totalFillers / totalWords : 0;

  // CEFR calibration from data3.js
  const cefrTable = ASSESSMENT_POOLS.cefr;
  const band = (typeof bandOf === 'function') ? bandOf(avgWpm, fillerRate) : 'A2';

  const rows = results.map((r, i) =>
    `<tr><td>Task ${i+1}: ${r.task}</td><td>${r.wpm}</td><td>${r.fillers}</td><td>${(r.fillerRate * 100).toFixed(1)}%</td></tr>`
  ).join('');

  // 5-row benchmark table
  const bmRows = ['A2','B1','B2','C1','C2'].map(lvl => {
    const b = cefrTable[lvl];
    return `<tr${lvl===band?' class="current-band"':''}><td>${lvl}${lvl===band?' ← you':''}</td><td>${b.minWpm}–${b.maxWpm}</td><td>≤${(b.maxFillerRate*100).toFixed(0)}%</td></tr>`;
  }).join('');

  const report = {date: new Date().toISOString(), avgWpm, fillerRate, band, results};
  STORE.addAssessment(report);
  TRAINER.log({skill: 'fluency', delta: 3, source: 'assessment/complete'});
  STORE.addXP(30);

  // WhatsApp share (INV-2: opt-in network, degrades gracefully)
  const shareText = encodeURIComponent(`I just completed a Speaking Assessment on EngSpell! 🎤\nCEFR Level: ${band}\nAvg WPM: ${avgWpm}\nFiller Rate: ${(fillerRate*100).toFixed(1)}%\nPractise with me: https://engspell.ai`);
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  el.innerHTML = `
  <div class="view-assess-result">
    <h1>🏆 Assessment Complete!</h1>
    <div class="cefr-badge big">${band}</div>
    <p>Avg WPM: <strong>${avgWpm}</strong> · Filler Rate: <strong>${(fillerRate*100).toFixed(1)}%</strong></p>

    <table class="assess-table">
      <thead><tr><th>Task</th><th>WPM</th><th>Fillers</th><th>Filler %</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>

    <h3>CEFR Benchmarks</h3>
    <table class="assess-table">
      <thead><tr><th>Level</th><th>WPM range</th><th>Max filler %</th></tr></thead>
      <tbody>${bmRows}</tbody>
    </table>

    <div class="result-btns">
      <button onclick="VIEWS.assessment._task=0; VIEWS.assessment._results=[]; VIEWS.assessment.render(document.getElementById('view'))" class="btn-primary">Retake</button>
      <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn-whatsapp">📲 Share on WhatsApp</a>
      <a href="#/trainer" class="btn-link">View Trainer →</a>
    </div>
  </div>`;

  UI.toast(`Assessment done! Band: ${band} · +30 XP`, 'success');
}

function _renderAssessHistory(el) {
  const assessments = STORE.get('assessments') || [];
  if (!assessments.length) {
    el.innerHTML = `<div class="view-assessment"><h1>🏆 Assessment History</h1><p>No assessments yet. <a href="#/assessment">Take your first one →</a></p></div>`;
    return;
  }
  const rows = assessments.map((a, i) => {
    const date = a.date ? a.date.slice(0, 10) : '—';
    return `<tr><td>${date}</td><td>${a.band || '—'}</td><td>${a.avgWpm || '—'}</td><td>${a.fillerRate ? (a.fillerRate*100).toFixed(1)+'%' : '—'}</td></tr>`;
  }).reverse().join('');

  el.innerHTML = `
  <div class="view-assessment">
    <h1>🏆 Assessment History</h1>
    <a href="#/assessment" class="btn-primary">New Assessment</a>
    <table class="assess-table">
      <thead><tr><th>Date</th><th>Band</th><th>WPM</th><th>Fillers</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

/* ── LISTENING LAB ──────────────────────────────────────────────────── */
VIEWS.listening = {
  _idx: 0,
  _tab: 'comprehension',
  render(el) {
    const self = this;
    const passage = PASSAGES[self._idx];

    const tabBar = `<div class="tab-bar">
      <button class="tab-btn${self._tab==='comprehension'?' active':''}" id="tab-comp">Comprehension</button>
      <button class="tab-btn${self._tab==='dictation'?' active':''}" id="tab-dict">Dictation</button>
    </div>`;

    const passBtns = PASSAGES.map((p, i) =>
      `<button class="tab-btn${i===self._idx?' active':''}" id="pass-${i}">${p.level}: ${p.title}</button>`
    ).join('');

    let content = '';
    if (self._tab === 'comprehension') {
      const qHtml = passage.questions.map((q, qi) => {
        const opts = q.opts.map((o, oi) =>
          `<button class="opt-btn" data-qi="${qi}" data-oi="${oi}" data-ans="${oi === q.ans ? '1' : '0'}">${o}</button>`
        ).join('');
        return `<div class="comp-q"><p><strong>Q${qi+1}.</strong> ${q.q}</p><div class="opts-row comp-opts">${opts}</div><div id="comp-fb-${qi}"></div></div>`;
      }).join('');

      content = `
      <div class="listening-comp">
        <div class="listen-controls">
          <button class="btn-primary" data-say="${passage.text}">🔊 Listen (Normal)</button>
          <button class="btn-secondary" id="listen-slow">🐢 Listen Slow</button>
        </div>
        <div class="listen-text" id="listen-text" style="display:none">${passage.text}</div>
        <button class="btn-link" id="show-text">👁 Show/Hide Text</button>
        <div class="comp-questions">${qHtml}</div>
      </div>`;
    } else {
      content = `
      <div class="listening-dict">
        <p class="sub">Listen to the sentence, then type what you hear.</p>
        <div class="dict-sentence">${passage.dictation}</div>
        <div class="dict-controls">
          <button class="btn-primary" data-say="${passage.dictation}">🔊 Normal</button>
          <button class="btn-secondary" id="dict-slow">🐢 Slow</button>
        </div>
        <input type="text" id="dict-input" placeholder="Type what you heard..." autocorrect="off" spellcheck="false" />
        <button class="btn-primary" id="dict-check">Check</button>
        <div id="dict-fb"></div>
      </div>`;
    }

    el.innerHTML = `
    <div class="view-listening">
      <h1>👂 Listening Lab</h1>
      <div class="passage-select">${passBtns}</div>
      ${tabBar}
      <div class="tab-content">${content}</div>
    </div>`;

    // Passage selection
    PASSAGES.forEach((p, i) => {
      const btn = document.getElementById(`pass-${i}`);
      if (btn) btn.addEventListener('click', () => { self._idx = i; self.render(el); });
    });

    document.getElementById('tab-comp').addEventListener('click', () => { self._tab = 'comprehension'; self.render(el); });
    document.getElementById('tab-dict').addEventListener('click', () => { self._tab = 'dictation'; self.render(el); });

    if (self._tab === 'comprehension') {
      document.getElementById('listen-slow').addEventListener('click', () => SPEECH.speakSlow(passage.text));
      document.getElementById('show-text').addEventListener('click', () => {
        const t = document.getElementById('listen-text');
        t.style.display = t.style.display === 'none' ? 'block' : 'none';
      });
      // Comprehension answers
      document.querySelectorAll('.comp-opts').forEach(row => {
        row.addEventListener('click', e => {
          const btn = e.target.closest('.opt-btn');
          if (!btn) return;
          const qi = parseInt(btn.dataset.qi, 10);
          const correct = btn.dataset.ans === '1';
          const q = passage.questions[qi];
          document.getElementById(`comp-fb-${qi}`).innerHTML = correct
            ? `<p class="verdict pass">✅ Correct!</p>`
            : `<p class="verdict fail">❌ Answer: ${q.opts[q.ans]}</p>`;
          row.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
          const key = `lsn_${passage.id}_q${qi}`;
          STORE.master(key, correct);
          srsSchedule(key, correct);
          TRAINER.log({skill: 'listening', delta: correct ? 2 : -1, source: 'listening/comp'});
          STORE.addXP(correct ? 5 : 1);
        });
      });
    } else {
      document.getElementById('dict-slow').addEventListener('click', () => SPEECH.speakSlow(passage.dictation));
      document.getElementById('dict-check').addEventListener('click', () => {
        const ans = document.getElementById('dict-input').value.trim();
        const aligned = U.align(passage.dictation, ans);
        const v = U.verdict(aligned);
        document.getElementById('dict-fb').innerHTML = UI.scoreHTML(aligned) + `<p class="verdict ${v}">${v === 'pass' ? '✅ Perfect!' : v === 'almost' ? '🟡 Almost!' : '❌ Try again'}</p>`;
        TRAINER.log({skill: 'listening', delta: v === 'pass' ? 2 : v === 'almost' ? 1 : -1, source: 'listening/dict'});
        STORE.addXP(v === 'pass' ? 8 : 2);
      });
    }
  }
};

/* ── GRAMMAR ATLAS ──────────────────────────────────────────────────── */
VIEWS.atlas = {
  _selected: null,
  _mode: 'browse',
  _detectiveQ: 0,
  render(el) {
    const self = this;
    const { _selected: selected, _mode: mode } = self;

    const modeBar = `<div class="tab-bar">
      <button class="tab-btn${mode==='browse'?' active':''}" id="atlas-browse">📖 Browse Tenses</button>
      <button class="tab-btn${mode==='detective'?' active':''}" id="atlas-detective">🕵️ Tense Detective</button>
    </div>`;

    let content = '';
    if (mode === 'browse') {
      if (!selected) {
        const grid = ATLAS.map(t =>
          `<div class="atlas-card" onclick="VIEWS.atlas._selected='${t.id}'; VIEWS.atlas.render(document.getElementById('view'))">
            <div class="atlas-name">${t.name}</div>
            <div class="atlas-formula">${t.formula}</div>
          </div>`
        ).join('');
        content = `<div class="atlas-grid">${grid}</div>`;
      } else {
        const tense = ATLAS.find(t => t.id === selected);
        if (!tense) { self._selected = null; self.render(el); return; }
        const examples = tense.examples.map(e =>
          `<li data-say="${e}">${e} <button class="btn-sm" data-say="${e}">🔊</button></li>`
        ).join('');
        const signals = tense.signals.map(s => `<span class="signal-tag">${s}</span>`).join('');
        content = `
        <div class="tense-detail">
          <button onclick="VIEWS.atlas._selected=null; VIEWS.atlas.render(document.getElementById('view'))" class="btn-back">← All Tenses</button>
          <h2>${tense.name}</h2>
          <div class="tense-formula">${tense.formula}</div>
          <div class="tense-when"><strong>Use when:</strong> ${tense.when}</div>
          <div class="tense-signals"><strong>Signal words:</strong> ${signals}</div>
          <div class="section-title">Examples</div>
          <ul class="tense-examples">${examples}</ul>
          <div class="warn-box">⚠️ ${tense.desiTrap}</div>
          <div class="detective-clue">🕵️ Detective clue: ${tense.detectiveClue}</div>
        </div>`;
      }
    } else {
      // Tense detective quiz
      const tense = ATLAS[self._detectiveQ % ATLAS.length];
      const clue = tense.detectiveClue;
      const opts = ATLAS.map(t => t.name);
      const shuffled = opts.slice().sort(() => Math.random() - 0.5).slice(0, 4);
      if (shuffled.indexOf(tense.name) === -1) { shuffled[0] = tense.name; }
      const optsHtml = shuffled.map(name =>
        `<button class="opt-btn" data-ans="${name === tense.name ? '1' : '0'}">${name}</button>`
      ).join('');

      content = `
      <div class="detective-quiz">
        <div class="detective-q">Q${self._detectiveQ + 1}</div>
        <div class="detective-clue-box">"${clue}"</div>
        <p>Which tense is this?</p>
        <div class="opts-row" id="det-opts">${optsHtml}</div>
        <div id="det-fb"></div>
      </div>`;
    }

    el.innerHTML = `<div class="view-atlas"><h1>📐 Grammar Atlas</h1><p class="sub">12 tenses — when, why, and how to use them.</p>${modeBar}<div class="tab-content">${content}</div></div>`;

    document.getElementById('atlas-browse').addEventListener('click', () => { self._mode = 'browse'; self.render(el); });
    document.getElementById('atlas-detective').addEventListener('click', () => { self._mode = 'detective'; self.render(el); });

    if (mode === 'detective') {
      const detOpts = document.getElementById('det-opts');
      if (detOpts) {
        detOpts.addEventListener('click', e => {
          const btn = e.target.closest('.opt-btn');
          if (!btn) return;
          const correct = btn.dataset.ans === '1';
          const tense = ATLAS[self._detectiveQ % ATLAS.length];
          document.getElementById('det-fb').innerHTML = correct
            ? `<p class="verdict pass">✅ Correct! ${tense.name}</p>`
            : `<p class="verdict fail">❌ It was: ${tense.name}. ${tense.formula}</p>`;
          detOpts.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
          TRAINER.log({skill: 'grammar', delta: correct ? 2 : -1, source: 'atlas/detective'});
          STORE.addXP(correct ? 5 : 1);
          setTimeout(() => { self._detectiveQ++; self.render(el); }, 1400);
        });
      }
    }
  }
};
