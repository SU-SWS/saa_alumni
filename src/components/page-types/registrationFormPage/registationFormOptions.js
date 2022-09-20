export const findSelectOption = (select = [], value) => {
  let selected = null;
  selected = select.find(
    (option) =>
      option?.toLowerCase() === value?.toLowerCase() ||
      value?.toLowerCase()?.includes(option?.toLowerCase())
  );
  return selected;
};

export const prefixSelectList = [
  'Dr.',
  'Miss',
  'Mr.',
  'Mrs.',
  'Ms.',
  'Mx.',
  'The Reverend',
  'The Reverend Father',
  'The Reverend Mother',
  'Vice Admiral',
  'Sheikh',
  'Sir',
  'Sister',
  'Staff Sergeant',
  'The Honorable',
  'Mr/s.',
  'Major General',
  'Admiral',
  'Brigadier General',
  'Brother',
  'Cadet',
  'Cantor',
  'Corporal',
  'Captain',
  'Chaplain',
  'Colonel',
  'Commander',
  'Count',
  'Countess',
  'Dame',
  'Ensign',
  'First Lieutenant',
  'General',
  'Second Lieutenant',
  'Prince',
  'Princess',
  'Private First Class',
  'Professor',
  'Lord',
  'Major',
  'Mayor',
  'Sergeant',
  'Sergeant First Class',
  'Monsignor',
  'Mother',
  'Hazzan',
  'Her Majesty',
  'Her Royal Highness',
  'His Majesty',
  'His Royal Highness',
  'King',
  'Lady',
  'Queen',
  'Rabbi',
  'Rear Admiral',
  'Lieutenant',
  'Lieutenant Colonel',
  'Lieutenant Commander',
  'Lieutenant General',
  'Reverend Doctor',
  'The Most Reverend',
];

export const relationshipSelectList = [
  'Parent',
  'Child',
  'Cousin',
  'Grandparent',
  'Grandchild',
  'Aunt/Uncle',
  'Niece/Nephew',
  'Great Grandchild',
  'Great Grandparent',
  'Relative',
  'Sibling',
  'Spouse/Partner',
  'Step-child',
  'Step-parent',
  'Guest',
];

export const emailTypeList = ['Home', 'Business', 'other'];

export const phoneNumberTypeList = ['Home', 'Business', 'Mobile'];
