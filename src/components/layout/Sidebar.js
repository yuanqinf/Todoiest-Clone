import React, { useState } from "react";
import { useSelectedProjectValue } from "../../context";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === "inbox" ? "active" : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("inbox");
              setSelectedProject("INBOX");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("inbox");
                setSelectedProject("INBOX");
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid="today"
          className={active === "today" ? "active" : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show today's tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("today");
              setSelectedProject("TODAY");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("today");
                setSelectedProject("TODAY");
              }
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="upcoming"
          className={active === "upcoming" ? "active" : undefined}
        >
          <div
            data-testid="upcoming-action"
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("upcoming");
              setSelectedProject("UPCOMING");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("upcoming");
                setSelectedProject("UPCOMING");
              }
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Upcoming</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        aria-label="Show/hide projects"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowProjects(!showProjects);
        }}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
