import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const OpenSearchModalButton = React.forwardRef((props, ref) => {
  const { setModalOpen, id } = props;

  return (
    <button
      type="button"
      className="search-button su-flex-shrink-0 su-w-40 su-h-40 su-ml-auto su-items-center su-justify-content-center lg:su-w-auto lg:su-h-[3.4rem] lg:su-pl-16 lg:su-pr-13 lg:su-pt-3 su-rounded-full lg:su-text-18 su-text-white su-leading-none su-border-2 su-border-solid su-border-digital-red-xlight su-transition-colors hocus:su-bg-cardinal-red-xxdark xl:hocus:su-bg-cardinal-red-xdark lg:hocus:su-no-underline su-self-center"
      aria-label="Search Stanford Alumni sites"
      onClick={(e) => setModalOpen(true)}
      id={id}
      ref={ref}
    >
      <span className="su-sr-only lg:su-not-sr-only su-leading-none">
        Search
      </span>
      <SearchIcon
        aria-hidden="true"
        className="su-inline-block su-relative su--top-1 su-w-[2.2rem] lg:su-w-20 lg:su-ml-6"
      />
    </button>
  );
});

export default OpenSearchModalButton;
