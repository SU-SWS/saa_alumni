import React, { useId } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { dcnb } from 'cnbuilder';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';
import { Heading } from '../../../simple/Heading';

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {boolean} showReset
 * @property {string} label
 * @property {string} [labelId]
 * @property {number} [headingLevel]
 * @property {boolean} [subfilter]
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
  labelId,
  headingLevel = 3,
  subfilter = false,
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

  const rootClasses = dcnb('su-grid grid-flow-col su-transition-all', {
    'su-pt-8 su-border-t-2 su-border-black': !subfilter,
    'su-pl-8 su-pb-16 su-mt-16 su-border-b su-border-black-20 last:su-border-none':
      subfilter,
    'su-grid-rows-[min-content_1fr]': expanded,
    'su-grid-rows-[min-content_0fr]': !expanded,
  });

  const headingClasses = dcnb('su-group su-font-semibold su-mb-0', {
    'su-text-4xl': !subfilter,
    'su-text-3xl': subfilter,
  });

  const toggleButtonClasses = dcnb(
    'su-flex su-flex-row su-justify-between su-items-center group-hover:su-text-cardinal-red group-hover:su-underline group-focus-visible:su-text-cardinal-red group-focus-visible:su-underline su-w-full'
  );

  const resetButtonClasses = dcnb(
    'su-absolute su-right-40 su-top-9 disabled:su-hidden su-text-2xl su-text-cardinal-red-light hocus:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black'
  );

  const chevronClasses = dcnb(
    'su-transition-transform su-text-cardinal-red-light',
    {
      'su-w-40 su-h-40': !subfilter,
      'su-w-30 su-h-30': subfilter,
      'su-rotate-90': expanded,
    }
  );

  const childWrapperClasses = dcnb('su-block su-overflow-hidden', {
    'su-invisible': !expanded,
  });

  return (
    <div className={rootClasses}>
      <div className="su-relative">
        <Heading level={headingLevel} id={labelId} className={headingClasses}>
          <button
            type="button"
            className={toggleButtonClasses}
            onClick={onToggleExpanded}
            aria-expanded={expanded}
            aria-controls={uniqueId}
          >
            <span>{label}</span>
            <ChevronRightIcon className={chevronClasses} />
          </button>
        </Heading>
        {showReset && (
          <button
            type="button"
            className={resetButtonClasses}
            onClick={onReset}
          >
            {resetLabel}
          </button>
        )}
      </div>
      <div
        id={uniqueId}
        aria-hidden={!expanded}
        className={childWrapperClasses}
      >
        {children}
      </div>
    </div>
  );
};
