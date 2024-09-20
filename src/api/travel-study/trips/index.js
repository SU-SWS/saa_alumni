import StoryblokClient from 'storyblok-js-client';
import { createRouter } from 'next-connect';

const tripsCollection = async (req, res) => {
  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });

  let trips = [];
  try {
    trips = await storyblok.get(`cdn/stories`, {
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

  const ret = {};
  trips.forEach((story) => {
    ret[story.uuid] = {
      uuid: story.uuid,
      title: story.content?.title,
      subtitle: story.content?.subtitle,
      slug: story.slug,
      full_slug: story.full_slug,
      tripConfigName: story.name,
      tripId: story.content?.tripId?.trim(),
      tripSize: story.content?.tripSize,
      minAge: story.content?.minAge,
      startDate: story.content?.startDate,
      endDate: story.content?.endDate,
      price: story.content?.cost?.content?.[0]?.content?.[0]?.text,
      deposit: story.content?.tripDeposit,
      preExtendPrice: story.content?.extendPrice,
      preExtendDepositPrice:
        story.content?.preTripExtensionDeposit ||
        story.content?.extendDepositPrice?.replace(/\D/g, ''),
      postExtendPrice: story.content?.postExtendPrice,
      postExtendDepositPrice:
        story.content?.postTripExtensionDeposit ||
        story.content?.postExtendDepositPrice?.replace(/\D/g, ''),
      preExtendStartDate: story.content.extendStartDate,
      preExtendEndDate: story.content.extendEndDate,
      postExtendStartDate: story.content.postExtendStartDate,
      postExtendEndDate: story.content.postExtendEndDate,
      roomCategory: story.content.roomCategory,
    };
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(ret);
};

const router = createRouter().get(tripsCollection);

export default router.handler();
