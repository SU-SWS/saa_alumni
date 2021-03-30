/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

// Contexts.
import { GlobalStateProvider } from "./src/contexts/GlobalContext";

// Exports.
export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>
    {element}
  </GlobalStateProvider>
);
