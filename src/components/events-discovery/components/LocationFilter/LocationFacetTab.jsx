import React from 'react';
import { dcnb } from 'cnbuilder';

/**
 * Location Facet Tab
 *
 * @param {object} props
 * @param {boolean} props.isActive
 * @param {string} props.value
 * @param {React.ReactNode} props.children
 *
 * @returns {JSX.Element} LocationFacetTab
 */
const LocationFacetTab = ({ isActive, value, children, ...props }) => (
  <button
    type="button"
    role="tab"
    aria-selected={isActive}
    aria-controls={`${value}-panel`}
    data-test={`location-${value}-tab`}
    className={dcnb(
      'su-text-16 su-rs-px-neg2 su-rs-py-neg2 su-text-cardinal-red-dark hocus-visible:su-bg-carinal-red-light-05 hocus:su-decoration-cardinal-red-dark su-transition',
      {
        'su-border-b-4 su-border-cardinal-red-light su-font-semibold': isActive,
      },
      { 'su-col-span-3': value !== 'state' },
      { 'su-col-span-6': value === 'state' }
    )}
    {...props}
  >
    {children}
  </button>
);

export default LocationFacetTab;
