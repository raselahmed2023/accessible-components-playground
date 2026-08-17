import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const panelId = "disclosure-panel";

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="disclosure-trigger"
        onClick={() =>
          setIsOpen((current) => !current)
        }
      >
        <span>
          What is an accessible disclosure?
        </span>

        <span aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="disclosure-panel"
      >
        <p>
          A disclosure is a button that controls the
          visibility of a section of content. Its expanded
          state is communicated through aria-expanded.
        </p>

        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"
          target="_blank"
          rel="noreferrer"
        >
          Learn about the ARIA disclosure pattern
        </a>
      </div>
    </div>
  );
}