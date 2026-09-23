/* =====================================================================
   views-d.js — ES6 allowed (template literals, arrow, const/let, destructuring)
   VIEWS.daily, VIEWS.path, VIEWS.lesson, VIEWS.clarity,
   VIEWS.idioms, VIEWS.doctor, VIEWS.onboarding (already in views-c)
   ===================================================================== */

/* ── TODAY'S DOSE ────────────────────────────────────────────────────── */
VIEWS.daily = {
  render(el) {
    const xp     = STORE.get('xp') || 0;
    const streak = STORE.get('streak') || 0;
    const today  = new Date().toISOString().slice(0, 10);
    const daily  = STORE.get('daily') || {};

    // Date-seeded picks
    const twister  = U.dailyPick(TWISTERS);
    const word     = U.dailyPickN(POWER_WORDS, 1);
    const idiom    = U.dailyPickN(IDIOMS, 2);
    const quote    = U.dailyPickN(QUOTES, 3);
    const done     = (daily.date === today ? daily.done : []);

    // SRS due count for quest
    const srs = STORE.get('srs') || {};
    const now = Date.now();
    let dueCount = 0;
    for (const k in srs) {
      if (srs.hasOwnProperty(k) && srs[k].due && srs[k].due <= now) dueCount++;
    }

    const quests = [
      { id: 'twister',  label: '🌀 Say the Twister',        done: done.indexOf('twister') !== -1 },
      { id: 'word',     label: '⚡ Learn the Power Word',    done: done.indexOf('word') !== -1 },
      { id: 'idiom',    label: '📜 Quiz the Idiom',          done: done.indexOf('idiom') !== -1 },
      { id: 'quote',    label: '💬 Shadow the Quote',        done: done.indexOf('quote') !== -1 },
      { id: 'review',   label: `🔁 Review (${dueCount})`,    done: dueCount === 0 || done.indexOf('review') !== -1 }
    ];

    const questHtml = quests.map(q =>
      `<div class="quest-item${q.done ? ' done' : ''}">
         <span class="quest-check">${q.done ? '✅' : '⬜'}</span>
         <span>${q.label}</span>
         ${q.id === 'review' && !q.done ? `<a href="#/review" class="btn-sm">Go →</a>` : ''}
       </div>`
    ).join('');

    el.innerHTML = `
    <div class="view-daily">
      <h1>☀️ Today's Dose</h1>
      <div class="daily-stat-row">
        <div class="stat-pill">🔥 ${streak} day streak</div>
        <div class="stat-pill">⚡ ${U.fmtXP(xp)} XP</div>
      </div>

      <div class="daily-quests">
        <h3>Today's Quests</h3>
        ${questHtml}
      </div>

      <!-- TWISTER -->
      <div class="daily-card">
        <div class="dc-header">🌀 Tongue Twister</div>
        <p class="twister-text">${twister}</p>
        <div class="dc-btns">
          <button class="btn-sm" data-say="${twister}">🔊 Hear it</button>
          <button class="btn-primary" id="daily-twister-btn">🎤 Say it</button>
        </div>
        <div id="twister-fb"></div>
      </div>

      <!-- POWER WORD -->
      <div class="daily-card">
        <div class="dc-header">⚡ Power Word</div>
        <div class="pw-word" data-say="${word.w}">${word.w}</div>
        <div class="pw-ipa">${word.ipa}</div>
        <div class="pw-meaning">${word.meaning}</div>
        <div class="pw-eg"><em>"${word.eg}"</em></div>
        <button class="btn-sm" data-say="${word.w}">🔊 Listen</button>
        <button class="btn-secondary" id="daily-word-done">✅ Got it!</button>
      </div>

      <!-- IDIOM QUIZ -->
      <div class="daily-card" id="idiom-card">
        <div class="dc-header">📜 Idiom of the Day</div>
        <div class="idiom-text">"${idiom.text}"</div>
        <div class="idiom-opts" id="idiom-opts">
          ${_makeIdiomOpts(idiom)}
        </div>
        <div id="idiom-fb"></div>
      </div>

      <!-- QUOTE SHADOW -->
      <div class="daily-card">
        <div class="dc-header">💬 Quote Shadow</div>
        <blockquote class="quote-text">"${quote.text}"</blockquote>
        <p class="quote-by">— ${quote.by}</p>
        <div class="dc-btns">
          <button class="btn-sm" data-say="${quote.text}">🔊 Hear it</button>
          <button class="btn-primary" id="daily-quote-btn">🎤 Shadow it</button>
        </div>
        <div id="quote-fb"></div>
      </div>
    </div>`;

    // Twister
    document.getElementById('daily-twister-btn').addEventListener('click', () => {
      if (!SPEECH.canListen()) {
        UI.toast('Mic not available — listen and repeat in your head!', 'info');
        _markDone('twister', done, today);
        STORE.addXP(5);
        return;
      }
      const btn = document.getElementById('daily-twister-btn');
      btn.textContent = '🔴 Listening…'; btn.disabled = true;
      SPEECH.listen({
        onresult: transcript => {
          const aligned = U.align(twister, transcript);
          const v = U.verdict(aligned);
          document.getElementById('twister-fb').innerHTML = UI.scoreHTML(aligned) + `<p class="verdict ${v}">${v === 'pass' ? '✅ Nailed it!' : '🟡 Keep practising!'}</p>`;
          _markDone('twister', done, today);
          TRAINER.log({skill: 'pronunciation', delta: v === 'pass' ? 2 : 1, source: 'daily/twister'});
          STORE.addXP(5);
          btn.textContent = '🎤 Say it'; btn.disabled = false;
        },
        onend: () => { btn.textContent = '🎤 Say it'; btn.disabled = false; },
        onerror: msg => { UI.toast(msg, 'error'); btn.textContent = '🎤 Say it'; btn.disabled = false; }
      });
    });

    // Power word done
    document.getElementById('daily-word-done').addEventListener('click', () => {
      _markDone('word', done, today);
      STORE.master('spell_' + word.w, true);
      TRAINER.log({skill: 'vocab', delta: 2, source: 'daily/word'});
      STORE.addXP(5);
      UI.toast('Power word learned! +5 XP', 'success');
    });

    // Quote shadow
    document.getElementById('daily-quote-btn').addEventListener('click', () => {
      if (!SPEECH.canListen()) {
        UI.toast('Mic not available — listen and repeat in your head!', 'info');
        _markDone('quote', done, today);
        STORE.addXP(5);
        return;
      }
      const btn = document.getElementById('daily-quote-btn');
      btn.textContent = '🔊 Playing model…'; btn.disabled = true;
      SPEECH.speak(quote.text, {
        onend: () => {
          btn.textContent = '🔴 Listening… speak now!';
          btn.classList.add('pulse');
          SPEECH.listen({
            interim: true,
            continuous: true,
            onresult: (t, isFinal) => {
              if (isFinal) {
                const aligned = U.align(quote.text, t);
                const v = U.verdict(aligned);
                document.getElementById('quote-fb').innerHTML = UI.scoreHTML(aligned) + `<p class="verdict ${v}">${v === 'pass' ? '✅ Great fluency!' : '🟡 Good practice!'}</p>`;
                _markDone('quote', done, today);
                TRAINER.log({skill: 'fluency', delta: v === 'pass' ? 2 : 1, source: 'daily/quote'});
                STORE.addXP(5);
                btn.textContent = '🎤 Shadow it'; btn.disabled = false; btn.classList.remove('pulse');
              }
            },
            onend: () => { btn.textContent = '🎤 Shadow it'; btn.disabled = false; btn.classList.remove('pulse'); },
            onerror: msg => { UI.toast(msg, 'error'); btn.textContent = '🎤 Shadow it'; btn.disabled = false; btn.classList.remove('pulse'); }
          });
        },
        onerror: () => {
          btn.textContent = '🎤 Shadow it'; btn.disabled = false; btn.classList.remove('pulse');
        }
      });
    });

    // Idiom opts
    const idiomOpts = document.getElementById('idiom-opts');
    if (idiomOpts) {
      idiomOpts.addEventListener('click', e => {
        const btn = e.target.closest('.opt-btn');
        if (!btn) return;
        const correct = btn.dataset.correct === '1';
        const fb = document.getElementById('idiom-fb');
        fb.innerHTML = correct
          ? `<p class="verdict pass">✅ Correct! ${idiom.meaning}</p><p class="idiom-eg"><em>"${idiom.eg}"</em></p>`
          : `<p class="verdict fail">❌ The meaning is: ${idiom.meaning}</p>`;
        idiomOpts.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        _markDone('idiom', done, today);
        TRAINER.log({skill: 'vocab', delta: correct ? 2 : -1, source: 'daily/idiom'});
        STORE.addXP(correct ? 5 : 2);
      });
    }
  }
};

