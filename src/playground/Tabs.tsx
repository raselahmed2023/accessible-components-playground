import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Tab = {
  id: string;
  label: string;
  content: string;
};

const tabs: Tab[] = [
  {
    id: "profile",
    label: "Profile",
    content:
      "Update your public profile information here.",
  },
  {
    id: "account",
    label: "Account",
    content:
      "Manage account settings and preferences.",
  },
  {
    id: "security",
    label: "Security",
    content:
      "Review your password and security settings.",
  },
];

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabRefs =
    useRef<Array<HTMLButtonElement | null>>([]);

  const activateTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (index - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    activateTab(nextIndex);
  };

  return (
    <div className="tabs-component">
      <div
        role="tablist"
        aria-label="Account settings"
        className="tab-list"
      >
        {tabs.map((tab, index) => {
          const selected = activeIndex === index;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={
                selected
                  ? "tab active-tab"
                  : "tab"
              }
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeIndex !== index}
          tabIndex={0}
          className="tab-panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}