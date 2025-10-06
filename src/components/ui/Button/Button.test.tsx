import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';
import "@testing-library/jest-dom"

describe("Button", () => {
    it("renders the type=button", () => {
        render(<Button type="button">Sample Button</Button>)
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

    })

    it("renders the type=link", () => {
        render(<Button type="link" href="/">Sample Button</Button>)
        const button = screen.getByRole('link');
        expect(button).toBeInTheDocument();
    })

    it("throw error if button is link and no href", () => {
        expect(() => render(<Button type="link">Sample Button</Button>))
            .toThrowError("`href` must be provided when `type` is 'link'");
    })

    it("button is clickable", async () => { 
        const fn = vi.fn();
        render(<Button type="button" onClick={fn}>Sample Button</Button>);

        const button = screen.getByRole('button');

        fireEvent.click(button); 
        expect(fn).toHaveBeenCalledTimes(1); 
    })

    it("button is button when no type is specified", () => {
        render(<Button>Sample Button</Button>);
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
    })

    it("button can have other class names", () => {
        render(<Button type='button' className='another-class'>Sample Button</Button>)
        const button = screen.getByRole('button');

        expect(button).toHaveClass('another-class');
    })
})