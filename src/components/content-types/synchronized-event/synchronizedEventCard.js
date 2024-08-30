import React, { useMemo } from 'react';
import CardImage from '../../media/cardImage';
import { luxonDate } from '../../../utilities/dates';
import { EventContent } from '../../events-discovery/components/Event/EventContent';
import { EventHeading } from '../../events-discovery/components/Event/EventHeading';

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
export const SynchronizedEventCard = ({
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
}) => {
  const luxonStart = useMemo(() => luxonDate(start), [start]);
  const ptStart = useMemo(
    () => luxonStart.setZone('America/Los_Angeles'),
    [luxonStart]
  );
  const { monthLong, day } = ptStart;
  const monthDisplay = useMemo(() => monthLong?.toString(), [monthLong]);
  const dayDisplay = useMemo(() => day?.toString().padStart(2, '0'), [day]);

  const luxonEnd = useMemo(() => luxonDate(end), [end]);

  const { filename, alt, focus } = image;

  return (
    <div className="su-group su-flex su-flex-col story-card su-group su-relative su-overflow-hidden su-break-words su-basefont-23 su-w-full sm:su-max-w-[42rem] md:su-max-w-full su-border su-bg-clip-padding su-shadow-sm focus-within:su-shadow-md hover:su-shadow-md su-backface-hidden su-border-black-30/40 su-text-black">
      {filename?.startsWith('http') && (
        <figure className="su-block su-transition-all">
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
      <div className="su-flex su-flex-col su-flex-1 su-bg-white su-rs-pt-2 su-rs-px-2 su-rs-pb-3">
        <div className="su-flex su-flex-col su-rs-mb-neg2">
          <div className="su-mb-8 su-ml-2 su-text-20 lg:su-text-22">
            <div className="su-flex su-justify-between">
              <span className="su-uppercase">
                {monthDisplay} {dayDisplay}
              </span>
              <span className="su-text-black-80 su-text-3xl">{experience}</span>
            </div>
          </div>
        </div>
        <EventHeading title={title || 'Untitled'} eventUrl={eventUrl} />
        <EventContent
          start={luxonStart}
          end={luxonEnd}
          eventTimezone={eventTimezone}
          location={location}
          city={city}
          region={region}
        />
      </div>
    </div>
  );
};
