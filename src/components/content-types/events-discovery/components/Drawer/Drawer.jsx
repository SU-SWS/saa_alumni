import React, { useEffect, useState, useRef } from 'react';
import { XIcon } from '@heroicons/react/solid';

export const Drawer = ({ header, isOpen, onClose, children }) => {
  const drawerRef = useRef(null);
  const [visibility, setVisibility] = useState(isOpen);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        const focusableElements = drawerRef.current.querySelectorAll(
          'a[href], button, textarea, input, select'
        );
        if (focusableElements.length === 0) {
          return;
        }
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setVisibility(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setTimeout(() => setVisibility(false), 300);
    }
  };

  return (
    <div
      className={`su-fixed su-inset-0 su-z-50 su-transition-opacity su-duration-300 ${
        isOpen ? 'su-opacity-100' : 'su-opacity-0 su-pointer-events-none'
      } ${visibility ? 'su-visible' : 'su-invisible'}`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="drawer-title"
      ref={drawerRef}
      tabIndex={-1}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className="su-absolute su-inset-0 su-bg-black su-bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`su-absolute su-right-0 su-top-0 su-h-full su-w-3/4 su-bg-white su-shadow-lg su-p-6 su-transform su-transition-transform su-duration-300 ${
          isOpen ? 'su-translate-x-0' : 'su-translate-x-full'
        }`}
      >
        <div className="su-flex su-justify-between su-items-center su-mx-6 su-mt-16 su-mb-4">
          {header ? (
            <h2 id="drawer-title" className="su-text-6xl su-font-bold su-mb-0">
              {header}
            </h2>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onClose}
            className="hover:su-text-gray-600"
            aria-label="Close"
          >
            <XIcon className="su-w-36 su-h-36" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
