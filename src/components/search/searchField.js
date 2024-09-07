import React from 'react';

import { SearchBox } from 'react-instantsearch';
import { X, Search } from 'react-hero-icon/solid';

// CSS Classes.
// --------------------------------------------------
const wrapperClasses = `su-grow su-w-auto su-border-0 su-border-b su-border-black-60`;
const clearBtnClasses = `su-flex su-items-center su-bg-transparent hocus:su-bg-transparent su-text-black-70 hocus:su-text-black hocus:su-underline su-text-m0 su-font-semibold su-border-none  su-p-0 su-rs-mr-1 su-mt-03em`;
const inputClasses = `su-border-0 su-text-m2 su-leading-display su-w-full su-flex-1 su-rs-px-1 su-py-10 su-outline-none focus:su-ring-0 focus:su-ring-transparent`;
const submitBtnClasses = `su-flex su-items-center su-justify-center su-w-40 su-min-w-[4rem] su-h-40 md:children:su-w-20 md:children:su-h-20 su-rounded-full su-transition-colors su-bg-digital-red-light hocus:su-bg-cardinal-red-xdark su-ml-10`;
const autocompleteLinkClasses = `su-cursor-pointer su-font-regular su-inline-block su-w-full su-text-white su-no-underline su-px-15 su-py-10 su-rounded-full hover:su-bg-digital-red hover:su-text-white`;
const autocompleteLinkFocusClasses = `su-bg-digital-red`;
const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-cardinal-red-xxdark su-p-10 su-shadow-md su-w-full su-border su-border-digital-red-light su-rounded-b-[0.5rem] su-z-20`;

const SearchField = React.forwardRef(({ placeholder }, ref) => (
  <div className="su-flex su-items-center">
    <span className="" />
    <div
      className={`su-flex su-w-full su-items-center su-relative ${wrapperClasses}`}
    >
      <label className="su-grow su-max-w-full" htmlFor="search-input-field">
        <span className="su-sr-only">Search</span>
      </label>
      <SearchBox
        id="search-input-field"
        placeholder={placeholder}
        searchAsYouType={false}
        autoFocus
        submitIconComponent={Search}
        resetIconComponent={X}
        // loadingIconComponent={() => JSX.Element}
        classNames={inputClasses}
      />
    </div>
  </div>
));

export default SearchField;
