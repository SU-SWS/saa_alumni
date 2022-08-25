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
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}/${year}`;
};