function _makeIdiomOpts(idiom) {
  // Build 3 decoy meanings from other idioms
  const others = IDIOMS.filter(i => i.id !== idiom.id).slice(0, 8);
  const pool = [idiom.meaning];
  for (let i = 0; i < others.length && pool.length < 4; i++) {
    if (others[i].meaning !== idiom.meaning) pool.push(others[i].meaning);
  }
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.map(m =>
    `<button class="opt-btn" data-correct="${m === idiom.meaning ? '1' : '0'}">${m}</button>`
  ).join('');
}

function _markDone(id, done, today) {
  if (done.indexOf(id) === -1) done.push(id);
  STORE.set('daily', {date: today, done: done});
}

/* ── LEARN PATH ─────────────────────────────────────────────────────── */
VIEWS.path = {
  render(el) {
    const stages = ['Survivor', 'Builder', 'Speaker', 'Master'];
    const completed = STORE.get('completed') || [];

    let rollupHtml = '';
    if (typeof WEEKLY !== 'undefined' && WEEKLY.getRollup) {
      const rollup = WEEKLY.getRollup();
      if (rollup.locked) {
        rollupHtml = `
        <div class="card weekly-card" id="path-weekly-card" style="margin-bottom:24px;padding:20px 22px;background:var(--bg1);border:1px solid var(--line);border-radius:var(--r-md);">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;">
            <div style="font-size:1.1rem;font-weight:700;color:var(--txt);">📈 This Week's Progress</div>
            <span style="font-size:0.75rem;padding:3px 9px;border-radius:12px;background:rgba(245,158,11,0.15);color:var(--warn);border:1px solid rgba(245,158,11,0.3);">${rollup.totalSessions}/3 Sessions</span>
          </div>
          <p style="color:var(--mut);font-size:0.9rem;margin:0 0 14px 0;">Finish 3 sessions to unlock your weekly trend.</p>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            <a href="#/assessment" class="btn-sm btn-primary" style="text-decoration:none;">Take Assessment 🎤</a>
            <a href="#/coach" class="btn-sm btn-ghost" style="text-decoration:none;">Live Drill 🎙️</a>
            <a href="#/doctor" class="btn-sm btn-ghost" style="text-decoration:none;">Sentence Doctor 🩺</a>
          </div>
        </div>`;
      } else {
        const cur = rollup.thisWeek || {};
        const d = rollup.deltas || {};
        const story = rollup.story || '';
        const band = rollup.band || 'B1';
        rollupHtml = `
        <div class="card weekly-card" id="path-weekly-card" style="margin-bottom:24px;padding:20px 22px;background:var(--bg1);border:1px solid var(--line);border-radius:var(--r-md);">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
            <div>
              <div style="font-size:1.15rem;font-weight:800;color:var(--txt);">📈 This Week · <span style="color:var(--acc2);">${story}</span></div>
              <div style="font-size:0.8rem;color:var(--mut);margin-top:3px;">Week ${rollup.curWeek} · ${rollup.totalSessions} sessions recorded</div>
            </div>
            <span class="cefr-badge" style="font-size:0.9rem;padding:5px 12px;border-radius:12px;background:var(--acc);color:#fff;font-weight:800;">${band}</span>
          </div>
          <div class="weekly-stat-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;">
            <div class="weekly-stat-box" style="background:var(--bg2);padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--line);">
              <div style="font-size:0.75rem;color:var(--mut);margin-bottom:4px;">Pace</div>
              <div style="font-size:1.2rem;font-weight:700;color:var(--txt);">${cur.wpm || 0} <span style="font-size:0.72rem;font-weight:400;color:var(--mut);">WPM</span></div>
              <div style="font-size:0.75rem;color:${d.wpm.direction==='up'?'var(--ok)':(d.wpm.direction==='down'?'var(--bad)':'var(--mut)')};font-weight:600;margin-top:2px;">${d.wpm.direction==='up'?'▲':(d.wpm.direction==='down'?'▼':'•')} ${d.wpm.text}</div>
            </div>
            <div class="weekly-stat-box" style="background:var(--bg2);padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--line);">
              <div style="font-size:0.75rem;color:var(--mut);margin-bottom:4px;">Fillers</div>
              <div style="font-size:1.2rem;font-weight:700;color:var(--txt);">${cur.fillersPerMin || 0} <span style="font-size:0.72rem;font-weight:400;color:var(--mut);">/min</span></div>
              <div style="font-size:0.75rem;color:${d.fillersPerMin.direction==='down'?'var(--ok)':(d.fillersPerMin.direction==='up'?'var(--bad)':'var(--mut)')};font-weight:600;margin-top:2px;">${d.fillersPerMin.direction==='down'?'▼':(d.fillersPerMin.direction==='up'?'▲':'•')} ${d.fillersPerMin.text}</div>
            </div>
            <div class="weekly-stat-box" style="background:var(--bg2);padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--line);">
              <div style="font-size:0.75rem;color:var(--mut);margin-bottom:4px;">Honest Score</div>
              <div style="font-size:1.2rem;font-weight:700;color:var(--txt);">${cur.honestScore || 0} <span style="font-size:0.72rem;font-weight:400;color:var(--mut);">/10</span></div>
              <div style="font-size:0.75rem;color:${d.honestScore.direction==='up'?'var(--ok)':(d.honestScore.direction==='down'?'var(--bad)':'var(--mut)')};font-weight:600;margin-top:2px;">${d.honestScore.direction==='up'?'▲':(d.honestScore.direction==='down'?'▼':'•')} ${d.honestScore.text}</div>
            </div>
            <div class="weekly-stat-box" style="background:var(--bg2);padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--line);">
              <div style="font-size:0.75rem;color:var(--mut);margin-bottom:4px;">Lessons Done</div>
              <div style="font-size:1.2rem;font-weight:700;color:var(--txt);">${cur.lessons || 0}</div>
              <div style="font-size:0.75rem;color:${d.lessons.direction==='up'?'var(--ok)':(d.lessons.direction==='down'?'var(--bad)':'var(--mut)')};font-weight:600;margin-top:2px;">${d.lessons.direction==='up'?'▲':(d.lessons.direction==='down'?'▼':'•')} ${d.lessons.text}</div>
            </div>
            <div class="weekly-stat-box" style="background:var(--bg2);padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--line);">
              <div style="font-size:0.75rem;color:var(--mut);margin-bottom:4px;">XP</div>
              <div style="font-size:1.2rem;font-weight:700;color:var(--txt);">${U.fmtXP(cur.xp || 0)}</div>
              <div style="font-size:0.75rem;color:${d.xp.direction==='up'?'var(--ok)':(d.xp.direction==='down'?'var(--bad)':'var(--mut)')};font-weight:600;margin-top:2px;">${d.xp.direction==='up'?'▲':(d.xp.direction==='down'?'▼':'•')} ${d.xp.text}</div>
            </div>
          </div>
        </div>`;
      }
    }

    const allLessons = (typeof DATA_MERGE !== 'undefined') ? DATA_MERGE.allLessons() : COURSE;
    let html = `<div class="view-path"><h1>📖 Learn Path</h1><p class="sub">${allLessons.length} lessons · 4 stages · grammar through speaking</p>${rollupHtml}`;

    for (let stage = 1; stage <= 4; stage++) {
      const lessons = allLessons.filter(l => l.stage === stage);
      const stageComplete = lessons.every(l => completed.indexOf(l.id) !== -1);
      html += `<div class="stage-block">
        <div class="stage-header">
          <span class="stage-badge">${stageComplete ? '✅' : '●'}</span>
          <h2>Stage ${stage} — ${stages[stage - 1]}</h2>
        </div>
        <div class="lesson-grid">`;
      for (const lesson of lessons) {
        const done = completed.indexOf(lesson.id) !== -1;
        html += `<div class="lesson-card${done ? ' done' : ''}" data-lesson-id="${lesson.id}" onclick="navigate('lesson','${lesson.id}')">
          <div class="lesson-num">${lesson.id}</div>
          <div class="lesson-title">${lesson.title}</div>
          ${done ? '<div class="lesson-done">✅</div>' : '<div class="lesson-arrow">→</div>'}
        </div>`;
      }
      html += `</div></div>`;
    }
    html += `</div>`;
    el.innerHTML = html;
  }
};

