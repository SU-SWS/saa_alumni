import React from "react";
import { dcnb } from "cnbuilder";

const DateBlock = ({ startMonth, startDay, endMonth, endDay, className, ...props }) => (
  <div
    className={dcnb(
      "su-block su-bg-cardinal-red su-text-white su-rounded-full",
      className
    )}
    {...props}
  >
    <time dateTime={`${startMonth}-${startDay}`}>
      {startDay}
      {startMonth}
    </time>
    {endMonth &&
      <>
        &ndash;
        <time dateTime={`${endMonth}-${endDay}`}>
          {endDay}
          {endMonth}
        </time>
      </>
    }
  </div>
);

export default DateBlock;
