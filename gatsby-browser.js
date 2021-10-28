/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

// Contexts.
import { GlobalStateProvider } from './src/contexts/GlobalContext';

// CSS
import './src/styles/global.css';

// Exports.
export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>{element}</GlobalStateProvider>
);

export const shouldUpdateScroll = (ctx) => {
  const {
    routerProps: { location },
    prevRouterProps: { location: prevLocation = {} } = {},
  } = ctx;

  // Prevent scrolling when user clicks on filters on search page.
  if (location.pathname.match(/^\/search/i)) {
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
