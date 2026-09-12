import { useReducer } from 'react';
import {
  INITIAL_STATE,
  lessonReducer,
  type LessonEvent,
  type LessonState,
} from '../state/lessonMachine';

export interface LessonStore {
  /** Current lesson state (single source of truth). */
  state: LessonState;
  /** Dispatch a state-machine event. */
  dispatch: (event: LessonEvent) => void;
}

/**
 * Hook wrapping the lesson reducer. This is the one place components
 * obtain and mutate the current lesson state.
 */
export function useLessonState(): LessonStore {
  const [state, dispatch] = useReducer(lessonReducer, INITIAL_STATE);
  return { state, dispatch };
}
