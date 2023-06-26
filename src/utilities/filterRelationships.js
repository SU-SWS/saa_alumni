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
  relationships.map((relationship) =>
    excludedRelationships.forEach((type) => relationship.type !== type)
  );
};
