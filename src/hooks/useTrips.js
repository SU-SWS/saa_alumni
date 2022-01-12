import { graphql, useStaticQuery } from 'gatsby';
import { luxonToday, luxonDate } from '../utilities/dates';

/**
 * Hook to fetch trip content for filtering
 * NOTE: If this becomes too large a payload to filter client-side
 * we'll need to adjust and create lambda functions to do it on the backend
 * (or integrate with Apollo and use the Storyblok CDN)
 */
export const useTrips = () => {
  const result = useStaticQuery(
    graphql`
      query TripsQuery {
        trips: allStoryblokEntry(
          filter: {
            field_component: { eq: "trip" }
            field_hideFromFilter_boolean: { ne: true }
          }
        ) {
          nodes {
            id
            name
            full_slug
            content
          }
        }
      }
    `
  );

  let trips = result.trips.nodes.map((trip) => {
    const tripObj = {
      ...trip,
      content: JSON.parse(trip.content),
    };

    // Check if trip didn't start yet
    // Only show future trips.
    const tripDate = luxonDate(tripObj.content.startDate);
    return luxonToday().startOf('day') < tripDate.startOf('day')
      ? tripObj
      : false;
  });
  trips = trips.filter((trip) => trip !== false);
  return trips;
};
