import React, { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars, import/extensions
import { EventImage, EventLink, EventHit } from '../../types';
import { luxonDate } from '../../../../utilities/dates';
import CardImage from '../../../media/cardImage';
import { EventHeading } from './EventHeading';
import { EventContent } from './EventContent';

/**
 * @typedef {object} Props
 * @property {string} title
 * @property {EventImage} [image]
 * @property {string} start
 * @property {string} end
 * @property {string} [eventTimezone]
 * @property {string} [city]
 * @property {string} [location]
 * @property {string} [region]
 * @property {string} [usRegion]
 * @property {string} [intRegion]
 * @property {EventLink} [eventUrl]
 * @property {string[]} [subject]
 * @property {string} [experience]
 * @property {string[]} [format]
 * @property {boolean} [isDark]
 * @property {boolean} [isMinimal]
 * @property {boolean} [isBigHeadline]
 * @property {number} [headingLevel]
 * @property {EventHit} [hit]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const Event = ({
  title,
  image = {},
  start,
  end,
  eventTimezone,
  city,
  location,
  usRegion,
  intRegion,
  region = usRegion || intRegion || '',
  eventUrl,
  subject = [],
  experience,
  format = [],
  hit,
}) => {
  const formatDisplay = format?.join?.(', ') ?? '';

  const luxonStart = useMemo(() => luxonDate(start), [start]);
  const ptStart = useMemo(
    () => luxonStart.setZone('America/Los_Angeles'),
    [luxonStart]
  );
  const { monthShort, day } = ptStart;
  const monthDisplay = useMemo(() => monthShort?.toString(), [monthShort]);
  const dayDisplay = useMemo(() => day?.toString().padStart(2, '0'), [day]);

  const luxonEnd = useMemo(() => luxonDate(end), [end]);

  const { filename, alt, focus } = image;

  return (
    <article className="su-flex su-flex-col sm:su-flex-row su-items-start su-flex-wrap">
      <div className="su-flex su-basis-130 sm:su-basis-150 su-flex-none">
        <div className="su-flex su-flex-col su-items-center">
          <div>
            <div className="su-mb-8 su-ml-2 su-uppercase su-text-20 lg:su-text-22">
              {monthDisplay}
            </div>
            <div className="su-font-bold su-font-serif su-leading-trim su-break-keep su-text-m5 md:su-text-m4 lg:su-text-m5">
              {dayDisplay}
            </div>
          </div>
          {experience && (
            <div className="su-text-black-80 su-text-14 su-mt-16">
              {experience}
            </div>
          )}
        </div>
      </div>
      <div className="su-flex su-flex-1 su-justify-between su-flex-wrap su-gap-16 su-min-w-full sm:su-min-w-0">
        <div className="su-flex su-flex-col su-flex-1 su-basis-300">
          {formatDisplay && (
            <div className="su-font-bold su-text-18">{formatDisplay}</div>
          )}
          <EventHeading
            title={title || 'Untitled'}
            eventUrl={eventUrl}
            hit={hit}
          />
          <EventContent
            start={luxonStart}
            end={luxonEnd}
            eventTimezone={eventTimezone}
            location={location}
            city={city}
            region={region}
            subject={subject}
          />
        </div>
        {filename?.startsWith('http') && (
          <figure className="su-block su-shrink-0 su-max-w-300 sm:su-max-w-200 2xl:su-max-w-300 su-transition-all">
            <CardImage
              filename={filename}
              alt={alt}
              smartFocus={focus}
              size="vertical"
              className="su-w-full su-h-auto su-origin-top-right su-transition-transform hocus:su-scale-[1.03]"
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
