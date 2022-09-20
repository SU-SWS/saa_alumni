import fetch from 'node-fetch';

export const isStoryblokEditor = async (req) => {
  if (req.headers.referer) {
    const { referer } = req.headers;
    const url = new URL(referer);
    const accessKey = url.searchParams.get('access_key');
    const spaceId = url.searchParams.get('_storyblok_tk[space_id]');

    if (url.pathname.match(/^\/editor\/?$/) && spaceId && accessKey) {
      const result = await fetch(
        `https://api.storyblok.com/v1/cdn/spaces/me?token=${accessKey}`
      ).then((res) => res.json());

      if (result.space && result.space.id === parseInt(spaceId, 10)) {
        return true;
      }
    }
  }
  return false;
};
