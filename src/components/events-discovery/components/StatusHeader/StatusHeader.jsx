import React, { useMemo } from 'react';
import { useStats } from 'react-instantsearch';

/**
 * @type {React.FC<{}>}
 * @returns {React.ReactElement}
 */
export const StatusHeader = () => {
  const { nbHits, hitsPerPage, nbPages, page, areHitsSorted, nbSortedHits } =
    useStats();

  const numHits = useMemo(
    () => (areHitsSorted ? nbSortedHits : nbHits),
    [areHitsSorted, nbHits, nbSortedHits]
  );

  const lastPageHits = useMemo(
    () => numHits % hitsPerPage,
    [numHits, hitsPerPage]
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
    () => `${numHits} ${numHits > 1 ? 'events' : 'event'}`,
    [numHits]
  );
  const pageDisplay = useMemo(
    () => `; showing ${firstPageResult} to ${lastPageResult}`,
    [firstPageResult, lastPageResult]
  );

  if (!numHits) {
    return null;
  }

  return (
    <h2
      id="event-search-count-heading"
      aria-live="polite"
      aria-atomic="true"
      className="su-text-black-80 su-text-20 su-font-normal su-scroll-mt-16"
      tabIndex={-1}
    >
      {countDisplay}
      <span className="su-sr-only">{pageDisplay}</span>
    </h2>
  );
};
