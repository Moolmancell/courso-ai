import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCoursesData, Course } from './useCoursesData'; // Ensure correct path for import

// --- Mock Dependencies ---

// 1. Mock the useDebounce hook to return the value immediately for synchronous testing
// We assume it lives at '@/hooks/useDebounce' as inferred from the component usage.
vi.mock('@/hooks/useDebounce', () => ({
  // Mocking it to return the input value ensures the fetch is triggered immediately
  // with the new searchTerm in the synchronous test environment.
  useDebounce: (value: any) => value,
}));

// 2. Mock the global fetch function
const fetchMock = vi.spyOn(global, 'fetch');

// --- Mock Data and Utilities ---

const mockUserID = 'user-123';
const mockCourse: Course = { id: 1, title: 'Course A', lessons: 10, progress: 50, courseLink: '/c/a' };

const mockSuccessResponse = (courses: Course[] = [mockCourse], total: number = 10) => ({
  courses,
  total,
});

const mockApiResponse = (data: any, status: number = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status: status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  } as Response);


describe('useCoursesData', () => {
  // Clear all mocks (fetch calls, debounce, etc.) before each test
  beforeEach(() => {
    fetchMock.mockClear();
  });

  // Test Case 1: Initial state check
  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useCoursesData(mockUserID, 1, ''));

    // Check initial state values
    expect(result.current.courses).toEqual([]);
    expect(result.current.loading).toBe(true); // Should be true while initial fetch runs
    expect(result.current.error).toBeNull();
    expect(result.current.totalPages).toBe(0);
  });

  // Test Case 2: Successful data fetch
  it('should successfully fetch courses and update state', async () => {
    const apiData = mockSuccessResponse();
    fetchMock.mockResolvedValueOnce(await mockApiResponse(apiData));

    const { result } = renderHook(() => useCoursesData(mockUserID, 1, ''));

    // 1. Check if the initial fetch call was made with correct params
    expect(fetchMock).toHaveBeenCalledWith('/api/tests/courses?page=1&q=');

    // 2. Wait for loading to finish and state to update
    await waitFor(() => expect(result.current.loading).toBe(false));

    // 3. Check final state
    expect(result.current.courses).toEqual(apiData.courses);
    expect(result.current.error).toBeNull();
    expect(result.current.totalPages).toBe(apiData.total);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  // Test Case 3: Handles API error
  it('should handle API errors and set the error state', async () => {
    const errorMessage = 'Internal Server Error';
    const errorBody = { message: errorMessage };

    // Mock a 500 response
    fetchMock.mockResolvedValueOnce(await mockApiResponse(errorBody, 500));

    const { result } = renderHook(() => useCoursesData(mockUserID, 1, ''));

    // Wait for the hook to finish processing the error
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Check error state
    expect(result.current.error).toMatch(/Failed to fetch data: 500/);
    expect(result.current.courses).toEqual([]); // Courses should be empty
    expect(result.current.totalPages).toBe(0);
  });

  // Test Case 4: Re-fetches when searchTerm changes (via debouncedSearch)
  it('should refetch data when searchTerm prop changes', async () => {
    // Initial fetch (page=1, q='')
    fetchMock.mockResolvedValueOnce(await mockApiResponse(mockSuccessResponse()));
    
    const { result, rerender } = renderHook(({ currentPage, searchTerm }) =>
      useCoursesData(mockUserID, currentPage, searchTerm),
      { initialProps: { currentPage: 1, searchTerm: '' } }
    );
    
    // Wait for initial load
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Rerender the hook with a new search term
    const newSearchTerm = 'GraphQL';
    rerender({ currentPage: 1, searchTerm: newSearchTerm });

    // Mock success for the second fetch
    fetchMock.mockResolvedValueOnce(await mockApiResponse(mockSuccessResponse()));

    // Wait for loading to become true and then false again
    await waitFor(() => expect(result.current.loading).toBe(true), { timeout: 100 });
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Check that the second fetch was called with the new term
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(`/api/tests/courses?page=1&q=${newSearchTerm}`);
  });
  
  // Test Case 5: Re-fetches when currentPage changes
  it('should refetch data when currentPage prop changes', async () => {
    // Initial fetch (page=1)
    fetchMock.mockResolvedValueOnce(await mockApiResponse(mockSuccessResponse()));
    
    const { result, rerender } = renderHook(({ currentPage, searchTerm }) =>
      useCoursesData(mockUserID, currentPage, searchTerm),
      { initialProps: { currentPage: 1, searchTerm: 'react' } }
    );
    
    // Wait for initial load
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Rerender the hook with a new page
    const newPage = 2;
    rerender({ currentPage: newPage, searchTerm: 'react' });

    // Mock success for the second fetch
    fetchMock.mockResolvedValueOnce(await mockApiResponse(mockSuccessResponse()));

    // Wait for the second fetch to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Check that the second fetch was called with the new page
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(`/api/tests/courses?page=${newPage}&q=react`);
  });

  // Test Case 6: Manual refresh using exposed fetchData
  it('should re-trigger data fetch when fetchData is called', async () => {
    // Initial fetch
    fetchMock.mockResolvedValueOnce(await mockApiResponse(mockSuccessResponse()));
    
    const { result } = renderHook(() => useCoursesData(mockUserID, 1, ''));

    // Wait for initial load
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Manually call fetchData
    result.current.fetchData();

    // Wait for loading to complete again
    await waitFor(() => {
        expect(result.current.loading).toBe(false)
        // Check if fetch was called a second time
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    // Check if state was updated from the second fetch (e.g., totalPages change)
    expect(result.current.totalPages).toBe(10);
  });
});
