import React from 'react';

const TripInterstitialContent = ({
  blok: {
    trip: {
      full_slug: fullSlug,
      content: { title: tripTitle, startDate, endDate },
    },
  },
}) => {
  const title = `Receive notifiations: ${tripTitle}`;
  const tripURL = `/${fullSlug.replace(/^\//, '')}`;

  return (
    
  )
};

export default TripInterstitialContent;
