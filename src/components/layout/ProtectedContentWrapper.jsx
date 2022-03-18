import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import CreateStory from '../../utilities/createStory';
import CreateBloks from '../../utilities/createBloks';
import AuthContext from '../../contexts/AuthContext';

const ProtectedContentWrapper = ({ blok }) => {
  const protectedContent = blok.protectedContent.story?.full_slug;
  const protectedContentInactive =
    blok.protectedContentInactive.story?.full_slug;
  const [authenticatedContent, setAuthenticatedContent] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch(
        // Temporarily there is no way to know yet if the user is an alumni or not, waiting on that.
        // For now manually uncommenting for testing
        `http://localhost:64946/api/private-proxy?slug=${protectedContent}`
        // `http://localhost:64946/api/private-proxy?slug=${protectedContentInactive}`
      )
        .then((res) => res.json())
        .then((pageContent) => {
          setAuthenticatedContent(pageContent.story);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Consumer>
      {/* eslint-disable-next-line consistent-return */}
      {(authState) => {
        if (!authState.isAuthenticating) {
          if (
            authState.isAuthenticated &&
            authState.userProfile &&
            authenticatedContent
          ) {
            return <CreateStory story={authenticatedContent} />;
          }
          if (!authState.isAuthenticated) {
            return <CreateBloks blokSection={blok.anonymousContent} />;
          }
        }
      }}
    </AuthContext.Consumer>
  );
};

export default ProtectedContentWrapper;
