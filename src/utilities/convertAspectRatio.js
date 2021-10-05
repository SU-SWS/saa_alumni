// Helped function to convert a string aspect ratio in the form of, e.g., "3x2" into a number

export const convertAspectRatio = (stringRatio) => {
  const width = stringRatio.split('x')[0];
  const height = stringRatio.split('x')[1];

  return width / height;
};
