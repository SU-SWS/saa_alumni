import React from "react";
import SbEditable from "storyblok-react";
import { FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import { DateTime } from "luxon";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CreateBloks from "../../utilities/createBloks";
import DateBlock from "../simple/dateBlock";

const ItineraryItem = ({
  blok: { title, description, startDate, endDate, icon, image },
  blok,
}) => {
  // The date/time string we get from Storyblok is in UTC
  // Convert string to luxon DateTime object and format the pieces for display
  // Start date and time
  const luxonStart = DateTime.fromFormat(startDate, "yyyy-MM-dd T", {
    zone: "UTC",
  })
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const startMonth = luxonStart.toFormat("LLL");
  const startDay = luxonStart.toFormat("dd");

  // Valid datetime for HTML Time element
  const startHtmlDate = `${startDate}Z`;

  // End date and time
  const luxonEnd = DateTime.fromFormat(endDate, "yyyy-MM-dd T", { zone: "UTC" })
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const endMonth = luxonEnd.toFormat("LLL");
  const endDay = luxonEnd.toFormat("dd");
  const endHtmlDate = `${endDate}Z`;

  // Boolean to check if this is a same day event for dateblock display
  const isSameDay = startMonth === endMonth && startDay === endDay;

  return (
    <li className="itinerary-item su-rs-mb-6 last:su-mb-0">
      <DateBlock
        startMonth={startMonth}
        startDay={startDay}
        startHtmlDate={startHtmlDate}
        endMonth={endMonth}
        endDay={endDay}
        endHtmlDate={endHtmlDate}
        isSameDay={isSameDay}
        isMinimal
        isSmallText
        className="su-rs-mb-1"
      />
      <Heading level={3} font="serif" className="su-mb-02em">
        {title}
      </Heading>
      <RichTextRenderer wysiwyg={description} className="su-rs-mb-2" />
      <CreateBloks blokSection={image} />
    </li>
  );
};

export default ItineraryItem;
