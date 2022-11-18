export const findSelectOption = (select = [], value) => {
  const selected = select.find(
    (option) =>
      option?.toLowerCase() === value?.toLowerCase() ||
      value?.toLowerCase()?.includes(option?.toLowerCase())
  );
  return selected;
};

export const emailTypeList = ['Home', 'Business', 'other'];

export const phoneNumberTypeList = ['Home', 'Business', 'Mobile'];
