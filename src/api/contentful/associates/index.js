import { sort } from 'fast-sort';

import ContentFulAPI from '../api';
import keys from '../keys';

const fetchNames = async (
  space = keys.space,
  accessToken = keys.accessToken
) => {
  const client = new ContentFulAPI(space, accessToken);
  const { items, total } = await client.fethEntries(1000, 0);
  let associates = [...items];

  const loops = Math.ceil(total / 1000);
  let skip = 0;
  const requests = [];

  for (let i = 0; i < loops; i += 1) {
    skip += 1000;
    requests.push(client.fethEntries(1000, skip));
  }

  const responses = await Promise.all(requests);
  const newAssociates = responses.reduce(
    (acc, response) => acc.concat(response.items),
    []
  );

  associates = associates.concat(newAssociates);
  const sortedNames = sort(associates).asc([
    (person) => person.name.last,
    (person) => person.name.first,
    (person) => person.name.middle,
  ]);

  const grouped = sortedNames.reduce((acc, person) => {
    const firstLetter = person.name.last[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(person);
    return acc;
  }, {});

  return {
    list: sortedNames,
    grouped,
    total: sortedNames.length,
  };
};

export default fetchNames;
