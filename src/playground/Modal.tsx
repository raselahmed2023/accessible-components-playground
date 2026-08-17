import { useEffect, useRef } from "react";
import type {
  KeyboardEvent,
  ReactNode,
  RefObject,
} from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;

    if (!dialog) return;

    const focusableElements =
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

    const firstFocusable = focusableElements[0];

    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      dialog.focus();
    }

    return () => {
      triggerRef.current?.focus();
    };
  }, [isOpen, triggerRef]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;

    if (!dialog) return;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      )
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusableElements[0];
    const last =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="modal"
        onKeyDown={handleKeyDown}
      >
        <h2 id="modal-title">{title}</h2>

        <div>{children}</div>

        <div className="modal-actions">
          <button type="button">
            Secondary action
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}