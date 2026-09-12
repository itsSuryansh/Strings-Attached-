import { CalibratingScreen } from './screens/CalibratingScreen';
import { IdleScreen } from './screens/IdleScreen';
import { useLessonState } from './hooks/useLessonState';

/**
 * StringsAttached — root component.
 *
 * Renders the screen for the current lesson state. State lives in the
 * lesson machine (single source of truth); screens only read it and dispatch
 * events. No sensing, scoring, or Gemini is triggered from here.
 */
export function App() {
  const { state, dispatch } = useLessonState();

  switch (state) {
    case 'IDLE':
      return <IdleScreen onStartLesson={() => dispatch({ type: 'START_LESSON' })} />;
    case 'CALIBRATING':
      return <CalibratingScreen onCancel={() => dispatch({ type: 'CANCEL_LESSON' })} />;
    // Future states (C_CHORD, C_STABLE, TRANSITIONING, AM_CANDIDATE,
    // AM_STABLE, STRUM_DYNAMICS, LESSON_PASS) will be added in later phases.
    default:
      // Unreachable while only IDLE/CALIBRATING are wired; defensive fallback.
      return <IdleScreen onStartLesson={() => dispatch({ type: 'START_LESSON' })} />;
  }
}
