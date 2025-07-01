import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom"
import { Pagination } from "./Pagination";

describe('Pagination', () => {
    it('renders correctly', () => {
        const setCurrentPage = () => null;
        const currentPage = 1;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)
    
        expect(screen.getByTestId("pagination")).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '1' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    })

    it('renders correctly when on the first page', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 1;
        const totalPages = 5;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)
    
        expect(screen.getByTestId("pagination")).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '1' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();    
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    })
    it('renders correctly when on the last page', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 10;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)
    
        expect(screen.getByTestId("pagination")).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '10' })).toBeDisabled();
        expect(screen.getByTestId('ellipsis-left')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    })
    it('renders correctly when on the middle page', () => {
        const setCurrentPage = () => null;
        const currentPage = 5;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)
    
        expect(screen.getByTestId("pagination")).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '5' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
        expect(screen.getByTestId('ellipsis-left')).toBeInTheDocument();
        expect(screen.getByTestId('ellipsis-right')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    })
    it('renders correctly when total pages are below 2', () => {
      const setCurrentPage = () => null;
      const currentPage = 1;
      const totalPages = 2;
      render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)
  
      expect(screen.getByTestId("pagination")).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '3' })).not.toBeInTheDocument();
      expect(screen.queryByTestId('ellipsis-left')).not.toBeInTheDocument();
      expect(screen.queryByTestId('ellipsis-right')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    })
    it('clicks on a page number button and updates the page', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 1;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />);
    
        const pageButton = screen.getByRole('button', { name: '3' });
        pageButton.click();
    
        expect(setCurrentPage).toHaveBeenCalledWith(3);
      });
    
      it('clicks on the Next button and updates the page', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 1;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />);
    
        const nextButton = screen.getByRole('button', { name: 'Next' });
        nextButton.click();
    
        expect(setCurrentPage).toHaveBeenCalledWith(2);
      });
    
      it('clicks on the Previous button and updates the page', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 5;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />);
    
        const previousButton = screen.getByRole('button', { name: 'Previous' });
        previousButton.click();
    
        expect(setCurrentPage).toHaveBeenCalledWith(4);
      });
    
      it('does not call setCurrentPage when clicking disabled Previous button', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 1;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />);
    
        const previousButton = screen.getByRole('button', { name: 'Previous' });
        previousButton.click();
    
        expect(setCurrentPage).not.toHaveBeenCalled();
      });
    
      it('does not call setCurrentPage when clicking disabled Next button', () => {
        const setCurrentPage = vi.fn();
        const currentPage = 10;
        const totalPages = 10;
        render(<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />);
    
        const nextButton = screen.getByRole('button', { name: 'Next' });
        nextButton.click();
    
        expect(setCurrentPage).not.toHaveBeenCalled();
      });

})