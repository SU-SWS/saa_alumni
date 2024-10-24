import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useFacets } from '../Facets/useFacets';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';

/**
 * @typedef {object} Props
 * @property {string} attribute
 * @property {string} label
 * @property {() => void} [remove]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const Chip = ({ attribute, label, remove = () => null }) => {
  const { getFacet } = useFacets();
  const facet = getFacet(attribute);

  if (!facet) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={remove}
      className="su-flex su-items-center su-px-12 su-py-6 su-text-xl sm:su-text-2xl su-border-2 su-border-digital-red su-break-words su-text-digital-red hocus:su-text-white hocus:su-bg-cardinal-red-xdark su-rounded-full su-cursor-pointer su-transition-colors"
    >
      <span className="su-inline-block su-text-3xl">
        <SrOnlyText>Remove</SrOnlyText>{' '}
        <span className="su-font-semibold">{facet.chip}:</span> {label}{' '}
        <SrOnlyText>filter</SrOnlyText>
      </span>
      <XIcon className="su-w-20 su-h-20" />
    </button>
  );
};
