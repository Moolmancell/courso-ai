import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CourseTag } from './CourseTag'; // Assuming CourseTag.tsx is in the same directory
import "@testing-library/jest-dom"
// Mock the types for testing purposes
type TagVariant = 'udemy' | 'coursera' | 'generated';
interface TagProps {
  variant: TagVariant;
  className?: string;
}

describe('CourseTag', () => {
  it('renders Udemy tag correctly', () => {
    render(<CourseTag variant="udemy" />);
    const tagElement = screen.getByText('Udemy');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-purple-500');
    expect(tagElement).toHaveClass('rounded-3xl', 'text-white', 'text-xs', 'font-bold', 'px-3', 'py-0.5');
  });

  it('renders Coursera tag correctly', () => {
    render(<CourseTag variant="coursera" />);
    const tagElement = screen.getByText('Coursera');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-blue-600');
    expect(tagElement).toHaveClass('rounded-3xl', 'text-white', 'text-xs', 'font-bold', 'px-3', 'py-0.5');
  });

  it('renders Generated tag correctly', () => {
    render(<CourseTag variant="generated" />);
    const tagElement = screen.getByText('Generated');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-sky-500');
    expect(tagElement).toHaveClass('rounded-3xl', 'text-white', 'text-xs', 'font-bold', 'px-3', 'py-0.5');
  });

  it('applies additional className prop', () => {
    render(<CourseTag variant="udemy" className="custom-class" />);
    const tagElement = screen.getByText('Udemy');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-purple-500');
    expect(tagElement).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(<CourseTag variant="udemy" data-testid="udemy-tag" />);
    const tagElement = screen.getByTestId('udemy-tag');
    expect(tagElement).toBeInTheDocument();
  });
});