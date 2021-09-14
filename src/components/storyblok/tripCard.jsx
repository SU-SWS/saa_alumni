import React from "react";
import SbEditable from "storyblok-react";
import TripCard from "../cards/TripCard/TripCard";

// TODO: Type props
export const SBTripCard = ({ blok }) => {
  const { trip } = blok;
  console.log({ blok });

  return (
    <SbEditable content={blok}>
      <TripCard trip={trip} />
    </SbEditable>
  );
};
