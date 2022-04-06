import React, { useEffect, useState, useContext } from 'react';
import fetch from 'node-fetch';
import CreateBloks from '../../utilities/createBloks';
import CreateStories from '../../utilities/createStories';
import AuthContext from '../../contexts/AuthContext';

const ProtectedContentWrapper = ({ blok }) => {
  const [authenticatedContent, setAuthenticatedContent] = useState(null);
  const authState = useContext(AuthContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!authState.isAuthenticated || !authState.userProfile) return;

      const requests = [];

      blok.protectedContentRef.forEach((item) => {
        const slug = item.protectedContentItem.story.full_slug;
        const request = fetch(
          // Temporarily there is no way to know yet if the user is an alumni or not, waiting on that.
          // For now manually uncommenting for testing
          `http://localhost:8000/api/private-proxy?slug=${slug}`
        ).then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          return false;
        });

        requests.push(request);
      });

      Promise.all(requests).then((results) => {
        const allowedItems = results.filter((item) => !!item.story);
        const contentItems = allowedItems.map((item) => item.story);
        setAuthenticatedContent(contentItems);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuthenticating]);

  if (!authState.isAuthenticating && authenticatedContent) {
    return <CreateStories stories={authenticatedContent} />;
  }
  if (!authState.isAuthenticating && !authenticatedContent) {
    return <CreateBloks blokSection={blok.anonymousContent} />;
  }

  return <div>Checking Authentication state...</div>;
};

export default ProtectedContentWrapper;
