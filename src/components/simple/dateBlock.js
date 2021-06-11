import React from "react";
import { dcnb } from "cnbuilder";
import { SrOnlyText } from "decanter-react";

const DateBlock = ({
  startDay,
  startMonth,
  endDay,
  endMonth,
  isSameDay,
  isMinimal,
  className,
  ...props
}) => {
  // Check if the start and end day is the same
  let dateBlockMinWidth;

  if (isSameDay) {
    dateBlockMinWidth = "su-min-w-[10rem] lg:su-min-w-[11.4rem]";
  }

  let wrapperClasses =
    "su-p-6 su-rounded-full su-bg-gradient-to-tr su-from-cardinal-red su-to-digital-red su-w-fit group-hover:su-from-digital-red group-hover:su-to-digital-red-light";
  let dateClasses =
    "su-justify-center su-w-fit su-h-100 lg:su-h-[11.4rem] su-bg-cardinal-red su-text-white su-rounded-full";

  if (isMinimal) {
    wrapperClasses = "su-bg-transparent";
    dateClasses = "su-justify-start su-text-black su-bg-transparent";
  }

  return (
    <div className={dcnb(wrapperClasses, className)} {...props}>
      <div
        className={dcnb(
          "su-flex su-flex-row su-items-center",
          dateClasses,
          dateBlockMinWidth
        )}
      >
        <time
          dateTime={`${startMonth}-${startDay}`}
          className="su-flex su-flex-col su-px-20"
        >
          <span className="su-mb-8 su-uppercase su-leading-none su-text-20 lg:su-text-22">
            {startMonth}
          </span>
          <span className="su-text-m5 md:su-text-m4 lg:su-text-m5 su-font-bold su-font-serif su-leading-trim">
            {startDay}
          </span>
        </time>
        {!isSameDay && (
          <>
            <span
              className="su-mt-6 su-text-m4 su-font-bold"
              aria-hidden="true"
            >
              &ndash;
            </span>
            <SrOnlyText srText="to" />
            <time
              dateTime={`${endMonth}-${endDay}`}
              className="su-flex su-flex-col su-px-20"
            >
              <span className="su-mb-8 su-uppercase su-leading-none su-text-20 lg:su-text-22">
                {endMonth}
              </span>
              <span className="su-text-m5 md:su-text-m4 lg:su-text-m5 su-font-bold su-font-serif su-leading-trim">
                {endDay}
              </span>
            </time>
          </>
        )}
      </div>
    </div>
  );
};

export default DateBlock;
