import { useCallback, useContext, useMemo } from 'react';
import { FacetContext } from './FacetCtx';

export const useFacets = () => {
  const { facets, setFacets } = useContext(FacetContext);

  const facetsExpanded = useMemo(
    () => facets?.every((facet) => facet.expanded),
    [facets]
  );

  const getFacet = useCallback(
    (attribute) => facets?.find((facet) => facet.attribute === attribute),
    [facets]
  );

  const getFacets = useCallback(
    (attributes = []) =>
      facets?.filter((facet) => attributes.includes(facet.attribute)),
    [facets]
  );

  const toggleFacets = useCallback(() => {
    const updatedFacets = facets.map((facet) => ({
      ...facet,
      expanded: !facetsExpanded,
    }));
    setFacets(updatedFacets);
  }, [facets, facetsExpanded, setFacets]);

  /**
   * @type {(attribute:string) => void}
   */
  const toggleFacet = useCallback(
    (attribute) => {
      const updatedFacets = facets.map((facet) => ({
        ...facet,
        expanded:
          facet.attribute === attribute ? !facet.expanded : facet.expanded,
      }));
      setFacets(updatedFacets);
    },
    [facets, setFacets]
  );

  const expandFacets = useCallback(() => {
    setFacets((currentFacets) =>
      currentFacets.map((f) => ({ ...f, expanded: true }))
    );
  }, [setFacets]);

  const collapseFacets = useCallback(() => {
    setFacets((currentFacets) =>
      currentFacets.map((f) => ({ ...f, expanded: false }))
    );
  }, [setFacets]);

  return {
    facets,
    facetsExpanded,
    getFacet,
    getFacets,
    toggleFacets,
    toggleFacet,
    expandFacets,
    collapseFacets,
  };
};
