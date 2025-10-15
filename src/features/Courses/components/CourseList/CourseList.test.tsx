// src/components/CourseList/CourseList.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CourseList } from './CourseList';
import { Course } from '../../hooks/useCoursesData/useCoursesData'; // Import the interface
import "@testing-library/jest-dom"
// --- Mock Child Components ---
// Mocking the imported components to focus tests on CourseList logic
vi.mock('../CourseCardv2/CourseCardv2', () => ({
  // Use a simple mock component that displays its props for easy assertion
  CourseCardv2: vi.fn(({ id, title, lessons, progress, courseLink }) => (
    <div data-testid={`mock-course-card-${id}`}>
      <span>{title}</span>
      <span>{lessons}</span>
      <span>{progress}</span>
      <a href={courseLink}>Link</a>
    </div>
  )),
}));

vi.mock('../CourseCardv2/Skeleton', () => ({
  Skeleton: vi.fn(({ id }) => (
    <div data-testid={`mock-skeleton-${id}`}>Loading card</div>
  )),
}));

vi.mock('@/components/ui/Button/Button', () => ({
  // Use a simple mock button that passes through children and onClick
  Button: vi.fn(({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props} data-testid="mock-button">
      {children}
    </button>
  )),
}));
// --- End Mock Child Components ---

const mockCourses: Course[] = [
  { id: 1, title: 'Course A', lessons: 10, progress: 50, courseLink: '/course/a' },
  { id: 2, title: 'Course B', lessons: 20, progress: 100, courseLink: '/course/b' },
  { id: 3, title: 'Course C', lessons: 5, progress: 0, courseLink: '/course/c' },
];

describe('CourseList', () => {
  const onRefreshMock = vi.fn();

  // Test Case 1: Renders loading state
  it('renders 12 skeletons when loading is true', () => {
    render(<CourseList courses={[]} loading={true} error={null} onRefresh={onRefreshMock} />);

    // Check for the loading container
    const loadingContainer = screen.getByTestId('loading');
    expect(loadingContainer).toBeInTheDocument();

    // Check that 12 mock skeletons are rendered
    const skeletons = screen.getAllByTestId(/mock-skeleton-/i);
    expect(skeletons).toHaveLength(12);

    // Check that no course cards are rendered
    expect(screen.queryByText(/Course A/i)).not.toBeInTheDocument();
  });

  // Test Case 2: Renders error state
  it('renders error message and refresh button when error is present', () => {
    const errorMessage = 'Failed to fetch courses';
    render(<CourseList courses={[]} loading={false} error={errorMessage} onRefresh={onRefreshMock} />);

    // Check for the error container
    const errorContainer = screen.getByTestId('error-message');
    expect(errorContainer).toBeInTheDocument();

    // Check for the specific error text
    expect(screen.getByText(`Error:`)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // Check for the Refresh button
    const refreshButton = screen.getByText('Refresh');
    expect(refreshButton).toBeInTheDocument();
    
    // Check that clicking the refresh button calls onRefresh prop
    fireEvent.click(refreshButton);
    expect(onRefreshMock).toHaveBeenCalledTimes(1);
    
    // Check that no course cards or loading skeletons are rendered
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId(/mock-course-card-/i)).not.toBeInTheDocument();
  });

  // Test Case 3: Renders "No courses available" when courses array is empty
  it('renders "No courses available" when not loading, no error, and courses is empty', () => {
    render(<CourseList courses={[]} loading={false} error={null} onRefresh={onRefreshMock} />);

    expect(screen.getByText('No courses available.')).toBeInTheDocument();
    
    // Check that no error or loading states are present
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  // Test Case 4: Renders list of courses
  it('renders CourseCardv2 for each course when courses are available', () => {
    render(<CourseList courses={mockCourses} loading={false} error={null} onRefresh={onRefreshMock} />);

    // Check that the correct number of mock course cards are rendered
    const courseCards = screen.getAllByTestId(/mock-course-card-/i);
    expect(courseCards).toHaveLength(mockCourses.length); // Should be 3

    // Check if the titles of the courses are present (using the mock's output)
    expect(screen.getByText('Course A')).toBeInTheDocument();
    expect(screen.getByText('Course B')).toBeInTheDocument();
    expect(screen.getByText('Course C')).toBeInTheDocument();
    
    // Check for correct list structure (assuming the UL is rendered)
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    // Check that the loading and error states are not present
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
  
  // Test Case 5: Prioritizes loading over error and courses
  it('prioritizes loading state over error and courses', () => {
    render(<CourseList courses={mockCourses} loading={true} error={'Some error'} onRefresh={onRefreshMock} />);

    // Should only show loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getAllByTestId(/mock-skeleton-/i)).toHaveLength(12);

    // Should not show error or courses
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByText(/Course A/i)).not.toBeInTheDocument();
  });
  
  // Test Case 6: Prioritizes error over courses
  it('prioritizes error state over courses (when not loading)', () => {
    const errorMessage = 'Data fetching failed';
    render(<CourseList courses={mockCourses} loading={false} error={errorMessage} onRefresh={onRefreshMock} />);

    // Should only show error state
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // Should not show courses
    expect(screen.queryByText(/Course A/i)).not.toBeInTheDocument();
  });
});