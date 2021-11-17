import { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';

// use useLocation hook to determine if we are on a travel study page
const useIsTravelStudy = () => {
  const [isTravelStudy, setIsTravelStudy] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.startsWith('/travel-study') ||
      location.search.includes('path=travel-study') ||
      location.search.includes('path=/travel-study')
    ) {
      setIsTravelStudy(true);
    }
  }, [location]);

  return isTravelStudy;
};

export default useIsTravelStudy;
