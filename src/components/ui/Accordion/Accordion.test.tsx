import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from './Accordion'
import "@testing-library/jest-dom"


describe('Accordion', () => {
    it('accordion exists', () => {
        render(<Accordion title="Test">Hi</Accordion>);
        expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
    it('accordion shows title', () => {
        render(<Accordion title="Test">Hi</Accordion>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
    it('accordion shows content', () => {
        render(<Accordion title="Test">Hi</Accordion>);
        fireEvent.click(screen.getByTestId('accordion'));
        expect(screen.getByText('Hi')).toBeInTheDocument();
    });
    it('show subtitle', () => {
        render(<Accordion title="Test" hasSubtitle={true} subtitle="subtitle">Hi</Accordion>);
        expect(screen.getByText('subtitle')).toBeInTheDocument();
    })
});