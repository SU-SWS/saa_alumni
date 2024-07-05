import { useCallback, useMemo, useState } from 'react';
import { facetLabels } from '../constants';

export const useFacets = () => {
  const [facets, setFacets] = useState([
    {
      attribute: 'startTimestamp',
      label: 'Date',
      expanded: true,
      show: false,
    },
    {
      attribute: 'format',
      label: facetLabels.format.label,
      expanded: false,
      show: true,
    },
    {
      attribute: 'experience',
      label: facetLabels.experience.label,
      expanded: false,
      show: true,
    },
    {
      attribute: 'subject',
      label: facetLabels.subject.label,
      expanded: false,
      show: true,
    },
  ]);

  const shownFacets = useMemo(
    () => facets.filter((facet) => facet.show),
    [facets]
  );

  const facetsExpanded = useMemo(
    () => facets.every((facet) => facet.expanded),
    [facets]
  );

  const toggleFacets = useCallback(() => {
    const updatedFacets = facets.map((facet) => ({
      ...facet,
      expanded: !facetsExpanded,
    }));
    setFacets(updatedFacets);
  }, [facets, facetsExpanded, setFacets]);

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
    shownFacets,
    facetsExpanded,
    toggleFacets,
    toggleFacet,
    expandFacets,
    collapseFacets,
  };
};
