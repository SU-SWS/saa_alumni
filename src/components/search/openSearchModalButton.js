import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import * as styles from '../navigation/MainNav/mainNav.styles';

const OpenSearchModalButton = React.forwardRef((props, ref) => {
  const { setModalOpen, id } = props;

  return (
    <button
      data-test="search--nav-bar"
      type="button"
      className={styles.menuCircles}
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
        className="su-inline-block su-relative su--top-1 su-w-22 lg:su-w-20 lg:su-ml-6 su-h-18"
      />
    </button>
  );
});

export default OpenSearchModalButton;
