import React, { createContext, useMemo, useState } from 'react';

const knownFacets = [
  {
    attribute: 'startTimestamp',
    label: 'Date',
    chip: 'Date',
    expanded: true,
  },
  { attribute: 'format', label: 'Format', chip: 'Format', expanded: false },
  {
    attribute: 'subject',
    label: 'Subject',
    chip: 'Subject',
    expanded: false,
  },
  // Location
  {
    attribute: 'location',
    label: 'Location',
    chip: 'Location',
    expanded: false,
  },
  {
    attribute: 'experience',
    label: 'Experience',
    chip: 'Mode',
    expanded: false,
  },
  {
    attribute: 'usRegion',
    label: 'United States',
    chip: 'US',
    expanded: false,
  },
  {
    attribute: 'intRegion',
    label: 'International',
    chip: 'International',
    expanded: false,
  },
  {
    attribute: 'query',
    label: 'Search',
    chip: 'Search',
    expanded: false,
  },
  {
    attribute: 'city',
    label: 'City',
    chip: 'City',
    expanded: false,
  },
  {
    attribute: 'state',
    label: 'US State / Canadian Province',
    chip: 'State/Province',
    expanded: false,
  },
  {
    attribute: 'country',
    label: 'Country',
    chip: 'Country',
    expanded: false,
  },
];

/**
 * @typedef {object} FacetMeta
 * @property {string} attribute
 * @property {string} label
 * @property {string} chip
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
