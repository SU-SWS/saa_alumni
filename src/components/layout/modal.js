import React, { useEffect, useRef, useState } from "react";
import { Container } from "decanter-react";
import { tabbable } from "tabbable";
import { XIcon } from "@heroicons/react/solid";
import UseFocusTrap from "../../hooks/useFocusTrap";
import UseEscape from "../../hooks/useEscape";

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

  UseFocusTrap(closeButton, lastTabbableRef, isOpen);

  UseEscape(() => {
    closeButton.current.click();
  });

  const lockScroll = () => {
    const overlay = document.querySelector(".su-modal");
    const scrollbarWidth = `${overlay.offsetWidth - overlay.clientWidth}px`;

    document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    document.getElementsByTagName("body")[0].style.paddingRight =
      scrollbarWidth;
  };

  const unlockScroll = () => {
    document.getElementsByTagName("html")[0].style.overflowY = "scroll";
    document.getElementsByTagName("body")[0].style.paddingRight = "0";
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
      su-fixed su-w-full su-h-full su-top-0 su-left-0 su-items-center su-justify-center su-z-50
      ${isOpen ? "su-flex" : "su-hidden"}
    `}
      aria-label={ariaLabel}
      aria-hidden={isOpen ? "false" : "true"}
      role="dialog"
      tabIndex="-1"
    >
      <div className="su-absolute su-w-full su-h-full su-bg-saa-black su-bg-opacity-95 su-pt-70 su-overflow-auto">
        <Container>
          <div className="su-pt-8 su-pointer-events-auto">
            <div className="su-flex su-justify-end">
              <button
                type="button"
                ref={closeButton}
                onClick={onClose}
                className="su-bg-transparent su-text-white hover:su-bg-transparent focus:su-bg-transparent"
              >
                Close&nbsp;
                <XIcon
                  className="su-inline-block su-h-20 su-w-20"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div ref={modalBodyRef}>{children}</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Modal;
