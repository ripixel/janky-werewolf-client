import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { MobileNoPhaseView } from '.';

describe('<MobileNoPhaseView>', () => {
  it('renders as expected', () => {
    const mockOnClick = jest.fn();
    const result = render(
      <MobileNoPhaseView onJoinVillageClick={mockOnClick} />
    );

    const nameInput = result.getByPlaceholderText('Player Name');
    expect(nameInput).toBeInTheDocument();

    const gameCodeInput = result.getByPlaceholderText('Game Code');
    expect(gameCodeInput).toBeInTheDocument();

    const button = result.getByText('Join Village');
    expect(button).toBeInTheDocument();
  });

  it('handles create button click correctly', async () => {
    const mockOnClick = jest.fn();
    const result = render(
      <MobileNoPhaseView onJoinVillageClick={mockOnClick} />
    );

    const nameInput = result.getByPlaceholderText('Player Name');
    const gameCodeInput = result.getByPlaceholderText('Game Code');

    const button = result.getByText('Join Village');

    fireEvent.change(nameInput, { target: { value: 'Dave' } });
    fireEvent.change(gameCodeInput, { target: { value: '123' } });

    await result.findByDisplayValue('123');

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('Dave', '123');
  });
});
