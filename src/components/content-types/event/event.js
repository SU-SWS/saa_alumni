import SbEditable from "storyblok-react";
import React from "react";
import { FlexBox, Heading } from "decanter-react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import SbLink from "../../../utilities/sbLink";
import CardImage from "../../media/cardImage";
import TabLabel from "../../simple/tabLabel";
import DateBlock from "../../simple/dateBlock";

const Event = ({
  blok: {
    image: { filename } = {},
    imageFocus,
    title,
    organizer,
    location,
    start,
    end,
    externalUrl,
  },
  blok,
  isBig,
  isMinimal,
  headingLevel,
}) => {
  // Link to external URL instead if it is provided
  const eventLink = { linktype: "url", url: externalUrl } ?? "";

  // Find current date/time
  const currentUTCDate = new Date();

  // The date/time we get from Storyblok is in UTC
  const startUTCDate = new Date(start);
  const startMonth = startUTCDate.toLocaleString("en-us", {
    month: "short",
    timeZone: "America/Los_Angeles",
  });
  const startDay = startUTCDate.toLocaleString("en-us", {
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
  const endUTCDate = new Date(end);

  // If the current date/time is after the event end date/time, don't render the card
  if (currentUTCDate > endUTCDate) {
    return null;
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        element="article"
        className="event-card su-group su-relative su-bg-white su-text-black su-rs-pb-3 su-break-words su-basefont-23 su-max-w-500 su-border su-border-solid su-border-black-10 su-shadow-sm"
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
        <DateBlock start={start} end={end} />
        <SbLink
          link={eventLink}
          classes="su-stretched-link su-mb-08em su-rs-px-2 su-text-black su-no-underline hocus:su-underline group-hover:su-underline su-underline-custom !su-underline-digital-red-xlight"
        >
          <Heading
            level={headingLevel ?? 3}
            font="serif"
            size={isBig ? 2 : 1}
            tracking="normal"
            className="su-relative su-inline"
          >
            {title}
          </Heading>
          <ArrowRightIcon
            className="su-relative su-transition su-transform-gpu group-hocus:su-translate-x-02em su-inline-block su-ml-03em su--mt-03em su-text-digital-red-xlight su-w-1em group-hocus:su-text-white"
            aria-hidden="true"
          />
        </SbLink>
        {!isMinimal && <TabLabel text="Event" />}
      </FlexBox>
    </SbEditable>
  );
};
export default Event;
