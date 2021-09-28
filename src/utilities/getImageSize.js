// Find the size of the image uploaded to Storyblok

const getImageSize = (imageUrl) => {
  if (imageUrl.startsWith('http')) {
    const imageSize = {
      width: imageUrl.split('/')[5].split('x')[0],
      height: imageUrl.split('/')[5].split('x')[1],
    };

    return imageSize;
  }

  return null;
};

export default getImageSize;
