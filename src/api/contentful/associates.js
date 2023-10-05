import fetchNames from '../../utilities/contentful/associates';

export default async function handler(req, res) {
  try {
    const names = await fetchNames();
    res.status(200).json(names);
  } catch (error) {
    res.status(200).json([]);
    // eslint-disable-next-line no-console
    console.log(error.config);
  }
}
