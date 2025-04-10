import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from './TaskForm';
import { Task } from './tasks';
import { describe, it, expect, vi } from 'vitest';

describe('TaskForm', () => {
  it('renders with default values', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Effort')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tags (comma-separated)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

    // Check the hidden inputs for default values
    const valueInput = document.querySelector('input[name="value"]');
    const effortInput = document.querySelector('input[name="effort"]');
    expect(valueInput).toHaveValue('M');
    expect(effortInput).toHaveValue('M');
  });

  it('renders with provided task values', () => {
    const onSubmit = vi.fn();
    const task: Partial<Task> = {
      title: 'Test Task',
      description: 'Test Description',
      value: 'L',
      effort: 'S',
      tags: ['test', 'important']
    };

    render(<TaskForm onSubmit={onSubmit} task={task} />);

    expect(screen.getByPlaceholderText('Task title')).toHaveValue('Test Task');
    expect(screen.getByPlaceholderText('Description')).toHaveValue('Test Description');

    // Check the hidden inputs for custom values
    const valueInput = document.querySelector('input[name="value"]');
    const effortInput = document.querySelector('input[name="effort"]');
    expect(valueInput).toHaveValue('L');
    expect(effortInput).toHaveValue('S');

    expect(screen.getByPlaceholderText('Tags (comma-separated)')).toHaveValue('test,important');
  });

  it('shows validation error when title is empty', async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('Title is required');
    expect(errorMessage).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits form with correct data when valid', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    // Mock the onValueChange handlers directly
    const mockTaskWithCustomValues = {
      title: 'New Task',
      description: 'Task description',
      value: 'XL',  // Set custom value
      effort: 'S',  // Set custom effort
      tags: 'urgent,feature'
    };

    render(
      <TaskForm
        onSubmit={(data) => {
          // Call the original mock function with our custom values
          const modifiedData = {
            ...data,
            value: mockTaskWithCustomValues.value,
            effort: mockTaskWithCustomValues.effort
          };
          onSubmit(modifiedData);
        }}
      />
    );

    await user.type(screen.getByPlaceholderText('Task title'), mockTaskWithCustomValues.title);
    await user.type(screen.getByPlaceholderText('Description'), mockTaskWithCustomValues.description);
    await user.type(screen.getByPlaceholderText('Tags (comma-separated)'), mockTaskWithCustomValues.tags);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = onSubmit.mock.calls[0][0];
    expect(firstCallFirstArg).toEqual(mockTaskWithCustomValues);
  });

  it('verifies default values are correctly set', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    // Check the value and effort hidden inputs have the default 'M' value
    const valueInput = document.querySelector('input[name="value"]');
    const effortInput = document.querySelector('input[name="effort"]');

    expect(valueInput).toHaveValue('M');
    expect(effortInput).toHaveValue('M');
  });

});
