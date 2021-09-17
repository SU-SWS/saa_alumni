import { graphql, useStaticQuery } from 'gatsby';

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
        trips: allStoryblokEntry(filter: { field_component: { eq: "trip" } }) {
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
  const trips = result.trips.nodes.map((trip) => ({
    ...trip,
    content: JSON.parse(trip.content),
  }));

  return trips;
};
