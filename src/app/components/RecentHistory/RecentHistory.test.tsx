import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { RecentHistory } from "./RecentHistory";
import '@testing-library/jest-dom';

const mockHistory = [
  { title: "History 1", timestamp: "2025-06-15T12:45:00" },
  { title: "History 2", timestamp: "2025-06-14T12:50:00" },
  { title: "History 3", timestamp: "2025-06-13T14:45:00" },
  { title: "History 4", timestamp: "2025-06-12T18:45:00" },
];

describe('RecentHistory', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: async () => {
                await new Promise(resolve => setTimeout(resolve, 500))
                return Promise.resolve(mockHistory)
            },
        })
        ));
    });

    it("Renders the past 4 history", async () => {
        render(<RecentHistory userID="1234"/>)
        expect(await screen.findAllByTestId('history')).toHaveLength(4)
    })
    it("displays the correct titles and timestamps", async () => {
        render(<RecentHistory userID="1234"/>)
        expect(await screen.findByText("History 1")).toBeInTheDocument();
        expect(await screen.findByText("June 12, 2025 at 6:45 PM")).toBeInTheDocument();
    })
    it("shows loading screen", async () => {
        render(<RecentHistory userID="1234"/>)
        expect(await screen.findByTestId("loading")).toBeInTheDocument();
    })
    it("shows error and refresh button when something went wrong", async () => {
        vi.spyOn(global, 'fetch').mockRejectedValue(new Error("Failed to fetch"));
        render(<RecentHistory userID="1234"/>)
        expect(await screen.findByTestId('error-message')).toBeInTheDocument();
        expect(await screen.findByRole('button', {name: 'Refresh'})).toBeInTheDocument();
    });
    it("refresh button is working when clicked", async () => {
        vi.spyOn(global, 'fetch').mockRejectedValue(new Error("Failed to fetch"));
        render(<RecentHistory userID="1234"/>)
        
        const refreshButton = await screen.findByRole('button', {name: 'Refresh'});

        await fireEvent.click(refreshButton);

        expect(await screen.findByTestId("loading")).toBeInTheDocument();
    });
    it("when there is no recent history yet", async () => {
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => {
                await new Promise(resolve => setTimeout(resolve, 500)); // Add 500ms delay
                return Promise.resolve([]);
            },
        } as Response);

        render(<RecentHistory userID="123456"/>);
        expect(await screen.findByTestId("no-recent-history")).toBeInTheDocument();
    });
})