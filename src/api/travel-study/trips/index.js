import StoryblokClient from 'storyblok-js-client';
import connect from 'next-connect';

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
    sort_by: 'content.title',
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
      console.log(err);
    });

  const ret = {};
  trips.forEach((story) => {
    console.log(story);
    ret[story.uuid] = {
      uuid: story.uuid,
      title: story.content.title,
      subtitle: story.content.subtitle,
      slug: story.slug,
      full_slug: story.full_slug,
      tripId: story.content.tripId,
      startDate: story.content.startDate,
      endDate: story.content.endDate,
      extendPrice: story.content.extendPrice,
    };
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(ret);
};

const handler = connect().get(tripsCollection);

export default handler;
