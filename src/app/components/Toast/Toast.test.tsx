import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import '@testing-library/jest-dom';
import { Toast } from "./Toast";

describe('sonner', () => {
    it('renders sonner', () => {
        render(<Toast>Hi</Toast>)
        expect(screen.getByText('Hi')).toBeInTheDocument()
    })
    it('disappears after 10 seconds', async () => {
        render(<Toast>Hi</Toast>)
        expect(screen.getByText('Hi')).toBeInTheDocument();
        await waitFor(() => { 
            expect(screen.queryByText('Hi')).not.toBeInTheDocument()
        }, {timeout: 12000})
    }, 15000)

    it('clicking the x button exits the sonner', () => {
        render(<Toast>Hi</Toast>)
        expect(screen.getByText('Hi')).toBeInTheDocument();
        const button = screen.getByTestId('exit-button')
        fireEvent.click(button);
        expect(screen.queryByText('Hi')).not.toBeInTheDocument();
    })
})