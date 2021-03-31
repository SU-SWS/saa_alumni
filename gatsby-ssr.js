/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

// Contexts.
import { GlobalStateProvider } from './src/contexts/GlobalContext';

// CSS
import './src/styles/global.css';

// Exports.
export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>
    {element}
  </GlobalStateProvider>
);
