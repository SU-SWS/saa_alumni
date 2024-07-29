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
    eventTimezone,
    city,
    location,
    usRegion,
    intRegion,
    eventUrl,
    subject,
    experience,
    format,
  } = hit;

  return (
    <Event
      title={title}
      image={image}
      start={start}
      end={end}
      eventTimezone={eventTimezone}
      city={city}
      location={location}
      usRegion={usRegion}
      intRegion={intRegion}
      eventUrl={eventUrl}
      subject={subject}
      experience={experience}
      format={format}
      hit={hit}
    />
  );
};
