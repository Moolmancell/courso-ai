import { render, screen } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';
import { describe, it, expect, vi } from 'vitest';
import "@testing-library/jest-dom"
import hljs from 'highlight.js';

vi.mock('highlight.js/styles/github.css', () => ({}));

// Mock the highlight.js library
vi.mock('highlight.js', async (importActual) => {
  return { ...await importActual(),
    highlightAll: vi.fn(),
  };
});

describe('CodeBlock', () => {
  const props = {
    id: 'test-code-block',
    text: 'const a = 1;',
    lang: 'javascript',
  };

  it('renders correctly with given props', () => {
    render(<CodeBlock {...props} />);

    // Check if the language is displayed
    expect(screen.getByText(props.lang)).toBeInTheDocument();

    // Check if the code text is in the document
    expect(screen.getByTestId("pre")).toHaveTextContent("const a = 1");
    
    // Check if the pre tag has the correct language class
    const preElement = screen.getByTestId('pre');
    expect(preElement).toHaveClass(`language-${props.lang}`);
  });

  it('calls hljs.highlightAll on render', () => {
    const spy = vi.spyOn(hljs, 'highlightAll').mockImplementation(() => {})
    render(<CodeBlock {...props} />);
    expect(spy).toHaveBeenCalled();
  });

  it('calls hljs.highlightAll when text or lang props change', () => {
    const spy = vi.spyOn(hljs, 'highlightAll').mockImplementation(() => {})
    const { rerender } = render(<CodeBlock {...props} />);
    
    // hljs.highlightAll is called on the initial render
    expect(spy).toHaveBeenCalledTimes(1);
    
    // Rerender with new props
    rerender(<CodeBlock id="new-id" text="console.log('hello');" lang="typescript" />);
    
    // Verify that highlightAll was called again
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it.todo('it has the copy button', () => {
    render(<CodeBlock {...props} />);
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  })

});