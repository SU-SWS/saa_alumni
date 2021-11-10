import React, { useEffect, useRef, useState } from 'react';
import { tabbable } from 'tabbable';
import { XIcon } from '@heroicons/react/solid';
import useFocusTrap from '../../../hooks/useFocusTrap';
import * as styles from './Modal.styles';

const Modal = ({
  children,
  isOpen,
  onClose,
  ariaLabel,
  initialFocus,
  type = 'default',
}) => {
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
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    document.getElementsByTagName('body')[0].style.position = 'fixed';
  };

  const unlockScroll = () => {
    document
      .getElementsByTagName('html')[0]
      .setAttribute('style', 'overflow-y: visible!important');
    document.getElementsByTagName('body')[0].style.paddingRight = '0';
    document.getElementsByTagName('body')[0].style.overflowY = 'visible';
    document.getElementsByTagName('body')[0].style.position = 'relative';
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
      className={styles.root({ isOpen, type })}
      aria-label={ariaLabel}
      aria-hidden={!isOpen}
      aria-modal={isOpen}
      role="dialog"
      tabIndex="-1"
    >
      <div className={styles.wrapper({ type })}>
        <div className={styles.closeButtonWrapper({ type })}>
          <button
            type="button"
            ref={closeButton}
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            Close
            <XIcon className={styles.closeIcon({ type })} aria-hidden />
          </button>
        </div>
        <div ref={modalBodyRef}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
