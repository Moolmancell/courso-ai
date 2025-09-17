import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { Page } from "./page";

vi.mock("next/navigation", () => ({
  useParams: () => ({ courseID: "course-1", lessonID: "lesson-1" }),
}));

const mockLesson1 = {
  id: "lesson-1",
  title: "Introduction to React",
  previousLessonID: null,
  nextLessonID: "lesson-2",
  completed: false,
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
    { type: "code", text: "const element = <h1>Hello, world!</h1>;", lang:'JS', id: 4 },
    {
      type: "paragraph",
      text: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
      id: 5,
    },
    { type: "image", src: "https://opensource.fb.com/img/projects/react.jpg", alt: "React Logo", id: 6 },
    {
      type: "paragraph",
      text: "Let's get started with creating our first React component!",
      id: 7,
    },
    { type: "divider", id: 8 },
    { type: "video", src: "https://www.youtube.com/watch?v=SqcY0GlETPk&t=330s", searchTerm: "React Tutorial", id: 9 },
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

  it("renders the title", async () => {
    render(<Page />);
    expect(
      await screen.findByTestId("lesson-title")
    ).toBeInTheDocument();
    expect(screen.getByTestId("lesson-title")).toHaveTextContent("Introduction to React");
  });

  it('shows loading state', async () => {
    render(<Page />);
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
  })

  it("renders the buttons (not yet completed)", async () => {
    render(<Page />);
    expect(await screen.findByRole("button", { name: /Next/i })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(
      await
      screen.findByRole("button", { name: /Mark Complete/i })
    ).toBeInTheDocument();
  });

  it("renders the buttons (completed)", async () => {
    const completedLesson = { ...mockLesson1, completed: true };

    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(completedLesson),
      }) as any
    );
    
    render(<Page />);
    expect(await screen.findByRole("button", { name: /Next/i })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(
      await
      screen.findByRole("button", { name: /Lesson Completed/i })
    ).toBeInTheDocument();
  });

  it("renders a heading", async () => {
    render(<Page />);
    expect(
      await
      screen.findByTestId("heading2")
    ).toHaveTextContent("Introduction to React");
  });

  it("renders a paragraph", async () => {
    render(<Page />);
    expect(
      await
      screen.findByText(/Welcome to the Introduction to React lesson. In this lesson, we will cover the basics of React, including components, JSX, and state management./i)
    ).toBeInTheDocument();
        expect(
          await
      screen.findByText(/React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes./i)
    ).toBeInTheDocument();
        expect(
          await
      screen.findByText(/Let's get started with creating our first React component!/i)
    ).toBeInTheDocument();
  });

  it("renders a code block", async () => {
    render(<Page />);
    expect(
      await
      screen.findByText("const element = <h1>Hello, world!</h1>;")
    ).toBeInTheDocument();
  });

  it("renders an image", async () => {
    render(<Page />);
    expect(await screen.findByAltText("React Logo")).toBeInTheDocument();
  });

  it("renders a video placeholder", async () => {
    render(<Page />);
    // If video has a testid or fallback text
    expect(await screen.findByTestId("video")).toBeInTheDocument();
  });

  it("renders a divider", async () => {
    render(<Page />);
    // Give your divider <hr data-testid="divider" /> in component
    expect(await screen.findByTestId("divider")).toBeInTheDocument();
  });

  it("renders an unordered list", async () => {
    render(<Page />);
    expect(
      await
      screen.findByRole("list", { name: "" }) // role=list works for <ul>
    ).toBeInTheDocument();
    expect(await screen.findByText("What is React?")).toBeInTheDocument();
    expect(await screen.findByText("Why use React?")).toBeInTheDocument();
    expect(await screen.findByText("Getting Started")).toBeInTheDocument();
  });

  it("handles empty content", async () => {
    const emptyLesson = { ...mockLesson1, content: [] };

    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(emptyLesson),
      }) as any
    );

    render(<Page />);
    expect(await screen.findByText(/No content available./i)).toBeInTheDocument();
  });

  it("shows error if something went wrong", async () => {
    // If Page has error boundary or error UI
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }) as any
    );

    render(<Page />);
    expect(await screen.findByTestId('error')).toBeInTheDocument();
  });
});
