// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

import { isNetlify, imageURL } from "../contexts/GlobalContext";

const transformImage = (image, param = '') => {
  let imageService = imageURL.endsWith("/") ? imageURL.slice(0, -1) : '';

  if (image === null) {
    return "";
  }

  if (!isNetlify) {
    return image;
  }

  const path = image.replace("https://a.storyblok.com", "");

  // If the image is a jpg, optimize it by changing the quality to 60% (quality loss is mostly unnoticeable)
  if (image.endsWith(".jpg")) {
    param += "/filters:quality(60)";
  }

  if (param === '') {
    return imageService + path;
  }
  else {
    return imageService + param + path;
  }

};

export default transformImage;
