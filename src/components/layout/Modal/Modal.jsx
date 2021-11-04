import React, { useEffect, useRef, useState } from 'react';
import { tabbable } from 'tabbable';
import { XIcon } from '@heroicons/react/solid';
import useFocusTrap from '../../../hooks/useFocusTrap';

const Modal = ({ children, isOpen, onClose, ariaLabel, initialFocus }) => {
  const closeButton = useRef();
  const modalBodyRef = useRef();

  // Find the last tabbable item within the modal body.
  const getLastTabbableItem = () => {
    if (!modalBodyRef.current) return null;
    const focusableItems = tabbable(modalBodyRef.current);
    const lastTabbableItem = focusableItems.length
      ? focusableItems[focusableItems.length - 1]
      : closeButton.current;
    return lastTabbableItem;
  };

  // Mimick the structure of a React ref so it works with UseFocusTrap hook.
  const [lastTabbableRef, setLastTabbableRef] = useState({
    current: getLastTabbableItem(),
  });

  // Update focus trap when child content changes.
  useEffect(() => {
    setLastTabbableRef({ current: getLastTabbableItem() });
  }, [children]);

  useFocusTrap(closeButton, lastTabbableRef, isOpen);

  const lockScroll = () => {
    const overlay = document.querySelector('.su-modal');
    const scrollbarWidth = `${overlay.offsetWidth - overlay.clientWidth}px`;

    document
      .getElementsByTagName('html')[0]
      .setAttribute('style', 'overflow-y: hidden!important');
    document.getElementsByTagName('body')[0].style.paddingRight =
      scrollbarWidth;
  };

  const unlockScroll = () => {
    document.getElementsByTagName('html')[0].style.overflowY = 'visible';
    document.getElementsByTagName('body')[0].style.paddingRight = '0';
  };

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      if (initialFocus) {
        initialFocus.current.focus();
      } else {
        closeButton.current.focus();
      }
    } else {
      unlockScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      className={`su-modal
      su-fixed su-w-screen su-h-screen su-overscroll-contain su-overflow-auto su-top-0 su-left-0 su-items-center su-justify-center su-z-50
      ${isOpen ? 'su-flex' : 'su-hidden'}
    `}
      aria-label={ariaLabel}
      aria-hidden={isOpen ? 'false' : 'true'}
      role="dialog"
      tabIndex="-1"
    >
      <div className="su-absolute su-w-screen su-h-screen su-bg-saa-black su-bg-opacity-[97%] su-rs-py-5 su-overflow-auto su-basefont-19">
        <div className="su-pointer-events-auto">
          <div className="su-cc su-flex su-justify-end">
            <button
              type="button"
              ref={closeButton}
              onClick={onClose}
              className="su-bg-transparent su-text-white hocus:su-bg-transparent su-font-semibold hocus:su-underline su-text-m1 su-flex su-items-end su-z-30"
            >
              Close
              <XIcon
                className="su-inline-block su-h-[1.1em] su-w-[1.1em] su-ml-4"
                aria-hidden="true"
              />
            </button>
          </div>
          <div ref={modalBodyRef}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
