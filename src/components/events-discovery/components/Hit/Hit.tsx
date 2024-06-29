import React from 'react';
import { type EventHit } from '../../types'; 
import { Event } from '../Event';

export const Hit = ({ hit }: { hit: EventHit }) => {
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
