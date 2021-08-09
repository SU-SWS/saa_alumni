import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading, SrOnlyText } from "decanter-react";
import {
  CalendarIcon,
  DesktopComputerIcon,
  LocationMarkerIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { DateTime } from "luxon";
import { dcnb } from "cnbuilder";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";
import DateBlock from "../../simple/dateBlock";
import HeroIcon from "../../simple/heroIcon";

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
  tabText,
  hideTab,
}) => {
  // Link to external URL (always external for MVP)
  const eventLink = { linktype: "url", url: externalUrl } ?? "";

  // The date/time string we get from Storyblok is in UTC
  // Convert string to luxon DateTime object and format the pieces for display
  // Start date and time
  const luxonStart = DateTime.fromFormat(start, "yyyy-MM-dd T", { zone: "UTC" })
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const timeZone = luxonStart.toFormat("ZZZZ");
  const longStartDate = luxonStart.toFormat("DDDD");
  const startTime = luxonStart.toFormat("t");
  const startMonth = luxonStart.toFormat("LLL");
  const startDay = luxonStart.toFormat("dd");

  // Valid datetime for HTML Time element
  const startHtmlDate = `${start}Z`;

  // End date and time
  const luxonEnd = DateTime.fromFormat(end, "yyyy-MM-dd T", { zone: "UTC" })
    .setZone("America/Los_Angeles")
    .setLocale("en-us");
  const longEndDate = luxonEnd.toFormat("DDDD");
  const endTime = luxonEnd.toFormat("t");
  const endMonth = luxonEnd.toFormat("LLL");
  const endDay = luxonEnd.toFormat("dd");
  const endHtmlDate = `${end}Z`;

  // Boolean to check if this is a same day event for conditional rendering elements
  const isSameDay = longStartDate === longEndDate;

  // Find current UTC date/time
  const currentUTCDate = new Date();
  const luxonCurrent = DateTime.fromJSDate(currentUTCDate);

  // If the current date/time is after the event end date/time, don't render the card
  if (luxonCurrent > luxonEnd) {
    return null;
  }

  let wrapperClasses =
    "su-rs-pb-3 su-bg-white su-border su-border-solid su-border-black-30-opacity-40 su-bg-clip-padding su-shadow-sm focus-within:su-shadow-md hover:su-shadow-md";
  let headlinePadding = "su-rs-px-2";
  let detailsPadding = "su-rs-px-2";

  if (isMinimal) {
    wrapperClasses = "su-bg-transparent";
    headlinePadding = "su-pt-01em";
    detailsPadding = "";
  }

  let headlineSize = "su-type-1";

  if (isBigHeadline) {
    headlineSize = dcnb("lg:su-type-2 xl:su-type-3", headlineSize);
  }

  const iconClasses =
    "su-inline-block su-flex-shrink-0 su-mt-01em su-mr-06em su-w-[1.1em]";
  let locationIcon = (
    <LocationMarkerIcon className={iconClasses} aria-hidden="true" />
  );

  if (isVirtual) {
    locationIcon = (
      <DesktopComputerIcon className={iconClasses} aria-hidden="true" />
    );
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className={dcnb(
          "event-card su-group su-relative su-overflow-hidden sm:su-max-w-[42rem] md:su-max-w-full su-text-black su-break-words su-basefont-23 su-w-full",
          wrapperClasses
        )}
      >
        {!isMinimal && (
          <div
            className="event-card-image-wrapper su-relative su-aspect-w-3 su-aspect-h-2"
            aria-hidden="true"
          >
            {filename?.startsWith("http") && (
              <figure className="su-overflow-hidden su-w-full su-h-full">
                <CardImage
                  filename={filename}
                  imageFocus={imageFocus}
                  size="vertical"
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
          startHtmlDate={startHtmlDate}
          endMonth={endMonth}
          endDay={endDay}
          endHtmlDate={endHtmlDate}
          isSameDay={isSameDay}
          isMinimal={isMinimal}
          aria-hidden="true"
          className={
            isMinimal
              ? ""
              : "su-mt-[-5.6rem] lg:su-mt-[-6.3rem] su-z-10 su-rs-ml-1"
          }
        />
        <SbLink
          link={eventLink}
          classes={dcnb(
            "su-stretched-link su-group su-z-20 su-rs-mt-0 su-mb-08em su-text-black hocus:su-text-black su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight",
            headlineSize,
            headlinePadding
          )}
        >
          <Heading
            level={parseInt(headingLevel, 10) ?? 3}
            font="serif"
            tracking="normal"
            className="su-relative su-inline su-type-0"
          >
            {title}
          </Heading>
          <HeroIcon
            iconType="external"
            className="su-relative su-inline-block su-text-digital-red-xlight"
            isAnimate
          />
        </SbLink>
        {!isMinimal && !hideTab && <TabLabel text={tabText || "Event"} />}
        <div
          className={dcnb(
            "event-card-details su-card-paragraph",
            detailsPadding
          )}
        >
          <FlexBox direction="row" alignItems="start" className="su-mb-04em">
            <CalendarIcon className={iconClasses} aria-hidden="true" />
            <SrOnlyText srText="Date: " />
            <span>
              {longStartDate}
              {!isSameDay && ` - ${longEndDate}`}
              {isSameDay && ` | ${startTime} - ${endTime} ${timeZone}`}
            </span>
          </FlexBox>
          {location && (
            <FlexBox direction="row" alignItems="start" className="su-mb-04em">
              {locationIcon}
              <SrOnlyText
                srText={isVirtual ? "This event is virtual: " : "Location: "}
              />
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