/* ── LESSON PLAYER ──────────────────────────────────────────────────── */
VIEWS.lesson = {
  render(el, id) {
    const allLessons = (typeof DATA_MERGE !== 'undefined') ? DATA_MERGE.allLessons() : COURSE;
    const lesson = allLessons.find(l => l.id === id);
    if (!lesson) { el.innerHTML = '<p>Lesson not found.</p>'; return; }


    const completed = STORE.get('completed') || [];
    const isDone = completed.indexOf(id) !== -1;

    let patternRows = lesson.pattern.map(p =>
      `<tr>
        <td class="pattern-eng" data-say="${p.eng}">${p.eng} <button class="btn-sm" data-say="${p.eng}">🔊</button></td>
        <td class="pattern-note">${p.note}</td>
      </tr>`
    ).join('');

    el.innerHTML = `
    <div class="view-lesson" data-lesson-id="${lesson.id}">
      <div class="lesson-header">
        <button onclick="navigate('path')" class="btn-back">← Learn Path</button>
        <span class="stage-badge">Stage ${lesson.stage}</span>
      </div>
      <h1>${lesson.title}</h1>
      <p class="lesson-goal"><strong>Goal:</strong> ${lesson.goal}</p>

      <div class="section-title">📐 Pattern Table</div>
      <table class="pattern-table">
        <thead><tr><th>Example</th><th>Note</th></tr></thead>
        <tbody>${patternRows}</tbody>
      </table>

      <div class="warn-box">⚠️ ${lesson.warn}</div>

      <div class="section-title">🎤 Mission 1</div>
      <div id="mission1"></div>

      <div class="section-title">🎤 Mission 2</div>
      <div id="mission2"></div>

      ${isDone ? '<div class="already-done">✅ Lesson completed! You can practise again.</div>' : ''}
      <div id="lesson-complete" style="display:none" class="lesson-complete-banner">
        🎉 Lesson complete! +20 XP<br>
        <button onclick="navigate('path')" class="btn-primary">← Back to Path</button>
      </div>
    </div>`;

    let m1done = false, m2done = false;

    function checkComplete() {
      if (m1done && m2done) {
        STORE.completeLesson(id);
        STORE.addXP(20);
        TRAINER.log({skill: 'grammar', delta: 3, source: `lesson/${id}`});
        document.getElementById('lesson-complete').style.display = 'block';
        UI.toast('Lesson complete! +20 XP 🎉', 'success');
      }
    }

    const m1 = lesson.missions[0];
    const m2 = lesson.missions[1];

    UI.practiceBar(document.getElementById('mission1'), {
      prompt: m1.prompt,
      expected: m1.expected || m1.prompt.replace(/^Say:\s*["']?|["']$/g, '').trim(),
      skill: 'fluency',
      onPass: () => { m1done = true; checkComplete(); }
    });

    UI.practiceBar(document.getElementById('mission2'), {
      prompt: m2.prompt,
      expected: m2.expected || m2.prompt.replace(/^Say:\s*["']?|["']$/g, '').trim(),
      skill: 'fluency',
      onPass: () => { m2done = true; checkComplete(); }
    });
  }
};

/* ── CLARITY STUDIO ──────────────────────────────────────────────────── */
VIEWS.clarity = {
  _tab: 'stress',
  render(el) {
    const self = this;
    const tab = self._tab;

    const tabBar = `<div class="tab-bar">
      <button class="tab-btn${tab==='stress'?' active':''}" id="tab-stress">Word Stress</button>
      <button class="tab-btn${tab==='rhythm'?' active':''}" id="tab-rhythm">Rhythm</button>
      <button class="tab-btn${tab==='connected'?' active':''}" id="tab-connected">Connected Speech</button>
    </div>`;

    let content = '';
    if (tab === 'stress') {
      content = `<div class="stress-grid">` +
        CLARITY_DATA.stress.map(s => {
          const nounContext = (/^[aeiou]/i.test(s.word) ? 'an ' : 'a ') + s.word;
          const verbContext = 'to ' + s.word;
          return `
          <div class="stress-card" style="padding:16px;background:var(--bg1);border:1px solid var(--border);border-radius:12px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
              <strong style="font-size:1.2rem;color:var(--pri);text-transform:capitalize;">${s.word}</strong>
              <button class="btn-sm btn-primary cl-practice-trigger" data-target="${s.word}">🎤 Practice</button>
            </div>
            <div class="stress-row" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
              <button class="btn-sm btn-ghost" data-say="${nounContext}" title="Hear first-syllable noun stress">🔊 Noun (${nounContext})</button>
              <span class="stress-note" style="color:var(--mut);font-size:0.9rem;">${s.note}</span>
              <button class="btn-sm btn-ghost" data-say="${verbContext}" title="Hear second-syllable verb stress">🔊 Verb (${verbContext})</button>
            </div>
          </div>`;
        }).join('') + `</div>`;
    } else if (tab === 'rhythm') {
      content = `<div class="rhythm-list">` +
        CLARITY_DATA.rhythm.map(r => `
          <div class="rhythm-card" style="padding:16px;background:var(--bg1);border:1px solid var(--border);border-radius:12px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
              <p class="rhythm-sent" data-say="${r.sent}" style="margin:0;font-size:1.05rem;font-weight:700;">${r.sent}</p>
              <div style="display:flex;gap:6px;">
                <button class="btn-sm btn-ghost" data-say="${r.sent}">🔊 Hear</button>
                <button class="btn-sm btn-primary cl-practice-trigger" data-target="${r.sent}">🎤 Practice</button>
              </div>
            </div>
            <div class="rhythm-stressed" style="font-size:0.9rem;color:var(--accent);margin-bottom:4px;">Stressed words: ${r.stressed.map(w => `<strong>${w}</strong>`).join(', ')}</div>
            <div class="rhythm-note" style="font-size:0.85rem;color:var(--mut);">${r.note}</div>
          </div>`).join('') + `</div>`;
    } else {
      content = `<div class="connected-grid">` +
        CLARITY_DATA.connected.map(c => `
          <div class="connected-card" style="padding:16px;background:var(--bg1);border:1px solid var(--border);border-radius:12px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
              <div>
                <span class="conn-normal" style="color:var(--mut);">${c.normal}</span>
                <span class="conn-arrow" style="margin:0 8px;">→</span>
                <strong class="conn-natural" data-say="${c.natural}" style="color:var(--pri);font-size:1.1rem;">${c.natural} 🔊</strong>
              </div>
              <button class="btn-sm btn-primary cl-practice-trigger" data-target="${c.natural}">🎤 Practice</button>
            </div>
            <div class="conn-note" style="font-size:0.85rem;color:var(--mut);">${c.note}</div>
          </div>`).join('') + `</div>`;
    }

    el.innerHTML = `<div class="view-clarity">
      <h1>🎯 Clarity Studio</h1>
      <p class="sub">Stress · Rhythm · Intonation · Connected Speech</p>
      ${tabBar}
      <div class="tab-content">
        ${content}
        <div id="clarity-practice-slot" style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px;"></div>
      </div>
    </div>`;

    document.getElementById('tab-stress').addEventListener('click', () => { self._tab = 'stress'; self.render(el); });
    document.getElementById('tab-rhythm').addEventListener('click', () => { self._tab = 'rhythm'; self.render(el); });
    document.getElementById('tab-connected').addEventListener('click', () => { self._tab = 'connected'; self.render(el); });

    const triggers = el.querySelectorAll('.cl-practice-trigger');
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const target = trig.getAttribute('data-target');
        const slot = document.getElementById('clarity-practice-slot');
        if (slot && target) {
          UI.practiceBar(slot, { prompt: 'Say: "' + target + '"', expected: target, skill: 'clarity' });
          slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }
};

/* ── IDIOMS & PHRASAL VERBS ─────────────────────────────────────────── */
VIEWS.idioms = {
  _tab: 'idioms',
  _mode: 'browse',   // browse | quiz
  _quizIdx: 0,
  render(el) {
    const self = this;
    const { _tab: tab, _mode: mode } = self;

    const tabBar = `<div class="tab-bar">
      <button class="tab-btn${tab==='idioms'?' active':''}" id="tab-idioms">Idioms (48)</button>
      <button class="tab-btn${tab==='pvs'?' active':''}" id="tab-pvs">Phrasal Verbs (48)</button>
    </div>`;

    const modeBar = `<div class="mode-bar">
      <button class="tab-btn${mode==='browse'?' active':''}" id="mode-browse">📖 Browse</button>
      <button class="tab-btn${mode==='quiz'?' active':''}" id="mode-quiz">🎯 Quiz</button>
    </div>`;

    const data = tab === 'idioms' ? IDIOMS : PVS;
    let content = '';

    if (mode === 'browse') {
      content = `<div class="idiom-list">` +
        data.map(item => {
          const key = (tab === 'idioms' ? 'idn_' : 'pv_') + item.id;
          const m = STORE.getMastery(key);
          return `<div class="idiom-card" style="padding:16px;border-radius:14px;background:var(--bg1);border:1px solid var(--border);margin-bottom:14px;">
            <div class="idiom-head" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="idiom-text" style="font-size:1.15rem;font-weight:700;color:var(--pri);">${item.text}</span>
              <div style="display:flex;gap:6px;align-items:center;">
                <button class="btn-sm btn-ghost" data-say="${item.text}">🔊 Hear</button>
              </div>
            </div>
            <div class="idiom-meaning" style="font-size:1rem;margin-bottom:6px;">💡 <strong>What it means:</strong> ${item.meaning}</div>
            ${item.sit ? `<div style="font-size:0.9rem;color:var(--ok);margin-bottom:6px;">🎯 <strong>When & where to use:</strong> ${item.sit}</div>` : ''}
            ${item.how ? `<div style="font-size:0.85rem;color:var(--txt);margin-bottom:6px;">🛠️ <strong>How to use:</strong> ${item.how}</div>` : ''}
            ${item.dialogue ? `<div style="font-size:0.85rem;font-style:italic;color:var(--accent);background:rgba(124,58,237,0.06);padding:8px 12px;border-radius:8px;margin-bottom:8px;">💬 <strong>Dialogue:</strong> ${item.dialogue}</div>` : `<div class="idiom-eg"><em>"${item.eg}"</em></div>`}
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
              <div class="mastery-dots">${_masteryDots(m)}</div>
              <button class="btn-sm btn-ghost" data-say="${item.text}">🎤 Practice Saying</button>
            </div>
          </div>`;
        }).join('') + `</div>`;
    } else {
      // Quiz mode
      const item = data[self._quizIdx % data.length];
      const key = (tab === 'idioms' ? 'idn_' : 'pv_') + item.id;
      const m = STORE.getMastery(key);
      // Build distractor opts
      const others = data.filter(d => d.id !== item.id).slice(0, 8);
      const pool = [item.meaning];
      for (let i = 0; i < others.length && pool.length < 4; i++) {
        if (pool.indexOf(others[i].meaning) === -1) pool.push(others[i].meaning);
      }
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const optsHtml = pool.map(m2 =>
        `<button class="opt-btn" data-ans="${m2 === item.meaning ? '1' : '0'}">${m2}</button>`
      ).join('');

      content = `<div class="idiom-quiz">
        <div class="iq-num">${self._quizIdx + 1} / ${data.length}</div>
        <div class="iq-text">"${item.text}" <button class="btn-sm" data-say="${item.text}">🔊</button></div>
        <div class="mastery-dots">${_masteryDots(m)}</div>
        <div class="iq-question">What does this mean?</div>
        <div class="iq-opts" id="iq-opts">${optsHtml}</div>
        <div id="iq-fb"></div>
        <button class="btn-link" id="iq-next">Skip →</button>
      </div>`;
    }

    el.innerHTML = `<div class="view-idioms"><h1>📜 Idioms & Phrasal Verbs</h1>${tabBar}${modeBar}<div class="tab-content">${content}</div></div>`;

    document.getElementById('tab-idioms').addEventListener('click', () => { self._tab = 'idioms'; self._quizIdx = 0; self.render(el); });
    document.getElementById('tab-pvs').addEventListener('click', () => { self._tab = 'pvs'; self._quizIdx = 0; self.render(el); });
    document.getElementById('mode-browse').addEventListener('click', () => { self._mode = 'browse'; self.render(el); });
    document.getElementById('mode-quiz').addEventListener('click', () => { self._mode = 'quiz'; self.render(el); });

    if (mode === 'quiz') {
      const item = data[self._quizIdx % data.length];
      const key = (tab === 'idioms' ? 'idn_' : 'pv_') + item.id;
      const iqOpts = document.getElementById('iq-opts');
      if (iqOpts) {
        iqOpts.addEventListener('click', e => {
          const btn = e.target.closest('.opt-btn');
          if (!btn) return;
          const correct = btn.dataset.ans === '1';
          document.getElementById('iq-fb').innerHTML = correct
            ? `<p class="verdict pass">✅ Correct! "${item.eg}"</p>`
            : `<p class="verdict fail">❌ Meaning: ${item.meaning}</p>`;
          iqOpts.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
          STORE.master(key, correct);
          TRAINER.log({skill: 'vocab', delta: correct ? 2 : -1, source: `idioms/${tab}`});
          STORE.addXP(correct ? 5 : 1);
          setTimeout(() => { self._quizIdx++; self.render(el); }, 1400);
        });
      }
      document.getElementById('iq-next').addEventListener('click', () => { self._quizIdx++; self.render(el); });
    }
  }
};

/* ── SENTENCE DOCTOR ─────────────────────────────────────────────────── */
var DOCTOR_RULES = [
  {pat: /\b(he|she|it)\s+(go|come|eat|play|work|make|do|have)\b/i, msg: 'Missing third-person -s: "she goes", "he works"'},
  {pat: /\bdid\s+(not\s+)?(went|came|ate|played|worked|made|had)\b/i, msg: 'Use base form after "did/didn\'t": "didn\'t go" (not "didn\'t went")'},
  {pat: /\b(a)\s+[aeiou]/i, msg: 'Use "an" before vowel sounds: "an apple", "an hour"'},
  {pat: /\bmore\s+(bigger|smaller|faster|slower|better|worse)\b/i, msg: 'Double comparison: "better" not "more better"'},
  {pat: /\bI\s+am\s+(agree|disagree|know|think|want|need)\b/i, msg: 'State verb error: "I agree" (not "I am agree")'},
  {pat: /\bmake\s+(a\s+)?homework\b/i, msg: '"Do homework" (not "make homework")'},
  {pat: /\bdo\s+the\s+needful\b/i, msg: 'Dated Indian English: say "please handle this" or "please take care of this"'},
  {pat: /\bkindly\s+revert\b/i, msg: '"Revert" in this sense is Indian English: say "please reply" or "please get back to me"'},
  {pat: /\bI\s+will\s+revert\s+back\b/i, msg: '"Revert" already means "go back": say "I will reply" or "I will get back to you"'},
  {pat: /\bpreponed\b/i, msg: '"Preponed" is not standard English: say "moved earlier" or "rescheduled earlier"'},
  {pat: /\b(myself|yourself)\s+is\b/i, msg: 'Reflexive pronoun as subject: "I am" (not "myself is")'},
  {pat: /\balthough.*\bbut\b|\bbut.*\balthough\b/i, msg: 'Don\'t use "although" and "but" in the same clause: choose one'},
  {pat: /\bvery\s+unique\b/i, msg: '"Unique" is absolute: say "truly unique" or just "unique"'},
  {pat: /\bsince\s+\d+\s+(days?|weeks?|months?)\b/i, msg: 'Use "for" with duration: "for 3 days". Use "since" with a point: "since Monday"'},
  {pat: /\bdoubt\b/i, msg: 'Indian usage: "I have a doubt" → prefer "I have a question" in standard English'},
  {pat: /\bpassout\b/i, msg: '"Passout" as a noun (graduate) is Indian English: say "graduate" or "alumnus"'},
  {pat: /\bI\s+can\s+able\b/i, msg: '"Can able" is incorrect: say "I can do it" or "I am able to do it"'},
  {pat: /\bhe\s+is\s+must\b/i, msg: 'Modals don\'t use "be": "he must come" (not "he is must to come")'},
  {pat: /\bI\s+am\s+having\s+a\s+(doubt|question|problem)\b/i, msg: '"Have" for possession: "I have a question" (not "I am having")'},
  {pat: /\bon\s+the\s+other\s+hand[,\s]+on\s+the\s+other\s+hand\b/i, msg: 'Repeated phrase: use "on one hand... on the other hand"'},
  {pat: /irregardless/i, msg: '"Irregardless" is non-standard: use "regardless"'},
  {pat: /\bsupposably\b/i, msg: 'Incorrect form: use "supposedly"'},
  {pat: /\bflustrated\b/i, msg: 'Blend of "flustered" + "frustrated": say one or the other'},
  {pat: /\bcould\s+of\b/i, msg: '"Could of" is wrong: it\'s "could have" or "could\'ve"'},
  {pat: /\bshould\s+of\b/i, msg: '"Should of" is wrong: it\'s "should have" or "should\'ve"'},
  {pat: /\bwould\s+of\b/i, msg: '"Would of" is wrong: it\'s "would have" or "would\'ve"'},
  {pat: /\bless\s+\w+(s)\b/i, msg: 'For countable nouns, use "fewer" not "less": "fewer mistakes" (not "less mistakes")'},
  {pat: /\bbetween\s+\w+\s+and\s+\w+\s+and\b/i, msg: '"Between" is for two things: use "among" for three or more'},
  {pat: /\bI\s+myself\s+is\b/i, msg: '"I myself am" (not "I myself is")'},
  {pat: /\bthe\s+informations\b/i, msg: '"Information" is uncountable — no plural: "the information"'},
  {pat: /\badvices\b/i, msg: '"Advice" is uncountable — no plural: "pieces of advice"'},
  {pat: /\bfurnitures\b/i, msg: '"Furniture" is uncountable — no plural: "furniture"'},
  {pat: /\beither\s+\w+,\s*\w+\s+or\b/i, msg: '"Either...or" takes two options only'},
  {pat: /\bis\s+been\b/i, msg: '"Is been" is incorrect: say "has been" (present perfect)'},
  {pat: /\bwas\s+went\b/i, msg: '"Was went" is incorrect: say "went" (simple past)'}
];

VIEWS.doctor = {
  render(el) {
    el.innerHTML = `
    <div class="view-doctor">
      <h1>🩺 Sentence Doctor</h1>
      <p class="sub">Paste or speak any sentence — get instant diagnosis with fixes.</p>
      <div class="doctor-input">
        <textarea id="doctor-text" rows="4" placeholder="Type, paste, or speak a sentence or paragraph here..."></textarea>
        <div style="display:flex;gap:10px;margin-top:10px;align-items:center;flex-wrap:wrap;">
          <button class="btn-primary" id="doctor-check">🩺 Diagnose</button>
          <button class="btn-secondary" id="doctor-mic">🎙️ Speak Sentence</button>
        </div>
      </div>
      <div id="doctor-results"></div>
    </div>`;

    const micBtn = document.getElementById('doctor-mic');
    if (micBtn) {
      let isListening = false;
      micBtn.addEventListener('click', () => {
        if (!SPEECH.canListen()) {
          UI.toast('Speech recognition not available on this browser. Type your sentence above.', 'warning');
          return;
        }
        if (isListening) {
          SPEECH.stopListening();
          isListening = false;
          micBtn.textContent = '🎙️ Speak Sentence';
          micBtn.classList.remove('pulse');
          return;
        }
        isListening = true;
        micBtn.textContent = '⏹️ Stop Listening';
        micBtn.classList.add('pulse');
        SPEECH.listen({
          interim: true,
          continuous: true,
          onresult: (t, isFinal) => {
            const ta = document.getElementById('doctor-text');
            if (ta) { ta.value = t; }
            if (isFinal) {
              isListening = false;
              micBtn.textContent = '🎙️ Speak Sentence';
              micBtn.classList.remove('pulse');
              document.getElementById('doctor-check').click();
            }
          },
          onend: () => {
            isListening = false;
            micBtn.textContent = '🎙️ Speak Sentence';
            micBtn.classList.remove('pulse');
          },
          onerror: (msg, code) => {
            isListening = false;
            micBtn.textContent = '🎙️ Speak Sentence';
            micBtn.classList.remove('pulse');
            if (code !== 'aborted') { UI.toast(msg, 'warning'); }
          }
        });
      });
    }

    document.getElementById('doctor-check').addEventListener('click', () => {
      const text = document.getElementById('doctor-text').value.trim();
      if (!text) { UI.toast('Please enter a sentence.', 'error'); return; }
      const results = [];
      for (const rule of DOCTOR_RULES) {
        if (rule.pat.test(text)) results.push(rule.msg);
      }
      const resultsEl = document.getElementById('doctor-results');
      if (results.length === 0) {
        resultsEl.innerHTML = `<div class="doctor-ok">✅ No common errors detected! Your sentence looks good.</div>`;
        TRAINER.log({skill: 'grammar', delta: 1, source: 'doctor/clean'});
      } else {
        resultsEl.innerHTML = `<div class="doctor-issues">
          <h3 style="margin-bottom:12px;color:var(--warn);">⚠️ ${results.length} issue${results.length > 1 ? 's' : ''} detected:</h3>
          <div style="display:flex;flex-direction:column;gap:10px;">${results.map((r, idx) => `
            <div class="doctor-issue-card" style="background:var(--bg1);border:1px solid var(--border);border-left:4px solid var(--warn);border-radius:10px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <strong style="color:var(--warn);font-size:0.95rem;">Diagnosis #${idx + 1}</strong>
                <span class="badge" style="font-size:0.75rem;">Grammar Doctor</span>
              </div>
              <div style="font-size:0.95rem;color:var(--txt);line-height:1.4;">${r}</div>
            </div>
          `).join('')}</div>
        </div>`;
        TRAINER.log({skill: 'grammar', delta: -1, source: 'doctor/issues'});
      }
      STORE.addXP(2);
      if (typeof WEEKLY !== 'undefined' && WEEKLY.recordFixerSession) {
        const words = (typeof U !== 'undefined' && U.tokenise) ? U.tokenise(text).length : text.split(/\s+/).filter(Boolean).length;
        WEEKLY.recordFixerSession({
          issuesCount: results.length,
          wordCount: words,
          wpm: 120,
          fillersPerMin: 0
        });
      }
    });
  }
};
