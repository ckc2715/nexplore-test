import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTaskForm from '../components/AddTaskForm';

describe('AddTaskForm', () => {
  test('AddTaskForm elements are rendered correctly', async () => {
    const mockAddFunc = jest.fn();
    const mockCancelFunc = jest.fn();
    render(
      <AddTaskForm
        open={true}
        onOk={mockAddFunc}
        onCancel={mockCancelFunc}
        confirmLoading={false}
      />
    );

    const addButton = screen.getByRole('button', {
      name: /Add/i,
    });

    expect(addButton).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });
});
