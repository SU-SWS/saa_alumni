import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { ArrowUpIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  DesktopComputerIcon,
  LocationMarkerIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { DateTime } from "luxon";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";
import DateBlock from "../../simple/dateBlock";

const Event = ({
  blok: {
    image: { filename } = {},
    imageFocus,
    title,
    start,
    end,
    location,
    isVirtual,
    organizer,
    externalUrl,
  },
  blok,
  isBigHeadline,
  isMinimal,
  headingLevel,
}) => {
  // Link to external URL (always external for MVP)
  const eventLink = { linktype: "url", url: externalUrl } ?? "";

  // Find current UTC date/time
  const currentUTCDate = new Date();

  // The date/time we get from Storyblok is in UTC
  // Need to explicitly add "UTC" at the end of the time string for this to convert properly
  const startJsDateString = start.replace(" ", "T");
  const startUTCDate = new Date(`${startJsDateString}:00Z`);

  // Convert JavaScript Date object to luxon DateTime object and format the pieces for display
  // Start date and time
  const luxonStart = DateTime.fromJSDate(startUTCDate)
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const timeZone = luxonStart.toFormat("ZZZZ");
  const longStartDate = luxonStart.toFormat("DDDD");
  const startTime = luxonStart.toFormat("t");
  const startMonth = luxonStart.toFormat("LLL");
  const startDay = luxonStart.toFormat("dd");

  // End date and time
  const endJsDateString = end.replace(" ", "T");
  const endUTCDate = new Date(`${endJsDateString}:00Z`);
  const luxonEnd = DateTime.fromJSDate(endUTCDate)
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const longEndDate = luxonEnd.toFormat("DDDD");
  const endTime = luxonEnd.toFormat("t");
  const endMonth = luxonEnd.toFormat("LLL");
  const endDay = luxonEnd.toFormat("dd");

  let isSameDay = false;

  if (longStartDate === longEndDate) {
    isSameDay = true;
  }

  // If the current date/time is after the event end date/time, don't render the card
  if (currentUTCDate > endUTCDate) {
    return null;
  }

  const iconClasses =
    "su-inline-block su-flex-shrink-0 su-mt-01em su-mr-06em su-w-[2.4rem] su-h-[2.4rem]";
  let locationIcon = (
    <LocationMarkerIcon className={iconClasses} aria-label="Event location" />
  );

  if (isVirtual) {
    locationIcon = (
      <DesktopComputerIcon
        className={iconClasses}
        aria-label="Event is online"
      />
    );
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className="event-card su-group su-relative su-bg-white su-text-black su-rs-pb-3 su-break-words su-basefont-23 su-max-w-600 su-border su-border-solid su-border-black-10 su-shadow-sm"
      >
        {!isMinimal && (
          <div className="perk-card-image-wrapper su-relative su-aspect-w-3 su-aspect-h-2">
            {filename?.startsWith("http") && (
              <figure className="su-overflow-hidden su-w-full su-h-full">
                <CardImage
                  filename={filename}
                  imageFocus={imageFocus}
                  className="su-w-full su-h-full su-object-cover su-transition-transform su-transform-gpu group-hover:su-scale-[1.03]"
                  loading="lazy"
                />
              </figure>
            )}
          </div>
        )}
        <DateBlock
          startMonth={startMonth}
          startDay={startDay}
          endMonth={endMonth}
          endDay={endDay}
          isSameDay={isSameDay}
          className="su-mt-[-5.7rem] su-z-10 su-rs-ml-1"
        />
        <SbLink
          link={eventLink}
          classes="su-stretched-link su-z-20 su-rs-mt-0 su-mb-08em su-rs-px-2 su-text-black su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight"
        >
          <Heading
            level={headingLevel ?? 3}
            font="serif"
            size={isBigHeadline ? 3 : 1}
            tracking="normal"
            className="su-relative su-inline"
          >
            {title}
          </Heading>
          <ArrowUpIcon
            className="su-relative su-inline-block su-transition su-transform-gpu su-rotate-45 group-hocus:su-rotate-45 su-ml-02em su--mt-01em su-w-[1.1em] group-hocus:su-translate-x-02em group-hocus:su--translate-y-02em su-text-digital-red-xlight group-hocus:su-text-cardinal-red"
            aria-hidden="true"
          />
        </SbLink>
        {!isMinimal && <TabLabel text="Event" />}
        <div className="event-card-details su-rs-px-2 su-card-paragraph">
          <FlexBox direction="row" alignItems="start" className="su-mb-04em">
            <CalendarIcon className={iconClasses} aria-label="Event date" />
            <span>
              {longStartDate}
              {!isSameDay && ` - ${longEndDate}`}
              {isSameDay && ` | ${startTime} - ${endTime} ${timeZone}`}
            </span>
          </FlexBox>
          {location && (
            <FlexBox direction="row" alignItems="start" className="su-mb-04em">
              {locationIcon}
              <span>{location}</span>
            </FlexBox>
          )}
          {organizer && (
            <FlexBox direction="row" alignItems="start" className="su-mb-04em">
              <UserIcon className={iconClasses} aria-hidden="true" />
              <span>Organizer | {organizer}</span>
            </FlexBox>
          )}
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default Event;
