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

    const valueSelects = screen.getAllByRole('combobox');
    expect(valueSelects[0]).toHaveValue('M'); // Value select
    expect(valueSelects[1]).toHaveValue('M'); // Effort select
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
    const valueSelects = screen.getAllByRole('combobox');
    expect(valueSelects[0]).toHaveValue('L'); // Value select
    expect(valueSelects[1]).toHaveValue('S'); // Effort select
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

    render(<TaskForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText('Task title'), 'New Task');
    await user.type(screen.getByPlaceholderText('Description'), 'Task description');

    const valueSelects = screen.getAllByRole('combobox');
    await user.selectOptions(valueSelects[0], 'XL'); // Value select
    await user.selectOptions(valueSelects[1], 'S'); // Effort select

    await user.type(screen.getByPlaceholderText('Tags (comma-separated)'), 'urgent,feature');

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = onSubmit.mock.calls[0][0];
    expect(firstCallFirstArg).toEqual({
      title: 'New Task',
      description: 'Task description',
      value: 'XL',
      effort: 'S',
      tags: 'urgent,feature'
    });
  });

  it('renders all t-shirt size options', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).toEqual(
      expect.arrayContaining(['XS', 'S', 'M', 'L', 'XL'])
    );
  });
});
