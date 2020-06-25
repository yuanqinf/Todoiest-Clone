import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { useProjectsValue } from "../context";
import { Projects } from "../components/Projects";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX"),
  })),
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

describe("ProjectOverlay", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders the projects", () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId("project-action")).toBeTruthy();
    });

    it("renders the projects and selects an acitve project using onClick", () => {
      const { queryByTestId } = render(<Projects acitveValue="1" />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.click(queryByTestId("project-action"));
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy();
    });

    it("renders the projects and selects an active project using onKeyDown", () => {
      const { queryByTestId } = render(<Projects activeValue="0" />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("project-action"), {
        key: "a",
        code: 65,
      });
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeFalsy();

      fireEvent.keyDown(queryByTestId("project-action"), {
        key: "Enter",
        code: 13,
      });
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy();
    });

    it("renders the projects with no active value", () => {
      const { queryByTestId } = render(<Projects activeValue="0" />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("project-action"), {
        key: "a",
        code: 65,
      });
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeFalsy();

      fireEvent.keyDown(queryByTestId("project-action"), {
        key: "Enter",
        code: 13,
      });
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy();
    });
  });
});
