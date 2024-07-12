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
    usRegion,
    intRegion,
    eventUrl,
    generalTags,
    identityTags,
    experience,
    format,
  } = hit;

  return (
    <Event
      title={title}
      image={image}
      start={start}
      end={end}
      city={city}
      location={location}
      usRegion={usRegion}
      intRegion={intRegion}
      eventUrl={eventUrl}
      generalTags={generalTags}
      identityTags={identityTags}
      experience={experience}
      format={format}
    />
  );
};
