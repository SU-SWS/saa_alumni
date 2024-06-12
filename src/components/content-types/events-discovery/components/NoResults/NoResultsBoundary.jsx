import React from 'react';
import { useInstantSearch } from 'react-instantsearch';

export const NoResultsBoundary = ({ children, fallback }) => {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  // eslint-disable-next-line no-underscore-dangle
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
};
