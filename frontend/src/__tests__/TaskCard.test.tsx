import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskCard from '../components/TaskCard';
import userEvent from '@testing-library/user-event';

describe('TaskCard', () => {
  test('TaskCard is rendered correctly', () => {
    const mockHandleMarkComplete = jest.fn();
    const mockHandleMarkDelete = jest.fn();
    render(
      <TaskCard
        key={1}
        todo={{
          id: 1,
          duty: 'testing...',
          completed: false,
          created_at: Date.now().toString(),
          updated_at: Date.now().toString(),
          deleted_at: null,
        }}
        markComplete={mockHandleMarkComplete}
        markDelete={mockHandleMarkDelete}
      />
    );

    const duty = screen.getByText('testing...');

    expect(duty).toBeInTheDocument();

    const completeButton = screen.getByRole('button', {
      name: /Todo/i,
    });

    userEvent.click(completeButton);

    const deleteButton = screen.getByText('delete.svg');

    userEvent.click(deleteButton);

    expect(mockHandleMarkDelete).toBeCalledTimes(1);
  });
});
