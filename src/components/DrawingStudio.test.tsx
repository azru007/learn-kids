import { render, screen } from '@testing-library/react';
import { DrawingStudio } from './DrawingStudio';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Mock soundSystem
vi.mock('../utils/sound', () => ({
  __esModule: true,
  soundSystem: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
    playVictory: vi.fn(),
  },
  default: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
    playVictory: vi.fn(),
  },
}));

describe('DrawingStudio Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders locked state message and progress when studio is locked', () => {
    const onUnlockStudio = vi.fn();
    const onSavePoster = vi.fn();

    render(
      <DrawingStudio
        coins={30}
        studioUnlocked={false}
        onUnlockStudio={onUnlockStudio}
        onSavePoster={onSavePoster}
      />
    );

    // Verify lock screen details
    expect(screen.getByText(/Drawing Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/30 \/ 50 Coins/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Unlock for 50 Coins/i })).toBeDisabled();
  });

  it('renders canvas and controls when studio is unlocked', () => {
    const onUnlockStudio = vi.fn();
    const onSavePoster = vi.fn();

    render(
      <DrawingStudio
        coins={100}
        studioUnlocked={true}
        onUnlockStudio={onUnlockStudio}
        onSavePoster={onSavePoster}
      />
    );

    // Verify canvas is rendered
    expect(screen.getByRole('button', { name: /Undo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Poster/i })).toBeInTheDocument();
  });
});
