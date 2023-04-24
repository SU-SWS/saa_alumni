// Pass in affiliations endpoint array to determine if a user is an Alum
export const isAlum = (aff) =>
  aff.filter((type) => type.includes('Alum')).length > 0;
