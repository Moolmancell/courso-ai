import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { usePathname } from "next/navigation";

// Mock the module and usePathname function
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    usePathname: vi.fn(),
  };
});

// Create a properly typed mocked version of usePathname
const mockedUsePathname = vi.mocked(usePathname);

describe("Breadcrumbs", () => {
  beforeEach(() => {
    mockedUsePathname.mockReset();
  });

  it("Breadcrumbs exists", () => {
    mockedUsePathname.mockReturnValue("/dashboard");
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders the right links", () => {
    mockedUsePathname.mockReturnValue("/dashboard");
    render(<Breadcrumbs />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Courses")).not.toBeInTheDocument();
  });

  it("renders the right links (part 2)", () => {
    mockedUsePathname.mockReturnValue("/dashboard/courses");
    render(<Breadcrumbs />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Courses")).toBeInTheDocument();
  });
});
