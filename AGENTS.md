# EngSpell — Agent Instructions & Invariants

> Read this file completely before writing any code. Every invariant below is **binding**
> and must be preserved across every commit, phase, and agent session.

---

## 8 Binding Invariants

### INV-1 — No Build Step to Run (dev)
The app must run by opening `index.html` directly in a browser (via `file://`) or via any
static HTTP server (`python3 -m http.server 8000`). No npm install, no webpack, no Vite,
no bundler required to develop or preview. `build.sh` produces the portable single-file
artifact but is NOT required to run the app in dev.

### INV-2 — Offline-First, Opt-In Cloud, Graceful Degradation
- All content (lessons, words, idioms, audio via TTS) must work with zero internet.
- Web Speech API (TTS + STT) is used as-is — it may call cloud internally but requires
  no API key from the developer or user.
- Nova's Gemini integration is **opt-in**: user pastes their own free API key in Settings.
  When no key is set, Nova MUST fall back to the local rule engine without errors.
- No external CDNs, no remote fonts, no remote scripts — ever.

### INV-3 — `node test.js` Must Stay Green
- Run `node test.js` before AND after every change.
- All ~140 checks must pass. A red test blocks the change.
- `test.js` stubs `window`, `document`, `localStorage`, `speechSynthesis`,
  `SpeechRecognition` so it runs in plain Node with no browser.
- New modules MUST add corresponding checks to `test.js`.

### INV-4 — One-File Build via `bash build.sh`
- `build.sh` concatenates all `src/*.js` files in dependency order into
  `engspell-standalone.html` (a single self-contained HTML file, ~350 KB target).
- The standalone file must pass the same smoke checks as `index.html`.
- Run `bash build.sh` after any change to verify the build still works.

### INV-5 — Append-Only Storage Schema
- `STORE` lives in `localStorage` as a single JSON object.
- Adding new keys: always append with a default value in `STORE.def`.
- Never rename or remove existing keys silently — bump `STORE.version` and write
  a migration step in `STORE.migrate()`.
- Mastery key prefixes (`spell_`, `idn_`, `pv_`, `lsn_`) are stable — do not change.

### INV-6 — ES5-Compatible Core, ES6 in Views-D/E Only
- `data.js`, `data2.js`, `data3.js`, `speech.js`, `core.js`, `views-a.js`,
  `views-b.js`, `views-c.js` — **ES5 only** (var, function declarations, no arrow
  functions, no template literals, no destructuring).
- `views-d.js`, `views-e.js` — ES6 allowed (template literals, arrow functions,
  const/let, destructuring).
- Reason: ensures maximum browser compatibility for the standalone file.
- Run `node --check src/<file>.js` after editing any source file.

### INV-7 — TRAINER_EVENTS Schema Is Immutable Once Set
- Every module that affects a skill MUST fire via `TRAINER.log(event)`.
- Schema: `{ skill, delta, source, ts }` — see core.js for definition.
- Never increment skill scores directly on `STORE`; always go through `TRAINER.log`.
- This makes the adaptive engine auditable and testable.

### INV-8 — No Network Calls Except Gemini (Opt-In, User Key)
- The only permitted `fetch()` call is to `generativelanguage.googleapis.com` inside
  Nova's Gemini handler, and ONLY when `STORE.settings.geminiKey` is non-empty.
- All other data is local. Preview iframes have no network access — everything must
  render from local data.

---

## Script Load Order (index.html)
Must be loaded in exactly this order — each file depends on the previous:

```
src/data.js       → LETTERS, SOUNDS, WORDS, PAIRS, TWISTERS, SPELLING, COACH_RULES
src/data2.js      → COURSE, CLARITY_DATA, IDIOMS, PVS, QUOTES, DAILY_SEEDS
src/data3.js      → ATLAS, PASSAGES, ASSESSMENT_POOLS, SKILL_META
src/speech.js     → SPEECH (TTS + STT wrapper)
src/core.js       → STORE, TRAINER, U, UI, router, nav
src/views-a.js    → VIEWS.home, VIEWS.foundations, VIEWS.pronunciation
src/views-b.js    → VIEWS.spelling, VIEWS.phrases, VIEWS.scenarios
src/views-c.js    → VIEWS.coach, VIEWS.quiz, VIEWS.wordbank, VIEWS.settings
src/views-d.js    → VIEWS.daily, VIEWS.path, VIEWS.lesson, VIEWS.clarity,
                     VIEWS.idioms, VIEWS.doctor, VIEWS.onboarding
src/views-e.js    → VIEWS.trainer, VIEWS.assessment, VIEWS.listening, VIEWS.atlas
```

---

## Mission Backlog & Release Status

- **PWA-01**: Offline PWA, Web App Manifest, Service Worker cache-first — **SHIPPED** (2026-09-20 · `e517f27`)
- **SRS-01**: Spaced repetition schedule (1/3/7/16/35 days), review queue, live nav badge — **SHIPPED** (2026-09-20 · `e517f27`)
- **CNT-1**: Content expansion (+12 lessons, +6 scenarios, +10 passages, +30 power words) — **SHIPPED** (2026-09-21 · `e517f27`)
- **READ-01**: Reading Corner, interactive IPA word chips, audio, vocab saves — **SHIPPED** (2026-09-21 · `d916c81`)
- **M8**: UI Polish & Design Tokens, structured nav groupings, mobile bar — **SHIPPED** (2026-09-22 · `927d86d`)
- **M6**: Today's Flow, 5-step sequence lock, streak retrofix, global chip — **SHIPPED** (2026-09-22)
- **M7**: Honest Mode, brutal honesty toggle, /10 scoring, offline uncapped fixes, resume review persona — **SHIPPED** (2026-09-22)
- **M9**: Live Coach, word-level offline matching, interrupt decision engine, Android backoff loop, free talk live & barge-in — **SHIPPED** (2026-09-22)
- **M10**: Free-LLM Provider Switch, multi-provider architecture (Gemini / Groq / OpenRouter), unified llmAsk, fallback floor — **SHIPPED** (2026-09-22)
- **M11**: First-5-Minutes Onboarding (ONB-01), 4-screen flow, placement calibration, instant win live drill, cloud brain unlock — **SHIPPED** (2026-09-22)
- **M12**: Local Reminders (NTFY-01), aligned hour scheduling, notification permission gate, graceful degradation — **SHIPPED** (2026-09-22)

---

## Phase Backlog (Agent Tasks)

### ✅ PHASE 0 — Bootstrap
- [x] Create README.md, AGENTS.md
- [x] Create index.html shell
- [x] Create src/ with all stub files
- [x] Create test.js (first 20 checks)
- [x] Create build.sh
- [x] Run node --check on all src files → green
- [x] Run node test.js → green

### ✅ PHASE 1 — Core Data & Shell
- [x] Fill data.js: LETTERS, SOUNDS (44), WORDS (130+), PAIRS (18), TWISTERS, SPELLING (60)
- [x] Fill data2.js: COURSE (44 lessons), CLARITY_DATA, IDIOMS (48), PVS (48), QUOTES, DAILY_SEEDS
- [x] Fill data3.js: ATLAS (12 tenses), PASSAGES (22), ASSESSMENT_POOLS, SKILL_META
- [x] Implement STORE (schema v2, migrate(), def)
- [x] Implement TRAINER (log, aggregate, radar data)
- [x] Implement U (norm, contractions, align, verdict)
- [x] Implement router + nav
- [x] Home view (streak, XP, week chart, next-action card)
- [x] Onboarding view (name, goal, placement → CEFR)

### ✅ PHASE 2 — Learn Path & Speech
- [x] speech.js: TTS (voice pick, rate, slow), STT (interim, alts, error taxonomy), text fallback
- [x] Learn Path view (44 lessons · 4 stages)
- [x] Lesson Player (pattern table, 2 spoken missions, U.align scoring)
- [x] node test.js green · bash build.sh

### ✅ PHASE 3 — Daily Ritual
- [x] Today's Dose (date-seeded twister, power word, idiom quiz, quote shadow)
- [x] Streak system, XP rewards, Daily Star badge, quests
- [x] node test.js green · bash build.sh

### ✅ PHASE 4 — Nova AI Coach
- [x] Nova chat UI (voice I/O + text fallback)
- [x] Rule engine (20 intents, 20 grammar rules, 12 vocab upgrades)
- [x] Gemini 2.0 Flash integration (opt-in, user key, client-side fetch)
- [x] Graceful fallback when no key
- [x] 5-Q mock interview mode
- [x] node test.js green · bash build.sh

### ✅ PHASE 5 — Skill Labs
- [x] Pronunciation Lab (130+ words, 18 minimal pairs, ear quiz, twisters, sentence shadow)
- [x] Clarity Studio (stress, rhythm, intonation, connected speech, speed ladder)
- [x] Listening Lab (22 graded passages A1–C1 + comprehension + dictation)
- [x] Spelling Trainer (60 words · 3 levels · audio dictation)
- [x] Phrase Builder (24 builds, 18 grammar blanks, phrasebook)
- [x] Sentence Doctor (35+ rules, desi-English patterns)
- [x] Idioms & Phrasal Verbs (48+48, audio, quiz mode, decks)
- [x] Grammar Atlas (12 tenses, tense detective quiz)
- [x] node test.js green · bash build.sh

### ✅ PHASE 6 — Adaptive System & Assessment
- [x] My Trainer SVG Weakness Radar (6 skills, auto-plan, next-best-action)
- [x] Speaking Assessment (5 tasks, WPM, filler count, CEFR calibration, report cards, history)
- [x] Progress graph (score over time)
- [x] Conversations & Scenarios (14 role-plays with voice scoring)
- [x] node test.js green · bash build.sh

### ✅ PHASE 7 — Word Bank, Level Test, PWA & Polish
- [x] Word Bank (130+ words, IPA, mastery dots, search, SM-2 SRS)
- [x] Level Test (15 from 30-Q bank → CEFR placement + skill bars)
- [x] Settings (voice picker, speed, daily goal, Gemini key input, export/reset)
- [x] manifest.webmanifest + sw.js (PWA, install prompt, offline)
- [x] test.js full suite (147 checks)
- [x] bash build.sh → engspell-standalone.html verified
- [x] node test.js green · bash build.sh

---

## Invariant Checklist (run after every change)

```bash
node --check src/data.js
node --check src/data2.js
node --check src/data3.js
node --check src/speech.js
node --check src/core.js
node --check src/views-a.js
node --check src/views-b.js
node --check src/views-c.js
node --check src/views-d.js
node --check src/views-e.js
node test.js
bash build.sh
```
