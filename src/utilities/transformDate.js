export const formatFmDate = (tripDate) => {
  const date = new Date(tripDate).toLocaleDateString('en-US');
  return date;
};

export const formatEmailDate = (tripDate) => {
  const dateFormat = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const date = new Date(tripDate).toLocaleDateString('en-US', dateFormat);
  return date;
};
