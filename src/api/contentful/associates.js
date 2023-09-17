import fetchNames from '../../utilities/contentful/associates';

export default async function handler(req, res) {
  const names = await fetchNames();
  res.json(names);
}
