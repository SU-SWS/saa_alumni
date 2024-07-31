import React, { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { ClassValue, dcnb } from 'cnbuilder';
// eslint-disable-next-line no-unused-vars
import { DateTime } from 'luxon';

/**
 * @typedef {object} Props
 * @property {DateTime} start
 * @property {ClassValue} [className]
 * @property {boolean} [isDark]
 * @property {boolean} [isMinimal]
 * @property {...React.ComponentProps<'div'>} [...]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const DateBlock = ({
  start,
  className = '',
  isDark = false,
  isMinimal = false,
  ...rest
}) => {
  const wrapperClasses = dcnb('su-p-6 su-w-fit', {
    'su-bg-transparent': isMinimal,
  });
  const dateClasses = dcnb(
    'su-justify-center su-w-fit su-h-100 lg:su-h-[11.4rem]',
    {
      'su-justify-start su-bg-transparent': isMinimal,
    }
  );

  const textColor = dcnb('su-text-black', { 'su-text-white': isDark });

  const dateBoxPadding = dcnb('su-pl-20 su-pr-12 su-pb-10', {
    'su-pl-0 su-pr-12': isMinimal,
  });

  const ptStart = useMemo(() => start.setZone('America/Los_Angeles'), [start]);
  const { monthShort, day } = ptStart;
  const iso = useMemo(() => ptStart.toISO(), [ptStart]);
  const monthDisplay = useMemo(() => monthShort.toString(), [monthShort]);
  const dayDisplay = useMemo(() => day.toString().padStart(2, '0'), [day]);

  return (
    <div className={dcnb(wrapperClasses, className)} {...rest}>
      <div
        className={dcnb(
          'su-flex su-items-center su-min-w-[10rem] lg:su-min-w-[11.4rem]',
          dateClasses,
          textColor
        )}
      >
        <time
          dateTime={iso}
          className={dcnb('su-flex su-flex-col', dateBoxPadding)}
        >
          <span className="su-mb-8 su-ml-2 su-uppercase su-leading-none su-text-20 lg:su-text-22">
            {monthDisplay}
          </span>
          <span className="su-font-bold su-font-serif su-leading-trim su-break-keep su-text-m5 md:su-text-m4 lg:su-text-m5">
            {dayDisplay}
          </span>
        </time>
      </div>
    </div>
  );
};
