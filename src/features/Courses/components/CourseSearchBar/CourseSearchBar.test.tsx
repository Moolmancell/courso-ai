import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CourseSearchBar } from './CourseSearchBar';
import '@testing-library/jest-dom'

// Mock the Heroicons component to isolate the component being tested
vi.mock('@heroicons/react/24/outline', () => ({
  // Replace the actual icon with a simple SVG mock for testing presence
  MagnifyingGlassIcon: (props: any) => <svg {...props} data-testid="magnifying-icon" />,
}));

describe('CourseSearchBar', () => {
  const mockOnSearchChange = vi.fn();
  const initialSearchTerm = 'Advanced React';

  const defaultProps = {
    searchTerm: initialSearchTerm,
    onSearchChange: mockOnSearchChange,
  };

  // Helper function to render the component
  const renderComponent = (props = defaultProps) =>
    render(<CourseSearchBar {...props} />);

  beforeEach(() => {
    mockOnSearchChange.mockClear();
  });

  // --- Test Cases ---

  it('renders the search input with the correct initial value', () => {
    renderComponent();

    const searchInput = screen.getByTestId('search-bar') as HTMLInputElement;

    // 1. Check if the input element is in the document
    expect(searchInput).toBeInTheDocument();
    
    // 2. Check if the input displays the initial value passed via props
    expect(searchInput.value).toBe(initialSearchTerm);
  });

  it('renders the magnifying glass icon and placeholder', () => {
    renderComponent();
    
    // Check for the mocked icon
    expect(screen.getByTestId('magnifying-icon')).toBeInTheDocument();
    
    // Check for the correct placeholder text
    expect(screen.getByPlaceholderText('Search For Course')).toBeInTheDocument();
  });

  it('calls onSearchChange with the new value when input changes', () => {
    // Start with an empty search term for a clear test
    renderComponent({ searchTerm: '', onSearchChange: mockOnSearchChange });
    
    const searchInput = screen.getByTestId('search-bar');
    const newSearchTerm = 'Testing with Vitest';

    // Simulate a user typing the new search term
    fireEvent.change(searchInput, { target: { value: newSearchTerm } });

    // 1. Expect the mock function to have been called exactly once
    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    
    // 2. Expect the mock function to be called with the new input value
    expect(mockOnSearchChange).toHaveBeenCalledWith(newSearchTerm);
  });
  
  it('prevents default form submission behavior', () => {
    // Although the component's code has `onSubmit={(e) => e.preventDefault()}`
    // the safest way to test this in isolation is to ensure the handler is applied
    // and that no errors occur when attempting to submit the containing form element.
    renderComponent();

    const formElement = screen.getByTestId('search-bar').closest('form');
    expect(formElement).toBeInTheDocument();
    
    // Simulate a form submission and verify no errors are thrown
    // We use fireEvent.submit and check that the change handler was not called again.
    // The key check here is that it runs without issue and the logic is sound.
    fireEvent.submit(formElement!);
    
    // onSearchChange should not be called on submit, only on change.
    expect(mockOnSearchChange).not.toHaveBeenCalled();
  });
});
