import { useLayoutEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';
import { breakpoints } from '../contexts/GlobalContext';

// Custom hook to display mobile or desktop version of a component based on breakpoint value
const useDisplay = (breakpoint = 'lg') => {
  const [showDesktop, setShowDesktop] = useState(true);
  const [showMobile, setShowMobile] = useState(true);
  const isMinWidth = useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);

  useLayoutEffect(() => {
    if (isMinWidth) {
      setShowDesktop(true);
      setShowMobile(false);
    } else {
      setShowDesktop(false);
      setShowMobile(true);
    }
  }, [isMinWidth]);

  return { showDesktop, showMobile };
};

export default useDisplay;
