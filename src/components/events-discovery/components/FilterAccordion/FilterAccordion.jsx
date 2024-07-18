import React, { useId } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { dcnb } from 'cnbuilder';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {boolean} showReset
 * @property {string} label
 * @property {React.ReactNode} [resetLabel]
 * @property {() => void} [onToggleExpanded]
 * @property {() => void} [onReset]
 * @property {React.ReactNode} children
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const FilterAccordion = ({
  expanded,
  showReset,
  label,
  resetLabel = (
    <>
      Reset <SrOnlyText>{label}</SrOnlyText> filter
    </>
  ),
  onToggleExpanded = () => null,
  onReset = () => null,
  children,
}) => {
  const uniqueId = useId();

  return (
    <div
      className={dcnb(
        'su-grid grid-flow-col su-pt-8 su-border-t-2 su-border-black su-transition-all',
        {
          'su-grid-rows-[min-content_1fr]': expanded,
          'su-grid-rows-[min-content_0fr]': !expanded,
        }
      )}
    >
      <div className="su-relative">
        <h3 className="su-group su-text-4xl su-font-semibold su-mb-0">
          <button
            type="button"
            className="su-flex su-flex-row su-justify-between su-items-center group-hover:su-text-cardinal-red group-hover:su-underline group-focus-visible:su-text-cardinal-red group-focus-visible:su-underline su-w-full"
            onClick={onToggleExpanded}
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
        </h3>
        {showReset && (
          <button
            type="button"
            className="su-absolute su-right-40 su-top-9 disabled:su-hidden su-text-2xl su-text-cardinal-red-light hocus:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black"
            onClick={onReset}
          >
            {resetLabel}
          </button>
        )}
      </div>
      <div
        id={uniqueId}
        aria-hidden={!expanded}
        className={dcnb('su-block su-overflow-hidden', {
          'su-invisible': !expanded,
        })}
      >
        {children}
      </div>
    </div>
  );
};
