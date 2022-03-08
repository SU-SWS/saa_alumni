import React, { useCallback, useState, useMemo } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import Modal from '../layout/Modal/Modal';
import { SAAButton } from '../simple/SAAButton';
import { useTimer } from '../../hooks/useTimer';
import { pluralize } from '../../utilities/pluralize';

const AuthIdleTimeoutOverlay = ({
  idleTimeout = 45 * 60 * 1000, // 45 minutes
  modalTimeout = 15 * 60 * 1000, // 15 minutes
}) => {
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    window.location.replace('/api/auth/logout');
  };

  const modalTimer = useTimer({
    timeout: modalTimeout,
    onTimeout: handleLogout,
  });

  const handleCancelClose = useCallback(() => {
    modalTimer.reset();
    setOpen(false);
  }, [modalTimer, setOpen]);

  const startModalTimer = useCallback(() => {
    setOpen(true);
    modalTimer.start();
  }, [setOpen, modalTimer]);

  useIdleTimer({
    timeout: idleTimeout,
    onIdle: startModalTimer,
  });

  const duration = useMemo(() => {
    if (modalTimer.isRunning) {
      const mins = Math.ceil(modalTimer.remainingTime / (1000 * 60));
      const secs = Math.floor(modalTimer.remainingTime / 1000);

      if (mins > 1) return `${mins} minutes`;

      return `${secs} ${pluralize(secs, 'second')}`;
    }
    return undefined;
  }, [modalTimer.isRunning, modalTimer.remainingTime]);

  return (
    <Modal isOpen={open} onClose={handleCancelClose}>
      <div className="su-cc su-max-w-700 md:su-px-0">
        <div className="su-bg-white su-rs-py-2 su-rs-px-4">
          <p className="su-text-center">
            Your session will expire due to inactivity in&nbsp;
            <strong>{duration}</strong>.
          </p>
          <div className="su-flex su-w-full su-gap-x-xs su-rs-mt-1 su-justify-center">
            <SAAButton
              buttonStyle="secondary"
              onClick={handleLogout}
              icon="none"
            >
              Logout
            </SAAButton>
            <SAAButton
              buttonStyle="primary"
              icon="none"
              onClick={handleCancelClose}
            >
              Continue
            </SAAButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthIdleTimeoutOverlay;
