import StoryblokClient from 'storyblok-js-client';
import { createRouter } from 'next-connect';

const tripsCollection = async (req, res) => {
  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });

  let trips;
  try {
    trips = await storyblok.getAll(`cdn/stories`, {
      filter_query: {
        component: {
          in: 'trip',
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to fetch trips');
    return;
  }

  console.log('TRIPS', trips);

  const ret = {};
  trips.forEach((story) => {
    ret[story.uuid] = {
      uuid: story.uuid,
      title: story.content.title,
      subtitle: story.content.subtitle,
      slug: story.slug,
      full_slug: story.full_slug,
      tripId: story.content.tripId,
      startDate: story.content.startDate,
      endDate: story.content.endDate,
      tripDeposit: story.content.tripDeposit,
      preExtensionDeposit: story.content.preTripExtensionDeposit,
      postExtensionDeposit: story.content.postTripExtensionDeposit,
    };
  });
  res.status(200).json(ret);
};

const router = createRouter().get(tripsCollection);

export default router.handler();
