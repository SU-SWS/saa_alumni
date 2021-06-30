// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

import { isNetlify, imageURL } from "../contexts/GlobalContext";

const transformImage = (image, param = "", imageFocus) => {
  const imageService = imageURL.endsWith("/") ? imageURL.slice(0, -1) : "";
  let myParams = param;

  if (image === null) {
    return "";
  }

  if (!isNetlify) {
    return image;
  }

  const path = image.replace("https://a.storyblok.com", "");

  // If the image is a jpg, optimize it by changing the quality to 60% (quality loss is mostly unnoticeable)
  if (image.endsWith(".jpg") || image.endsWith(".jpeg")) {
    myParams += !imageFocus ? "/smart" : "";
    myParams += "/filters:quality(60)";
    myParams += imageFocus ? `:focal(${imageFocus})` : "";
  } else {
    myParams += imageFocus ? `/filters:focal(${imageFocus})` : "";
  }

  if (myParams === "") {
    return imageService + path;
  }

  return imageService + myParams + path;
};

export default transformImage;
