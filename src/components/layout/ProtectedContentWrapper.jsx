import React, { useEffect, useState, useContext } from 'react';
import fetch from 'node-fetch';
import CreateBloks from '../../utilities/createBloks';
import CreateStories from '../../utilities/createStories';
import AuthContext from '../../contexts/AuthContext';

const ProtectedContentWrapper = ({ blok }) => {
  const [authenticatedContent, setAuthenticatedContent] = useState(null);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const authState = useContext(AuthContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!authState.isAuthenticated || !authState.userProfile) return;
      setCheckingAccess(true);
      const requests = [];

      blok.protectedContentRef.forEach((item) => {
        const slug = item.protectedContentItem.story.full_slug;
        const request = fetch(`/api/private-proxy?slug=${slug}`).then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          return false;
        });

        requests.push(request);
      });

      Promise.all(requests)
        .then((results) => {
          const allowedItems = results.filter((item) => !!item.story);
          const contentItems = allowedItems.map((item) => item.story);
          setCheckingAccess(false);
          setAuthenticatedContent(contentItems);
        })
        .catch((err) => {
          setCheckingAccess(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuthenticating, authState.userProfile]);

  if (!authState.isAuthenticating && authenticatedContent) {
    return <CreateStories stories={authenticatedContent} />;
  }
  if (!authState.isAuthenticating && !checkingAccess && !authenticatedContent) {
    return <CreateBloks blokSection={blok.anonymousContent} />;
  }

  return <div>Checking Authentication state...</div>;
};

export default ProtectedContentWrapper;
