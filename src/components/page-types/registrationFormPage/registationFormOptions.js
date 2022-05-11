export const findSelectOption = (select = [], value) => {
  if (select.includes(value)) {
    const index = select.indexOf(value);
    return select[index];
  }
  return null;
};

export const regType = ['Primary registrant', 'Related contact'];
export const prefixSelectList = ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.', 'Mx.'];
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
