import { describe, expect, it } from 'vitest';
import {
  INITIAL_STATE,
  lessonReducer,
  STATE_LABELS,
  type LessonState,
} from './lessonMachine';

describe('lessonMachine — initial state', () => {
  it('starts in IDLE', () => {
    expect(INITIAL_STATE).toBe('IDLE');
  });

  it('declares the complete V13-FINAL state set', () => {
    const states: LessonState[] = [
      'IDLE',
      'CALIBRATING',
      'C_CHORD',
      'C_STABLE',
      'TRANSITIONING',
      'AM_CANDIDATE',
      'AM_STABLE',
      'STRUM_DYNAMICS',
      'LESSON_PASS',
    ];
    for (const s of states) {
      expect(STATE_LABELS[s]).toBe(s);
    }
  });
});

describe('lessonMachine — transitions (IDLE phase)', () => {
  it('IDLE → CALIBRATING on START_LESSON', () => {
    expect(lessonReducer('IDLE', { type: 'START_LESSON' })).toBe('CALIBRATING');
  });

  it('IDLE does NOT skip directly to C_CHORD', () => {
    expect(lessonReducer('IDLE', { type: 'START_LESSON' })).not.toBe('C_CHORD');
  });

  it('CANCEL_LESSON in IDLE is a no-op (stays IDLE)', () => {
    expect(lessonReducer('IDLE', { type: 'CANCEL_LESSON' })).toBe('IDLE');
  });

  it('CALIBRATING → IDLE on CANCEL_LESSON', () => {
    expect(lessonReducer('CALIBRATING', { type: 'CANCEL_LESSON' })).toBe('IDLE');
  });

  it('duplicate START_LESSON while CALIBRATING is a no-op', () => {
    expect(lessonReducer('CALIBRATING', { type: 'START_LESSON' })).toBe(
      'CALIBRATING',
    );
  });

  it('later states are not reachable in this phase (stay unchanged)', () => {
    const later: LessonState[] = [
      'C_CHORD',
      'C_STABLE',
      'TRANSITIONING',
      'AM_CANDIDATE',
      'AM_STABLE',
      'STRUM_DYNAMICS',
      'LESSON_PASS',
    ];
    for (const s of later) {
      expect(lessonReducer(s, { type: 'START_LESSON' })).toBe(s);
      expect(lessonReducer(s, { type: 'CANCEL_LESSON' })).toBe(s);
    }
  });
});
