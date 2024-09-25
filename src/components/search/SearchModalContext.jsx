import React, { createContext, useState, useRef } from 'react';
import useEscape from '../../hooks/useEscape';
import useDisplay from '../../hooks/useDisplay';
/**
 * A context to manage the state of the search modal.
 */

const SearchModalContext = createContext({});
export const SearchModalContextProvider = SearchModalContext.Provider;
export default SearchModalContext;

/**
 * A provider to manage the state of the search modal.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function SearchModalProvider({ children }) {
  const { showDesktop, showMobile } = useDisplay();
  const [isOpen, setIsOpen] = useState(false);
  const desktopButtonRef = useRef();
  const mobileButtonRef = useRef();
  const searchInputRef = useRef();

  const close = () => {
    setIsOpen(false);
    if (showDesktop) desktopButtonRef.current.focus();
    if (showMobile) mobileButtonRef.current.focus();
  };

  const open = () => {
    setIsOpen(true);
    searchInputRef.current.focus();
  };

  // Close the modal when the escape key is pressed.
  useEscape(() => {
    if (isOpen) close();
  });

  // Provider wrapper.
  return (
    <SearchModalContextProvider
      value={{
        isOpen,
        open,
        close,
        desktopButtonRef,
        mobileButtonRef,
        searchInputRef,
      }}
    >
      {children}
    </SearchModalContextProvider>
  );
}
