import { graphql, useStaticQuery } from 'gatsby';
import faker from 'faker';

faker.seed(12345);
const tripRegions = [
  'africa',
  'asia',
  'australia-pacific',
  'central-america-caribbean',
  'europe',
  'middle-east',
  'north-america',
  'south-america',
  'polar-regions',
];
const tripExperiences = [
  'arts-architecture',
  'city-sojourns',
  'cruise-sailing',
  'expeditions-safaris',
  'family-travel',
  'food-wine',
  'in-depth-study',
  'land-based',
  'private-plane',
  'rail-train',
  'solo-exclusive',
  'walks-hikes-treks',
];
const tripTag = ['Staff Pick', 'New', 'Selling Fast'];
export const createTrip = (id, refDate = new Date()) => {
  const region = faker.random.arrayElement(tripRegions);
  const regionTitle = region
    .split('-')
    .map((w) => `${w[0].toUpperCase()}${w.slice(1)}`)
    .join(' ');
  const title = `${faker.address.cityName()}, ${regionTitle}`;
  const slug = faker.helpers.slugify(title);
  const subtitle = `${faker.company.catchPhrase()}`;
  const shortDescription = faker.lorem.sentences(2);
  const tripDuration = faker.datatype.number({ min: 7, max: 21 });
  const startDate = faker.date.future(undefined, refDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + tripDuration);
  const experiences = faker.helpers.shuffle([...tripExperiences]).slice(0, 6);
  const tag =
    faker.datatype.number(4) === 1 ? faker.random.arrayElement(tripTag) : '';

  return {
    id,
    slug,
    full_slug: `travel-study/trips/${slug}`,
    content: {
      title,
      subtitle,
      shortDescription,
      startDate: `${startDate.toISOString().split('T').shift()} 00:00`,
      endDate: `${endDate.toISOString().split('T').shift()} 00:00`,
      heroImage: {
        alt: '',
        copyright: '',
        fieldtype: 'asset',
        filename:
          'https://a.storyblok.com/f/118608/493x493/a547b4aff1/camboda_laos_vietnam-hero.png',
        focus: null,
        id: 2867641,
        name: '',
        title: '',
      },
      region: [region],
      experiences,
      tag,
    },
  };
};

const generateTrips = (tripCount = 120) => {
  const trips = [];
  Array.from({ length: tripCount }).forEach((_, id) => {
    // Get refDate
    const lastTrip = trips[trips.length - 1];
    const refDate = lastTrip
      ? new Date(
          faker.datatype.boolean
            ? lastTrip.content.startDate
            : lastTrip.content.endDate
        )
      : undefined;
    trips.push(createTrip(id, refDate));
  });
  return trips;
};

const generatedTrips = generateTrips();

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

  if (trips) {
    // Do Nothing
    // return trips;
  }

  return generatedTrips;
};
