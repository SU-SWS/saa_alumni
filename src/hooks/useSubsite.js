import { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';

// Use useLocation hook to determine what subsite current page is on
const useSubsite = () => {
  const [subsite, setSubsite] = useState('homesite');
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.startsWith('/travel-study') ||
      location.search.includes('path=travel-study') ||
      location.search.includes('path=/travel-study')
    ) {
      setSubsite('travel-study');
    }
  }, [location]);

  return subsite;
};

export default useSubsite;
