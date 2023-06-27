const excludedRelationships = [
  'Former Spouse/Partner',
  'Widow',
  'Business Associate',
  'Acquaintance',
  'Miscellaneous Association',
  'Faculty Advisor',
  'Student Advisee',
  'Mentor',
  'Mentee',
  'Friend',
];

export const filterRelationships = (relationships) => {
  const relatedContact = relationships.filter(
    (relationship) => !excludedRelationships.includes(relationship.su_relation)
  );
  return relatedContact;
};
