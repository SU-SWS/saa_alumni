/* eslint-disable no-undef */
import { useEffect } from 'react';

const useEscape = (onEscape) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onEscape();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onEscape]);
};

export default useEscape;
