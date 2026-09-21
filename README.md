# EngSpell

**EngSpell — Speak · Spell · Shine**
The complete English mastery studio: foundations → fluency, powered by an adaptive trainer
and Nova, a speaking coach you actually talk to.

Built for learners who can form basic sentences but want grammar-perfect, confident,
high-level English. Especially designed for Indian English learners.

---

## What It Is

EngSpell is a single-page "English gym" that runs entirely in the browser:

- **Real course** — 32 lessons (Survivor → Master) teaching grammar through spoken patterns,
  with 2 voice missions each that must be completed aloud.
- **Nova, the AI coach** — free conversation with live grammar correction + native upgrades,
  powered by Gemini 2.0 Flash (free tier, your API key). Falls back to rule engine offline.
- **Adaptive engine** — every action in every module feeds a 6-skill Weakness Radar;
  the app prescribes your next task, never a generic list.
- **Daily ritual** — Today's Dose: twister, power word, idiom quiz, quote shadow, streaks, XP.
- **Speaking Assessment** — 5 timed tasks (WPM, filler counter, grammar slips) with report
  cards + CEFR estimates saved over time.

---

## Skill Labs

| Module | Route | Description |
|---|---|---|
| Home + Onboarding | `#/home` | Daily goal ring, streak, week chart, next-best-action |
| Today's Dose | `#/daily` | Daily twister / power word / idiom quiz / quote shadow |
| My Trainer | `#/trainer` | SVG Weakness Radar (6 skills), auto-plan |
| Learn Path | `#/path`, `#/lesson/:id` | 32 lessons · 4 stages, pattern tables, 2 missions each |
| Grammar Atlas | `#/atlas` | 12 tenses (machine, when, signal words) + tense quiz |
| Foundations | `#/foundations` | Alphabet, 20 vowels, 24 consonants, spell-anything tool |
| Idioms & Phrasal Verbs | `#/idioms` | 48 + 48 with audio, decks, quiz mode |
| Pronunciation Lab | `#/pronunciation` | 130+ words (A1→C1+), 18 minimal pairs, twisters |
| Clarity Studio | `#/clarity` | Word stress, rhythm, intonation, connected speech |
| Listening Lab | `#/listening` | 12 graded passages (A1–C1) + comprehension + dictation |
| Spelling Trainer | `#/spelling` | 60 words · 3 levels · audio dictation rounds |
| Phrase Builder | `#/phrases` | 24 sentence builds, 18 grammar blanks, phrasebook |
| Sentence Doctor | `#/doctor` | Paste any sentence → 35+ diagnoses incl. desi-English |
| Conversations | `#/scenarios` | 8 scenarios, key phrases, full voice role-play + scoring |
| Nova — AI Coach | `#/coach` | Gemini-powered free conversation + grammar surgery |
| Review Queue | `#/review` | SM-2 spaced repetition review deck (1/3/7/16/35 days) |
| Reading Corner | `#/read` | Graded passages A1–C1, word tap IPA chips, vocabulary saves |
| Speaking Assessment | `#/assessment` | 5 timed tasks → WPM + filler counts → report card |
| Level Test | `#/quiz` | 15 from 30-Q bank → CEFR placement + skill bars |
| Word Bank | `#/wordbank` | 130+ words, IPA, mastery tracking, SM-2 SRS, search |
| Settings | `#/settings` | Voice picker, speed, daily goal, Gemini API key, export |

---

## Roadmap & Release Status

- **PWA-01**: Offline PWA, Web App Manifest, Service Worker cache-first — **SHIPPED** (2026-09-20 · `e517f27`)
- **SRS-01**: Spaced repetition schedule (1/3/7/16/35 days), review queue, live nav badge — **SHIPPED** (2026-09-20 · `e517f27`)
- **CNT-1**: Content expansion (+12 lessons, +6 scenarios, +10 passages, +30 power words) — **SHIPPED** (2026-09-21 · `e517f27`)
- **READ-01**: Reading Corner, interactive IPA word chips, audio, vocab saves — **SHIPPED** (2026-09-21 · `d916c81`)

---

## Running the App (Dev)

```bash
cd engspell.ai
python3 -m http.server 8000 --bind 0.0.0.0
# open http://localhost:8000
```

Or just open `index.html` directly in Chrome/Edge. No npm, no install, no build step.

---

## Running Tests

```bash
node test.js
# Expected: ~140 checks, all green
```

Tests run in plain Node — no browser required. DOM, localStorage, and Speech APIs are stubbed.

---

## Building the Standalone File

```bash
bash build.sh
# Outputs: engspell-standalone.html (~350 KB)
# Self-contained, shareable, installable as PWA
```

---

## Nova — Getting Your Free API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API key** → **Create API key**
4. Copy the key
5. In EngSpell → Settings → paste it into the **Gemini API Key** field
6. Nova is now powered by real AI (1500 free requests/day)

Without a key: Nova uses the local rule engine — still useful, just not conversational.

---

## Architecture

```
index.html          Shell: sidebar + topbar + #view + <script> load order
build.sh            Concatenates src/ → engspell-standalone.html
test.js             Node smoke suite (~140 checks, stubbed APIs)
manifest.webmanifest
sw.js               Service worker (offline PWA)

src/
  data.js           Letters, 44 sounds, 130 words, pairs, twisters, spelling, coach rules
  data2.js          COURSE (32 lessons), clarity data, idioms/PVs, quotes, daily seeds
  data3.js          Grammar Atlas (12 tenses), 12 listening passages, assessment pools
  speech.js         TTS (voice pick, rate, slow) + SpeechRecognition wrapper
  core.js           STORE, TRAINER, U (align/norm), UI primitives, router, nav
  views-a.js        Home, Foundations, Pronunciation Lab
  views-b.js        Spelling, Phrase Builder, Scenarios + role-play engine
  views-c.js        Nova coach (Gemini + rule engine), Quiz, Word Bank, Settings
  views-d.js        Daily Dose, Learn Path, Lesson Player, Clarity, Idioms, Doctor
  views-e.js        Trainer radar, Speaking Assessment, Listening Lab, Grammar Atlas
```

---

## Browser Support

| Capability | Chrome/Edge | Safari | Firefox |
|---|---|---|---|
| TTS (listen everywhere) | ✅ | ✅ | ✅ |
| Speech recognition (mic) | ✅ | partial | ❌ |
| localStorage progress | ✅ | ✅ | ✅ |
| PWA install | ✅ | ✅ | ❌ |

Firefox users see graceful text-input fallbacks everywhere mic is needed.

---

## Key Design Invariants

See [AGENTS.md](./AGENTS.md) for the 8 binding invariants every change must satisfy.

Quick list:
1. No build step to run the app in dev
2. Offline-first; Gemini is opt-in and degrades gracefully
3. `node test.js` must stay green before and after every change
4. One-file build via `bash build.sh`
5. Append-only `STORE` schema with versioned migrations
6. ES5 in core files; ES6 only in `views-d.js` and `views-e.js`
7. All skill changes go through `TRAINER.log()` — never direct
8. No network calls except opt-in Gemini (user key required)

---

## EngSpell = English + Spelling + the moment everything finally spells itself out. ✨
