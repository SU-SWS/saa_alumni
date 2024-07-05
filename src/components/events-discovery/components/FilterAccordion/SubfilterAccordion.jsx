import React, { useId } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { dcnb } from 'cnbuilder';

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {boolean} showReset
 * @property {string} label
 * @property {string} [resetLabel]
 * @property {() => void} [onToggle]
 * @property {() => void} [onReset]
 * @property {React.ReactNode} children
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const SubfilterAccordion = ({ expanded, label, onToggle, children }) => {
  const uniqueId = useId();

  return (
    <div>
      <h4 className="su-group su-text-4xl su-font-semibold su-mb-0">
        <button
          type="button"
          className="su-flex su-flex-row su-justify-between su-items-center group-hover:su-text-cardinal-red group-hover:su-underline group-focus-visible:su-text-cardinal-red group-focus-visible:su-underline su-w-full su-font-semibold"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={uniqueId}
        >
          <span>{label}</span>
          <ChevronRightIcon
            className={dcnb(
              'su-w-40 su-h-40 su-transition-transform su-text-cardinal-red-light',
              {
                'su-rotate-90': expanded,
              }
            )}
          />
        </button>
      </h4>
      <div>{children}</div>
    </div>
  );
};
