// Generate random integer between min and max

const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default randomInteger;
