/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

// Contexts.
import { GlobalStateProvider } from './src/contexts/GlobalContext';
import { AuthContextProvider } from './src/contexts/AuthContext';

// CSS
import './src/styles/global.css';
import './src/styles/localist.css';
import './src/styles/forms.css';

// Exports.
export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>
    <AuthContextProvider>{element}</AuthContextProvider>
  </GlobalStateProvider>
);

export const shouldUpdateScroll = (ctx) => {
  const {
    routerProps: { location },
    prevRouterProps: { location: prevLocation = {} } = {},
  } = ctx;

  // Prevent scrolling when user clicks on filters on search page.
  if (
    location.pathname.match(/^\/search/i) ||
    location.pathname.match(/^\/travel-study\/search/i)
  ) {
    return false;
  }

  if (location.pathname.match(/\/register\/form/)) {
    if (document.getElementById('su-gg-embed')) {
      window.scroll({ top: document.getElementById('su-gg-embed').offsetTop });
    }
    return false;
  }

  // Prevent scrolling trip filter pages
  const filterQueryParams = [
    'trip-region=',
    'trip-year=',
    'trip-month=',
    'trip-duration=',
    'trip-experience=',
    'page=',
  ];
  if (
    location.pathname === prevLocation.pathname &&
    filterQueryParams.find(
      (q) =>
        location.search.includes(q) || (prevLocation.search || '').includes(q)
    )
  ) {
    return false;
  }

  return true;
};
