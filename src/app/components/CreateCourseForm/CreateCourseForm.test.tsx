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
    expect(screen.getByRole('heading', { name: 'Create Course' })).toBeInTheDocument();

    // Check for the topic input field
    expect(screen.getByPlaceholderText('What do you want to learn?')).toBeInTheDocument();

    // Check for the info message
    expect(screen.getByText('Try to be detailed as much as possible to get better results.')).toBeInTheDocument();

    // Check for the buttons
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Course' })).toBeInTheDocument();
  });

  it('calls onCancel when the Cancel button is clicked', () => {
    render(<CreateCourseForm onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('check if form submits', async () => {

    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ courseID: "1234" }), // optional
    })
    ) as unknown as typeof fetch);

    render(<CreateCourseForm onCancel={mockOnCancel} />)

    fireEvent.input(screen.getByPlaceholderText('What do you want to learn?'), {
      target: { value: 'test' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Create Course' }))

    expect(await screen.findByText('Course Created. Redirecting...')).toBeInTheDocument();
  })

  it('check if shows error if topic is empty', async () => {
    vi.stubGlobal('fetch', vi.fn(() => {
      throw new Error('Network error');
    }) as typeof fetch);

    render(<CreateCourseForm onCancel={mockOnCancel} />)

    fireEvent.input(screen.getByPlaceholderText('What do you want to learn?'), {
      target: { value: 'test' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Create Course' }))

    expect(await screen.findByText('Network error')).toBeInTheDocument();

  })

  it('shows loading and disables all buttons when submitting', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}), // optional
    })
    ) as unknown as typeof fetch);

    render(<CreateCourseForm onCancel={mockOnCancel} />)

    fireEvent.input(screen.getByPlaceholderText('What do you want to learn?'), {
      target: { value: 'test' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Create Course' }))

    expect(await screen.getByText('Processing...')).toBeInTheDocument()
    expect(await screen.getByText('Cancel')).toBeDisabled()
    expect(await screen.getByTestId('x-button')).toBeDisabled();
    expect(await screen.getByTestId('create-course')).toBeDisabled();
  })

  it('shows response if topic is questionable', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({responseMessage: 'Not Valid Topic'}), // optional
    })
    ) as unknown as typeof fetch);

    render(<CreateCourseForm onCancel={mockOnCancel} />)

    fireEvent.input(screen.getByPlaceholderText('What do you want to learn?'), {
      target: { value: 'test' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Create Course' }))

    expect(await screen.findByText('Not Valid Topic')).toBeInTheDocument();
    
  })
});
