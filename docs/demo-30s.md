# EngSpell — 30-Second Product Demo & Storyboard

This document contains the exact 30-second storyboard script, camera/screen choreography, and Windows Xbox Game Bar recording instructions to produce the demo video for EngSpell.

---

## ⏱️ The 30-Second Storyboard Script

Total duration: **30 seconds**  
Concept: **Placement Win → Live Drill Interruption → Brutal Verdict**

```
[00:00 - 00:08] ACT 1: Placement Calibration & Instant Win
[00:08 - 00:20] ACT 2: Live Drill Word-Matching & Interruption
[00:20 - 00:30] ACT 3: Brutal Verdict & Progress Rollup
```

---

### Act 1 — Placement Win (0:00 – 0:08)
- **Screen**: First-5-Minutes Onboarding (`#/onboarding`)
- **Action**:
  1. Learner enters name "Aarav" and clicks **Start Calibration →**.
  2. Quick-taps 5 answers on Screen 2 (Placement Quiz).
  3. Screen 3 appears instantly: **"Placement: B1 (Intermediate) · Ready for Live Drill"**.
- **Visual Callout**:
  - Immediate celebratory XP pop (`+10 XP`)
  - No signup wall, no email prompt, zero friction.

---

### Act 2 — Live Drill & Offline Interruption (0:08 – 0:20)
- **Screen**: Live Coach Drill (`#/coach` Drill tab or Onboarding Screen 3)
- **Target Sentence**:
  > *"I am looking forward to discussing the quarterly performance results with my team."*
- **Spoken Action**:
  - Learner speaks clearly: *"I am looking forward to discussing..."*
  - Real-time word matching lights up chips green word-by-word (`I` `am` `looking` `forward` `to` `discussing`).
  - Learner deliberately stumbles or inserts filler: *"uh... um... quarterly..."*
- **The Magic Moment (Interrupt)**:
  - Speech engine triggers **⚡ Live Correction** chip:
    `🎙️ "Pause — clear cadence required. Avoid 'uh/um'."`
  - Learner resets and finishes sentence cleanly.
- **Audio/Visual Callout**:
  - Visual pulse on speech recognition waveform.
  - Offline barge-in audio cue.

---

### Act 3 — Brutal Honesty Verdict & Progress (0:20 – 0:30)
- **Screen**: Live Coach Verdict Card & Home Flow
- **Visual**:
  - Brutal honesty chip appears: `⚡ Live Score: 7/10`
  - Feedback summary displayed:
    ```
    Mistakes to fix:
    ▸ Hesitation detected on transition word
    ▸ Upgrade "looking forward to" → "eagerly anticipating" (C1)
    Exact corrected sentence required. Under 90 words.
    ```
  - Learner clicks **Home (Flow)**:
    - Step 1 (Diagnose) marked ✅
    - Step 2 (Learn) marked ✅
    - Streak ticks to **🔥 1 Day**
    - One-line strip highlights: **"📈 This Week: held B1, pacing toward B2 · 118 WPM"**
- **Closing Punchline**:
  > *"The ₹0 forever English coach that stops you mid-sentence."*

---

## 🎥 Recording Guide (Windows Xbox Game Bar)

Follow these steps to record the 30-second clip on Windows 10/11:

### 1. Preparation
1. Open Google Chrome or Microsoft Edge.
2. Navigate to your local instance (`http://localhost:8000` or open `index.html`).
3. Set your browser window size to **1920×1080** (or full screen 1080p) with 100% zoom.
4. Open DevTools Application tab → Storage → Clear site data (so you get a clean first-time onboarding).

### 2. Configure Xbox Game Bar (Win + G)
1. Press **`Win + G`** to open the Xbox Game Bar overlay.
2. In the **Capture** widget:
   - Make sure **Microphone is ON** (`Win + Alt + M` toggles mic).
   - In Audio settings, balance system audio and microphone levels.
3. In Windows Settings (`Settings > Gaming > Captures`):
   - Set Video frame rate to **60 fps**.
   - Set Video quality to **High**.

### 3. Record the Clip
1. Press **`Win + Alt + R`** to start recording immediately.
2. Follow the 3-act storyboard above (rehearse once or twice to hit the 30s timing).
3. Press **`Win + Alt + R`** again to stop recording.

### 4. Save and Embed
1. Windows saves the MP4 video to:
   `C:\Users\<Username>\Videos\Captures\`
2. Rename the captured file to `demo-30s.mp4`.
3. Copy or move the file into the `docs/` folder:
   `docs/demo-30s.mp4`
4. (Optional) Convert the 30s clip to WebP or WebM using ffmpeg:
   ```bash
   ffmpeg -i docs/demo-30s.mp4 -vcodec libvpx-vp9 -crf 30 -b:v 0 docs/demo-30s.webm
   ```
