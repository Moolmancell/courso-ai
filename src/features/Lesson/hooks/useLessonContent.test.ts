import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

// 👇 Mock next/navigation FIRST (hoisted safely)
vi.mock('next/navigation', () => ({
    useParams: vi.fn(),
}));

// Now import the hook (AFTER mocks)
import { useLessonContent } from './useLessonContent';
import { useParams } from 'next/navigation';

// Extract the mocked function for reuse in tests
const mockUseParams = useParams as unknown as ReturnType<typeof vi.fn>;

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('useLessonContent', () => {
    const MOCK_COURSE_ID = 'course-101';
    const MOCK_LESSON_ID = 'lesson-intro';

    const mockLessonData = {
        id: MOCK_LESSON_ID,
        title: 'Introduction to Testing',
        previousLessonID: null,
        nextLessonID: 'lesson-next',
        completed: false,
        content: [
            { type: 'heading', id: 'h1', text: 'Welcome' },
            { type: 'paragraph', id: 'p1', text: 'This is a test lesson.' },
        ],
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseParams.mockReturnValue({
            courseID: MOCK_COURSE_ID,
            lessonID: MOCK_LESSON_ID,
        });
    });

    // Helpers for mocking fetch
    const mockSuccessfulFetch = (data: any) => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => data,
        } as Response);
    };

    const mockFailedFetch = (status: number, message: string = 'HTTP error!') => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status,
            json: async () => ({ message }),
            text: async () => message,
        } as Response);
    };

    it('should initialize with null lesson, loading true, and null error', () => {
        mockFetch.mockResolvedValue(new Promise(() => { })); // never resolves

        const { result } = renderHook(() => useLessonContent());

        expect(result.current.lesson).toBeNull();
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    it('should fetch lesson content on mount and update state on success', async () => {
        mockSuccessfulFetch(mockLessonData);

        const { result } = renderHook(() => useLessonContent());

        expect(result.current.lesson).toBeNull();

        // Wait for loading to toggle true and then false
        await waitFor(() => expect(result.current.loading).toBe(true));
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            `/api/tests/courses/${MOCK_COURSE_ID}/${MOCK_LESSON_ID}`
        );
        expect(result.current.lesson).toEqual(mockLessonData);
        expect(result.current.error).toBeNull();
    });

    it('should set an error message on API failure (res.ok is false)', async () => {
        const errorStatus = 404;
        mockFailedFetch(errorStatus, 'Not Found');

        const { result } = renderHook(() => useLessonContent());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.lesson).toBeNull();
        expect(result.current.error).toBe(`HTTP error! Status: ${errorStatus}`);
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should set an error message on network failure (fetch throws)', async () => {
        const errorMessage = 'Failed to fetch resource';
        mockFetch.mockRejectedValue(new Error(errorMessage));
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        const { result } = renderHook(() => useLessonContent());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.lesson).toBeNull();
        expect(result.current.error).toBe(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalled();

        consoleErrorSpy.mockRestore();
    });

    it('should refetch data when fetchData is called', async () => {
        mockSuccessfulFetch(mockLessonData);

        const { result } = renderHook(() => useLessonContent());

        // Wait until loading finishes and lesson data is set
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.lesson).toEqual(mockLessonData);
        });

        // --- Trigger a refetch ---
        const updatedLessonData = { ...mockLessonData, title: 'Updated Title' };
        mockSuccessfulFetch(updatedLessonData);

        result.current.fetchData();

        // Wait for refetch cycle: loading true → false → updated lesson
        await waitFor(() => expect(result.current.loading).toBe(false));
        await waitFor(() => expect(result.current.lesson).toEqual(updatedLessonData));

        expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should refetch when params (courseID/lessonID) change', async () => {
        mockUseParams.mockReturnValue({ courseID: 'c1', lessonID: 'l1' });
        mockSuccessfulFetch({ ...mockLessonData, id: 'l1', title: 'Lesson 1' });

        const { result, rerender } = renderHook(() => useLessonContent());
        await waitFor(() => expect(result.current.lesson?.id).toBe('l1'));
        expect(mockFetch).toHaveBeenCalledTimes(1);

        const NEW_COURSE_ID = 'c2';
        const NEW_LESSON_ID = 'l2';
        mockUseParams.mockReturnValue({ courseID: NEW_COURSE_ID, lessonID: NEW_LESSON_ID });
        mockSuccessfulFetch({ ...mockLessonData, id: 'l2', title: 'Lesson 2' });

        rerender();

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(mockFetch).toHaveBeenCalledTimes(2);
        expect(mockFetch).toHaveBeenCalledWith(
            `/api/tests/courses/${NEW_COURSE_ID}/${NEW_LESSON_ID}`
        );
        expect(result.current.lesson?.id).toBe('l2');
        expect(result.current.lesson?.title).toBe('Lesson 2');
    });
});
