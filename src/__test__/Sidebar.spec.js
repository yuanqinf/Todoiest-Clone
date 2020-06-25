import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Sidebar } from "../components/layout/Sidebar";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX"),
  })),

  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: "🎬Movie",
        projectId: "1",
        userId: "jlIFXIwyAL3tzHMtzRbw",
      },
    ],
  })),
}));

beforeEach(cleanup);

describe("<Sidebar />", () => {
  describe("Success", () => {
    it("renders the <Sidebar />", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
    });

    it("changes the active project to inbox in collated tasks", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("inbox-action"));
      fireEvent.keyDown(queryByTestId("inbox-action"), {
        key: "a",
        code: 65,
      });
      fireEvent.keyDown(queryByTestId("inbox-action"), {
        key: "Enter",
        code: 13,
      });

      expect(queryByTestId("inbox").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(
        queryByTestId("upcoming").classList.contains("active")
      ).toBeFalsy();
    });
    it("changes the active project to today in collated tasks", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("today-action"));
      fireEvent.click(queryByTestId("inbox-action"));
      fireEvent.keyDown(queryByTestId("today-action"), {
        key: "a",
        code: 65,
      });

      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("inbox").classList.contains("active")).toBeTruthy();
      expect(
        queryByTestId("upcoming").classList.contains("active")
      ).toBeFalsy();

      fireEvent.keyDown(queryByTestId("today-action"), {
        key: "Enter",
        code: 13,
      });

      expect(queryByTestId("today").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(
        queryByTestId("upcoming").classList.contains("active")
      ).toBeFalsy();
    });

    it("changes the active project to upcoming in collated tasks", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      fireEvent.click(queryByTestId("upcoming-action"));
      fireEvent.click(queryByTestId("inbox-action"));
      fireEvent.keyDown(queryByTestId("upcoming-action"), {
        key: "a",
        code: 65,
      });

      expect(
        queryByTestId("upcoming").classList.contains("active")
      ).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("inbox").classList.contains("active")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("upcoming-action"), {
        key: "Enter",
        code: 13,
      });
      expect(
        queryByTestId("upcoming").classList.contains("active")
      ).toBeTruthy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
    });

    it("hides and shows the sidebar projects using onClick", () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(getByText("Projects"));
      expect(queryByText("Add Project")).toBeFalsy();

      fireEvent.click(getByText("Projects"));
      expect(queryByText("Add Project")).toBeTruthy();
    });

    it("hides and shows the sidebar projects using onKeyDown", () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.keyDown(getByText("Projects"), {
        key: "a",
        code: 65,
      });
      expect(queryByText("Add Project")).toBeTruthy();

      fireEvent.keyDown(getByText("Projects"), {
        key: "Enter",
        code: 13,
      });
      expect(queryByText("Add Project")).toBeFalsy();

      fireEvent.keyDown(getByText("Projects"), {
        key: "a",
        code: 65,
      });
      expect(queryByText("Add Project")).toBeFalsy();

      fireEvent.keyDown(getByText("Projects"), {
        key: "Enter",
        code: 13,
      });
      expect(queryByText("Add Project")).toBeTruthy();
    });
  });
});
