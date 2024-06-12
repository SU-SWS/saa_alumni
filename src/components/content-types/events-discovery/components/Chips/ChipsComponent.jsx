import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { Chip } from './Chip';

export const ChipsComponent = () => {
  const { items } = useCurrentRefinements();

  if (items?.length === 0) {
    return <div />;
  }

  return (
    <div className="su-flex su-flex-row su-flex-wrap su-space-x-4 su-max-w-500 lg:su-max-w-900">
      {items.map((item) =>
        item.refinements.map((refinement) => (
          <Chip
            key={`${refinement.attribute}-${refinement.label}`}
            attribute={refinement.attribute}
            label={refinement.label}
            remove={() => item.refine(refinement)}
          />
        ))
      )}
    </div>
  );
};
