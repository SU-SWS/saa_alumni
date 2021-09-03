import React from "react";
import { FlexBox, Grid as DrGrid, GridCell, Heading } from "decanter-react";
import { DateTime } from "luxon";
import RichTextRenderer from "../../utilities/richTextRenderer";
import DateBlock from "../simple/dateBlock";
import FaIcon from "../simple/faIcon";
import CaptionMedia from "../media/captionMedia";
import CardImage from "../media/cardImage";

const ItineraryItem = ({
  blok: {
    title,
    description,
    startDate,
    endDate,
    icon,
    image: { filename, focus } = {},
    caption,
  },
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
  const isSameDay =
    (startMonth === endMonth && startDay === endDay) || !endDate;

  return (
    <li className="itinerary-item su-group su-mb-0 last:children:children:first:children:last:su-hidden su-basefont-21">
      <DrGrid className="su-grid-flow-col su-grid-cols-auto-1fr su-items-stretch su-w-full su-break-words su-gap-x-xs md:su-gap-x-[5rem] xl:su-gap-x-[9rem]">
        <GridCell aria-hidden="true">
          <FlexBox
            alignItems="center"
            justifyContent="center"
            className="su-relative su-w-[6rem] su-h-[6rem] md:su-w-[10rem] md:su-h-[10rem] xl:su-w-[13rem] xl:su-h-[13rem] su-rounded-full su-border-4 md:su-border-6 xl:su-border-[0.7rem] su-border-solid su-border-digital-red su-bg-white su-z-10"
          >
            <FaIcon
              proFaIcon={icon}
              iconStyle="fas"
              className="su-text-m1 md:su-text-m2 su-text-digital-red"
              rotation={icon === "shoe-prints" ? 270 : 0}
            />
          </FlexBox>
          <div className="su-relative su-block su-mx-auto su-w-[0.4rem] md:su-w-[0.6rem] xl:su-w-[0.7rem] su-h-[100.5%] su-bg-digital-red su-mt-[-6rem] md:su-mt-[-10rem] xl:su-mt-[-13rem] su-z-0" />
        </GridCell>
        <GridCell className="su-rs-pb-8">
          {startDate && (
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
              className="su-rs-mb-0 su-mt-[-0.3em]"
            />
          )}
          <Heading
            level={3}
            font="serif"
            className="su-mb-03em su-text-m3 xl:su-text-m4"
          >
            {title}
          </Heading>
          <RichTextRenderer
            wysiwyg={description}
            className="su-basefont-23 su-rs-mb-2 last:su-mb-0 children:su-leading-snug"
          />
          <CaptionMedia
            mediaWidth="edge-to-edge"
            caption={caption}
            captionAlign="right"
          >
            <CardImage
              filename={filename}
              size="medium_2x1"
              loading="lazy"
              smartFocus={focus}
            />
          </CaptionMedia>
        </GridCell>
      </DrGrid>
    </li>
  );
};

export default ItineraryItem;
