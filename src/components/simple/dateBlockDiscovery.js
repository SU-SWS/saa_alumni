import React from 'react';
import { dcnb } from 'cnbuilder';

const DateBlock = ({
  startDay,
  startMonth,
  startHtmlDate,
  endDay,
  endMonth,
  endHtmlDate,
  isSameDay,
  isMinimal,
  className,
  isDark,
  isSmallText,
  ...props
}) => {
  // Check if the start and end day is the same
  let dateBlockMinWidth;
  let startDatePadding = 'su-pl-20 su-pr-12 su-pb-10';

  if (isSameDay) {
    dateBlockMinWidth = 'su-min-w-[10rem] lg:su-min-w-[11.4rem]';
    startDatePadding = '';
  }

  let wrapperClasses = 'su-p-6 su-w-fit';
  let dateClasses = 'su-justify-center su-w-fit';

  let textColor = '';

  if (isMinimal) {
    wrapperClasses = 'su-bg-transparent';
    dateClasses = 'su-justify-start su-bg-transparent';
    startDatePadding = 'su-pl-0 su-pr-12';
  }

  // Change text color to black if card is minimal and if only if it's not dark themed
  if (!isDark && isMinimal) {
    textColor = 'su-text-black';
  }

  let monthFontSize = 'su-text-m5 md:su-text-m4 lg:su-text-m5';

  if (isSmallText) {
    monthFontSize = 'su-text-m4';
  }

  return (
    <div className={dcnb(wrapperClasses, className)} {...props}>
      <div
        className={dcnb(
          'su-flex su-items-center',
          dateClasses,
          dateBlockMinWidth,
          textColor
        )}
      >
        <time
          dateTime={startHtmlDate}
          className={dcnb('su-flex su-flex-col', startDatePadding)}
        >
          <span className="su-mb-8 su-ml-2 su-uppercase su-leading-none su-text-20 lg:su-text-22">
            {startMonth}
          </span>
          <span
            className={dcnb(
              'su-font-bold su-font-serif su-leading-trim su-break-keep',
              monthFontSize
            )}
          >
            {startDay}
          </span>
        </time>
      </div>
    </div>
  );
};

export default DateBlock;
