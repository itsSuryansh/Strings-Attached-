import { StateIndicator } from '../components/StateIndicator';

interface CalibratingScreenProps {
  onCancel: () => void;
}

/**
 * Placeholder for the CALIBRATING state.
 *
 * The transition IDLE → CALIBRATING is wired, but the full calibration logic
 * (camera + MediaPipe + audio + deterministic sensing) is the next
 * implementation phase. This screen therefore shows no measurements and no
 * camera/audio — only an honest "coming next" notice and a path back to IDLE.
 */
export function CalibratingScreen({ onCancel }: CalibratingScreenProps) {
  return (
    <main className="screen">
      <header className="brand">
        <h1 className="brand__name">STRINGSATTACHED</h1>
        <p className="brand__tagline">AI motor-skill coach</p>
      </header>

      <section className="stage" aria-label="Calibration placeholder">
        <div className="stage__frame">
          <div className="stage__message">
            <span className="stage__ready">CALIBRATING</span>
            <span className="stage__hint">
              Camera and hand tracking will activate here in the next phase.
            </span>
          </div>
        </div>
      </section>

      <footer className="actions">
        <button
          type="button"
          className="button button--ghost"
          onClick={onCancel}
        >
          CANCEL
        </button>
        <StateIndicator state="CALIBRATING" />
      </footer>
    </main>
  );
}
