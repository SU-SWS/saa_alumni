import React, { useMemo } from 'react';
import { dcnb } from 'cnbuilder';
import { DateTime } from 'luxon';
import { type EventImage, type EventLink } from '../../types';
import { luxonDate } from './../../../../utilities/dates';
import CardImage from '../../../media/cardImage';
import { EventHeading } from './EventHeading';
import { EventContent } from './EventContent';

export type EventProps = { 
  title: string;
  image: EventImage,
  start: string;
  end: string;
  city?: string;
  location?: string;
  region?: string;
  eventUrl?: EventLink;
  subject?: string[];
  experience?: string[];
  format?: string;
  isDark?: boolean;
  isMinimal?: boolean;
  isBigHeadline?: boolean;
  headingLevel?: number;
 };

export const Event = ({ 
  title,
  image,
  start,
  end,
  city,
  location,
  region,
  eventUrl,
  subject,
  experience,
  format,
  isDark = false,
  isMinimal = false,
  isBigHeadline = false,
  headingLevel = 3,
}: EventProps) => {
  let wrapperClasses =
    'su-rs-py-3 su-bg-white su-border-b su-bg-clip-padding su-backface-hidden';

  // This border works well for our light background colors
  let borderColor = 'su-border-black-30/40';
  let headlinePadding = 'su-rs-px-2';
  let detailsPadding = 'su-rs-px-2';
  let headlineColor = 'su-text-black hocus:su-text-black';
  let headlineIconStyles = 'su-relative su-inline-block';
  let headlineIconColor = 'su-text-digital-red-xlight';
  let textColor = 'su-text-black';

  if (isDark) {
    borderColor = 'su-border-black-90';
  }

  if (isMinimal) {
    wrapperClasses = 'su-bg-transparent';
    headlinePadding = 'su-pt-01em';
    detailsPadding = '';

    // Use different text color if card has minimal style and is placed in a dark region
    if (isDark) {
      textColor = 'su-text-black-20';
      headlineColor = 'su-text-white hocus:su-text-white';
      headlineIconColor = 'su-text-digital-red-light group-hocus:su-text-white';
    }
  }

  headlineIconStyles = dcnb(headlineIconStyles, headlineIconColor);

  const luxonStart = useMemo(() => luxonDate(start), [start]);
  const ptStart = useMemo(() => luxonStart.setZone('America/Los_Angeles'), [start]);
  const { monthShort, day } = ptStart;
  const monthDisplay = useMemo(() => monthShort.toString(), [monthShort]);
  const dayDisplay = useMemo(() => day.toString().padStart(2, '0'), [day]);

  const luxonEnd = useMemo(() => luxonDate(end), [end]);

  // Find current UTC date/time
  const currentUTCDate = new Date();
  const luxonCurrent = DateTime.fromJSDate(currentUTCDate);

  // If the current date/time is after the event end date/time, don't render the card
  if (luxonCurrent > luxonEnd) {
    return null;
  }

  const experienceDisplay = experience?.length ? experience.join(', ') : '';
  const { filename, alt, focus } = image;

  return (
    <article className="su-flex su-flex-col sm:su-flex-row su-items-center sm:su-items-start su-flex-wrap">
      <div className="su-flex su-basis-150 su-flex-none">
        <div className="su-flex su-flex-col su-items-center">
          <div>
            <div className="su-mb-8 su-ml-2 su-uppercase su-leading-none su-text-20 lg:su-text-22">{ monthDisplay }</div>
            <div className="su-font-bold su-font-serif su-leading-trim su-break-keep su-text-m5 md:su-text-m4 lg:su-text-m5">{ dayDisplay }</div>
          </div>
          {experienceDisplay && (
            <div className="su-text-black-80 su-text-14 su-mt-16">{ experienceDisplay }</div>
          )}
        </div>
      </div>
      <div className="su-flex su-flex-1 su-justify-between su-flex-wrap su-gap-16 su-min-w-full sm:su-min-w-0">
        <div className="su-flex su-flex-col su-flex-1 su-basis-300">
          {format && (
            <div className="su-font-bold">
              {format}
            </div>
          )}
          <EventHeading 
            title={title}
            eventUrl={eventUrl}
          />
          <EventContent 
            start={luxonStart}
            end={luxonEnd}
            location={location}
            city={city}
            region={region}
            subject={subject}
          />
        </div>
        {filename?.startsWith('http') && (
          <figure className="su-block su-shrink-0 su-max-w-200 2xl:su-max-w-300 su-transition-all">
            <CardImage
              filename={filename}
              alt={alt}
              smartFocus={focus}
              size="vertical"
              className="su-w-full su-origin-top-right su-transition-transform hocus:su-scale-[1.03]"
              loading="lazy"
              width="300"
              height="200"
            />
          </figure>
        )}
      </div>
    </article>
  );
};
