import React from 'react';
import {
  FlexBox,
  Grid as DrGrid,
  GridCell,
  Heading,
  SrOnlyText,
} from 'decanter-react';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import RichTextRenderer from '../../utilities/richTextRenderer';
import FaIcon from '../simple/faIcon';
import CaptionMedia from '../media/captionMedia';
import CardImage from '../media/cardImage';
import { Date } from '../simple/Date/Date';

const ItineraryItem = ({
  blok: {
    title,
    description,
    startDate,
    endDate,
    icon,
    location,
    image: { filename, focus } = {},
    caption,
  },
}) => (
  <li className="itinerary-item su-group su-mb-0 last:children:children:first:children:last:su-hidden last:children:children:last:su-pb-0 su-basefont-21">
    <DrGrid className="su-grid-flow-col su-grid-cols-auto-1fr su-items-stretch su-w-full su-break-words su-gap-x-xs md:su-gap-x-[5rem] xl:su-gap-x-[7rem]">
      <GridCell aria-hidden="true">
        <FlexBox
          alignItems="center"
          justifyContent="center"
          className="su-text-m1 md:su-text-m2 su-relative su-w-[6rem] su-h-[6rem] md:su-w-[10rem] md:su-h-[10rem] su-rounded-full su-border-4 md:su-border-6 xl:su-border-[0.7rem] su-border-solid su-border-digital-red su-bg-white su-z-10"
        >
          <FaIcon
            proFaIcon={icon}
            className="su-text-digital-red"
            rotation={icon === 'shoe-prints' ? 270 : 0}
          />
        </FlexBox>
        <div
          className="su-relative su-block su-mx-auto su-w-[0.4rem] md:su-w-[0.6rem] xl:su-w-[0.7rem] su-h-[100.5%] su-bg-digital-red su-mt-[-6rem] md:su-mt-[-10rem] su-z-0"
          aria-hidden
        />
      </GridCell>
      <GridCell className="md:su-pt-02em su-rs-pb-8 su-flex su-flex-col">
        {startDate && (
          <Date
            startDate={startDate}
            endDate={endDate}
            isMinimal
            className="su-rs-mb-1"
          />
        )}
        <Heading level={3} size={3} font="serif" className="su-mb-03em">
          {title}
        </Heading>
        <RichTextRenderer
          wysiwyg={description}
          className="su-basefont-23 last:su-mb-0 children:su-leading-snug"
        />
        {location && (
          <FlexBox direction="row" alignItems="start" className="su-rs-mt-1">
            <LocationMarkerIcon
              className="su-inline-block su-flex-shrink-0 su-mt-2 su-mr-03em su-w-[1em]"
              aria-hidden="true"
            />
            <SrOnlyText srText="Location: " />
            <span className="su-leading-display">{location}</span>
          </FlexBox>
        )}
        {filename && (
          <CaptionMedia
            mediaWidth="edge-to-edge"
            caption={caption}
            captionAlign="right"
            className="su-rs-mt-4"
          >
            <CardImage
              filename={filename}
              size="medium_2x1"
              loading="lazy"
              smartFocus={focus}
              width="814"
              height="407"
            />
          </CaptionMedia>
        )}
      </GridCell>
    </DrGrid>
  </li>
);

export default ItineraryItem;
