import React from 'react';
import SbEditable from 'storyblok-react';
import TripCard from '../cards/TripCard/TripCard';

// TODO: Type props
export const SBTripCard = ({ blok }) => {
  const { trip = {}, headingLevel } = blok;

  if (!trip.content) {
    // eslint-disable-next-line no-underscore-dangle, no-console
    console.warn(`Missing trip entity content for trip ${blok._uid}`);
    return null;
  }

  return (
    <SbEditable content={blok}>
      <TripCard trip={trip} headingLevel={parseInt(headingLevel, 10)} />
    </SbEditable>
  );
};
