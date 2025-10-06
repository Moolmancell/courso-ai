import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActiveCourseCard } from './ActiveCourseCard';
import "@testing-library/jest-dom"

// Optional: mock next/image to prevent test errors
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('ActiveCourseCard', () => {
  it('renders 0 by default', () => {
    render(<ActiveCourseCard />);
    expect(screen.getByRole('heading')).toHaveTextContent('0');
    expect(screen.getByText('Active Courses')).toBeInTheDocument();
  });

  it('renders a custom number when provided', () => {
    const randomNumber = Math.floor(Math.random() * 20);
    render(<ActiveCourseCard numberOfFinished={randomNumber} />);
    expect(screen.getByRole('heading')).toHaveTextContent(randomNumber.toString());
  });

  it('renders the icon image with correct alt text', () => {
    render(<ActiveCourseCard />);
    const img = screen.getByAltText('Blue Folder Icon');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src'); // basic check, more can be done if mocking path
  });

  it('renders layout container with correct class', () => {
    const { container } = render(<ActiveCourseCard />);
    const div = container.querySelector('div');
    expect(div?.className).toContain('bg-blue-200');
  });
});
