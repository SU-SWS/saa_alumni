import StoryblokClient from 'storyblok-js-client';
import connect from 'next-connect';

const categoryDatasource = async (req, res) => {
  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });
  const storyblokRes = await storyblok.get(`cdn/datasource_entries`, {
    datasource: 'registration-category',
  });

  const { data } = storyblokRes;

  res.status(200).json(data);
};

const handler = connect().get(categoryDatasource);

export default handler;
