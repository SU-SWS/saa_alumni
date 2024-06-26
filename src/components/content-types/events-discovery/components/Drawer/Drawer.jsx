import React, { useEffect, useRef } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';

export const Drawer = ({
  header,
  isOpen,
  onClose,
  onCloseAll,
  clearButton,
  sub = false,
  children,
}) => {
  const drawerRef = useRef(null);

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

  return (
    <div
      className={`su-fixed su-inset-0 su-z-50 ${isOpen ? '' : 'su-hidden'}`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="drawer-title"
      ref={drawerRef}
      tabIndex={-1}
    >
      <div
        className="su-absolute su-inset-0 su-bg-black su-bg-opacity-50"
        onClick={onCloseAll || onClose}
        aria-hidden="true"
      />
      <div
        className={`su-absolute su-right-0 su-top-0 su-h-full ${
          sub ? 'su-w-full' : 'su-w-full sm:su-w-3/4 md:su-w-2/4'
        } su-bg-white su-shadow-lg su-transform su-transition-transform su-duration-300 ${
          isOpen ? 'su-translate-x-0' : 'su-translate-x-full'
        }`}
      >
        <div className="su-flex su-flex-col su-min-h-screen">
          <div className="su-flex su-justify-between su-items-center su-mt-16 su-pb-24 su-border-b-2 su-border-cardinal-red-light">
            <button
              type="button"
              onClick={onClose}
              className="su-ml-8 su-text-cardinal-red hover:su-text-cardinal-red-light su-transform su-duration-200 su-ease-in-out"
              aria-label="Back"
            >
              <ArrowLeftIcon className="su-w-36 su-h-36" />
            </button>
            {header && (
              <h2
                id="drawer-title"
                className="su-text-5xl su-text-cardinal-red su-font-semibold su-mb-0 su-mr-8"
              >
                {header}
              </h2>
            )}
          </div>
          <div className="su-grow">{children}</div>
          <div className="su-w-full su-sticky su-bottom-0 su-border-t su-border-t-black-30 su-bg-fog-light su-p-26 su-z-10">
            <div className="su-flex su-justify-between">
              {clearButton || <div />}
              <button
                type="button"
                className="su-group hover:su-underline focus-visible:su-underline su-transition su-px-13 su-py-9 md:su-px-15 md:su-py-10 su-text-16 su-font-regular su-no-underline su-leading-display su-bg-cardinal-red hover:su-bg-cardinal-red-dark focus-visible:su-bg-cardinal-red-dark active:su-bg-cardinal-red su-text-white hocus:su-text-white su-border su-rounded su-border-cardinal-red-light hocus:su-border-cardinal-red-light active:su-border-cardinal-red-light su-shadow hocus:su-shadow-md active:su-ring-2 focus:su-ring-2 active:su-ring-cardinal-red-light focus:su-ring-cardinal-red-light hocus:su-decoration-1 su-outline-none disabled:su-border-black-20 disabled:su-bg-black-20 disabled:su-text-black"
                onClick={onCloseAll || onClose}
              >
                View results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
