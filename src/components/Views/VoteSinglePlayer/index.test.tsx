/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { VoteSinglePlayer } from '.';

describe('Components > Views > VoteSinglePlayer', () => {
  const baseProps = {
    title: 'title-test',
    instructions: 'instructions-test',
    note: 'note-test',
    currentVotes: {
      alex: 1,
      harry: 3,
    },
  };

  it('renders as expected', () => {
    const result = render(
      <VoteSinglePlayer {...baseProps} onVote={jest.fn()} />
    );

    expect(result.getByText('title-test')).toBeInTheDocument();
    expect(result.getByText('instructions-test')).toBeInTheDocument();
    expect(result.getByText('note-test')).toBeInTheDocument();
    expect(result.getByText('alex - Current votes 1')).toBeInTheDocument();
    expect(result.getByText('harry - Current votes 3')).toBeInTheDocument();
  });

  describe('handles interactions correctly', () => {
    it('handles clicking on player names', () => {
      const mockOnVote = jest.fn();
      const result = render(
        <VoteSinglePlayer {...baseProps} onVote={mockOnVote} />
      );

      fireEvent.click(result.getByText('alex - Current votes 1'));

      expect(mockOnVote).toHaveBeenCalledTimes(1);
      expect(mockOnVote).toHaveBeenCalledWith('alex');
    });
  });
});
