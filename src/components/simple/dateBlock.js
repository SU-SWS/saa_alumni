import React from "react";
import { dcnb } from "cnbuilder";

const DateBlock = ({ start, end, className, ...props }) => {
  const startUTCDate = new Date(start);
  const startMonth = startUTCDate.toLocaleString("en-us", { month: "short" });
  const startDay = startUTCDate.toLocaleString("en-us", { day: "numeric" });
  const endUTCDate = new Date(end);
  const endMonth = endUTCDate.toLocaleString("en-us", { month: "short" });
  const endDay = endUTCDate.toLocaleString("en-us", { day: "numeric" });

  return (
    <div
      className={dcnb(
        "su-flex su-flex-row su-items-center su-justify-center su-w-fit su-min-w-[11.4rem] su-min-h-[11.4rem] su-bg-cardinal-red su-text-white su-rounded-full",
        className
      )}
      {...props}
    >
      <time
        dateTime={start}
        className="su-flex su-flex-col"
      >
        <span className="su-uppercase">{startMonth}</span>
        <span className="su-text-[6.4rem] su-font-bold su-font-serif">
          {startDay}
        </span>
      </time>
      {endMonth !== startMonth && endDay !== startDay && (
        <>
          <span className="su-text-m4">&ndash;</span>
          <time dateTime={`${endMonth}-${endDay}`} className="su-flex su-flex-col">
            <span className="su-uppercase">{endMonth}</span>
            <span className="su-text-[6.4rem] su-font-bold su-font-serif">
              {endDay}
            </span>
          </time>
        </>
      )}
    </div>
  );
};

export default DateBlock;
