import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { facetLabels } from '../constants';

export const Chip = ({ attribute, label, remove }) => (
  <button
    type="button"
    onClick={remove}
    className="su-flex su-items-center su-px-12 su-py-6 su-text-xl sm:su-text-2xl su-border-2 su-border-cardinal-red su-text-cardinal-red hocus:su-text-white hocus:su-bg-cardinal-red-light su-rounded-full su-cursor-pointer"
  >
    <span className="su-inline-block su-text-3xl">
      <span className="su-font-semibold">{facetLabels[attribute].label}:</span>{' '}
      {label}
    </span>
    <XIcon className="su-w-20 su-h-20" />
  </button>
);
