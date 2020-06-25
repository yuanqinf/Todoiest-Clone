import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Tasks } from "../components/Tasks";
import { useSelectedProjectValue } from "../context";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "🎬Movie",
        projectId: "1",
        userId: "jlIFXIwyAL3tzHMtzRbw",
      },
    ],
  })),
}));

jest.mock("../hooks", () => ({
  useTasks: () => ({
    tasks: [
      {
        archived: false,
        date: "",
        projectId: "1",
        task: "THIS IS A VIDEO",
        userId: "jlIFXIwyAL3tzHMtzRbw",
      },
    ],
  }),
}));

beforeEach(cleanup);

describe("<Task />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders tasks", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX",
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("Inbox");
  });

  it("renders a task with a project title", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "1"),
      selectedProject: "1",
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("🎬Movie");
  });

  it("renders a task with a collated title", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX",
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("Inbox");
  });
});
