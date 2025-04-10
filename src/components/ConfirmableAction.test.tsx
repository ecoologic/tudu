import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmableAction } from './ConfirmableAction';
import { describe, it, expect, vi } from 'vitest';

describe('ConfirmableAction', () => {
  it('renders a trash icon by default', () => {
    const onConfirm = vi.fn();
    render(<ConfirmableAction onConfirm={onConfirm} />);
    
    // Check that the trash icon is rendered
    const trashIcon = document.querySelector('svg.lucide-trash2');
    expect(trashIcon).toBeInTheDocument();
  });

  it('changes to a check icon when clicked', () => {
    const onConfirm = vi.fn();
    render(<ConfirmableAction onConfirm={onConfirm} />);
    
    // Click the trash icon
    const actionButton = screen.getByRole('button');
    fireEvent.click(actionButton);
    
    // Check that the check icon is rendered
    const checkIcon = document.querySelector('svg.lucide-check');
    expect(checkIcon).toBeInTheDocument();
    
    // Check that onConfirm was not called yet
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm when clicked twice', () => {
    const onConfirm = vi.fn();
    render(<ConfirmableAction onConfirm={onConfirm} />);
    
    // Click the trash icon
    const actionButton = screen.getByRole('button');
    fireEvent.click(actionButton);
    
    // Click the check icon
    fireEvent.click(actionButton);
    
    // Check that onConfirm was called
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('reverts to trash icon when mouse leaves', () => {
    const onConfirm = vi.fn();
    render(<ConfirmableAction onConfirm={onConfirm} />);
    
    // Click the trash icon
    const actionButton = screen.getByRole('button');
    fireEvent.click(actionButton);
    
    // Check that the check icon is rendered
    expect(document.querySelector('svg.lucide-check')).toBeInTheDocument();
    
    // Trigger mouseleave event
    fireEvent.mouseLeave(actionButton);
    
    // Check that the trash icon is rendered again
    expect(document.querySelector('svg.lucide-trash2')).toBeInTheDocument();
    
    // Check that onConfirm was not called
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
