import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateCourseForm } from './CreateCourseForm';
import { describe, expect, it, test, vi } from 'vitest';
import "@testing-library/jest-dom"

describe('CreateCourseForm', () => {
  const mockOnCancel = vi.fn();

    it('renders the form with all elements', () => {
        render(<CreateCourseForm onCancel={mockOnCancel} />);

        // Check for the form title
        expect(screen.getByRole('heading', {name: 'Create Course'})).toBeInTheDocument();

        // Check for the topic input field
        expect(screen.getByPlaceholderText('What do you want to learn?')).toBeInTheDocument();

        // Check for the info message
        expect(screen.getByText('Try to be detailed as much as possible to get better results.')).toBeInTheDocument();

        // Check for the buttons
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Create Course'})).toBeInTheDocument();
    });

    it('calls onCancel when the Cancel button is clicked', () => {
        render(<CreateCourseForm onCancel={mockOnCancel} />);

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
