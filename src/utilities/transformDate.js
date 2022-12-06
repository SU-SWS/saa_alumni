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

export const formatUsDate = (tripDate) => {
  const date = new Date(tripDate);
  if (Number.isNaN(Number(date))) {
    return undefined;
  }
  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  const year = date.getFullYear();
  const newDate = `${month}/${day}/${year}`;
  return newDate;
};
