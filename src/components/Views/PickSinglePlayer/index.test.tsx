/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import { PickSinglePlayer } from '.';

describe('Components > Views > PickSinglePlayer', () => {
  const baseProps = {
    title: 'title',
    instructions: 'instructions',
    players: [
      {
        name: 'tom',
      },
      {
        name: 'dave',
      },
    ] as any[],
  };

  describe('renders as expected', () => {
    it('without skip player pick defined', () => {
      const result = render(
        <PickSinglePlayer {...baseProps} onPlayerPick={jest.fn()} />
      );

      expect(result.getByText('title')).toBeInTheDocument();
      expect(result.getByText('instructions')).toBeInTheDocument();
      expect(result.getByText('tom')).toBeInTheDocument();
      expect(result.getByText('dave')).toBeInTheDocument();
    });

    it('with skip player pick defined', () => {
      const result = render(
        <PickSinglePlayer
          {...baseProps}
          onPlayerPick={jest.fn()}
          onSkipPlayerPick={jest.fn()}
          skipPlayerPickText='skip'
        />
      );

      expect(result.getByText('title')).toBeInTheDocument();
      expect(result.getByText('instructions')).toBeInTheDocument();
      expect(result.getByText('tom')).toBeInTheDocument();
      expect(result.getByText('dave')).toBeInTheDocument();
      expect(result.getByText('skip')).toBeInTheDocument();
    });
  });

  describe('it handles interactions correctly', () => {
    it('handles clicking on player names', () => {
      const mockOnPlayerPick = jest.fn();
      const result = render(
        <PickSinglePlayer {...baseProps} onPlayerPick={mockOnPlayerPick} />
      );

      fireEvent.click(result.getByText('tom'));

      expect(mockOnPlayerPick).toHaveBeenCalledTimes(1);
      expect(mockOnPlayerPick).toHaveBeenCalledWith('tom');
    });

    it('handles skipping player picking', () => {
      const mockOnPlayerPick = jest.fn();
      const mockOnSkipPlayerPick = jest.fn();
      const result = render(
        <PickSinglePlayer
          {...baseProps}
          onPlayerPick={mockOnPlayerPick}
          onSkipPlayerPick={mockOnSkipPlayerPick}
          skipPlayerPickText='skip'
        />
      );

      fireEvent.click(result.getByText('skip'));

      expect(mockOnPlayerPick).toHaveBeenCalledTimes(0);
      expect(mockOnSkipPlayerPick).toHaveBeenCalledTimes(1);
    });
  });
});
