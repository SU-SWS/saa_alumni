import React, { useMemo } from 'react';
import { useStats } from 'react-instantsearch';

/**
 * @type {React.FC<{}>}
 * @returns {React.ReactElement}
 */
export const StatusHeader = () => {
  const { nbHits, hitsPerPage, nbPages, page } = useStats();

  const lastPageHits = useMemo(
    () => nbHits % hitsPerPage,
    [nbHits, hitsPerPage]
  );

  const isShowFirstPage = useMemo(() => page === 1, [page]);
  const isShowingLastPage = useMemo(() => nbPages === page, [nbPages, page]);

  const firstPageResult = useMemo(
    () => (isShowFirstPage ? 1 : (page - 1) * hitsPerPage),
    [isShowFirstPage, page, hitsPerPage]
  );

  const lastPageResult = useMemo(
    () =>
      isShowingLastPage
        ? firstPageResult + lastPageHits
        : firstPageResult + hitsPerPage,
    [isShowingLastPage, firstPageResult, lastPageHits, hitsPerPage]
  );

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="su-text-black-80 su-text-20"
    >
      {nbHits ? (
        <>
          {nbHits} {nbHits > 1 ? 'events' : 'event'}
          <span className="su-sr-only">
            . Showing {firstPageResult} - {lastPageResult}.
          </span>
        </>
      ) : (
        <>No results found.</>
      )}
    </div>
  );
};
