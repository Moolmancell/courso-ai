import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FinishedCourseCard } from './FinishedCourseCard';
import "@testing-library/jest-dom"

// Optional: mock next/image to prevent test errors
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('FinishedCourseCard', () => {
  it('renders 0 by default', () => {
    render(<FinishedCourseCard />);
    expect(screen.getByRole('heading')).toHaveTextContent('0');
    expect(screen.getByText('Finished Courses')).toBeInTheDocument();
  });

  it('renders a custom number when provided', () => {
    const randomNumber = Math.floor(Math.random() * 20);
    render(<FinishedCourseCard numberOfFinished={randomNumber} />);
    expect(screen.getByRole('heading')).toHaveTextContent(randomNumber.toString());
  });

  it('renders the icon image with correct alt text', () => {
    render(<FinishedCourseCard />);
    const img = screen.getByAltText('Green Folder Icon');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src'); // basic check, more can be done if mocking path
  });

  it('renders layout container with correct class', () => {
    const { container } = render(<FinishedCourseCard />);
    const div = container.querySelector('div');
    expect(div?.className).toContain('bg-green-200');
  });
});
