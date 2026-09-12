import { STATE_LABELS, type LessonState } from '../state/lessonMachine';

interface StateIndicatorProps {
  state: LessonState;
}

/**
 * Subtle, non-alarming state indicator.
 *
 * IDLE is a normal state, so the indicator is intentionally muted —
 * never styled like an error or warning.
 */
export function StateIndicator({ state }: StateIndicatorProps) {
  return (
    <div className="state-indicator" aria-live="polite" role="status">
      <span className="state-indicator__dot" aria-hidden="true" />
      <span className="state-indicator__label">{STATE_LABELS[state]}</span>
    </div>
  );
}
