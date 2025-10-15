// useCourseDetails.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCourseDetails } from './useCourseDetails'; // Adjust path as needed

// Mock data that matches the Course type
const mockCourseDetails = {
  id: 'c1',
  title: 'Introduction to React',
  progress: 50,
  lessonCount: 10,
  modules: [
    {
      id: 'm1',
      title: 'Module 1: The Basics',
      lessons: [
        { id: 'l1', title: 'What is React?', completed: true },
        { id: 'l2', title: 'Components and Props', completed: false },
      ],
    },
  ],
};

// Store the original fetch function
const originalFetch = global.fetch;

describe('useCourseDetails Hook', () => {

  // Before each test, mock the global fetch API
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  // After each test, restore the original fetch function to avoid test bleed
  afterEach(() => {
    global.fetch = originalFetch;
  });

  // Test Case 1: Initial state
  it('should initialize with loading set to true and null data', () => {
    const { result } = renderHook(() => useCourseDetails('c1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.courseDetails).toBeNull();
    expect(result.current.error).toBe('');
  });

  // Test Case 2: Successful data fetching
  it('should fetch course details and update state on success', async () => {
    // Mock a successful API response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourseDetails,
    } as Response);

    const { result } = renderHook(() => useCourseDetails('c1'));

    // Wait for the async operations (fetch, setState) to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.courseDetails).toEqual(mockCourseDetails);
      expect(result.current.error).toBe('');
    });
  });

  // Test Case 3: Failed data fetching
  it('should set an error message on a failed fetch', async () => {
    // Mock a failed API response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const { result } = renderHook(() => useCourseDetails('c1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.courseDetails).toBeNull();
      expect(result.current.error).toBe("Something went wrong while loading the course. Please try again.");
    });
  });

  // Test Case 4: Re-fetching when courseID changes
  it('should re-fetch data when the courseID prop changes', async () => {
    const course1Data = { ...mockCourseDetails, id: 'c1', title: 'Course One' };
    const course2Data = { ...mockCourseDetails, id: 'c2', title: 'Course Two' };

    // Initial fetch for 'c1'
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => course1Data,
    } as Response);

    const { result, rerender } = renderHook(
      ({ courseID }) => useCourseDetails(courseID),
      { initialProps: { courseID: 'c1' } }
    );

    await waitFor(() => expect(result.current.courseDetails?.id).toBe('c1'));
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Mock the next fetch for 'c2'
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => course2Data,
    } as Response);

    // Rerender the hook with a new courseID
    rerender({ courseID: 'c2' });

    // Expect loading state to be true again immediately after rerender
    expect(result.current.loading).toBe(true);
    
    // Wait for the new data to be fetched
    await waitFor(() => {
      expect(result.current.courseDetails?.id).toBe('c2');
      expect(result.current.courseDetails?.title).toBe('Course Two');
    });

    // Ensure fetch was called again for the new ID
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('/api/tests/courses/c2');
  });

  // Test Case 5: Manual refetching with fetchFunc
  it('should allow manual refetching by calling fetchFunc', async () => {
    // Initial fetch
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockCourseDetails, title: "First Fetch" }),
    } as Response);
    
    const { result } = renderHook(() => useCourseDetails('c1'));

    await waitFor(() => expect(result.current.courseDetails?.title).toBe("First Fetch"));
    
    // Mock the second, manual fetch
     vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockCourseDetails, title: "Second Fetch (Manual)" }),
    } as Response);
    
    // Use `act` to wrap the state update triggered by fetchFunc
    await act(async () => {
        await result.current.fetchFunc();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.courseDetails?.title).toBe("Second Fetch (Manual)");
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});