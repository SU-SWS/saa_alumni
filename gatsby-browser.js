/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";

// Contexts.
import { GlobalStateProvider } from "./src/contexts/GlobalContext";

// CSS
import "./src/styles/global.css";

// Exports.
export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>{element}</GlobalStateProvider>
);

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  // Prevent scrolling when user clicks on filters on Areas to Support page.
  if (location.pathname == '/search') {
    return false;
  }
};
