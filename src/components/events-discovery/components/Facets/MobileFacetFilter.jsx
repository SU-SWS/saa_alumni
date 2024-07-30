import React, { useMemo } from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { useFacets } from './useFacets';
import { MobileParentFilter } from '../Filters/MobileParentFilter';
import { MobileFacetList } from './MobileFacetList';

export const MobileFacetFilter = ({ attribute, onCloseMenu }) => {
  const { items } = useCurrentRefinements({ includedAttributes: [attribute] });
  const { getFacet } = useFacets();
  const facet = getFacet(attribute);

  const count = useMemo(() => items?.[0]?.refinements?.length ?? 0, [items]);

  return (
    <MobileParentFilter
      label={facet.label}
      count={count}
      onCloseMenu={onCloseMenu}
    >
      <MobileFacetList attribute={attribute} />
    </MobileParentFilter>
  );
};
