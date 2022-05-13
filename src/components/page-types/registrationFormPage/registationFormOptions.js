export const findSelectOption = (select = [], value) => {
  if (select.includes(value)) {
    const index = select.findIndex((item) => item.indexOf(value) !== -1);
    return select[index];
  }
  return null;
};

export const regType = ['Primary registrant', 'Related contact'];
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
  'GreatGrandchild',
  'GreatGrandparent',
  'Relative',
  'Sibling',
  'Spouse/Partner',
  'Step-child',
  'Step-parent',
  'Guest',
];

export const affiliationSelectList = [
  'None',
  'Alum',
  'Current Student',
  'Faculty',
  'Parent of Undergraduate Student',
  'Staff',
];
