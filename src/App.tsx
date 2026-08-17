import { useRef, useState } from "react";
import "./App.css";

import Modal from "./playground/Modal";
import Tabs from "./playground/Tabs";
import Disclosure from "./playground/Disclosure";

function App() {
  const [modalOpen, setModalOpen] =
    useState(false);

  const modalTriggerRef =
    useRef<HTMLButtonElement>(null);

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">FE-05</p>

        <h1>
          Accessible Component Playground
        </h1>

        <p>
          Modal, tabs and disclosure components built
          from scratch using React, TypeScript and
          WAI-ARIA interaction patterns.
        </p>
      </header>

      <section className="component-card">
        <div className="section-heading">
          <span>01</span>

          <div>
            <h2>Modal Dialog</h2>
            <p>
              Focus trapping, Escape support and focus
              restoration.
            </p>
          </div>
        </div>

        <button
          ref={modalTriggerRef}
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Open modal
        </button>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Accessible modal dialog"
          triggerRef={modalTriggerRef}
        >
          <p>
            Use Tab and Shift + Tab to move between
            controls. Press Escape to close the dialog.
          </p>
        </Modal>
      </section>

      <section className="component-card">
        <div className="section-heading">
          <span>02</span>

          <div>
            <h2>Tabs</h2>
            <p>
              Navigate using Left/Right arrows, Home and
              End.
            </p>
          </div>
        </div>

        <Tabs />
      </section>

      <section className="component-card">
        <div className="section-heading">
          <span>03</span>

          <div>
            <h2>Disclosure</h2>
            <p>
              Toggle content using a native accessible
              button.
            </p>
          </div>
        </div>

        <Disclosure />
      </section>
    </main>
  );
}

export default App;