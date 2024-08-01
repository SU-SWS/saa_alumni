import StoryblokClient from 'storyblok-js-client';
import { createRouter } from 'next-connect';

const tripsCollection = async (req, res) => {
  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });

  let currentPage = 1;
  let trips = [];
  const perpage = 25;
  const requests = [];
  const storyblokRes = await storyblok.get(`cdn/stories/`, {
    filter_query: {
      component: {
        in: 'trip',
      },
    },
    per_page: perpage,
    page: currentPage,
  });

  const { total } = storyblokRes;
  trips = trips.concat(storyblokRes.data.stories);

  while (currentPage * perpage < total) {
    currentPage += 1;
    requests.push(
      storyblok.get(`cdn/stories/`, {
        filter_query: {
          component: {
            in: 'trip',
          },
        },
        per_page: perpage,
        page: currentPage,
      })
    );
  }

  await Promise.all(requests)
    .then((vals) => {
      vals.forEach((val) => {
        trips = trips.concat(val.data.stories);
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      // eslint-disable-next-line no-console
      console.log(err);
    });

  const ret = {};
  trips.forEach((story) => {
    ret[story.uuid] = {
      uuid: story.uuid,
      title: story.content?.title,
      subtitle: story.content?.subtitle,
      slug: story.slug,
      full_slug: story.full_slug,
      tripConfigName: story.name,
      tripId: story.content?.tripId,
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
