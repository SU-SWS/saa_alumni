import React, { useCallback, useMemo, useState } from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { useFacets } from './useFacets';
import { MobileParentFilter } from '../Filters/MobileParentFilter';
import { MobileFacetList } from './MobileFacetList';

export const MobileFacetFilter = ({ attribute, onCloseMenu }) => {
  const { items } = useCurrentRefinements({ includedAttributes: [attribute] });
  const { getFacet } = useFacets();
  const facet = getFacet(attribute);

  const count = useMemo(() => items?.[0]?.refinements?.length ?? 0, [items]);

  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <MobileParentFilter
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      label={facet.label}
      count={count}
      onCloseMenu={() => {
        close();
        onCloseMenu();
      }}
    >
      <MobileFacetList attribute={attribute} />
    </MobileParentFilter>
  );
};
