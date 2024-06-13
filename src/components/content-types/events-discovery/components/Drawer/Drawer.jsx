import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';

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
          <button
            type="button"
            onClick={onClose}
            className="su-text-cardinal-red hover:su-text-cardinal-red-light su-transform su-duration-200 su-ease-in-out"
            aria-label="Back"
          >
            <ArrowLeftIcon className="su-w-36 su-h-36" />
          </button>
          {header ? (
            <h2
              id="drawer-title"
              className="su-text-5xl su-font-semibold su-mb-0"
            >
              {header}
            </h2>
          ) : (
            <div />
          )}
          <div />
        </div>
        <div>{children}</div>
      </div>
      <div
        className={`su-absolute su-bottom-0 su-right-0 su-w-3/4 su-rs-py-2 su-rs-px-1 su-border-t-2 su-border-black-30 su-bg-black-10 su-transform su-transition-transform su-duration-300 ${
          isOpen ? 'su-translate-x-0' : 'su-translate-x-full'
        }`}
      >
        <div className="su-flex su-justify-between">
          <button
            type="button"
            className="su-group hover:su-underline focus-visible:su-underline su-transition su-px-13 su-py-9 md:su-px-15 md:su-py-10 su-text-16 su-font-regular su-no-underline su-leading-display su-bg-white hocus:su-bg-white su-text-cardinal-red hocus:su-text-cardinal-red-dark su-border hocus:su-border su-rounded su-border-cardinal-red-light hocus:su-border-cardinal-red-light active:su-border-cardinal-red-light su-shadow hover:su-shadow-md focus:su-ring-2 active:su-ring-2 focus:su-ring-cardinal-red-light active:su-ring-cardinal-red-light hocus:su-decoration-1 su-outline-none disabled:su-border-black-30 disabled:su-bg-black-20 disabled:su-text-black-80"
          >
            Clear all
          </button>
          <button
            type="button"
            className="su-group hover:su-underline focus-visible:su-underline su-transition su-px-13 su-py-9 md:su-px-15 md:su-py-10 su-text-16 su-font-regular su-no-underline su-leading-display su-bg-cardinal-red hover:su-bg-cardinal-red-dark focus-visible:su-bg-cardinal-red-dark active:su-bg-cardinal-red su-text-white hocus:su-text-white su-border su-rounded su-border-cardinal-red-light hocus:su-border-cardinal-red-light active:su-border-cardinal-red-light su-shadow hocus:su-shadow-md active:su-ring-2 focus:su-ring-2 active:su-ring-cardinal-red-light focus:su-ring-cardinal-red-light hocus:su-decoration-1 su-outline-none disabled:su-border-black-20 disabled:su-bg-black-20 disabled:su-text-black"
          >
            View results
          </button>
        </div>
      </div>
    </div>
  );
};
