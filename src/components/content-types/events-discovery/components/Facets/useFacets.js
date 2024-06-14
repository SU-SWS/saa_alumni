import { useState } from 'react';
import { facetLabels } from '../constants';

export const useFacets = () => {
  const [facets, setFacets] = useState([
    {
      attribute: 'format',
      label: facetLabels.format.label,
      expanded: true,
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

  return {
    facets,
    facetsExpanded,
    toggleFacets,
    toggleFacet,
  };
};
