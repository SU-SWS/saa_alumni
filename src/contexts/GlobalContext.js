/**
 * The Global Context is for site wide state management and storage.
 *
 * This is the de-facto place to store anything that belongs in a site wide
 * context. Please review your functionality before using the global context as
 * a more localized context may be appropriate.
 *
 */

import React, { useReducer, createContext } from "react";

// Constants.
export const isBrowser = typeof window !== `undefined`;
export const assetURL =
  process.env.GATSBY_ASSET_URL ?? "https://a.storyblok.com/";
export const imageURL =
  process.env.GATSBY_IMAGE_URL ?? "https://img2.storyblok.com/";
export const isNetlify =
  process.env.GATSBY_NETLIFY || process.env.NETLIFY || false;
export const isProduction = process.env.GATSBY_PRODUCTION ?? false;
export const breakpoints = {
  "2xs": 0,
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  "2xl": 1500,
};

/**
 * The default state.
 */
const defaultState = {};

// The context.
export const GlobalContext = createContext(defaultState);
export const GlobalContextConsumer = GlobalContext.Consumer;
export const GlobalContextProvider = GlobalContext.Provider;

/**
 * Reducer function for the global context state.
 *
 * @param {*} state
 * @param {*} action
 *
 * @return A new state.
 */
function GlobalContextReducer(state, action) {
  let myState = state;
  if (!state) {
    myState = defaultState;
  }

  switch (action.type) {
    case "set":
      myState[action.key] = action.val;
      return myState;

    case "reset":
      return defaultState;

    case "del":
      delete myState[action.item];
      return myState;

    default:
      throw new Error("Global Context does not have that action.");
  }
}

/**
 * Global State Provider.
 *
 * This handles the state updates on the GlobalContext store.
 *
 * @param {*} param
 *
 * @return JSX template wrapper.
 */
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalContextReducer);
  return (
    <GlobalContextProvider value={{ state, dispatch }}>
      {children}
    </GlobalContextProvider>
  );
};
