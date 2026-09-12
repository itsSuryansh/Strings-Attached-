/**
 * The lesson objective, rendered as the sequence the learner will master:
 *
 *   C  →  Am  →  C→Am transition  →  Downstroke
 *
 * This is static product content — it does NOT reflect measured progress,
 * so it must never show fabricated scores, confidence, or FMI.
 */
const STEPS: ReadonlyArray<{ title: string; caption: string }> = [
  { title: 'C', caption: 'Form the C chord' },
  { title: 'Am', caption: 'Form the A minor chord' },
  { title: 'C → Am', caption: 'The transition' },
  { title: 'Downstroke', caption: 'Strum dynamics' },
];

export function LessonRoadmap() {
  return (
    <ol className="roadmap">
      {STEPS.map((step, i) => (
        <li className="roadmap__step" key={step.title}>
          <div className="roadmap__node">
            <span className="roadmap__title">{step.title}</span>
            <span className="roadmap__caption">{step.caption}</span>
          </div>
          {i < STEPS.length - 1 && (
            <span className="roadmap__arrow" aria-hidden="true">
              ↓
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
