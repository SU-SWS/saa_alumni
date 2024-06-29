import React, { useMemo } from 'react';
import { useHits, usePagination } from 'react-instantsearch';

/**
 * @typedef {object} Props
 * @property {number} hitsPerPage
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const StatusHeader = ({ hitsPerPage }) => {
  const { currentRefinement, nbHits } = usePagination();
  const { items } = useHits();

  const nbItems = useMemo(() => items.length, [items]);
  const firstPageResult = useMemo(
    () => currentRefinement * hitsPerPage + 1,
    [currentRefinement, hitsPerPage]
  );
  const lastPageResult = useMemo(
    () => firstPageResult + nbItems - 1,
    [firstPageResult, nbItems]
  );

  const message = useMemo(() => {
    if (!nbItems) {
      return 'No results found';
    }

    return `${nbHits} events found. Showing ${firstPageResult} - ${lastPageResult}.`;
  }, [nbItems, nbHits, firstPageResult, lastPageResult]);

  return (
    <h2 className="su-sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </h2>
  );
};
