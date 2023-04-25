// Pass in affiliations endpoint array to determine if a user is an Alum
export const isAlum = (aff) =>
  aff ? aff.filter((type) => type.includes('SAA Alum')).length > 0 : false;
