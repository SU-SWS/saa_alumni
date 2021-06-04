import React from "react";
import { dcnb } from "cnbuilder";

const DateBlock = ({ start, end, className, ...props }) => {
  const startUTCDate = new Date(start);
  const startMonth = startUTCDate.toLocaleString("en-us", { month: "short" });
  const startDay = startUTCDate.toLocaleString("en-us", { day: "2-digit" });
  const endUTCDate = new Date(end);
  const endMonth = endUTCDate.toLocaleString("en-us", { month: "short" });
  const endDay = endUTCDate.toLocaleString("en-us", { day: "2-digit" });

  // Check if the start and end day is the same
  let isSameStartEndDay;
  let dateBlockMinWidth;

  if (startMonth === endMonth && startDay === endDay) {
    isSameStartEndDay = true;
    dateBlockMinWidth = "su-min-w-[11.4rem]";
  }

  return (
    <div
      className={dcnb(
        "su-flex su-flex-row su-items-center su-justify-center su-w-fit su-h-[11.4rem] su-bg-cardinal-red su-text-white su-rounded-full",
        dateBlockMinWidth,
        className
      )}
      {...props}
    >
      <time dateTime={start} className="su-flex su-flex-col su-px-20">
        <span className="su-uppercase su-leading-none">{startMonth}</span>
        <span className="su-text-[6.4rem] su-font-bold su-font-serif su-leading-none">
          {startDay}
        </span>
      </time>
      {!isSameStartEndDay && (
        <>
          <span className="su-text-m4">&ndash;</span>
          <time
            dateTime={`${endMonth}-${endDay}`}
            className="su-flex su-flex-col su-px-20"
          >
            <span className="su-uppercase su-leading-none">{endMonth}</span>
            <span className="su-text-[6.4rem] su-font-bold su-font-serif su-leading-none">
              {endDay}
            </span>
          </time>
        </>
      )}
    </div>
  );
};

export default DateBlock;
