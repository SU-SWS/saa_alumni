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

  const isShowFirstPage = useMemo(() => page === 0, [page]);
  const isShowingLastPage = useMemo(
    () => nbPages === page + 1,
    [nbPages, page]
  );

  const firstPageResult = useMemo(
    () => (isShowFirstPage ? 1 : page * hitsPerPage + 1),
    [isShowFirstPage, page, hitsPerPage]
  );

  const lastPageResult = useMemo(
    () =>
      isShowingLastPage
        ? firstPageResult + lastPageHits - 1
        : firstPageResult + hitsPerPage - 1,
    [isShowingLastPage, firstPageResult, lastPageHits, hitsPerPage]
  );

  const countDisplay = useMemo(
    () => `${nbHits} ${nbHits > 1 ? 'events' : 'event'}`,
    [nbHits]
  );
  const pageDisplay = useMemo(
    () => `; showing ${firstPageResult} to ${lastPageResult}`,
    [firstPageResult, lastPageResult]
  );

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="su-text-black-80 su-text-20"
    >
      {nbHits ? (
        <>
          {countDisplay}
          <span className="su-sr-only">{pageDisplay}</span>
        </>
      ) : (
        <>No results found</>
      )}
    </div>
  );
};
