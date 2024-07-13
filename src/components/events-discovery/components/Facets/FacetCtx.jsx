import React, { createContext, useMemo, useState } from 'react';

const knownFacets = [
  { attribute: 'startTimestamp', label: 'Date', defaultExpanded: true },
  { attribute: 'format', label: 'Format' },
  // Subject
  { attribute: 'subject', label: 'Subject' },
  { attribute: 'generalTags', label: 'General' },
  { attribute: 'identityTags', label: 'Diversity/Identity' },
  // Location
  { attribute: 'location', label: 'Location' },
  { attribute: 'experience', label: 'Experience' },
  { attribute: 'usRegion', label: 'United States' },
  { attribute: 'intRegion', label: 'International' },
];

/**
 * @typedef {object} FacetMeta
 * @property {string} attribute
 * @property {string} label
 * @property {boolean} expanded
 */

/**
 * @typedef {object} FacetContext
 * @property {FacetMeta[]} facets
 * @property {React.Dispatch<React.SetStateAction<FacetMeta[]>>} setFacets
 */

/**
 * @type {React.Context<FacetContext>}
 */
export const FacetContext = createContext({
  facets: [],
  setFacets: () => null,
});

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const FacetProvider = ({ children }) => {
  /**
   * @type {ReturnType<typeof useState<FacetMeta[]>}
   */
  const [facets, setFacets] = useState(knownFacets);
  const facetCtx = useMemo(() => ({ facets, setFacets }), [facets, setFacets]);

  return (
    <FacetContext.Provider value={facetCtx}>{children}</FacetContext.Provider>
  );
};
