import { LessonRoadmap } from '../components/LessonRoadmap';
import { StateIndicator } from '../components/StateIndicator';

interface IdleScreenProps {
  onStartLesson: () => void;
}

/**
 * The initial product screen (IDLE).
 *
 * Deliberately shows an intentional pre-session visual — NOT a live camera
 * feed and NOT fabricated tracking data. No camera, microphone, or Gemini
 * is engaged while this screen is visible.
 */
export function IdleScreen({ onStartLesson }: IdleScreenProps) {
  return (
    <main className="screen">
      <header className="brand">
        <h1 className="brand__name">STRINGSATTACHED</h1>
        <p className="brand__tagline">AI motor-skill coach</p>
      </header>

      <section className="stage" aria-label="Practice preview">
        <div className="stage__frame">
          <span className="stage__neck" aria-hidden="true" />
          <div className="stage__message">
            <span className="stage__ready">READY TO PRACTICE</span>
            <span className="stage__hint">
              Camera and audio start when your lesson begins.
            </span>
          </div>
        </div>
      </section>

      <section className="objective">
        <h2 className="objective__heading">Your lesson</h2>
        <p className="objective__lede">
          Learn a short guitar/ukulele sequence through visual and acoustic
          feedback.
        </p>
        <LessonRoadmap />
        <p className="objective__taglines">
          <span>Build the movement.</span>
          <span>Measure the improvement.</span>
        </p>
      </section>

      <footer className="actions">
        <button
          type="button"
          className="button button--primary"
          onClick={onStartLesson}
        >
          START LESSON
        </button>
        <StateIndicator state="IDLE" />
      </footer>
    </main>
  );
}
