import React from "react";
import { dcnb } from "cnbuilder";
import { SrOnlyText } from "decanter-react";

const DateBlock = ({
  startDay,
  startMonth,
  endDay,
  endMonth,
  isSameDay,
  className,
  ...props
}) => {
  // Check if the start and end day is the same
  let dateBlockMinWidth;

  if (isSameDay) {
    dateBlockMinWidth = "su-min-w-[11.4rem]";
  }

  return (
    <div
      className={dcnb(
        "su-p-6 su-rounded-full su-bg-gradient-to-tr su-from-cardinal-red su-to-digital-red su-w-fit group-hover:su-from-digital-red group-hover:su-to-digital-red-light",
        className
      )}
      {...props}
    >
      <div
        className={dcnb(
          "su-flex su-flex-row su-items-center su-justify-center su-w-fit su-h-[11.4rem] su-bg-cardinal-red su-text-white su-rounded-full",
          dateBlockMinWidth
        )}
      >
        <time
          dateTime={`${startMonth}-${startDay}`}
          className="su-flex su-flex-col su-px-20"
        >
          <span className="su-mb-8 su-uppercase su-leading-trim su-text-20 md:su-text-22">
            {startMonth}
          </span>
          <span className="su-text-[6.4rem] su-font-bold su-font-serif su-leading-trim">
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
              <span className="su-mb-8 su-uppercase su-leading-trim su-text-20 md:su-text-22">
                {endMonth}
              </span>
              <span className="su-text-[6.4rem] su-font-bold su-font-serif su-leading-trim">
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
