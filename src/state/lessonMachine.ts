/**
 * StringsAttached — lesson state machine.
 *
 * This module is the SINGLE SOURCE OF TRUTH for the current lesson state.
 * Components and future sensing/coaching layers must read from here rather
 * than scattering `"IDLE"` (etc.) strings throughout the codebase.
 *
 * The full V13-FINAL state machine is declared here so that subsequent
 * phases can extend it WITHOUT rewriting the IDLE implementation:
 *
 *   IDLE
 *     ↓
 *   CALIBRATING
 *     ↓
 *   C_CHORD
 *     ↓
 *   C_STABLE
 *     ↓
 *   TRANSITIONING
 *     ↓
 *   AM_CANDIDATE
 *     ↓
 *   AM_STABLE
 *     ↓
 *   STRUM_DYNAMICS
 *     ↓
 *   LESSON_PASS
 *
 * Only IDLE → CALIBRATING is wired in this phase. The remaining
 * transitions are declared but intentionally not reachable yet.
 */

/** All states of the V13-FINAL lesson state machine. */
export type LessonState =
  | 'IDLE'
  | 'CALIBRATING'
  | 'C_CHORD'
  | 'C_STABLE'
  | 'TRANSITIONING'
  | 'AM_CANDIDATE'
  | 'AM_STABLE'
  | 'STRUM_DYNAMICS'
  | 'LESSON_PASS';

/** Initial state of the application. */
export const INITIAL_STATE: LessonState = 'IDLE';

/**
 * Events that can be dispatched to the state machine.
 *
 * Only START_LESSON and CANCEL_LESSON are handled in this phase.
 * Remaining events are placeholders for subsequent phases.
 */
export type LessonEvent =
  /** User pressed [ START LESSON ] — begin calibration. */
  | { type: 'START_LESSON' }
  /** User cancelled before/during the lesson — return to IDLE. */
  | { type: 'CANCEL_LESSON' };

/**
 * Deterministic transition table.
 *
 * Authority separation (V13): this reducer owns system state only. It never
 * performs measurement, scoring, or calls Gemini. Those concerns live in the
 * sensing/coaching layers that will attach in later phases.
 */
export function lessonReducer(
  state: LessonState,
  event: LessonEvent,
): LessonState {
  switch (state) {
    case 'IDLE':
      switch (event.type) {
        case 'START_LESSON':
          // IDLE → CALIBRATING. Full calibration logic is implemented in the
          // next phase; this establishes the transition entry point only.
          return 'CALIBRATING';
        case 'CANCEL_LESSON':
          // Already idle — a cancel in IDLE is a no-op.
          return state;
      }
      break;

    case 'CALIBRATING':
      switch (event.type) {
        case 'START_LESSON':
          // Already calibrating — ignore duplicate starts.
          return state;
        case 'CANCEL_LESSON':
          // Return to IDLE before the lesson actually begins.
          return 'IDLE';
      }
      break;

    // All later states are declared but not reachable in this phase.
    // They are intentionally unhandled so TypeScript (noFallthroughCasesInSwitch)
    // flags any accidental early wiring, keeping this phase's scope tight.
    case 'C_CHORD':
    case 'C_STABLE':
    case 'TRANSITIONING':
    case 'AM_CANDIDATE':
    case 'AM_STABLE':
    case 'STRUM_DYNAMICS':
    case 'LESSON_PASS':
      break;
  }

  return state;
}

/**
 * Human-readable labels for the state indicator and any diagnostics.
 * Kept here so wording for a state lives in exactly one place.
 */
export const STATE_LABELS: Record<LessonState, string> = {
  IDLE: 'IDLE',
  CALIBRATING: 'CALIBRATING',
  C_CHORD: 'C_CHORD',
  C_STABLE: 'C_STABLE',
  TRANSITIONING: 'TRANSITIONING',
  AM_CANDIDATE: 'AM_CANDIDATE',
  AM_STABLE: 'AM_STABLE',
  STRUM_DYNAMICS: 'STRUM_DYNAMICS',
  LESSON_PASS: 'LESSON_PASS',
};
