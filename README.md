# StringsAttached

**AI motor-skill coach** — learn a short guitar/ukulele sequence through
visual and acoustic feedback.

> **Current phase:** initial application state (`IDLE`) and the
> `IDLE → CALIBRATING` transition entry point. Camera, MediaPipe, audio,
> chord recognition, FMI, and Gemini coaching are **not** yet implemented.

## Lesson objective

```
C
↓
Am
↓
C → Am
↓
Downstroke
```

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm test         # run the state-machine tests
```

## Architecture

- **State machine** — `src/state/lessonMachine.ts` is the **single source of
  truth** for lesson state. The full V13-FINAL state set is declared there;
  only `IDLE` and `CALIBRATING` are wired so far.
- **State hook** — `src/hooks/useLessonState.ts` wraps the reducer with
  `useReducer`.
- **Screens** — `src/screens/` renders one screen per state
  (`IdleScreen`, `CalibratingScreen` placeholder).
- **Components** — `src/components/` holds small, reusable pieces
  (`StateIndicator`, `LessonRoadmap`).

### Authority separation (V13)

The deterministic local layer owns system state, measurements, and scoring.
Gemini will provide coaching reasoning in a later phase and is **never**
invoked from `IDLE`. No fabricated measurements, FMI, or tracking data are
displayed anywhere.

## State machine

```
IDLE → CALIBRATING → C_CHORD → C_STABLE → TRANSITIONING →
AM_CANDIDATE → AM_STABLE → STRUM_DYNAMICS → LESSON_PASS
```

| Event         | From         | To          | Status        |
| ------------- | ------------ | ----------- | ------------- |
| START_LESSON  | IDLE         | CALIBRATING | implemented   |
| CANCEL_LESSON | CALIBRATING  | IDLE        | implemented   |
| (rest)        | —            | —           | next phases   |

## Roadmap

1. ✅ Initial `IDLE` state + `IDLE → CALIBRATING` entry point
2. ⬜ Camera + MediaPipe + audio + deterministic sensing layer
3. ⬜ Chord recognition, transition, strum, FMI
4. ⬜ Gemini Live coaching, verification, intervention history
