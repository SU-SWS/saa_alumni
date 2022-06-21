export const isStoryblokEditor = (req) => {
  if (req.headers.referer) {
    const { referer } = req.headers;
    const url = new URL(referer);
    const accessKey = url.searchParams.get('access_key');

    if (
      url.pathname === '/editor' &&
      accessKey === process.env.STORYBLOK_EDITOR_TOKEN
    ) {
      return true;
    }
  }
  return false;
};
