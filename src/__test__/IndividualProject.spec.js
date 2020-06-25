import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  queryByTestId,
} from "@testing-library/react";
import { IndividualProject } from "../components/IndividualProject";
import { FaItalic } from "react-icons/fa";

beforeEach(cleanup);

jest.mock("../hooks/firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve("Never mock firebase")),
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

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

describe("<IndividualProject />", () => {
  const project = {
    name: "🎬Movie",
    projectId: "1",
    userId: "jlIFXIwyAL3tzHMtzRbw",
  };

  describe("Success", () => {
    it("renders our project", () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText("🎬Movie")).toBeTruthy();
    });

    it("renders the  delete overlay and then deletes a project using onClick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId("delete-project"));
      // expect(getByText("are you")).toBeTruthy();

      fireEvent.click(getByText("Delete"));
    });

    it("renders the  delete overlay and then cancels a project using onClick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId("delete-project"));
      // expect(getByText("are you")).toBeTruthy();

      fireEvent.click(getByText("Cancel"));
    });
  });
});
