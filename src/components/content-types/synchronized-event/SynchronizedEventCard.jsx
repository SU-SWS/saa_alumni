import React, { useMemo } from 'react';
import { luxonDate } from '../../../utilities/dates';
import { EventContent } from '../../events-discovery/components/Event/EventContent';
import { EventHeading } from '../../events-discovery/components/Event/EventHeading';

/**
 * @typedef {object} Props
 * @property {string} title
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
 * @property {number} [headingLevel]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const SynchronizedEventCard = ({
  title,
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
  headingLevel = 3,
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

  return (
    <div className="su-group su-flex su-flex-col story-card su-group su-relative su-overflow-hidden su-break-words su-basefont-23 su-w-full sm:su-max-w-[42rem] md:su-max-w-full su-border su-bg-clip-padding su-shadow-sm focus-within:su-shadow-md hover:su-shadow-md su-backface-hidden su-border-black-30/40 su-text-black">
      <div className="su-flex su-flex-col su-flex-1 su-bg-white su-rs-pt-2 su-rs-px-2 su-rs-pb-3">
        <div className="su-flex su-flex-col su-rs-mb-neg2">
          <div className="su-mb-8 su-ml-2 su-text-20 lg:su-text-22">
            <div className="su-flex su-justify-between">
              <div>
                <div className="su-mb-8 su-ml-2 su-uppercase su-text-20 lg:su-text-22">
                  {monthDisplay}
                </div>
                <div className="su-font-bold su-font-serif su-leading-trim su-break-keep su-text-m5 md:su-text-m4 lg:su-text-m5">
                  {dayDisplay}
                </div>
              </div>
              <span className="su-text-black-80 su-text-3xl">{experience}</span>
            </div>
          </div>
        </div>
        {formatDisplay && (
          <div className="su-font-bold su-text-18">{formatDisplay}</div>
        )}
        <EventHeading
          title={title || 'Untitled'}
          eventUrl={eventUrl}
          headingLevel={headingLevel}
          stretchLink
        />
        <EventContent
          start={luxonStart}
          end={luxonEnd}
          eventTimezone={eventTimezone}
          location={location}
          city={city}
          region={region}
          subject={subject}
          subjectHeadingLevel={headingLevel + 1}
          localTimezoneOnly
        />
      </div>
    </div>
  );
};
