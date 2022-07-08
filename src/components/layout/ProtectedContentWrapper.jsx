import React, { useEffect, useState, useContext } from 'react';
import fetch from 'node-fetch';
import { PulseLoader } from 'react-spinners';
import CreateBloks from '../../utilities/createBloks';
import CreateStories from '../../utilities/createStories';
import AuthContext from '../../contexts/AuthContext';
import RichTextRenderer from '../../utilities/richTextRenderer';
import hasRichText from '../../utilities/hasRichText';
import { Heading } from '../simple/Heading';

const ProtectedContentWrapper = ({ blok }) => {
  const [authenticatedContent, setAuthenticatedContent] = useState(null);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const authState = useContext(AuthContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!authState.isAuthenticated) return;
      setCheckingAccess(true);
      const requests = [];

      blok.protectedContentRef.forEach((item) => {
        const slug = item?.protectedContentItem?.story?.full_slug;
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
  }, [authState.isAuthenticating]);

  // Logged in and has access to protected content.
  if (
    !authState.isAuthenticating &&
    authState.isAuthenticated &&
    !checkingAccess &&
    authenticatedContent?.length > 0
  ) {
    return (
      <div aria-live="polite" role="status">
        <CreateStories stories={authenticatedContent} />
      </div>
    );
  }

  // Logged in and has no megaprofile data
  if (
    !authState.isAuthenticating &&
    authState.isAuthenticated &&
    authState.isError &&
    !checkingAccess &&
    authenticatedContent?.length === 0
  ) {
    return (
      <div aria-live="polite" role="status" className="su-text-center">
        {/* TODO: Confirm with Bhavika whether the login message should be hardcoded */}
        <Heading level={3} size={3} font="serif">
          Uh oh. This is embarassing.
        </Heading>
        <div className="su-basefont-23">
          <p>
            It looks like we’re currently unable to look up your membership
            status due to a technical error. Please try again later.
          </p>
          <p className="su-mb-0">
            If you are still experiencing this issue, please contact
          </p>
          <a href="/" className="su-text-digital-xlight hocus:su-text-white">
            Stanford Alumni Customer Service
          </a>
        </div>
      </div>
    );
  }

  // No content or 403'd with custom access denied message.
  if (
    !authState.isAuthenticating &&
    !checkingAccess &&
    authState.isAuthenticated &&
    authenticatedContent?.length === 0 &&
    hasRichText(blok.accessDeniedContent)
  ) {
    return (
      <RichTextRenderer
        wysiwyg={blok.accessDeniedContent}
        isDark
        className="su-rs-px-2"
        aria-live="polite"
        role="status"
      />
    );
  }

  // No content or 403'd
  if (
    !authState.isAuthenticating &&
    !checkingAccess &&
    authState.isAuthenticated &&
    authenticatedContent?.length === 0
  ) {
    return (
      <div aria-live="polite" role="status">
        <strong>This content is restricted. Please log in as a member.</strong>
      </div>
    );
  }

  // Anonymous user, show anon content.
  if (
    !authState.isAuthenticating &&
    !checkingAccess &&
    !authState.isAuthenticated &&
    !authenticatedContent
  ) {
    return (
      <div aria-live="polite" role="status">
        <CreateBloks blokSection={blok.anonymousContent} />
      </div>
    );
  }

  // Processing.
  return (
    <div aria-live="polite" role="status">
      <p>Checking your access...</p>
      <p className="su-text-center">
        <PulseLoader color="#820000" size={16} />
      </p>
    </div>
  );
};

export default ProtectedContentWrapper;
