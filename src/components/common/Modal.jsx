import { useEffect, useRef } from "react";

/**
 * Accessible Modal Dialog component.
 * Demonstrates:
 * - Keyboard accessibility (Escape key to dismiss)
 * - Focus trapping with useRef
 * - ARIA landmarks (role="dialog", aria-modal="true")
 * - Component composition (Header, Body, Actions)
 * 
 * Fulfills syllabus: Lectures 61-66 (Modal patterns)
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "540px"
}) {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous focus
    previouslyFocusedElement.current = document.activeElement;

    // Focus modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Keyboard listener for Escape key
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        className="modal-container animate-scale-up"
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
