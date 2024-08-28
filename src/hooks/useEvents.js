import { graphql, useStaticQuery } from 'gatsby';
import { luxonToday, luxonDate } from '../utilities/dates';

export const useEvents = () => {
  const result = useStaticQuery(graphql`
    query TripsQuery {
      events: allStoryblokEntry(
        filter: {
          field_component: { eq: "synchronizedEvent" }
          full_slug: { glob: "events/sync/*" }
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
  `);

  let events = result.events.nodes.map((event) => {
    const eventObj = {
      ...event,
      content: JSON.parse(event.content),
    };

    const startDate = luxonDate(event.content.start);
    return luxonToday().startOf('day') < startDate.startOf('day')
      ? eventObj
      : false;
  });
  events = events.filter((event) => event !== false);
  return events;
};
