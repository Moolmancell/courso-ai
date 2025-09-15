import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { Page } from "./page";

const mockLesson1 = {
  id: "lesson-1",
  title: "Introduction to React",
  content: [
    { type: "heading", text: "Introduction to React", id: 1 },
    {
      type: "unorderedlist",
      items: ["What is React?", "Why use React?", "Getting Started"],
      id: 2,
    },
    {
      type: "paragraph",
      text: "Welcome to the Introduction to React lesson. In this lesson, we will cover the basics of React, including components, JSX, and state management.",
      id: 3,
    },
    { type: "code", text: "const element = <h1>Hello, world!</h1>;", id: 4 },
    {
      type: "paragraph",
      text: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
      id: 5,
    },
    { type: "image", src: "", alt: "React Logo", id: 6 },
    {
      type: "paragraph",
      text: "Let's get started with creating our first React component!",
      id: 7,
    },
    { type: "divider", id: 8 },
    { type: "video", src: "", searchTerm: "React Tutorial", id: 9 },
  ],
};


describe("[courseID] Page", () => {
  beforeEach(() => {
    // Mock fetch before every test
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLesson1),
      })
    ) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the title", () => {
    render(<Page />);
    expect(
      screen.getByText("Introduction to React")
    ).toBeInTheDocument();
  });

  it("renders the buttons", () => {
    render(<Page />);
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Mark Complete/i })
    ).toBeInTheDocument();
  });

  it("renders a heading", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { name: /Introduction to React/i })
    ).toBeInTheDocument();
  });

  it("renders a paragraph", () => {
    render(<Page />);
    expect(
      screen.getByText(/Welcome to the Introduction to React lesson. In this lesson, we will cover the basics of React, including components, JSX, and state management./i)
    ).toBeInTheDocument();
        expect(
      screen.getByText(/React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes../i)
    ).toBeInTheDocument();
        expect(
      screen.getByText(/Let's get started with creating our first React component!/i)
    ).toBeInTheDocument();
  });

  it("renders a code block", () => {
    render(<Page />);
    expect(
      screen.getByText("const element = <h1>Hello, world!</h1>;")
    ).toBeInTheDocument();
  });

  it("renders an image", () => {
    render(<Page />);
    expect(screen.getByAltText("React Logo")).toBeInTheDocument();
  });

  it("renders a video placeholder", () => {
    render(<Page />);
    // If video has a testid or fallback text
    expect(screen.getByTestId("video")).toBeInTheDocument();
  });

  it("renders a divider", () => {
    render(<Page />);
    // Give your divider <hr data-testid="divider" /> in component
    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });

  it("renders an unordered list", () => {
    render(<Page />);
    expect(
      screen.getByRole("list", { name: "" }) // role=list works for <ul>
    ).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("Why use React?")).toBeInTheDocument();
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
  });

  it("handles empty content", () => {
    render(<Page />);
    expect(screen.getByText(/no content/i)).toBeInTheDocument();
  });

  it("handles unknown content type", () => {
    render(
      <Page />
    );
    expect(screen.getByText(/unsupported content/i)).toBeInTheDocument();
  });

  it("shows error if something went wrong", () => {
    // If Page has error boundary or error UI
    render(<Page />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
