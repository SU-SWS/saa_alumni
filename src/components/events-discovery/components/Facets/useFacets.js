import { useState } from 'react';
import { facetLabels } from '../constants';

export const useFacets = () => {
  const [facets, setFacets] = useState([
    {
      attribute: 'format',
      label: facetLabels.format.label,
      expanded: false,
    },
    {
      attribute: 'experience',
      label: facetLabels.experience.label,
      expanded: false,
    },
    {
      attribute: 'subject',
      label: facetLabels.subject.label,
      expanded: false,
    },
  ]);

  const facetsExpanded = facets.every((facet) => facet.expanded);

  const toggleFacets = () => {
    const updatedFacets = facets.map((facet) => ({
      ...facet,
      expanded: !facetsExpanded,
    }));
    setFacets(updatedFacets);
  };

  const toggleFacet = (index) => {
    const updatedFacets = facets.map((facet, i) => ({
      ...facet,
      expanded: i === index ? !facet.expanded : facet.expanded,
    }));
    setFacets(updatedFacets);
  };

  const expandFacets = () => {
    setFacets((currentFacets) =>
      currentFacets.map((f) => ({ ...f, expanded: true }))
    );
  };

  const collapseFacets = () => {
    setFacets((currentFacets) =>
      currentFacets.map((f) => ({ ...f, expanded: false }))
    );
  };

  return {
    facets,
    facetsExpanded,
    toggleFacets,
    toggleFacet,
    expandFacets,
    collapseFacets,
  };
};
