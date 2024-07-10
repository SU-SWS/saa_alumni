import React from 'react';
// eslint-disable-next-line no-unused-vars, import/extensions
import { EventHit } from '../../types';
import { Event } from '../Event';

/**
 * @typedef {object} Props
 * @property {EventHit} hit
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const Hit = ({ hit }) => {
  const {
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
  } = hit;

  // TODO: Sanitize on the way in to Algolia.
  // Sanitize on the way out of Algolia.
  if (start === 'Invalid DateTime' || end === 'Invalid DateTime') {
    return (
      <p className="su-bg-cardinal-red su-text-white su-text-6xl su-rs-p-3">
        Invalid Time Data for &quot;{title}&quot;
      </p>
    );
  }

  return (
    <Event
      title={title}
      image={image}
      start={start}
      end={end}
      city={city}
      location={location}
      region={region}
      eventUrl={eventUrl}
      subject={subject}
      experience={experience}
      format={format}
    />
  );
};
