import { graphql, useStaticQuery } from 'gatsby';
import { DateTime } from 'luxon';
import { mergeEventOverrides } from '../utilities/synchronizedEvents';
import { luxonDate } from '../utilities/dates';

export const useEvents = ({
  regions = [],
  subjects = [],
  maxNumEvents,
} = {}) => {
  const result = useStaticQuery(graphql`
    query EventsQuery {
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

  const now = DateTime.now().toUnixInteger();

  return result.events.nodes
    .map((event) => {
      const mergedContent = mergeEventOverrides(JSON.parse(event.content));
      const startTimestamp = mergedContent.start
        ? luxonDate(mergedContent.start).toUnixInteger()
        : null;
      const endTimestamp = mergedContent.end
        ? luxonDate(mergedContent.end).toUnixInteger()
        : null;

      return {
        ...event,
        content: {
          ...mergedContent,
          startTimestamp,
          endTimestamp,
        },
      };
    })
    .filter((event) => {
      if (!event.content?.start || !event.content?.end) {
        return false;
      }

      return (
        event.content.startTimestamp > now || event.content.endTimestamp > now
      );
    })
    .sort((a, b) => {
      const { startTimestamp: aStart, endTimestamp: aEnd } = a.content;
      const { startTimestamp: bStart, endTimestamp: bEnd } = b.content;

      if (aStart === bStart) {
        return aEnd - bEnd;
      }

      return aStart - bStart;
    })
    .filter((event) => {
      if (
        subjects?.length &&
        !subjects.some((s) => event.content?.subject?.includes(s))
      ) {
        return false;
      }

      if (regions?.length && !regions.includes(event.content?.region)) {
        return false;
      }

      return true;
    })
    .slice(0, maxNumEvents);
};
