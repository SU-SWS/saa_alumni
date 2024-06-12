import React from 'react';
import { useInstantSearch } from 'react-instantsearch';
import { LoadingComponent } from './LoadingComponent';

export const LoadingIndicator = () => {
  const { status } = useInstantSearch();
  /* Best practice is to display a loading indicator only when status is stalled,
   * not during a standard (fast) search.
   * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/loading-indicator/react/
   */
  if (status === 'stalled') {
    return <LoadingComponent />;
  }
  return null;
};
