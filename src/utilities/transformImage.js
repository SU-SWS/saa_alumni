// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

import { imageURL } from "../contexts/GlobalContext";
import { config } from "./config";

const transformImage = (image, param = "", smartFocus, autoFocus) => {
  const imageService = imageURL.endsWith("/") ? imageURL.slice(0, -1) : "";
  let myParams = param;

  if (image === null) {
    return "";
  }

  const path = image.replace("https://a.storyblok.com", "");

  // If the image is a jpg, optimize it by changing the quality to 60% (quality loss is mostly unnoticeable)
  if (
    image.toLowerCase().endsWith(".jpg") ||
    image.toLowerCase().endsWith(".jpeg")
  ) {
    myParams += autoFocus && !smartFocus ? "/smart" : "";
    myParams += "/filters:quality(60)";
    myParams += smartFocus ? `:focal(${smartFocus})` : "";
  } else {
    myParams += smartFocus ? `/filters:focal(${smartFocus})` : "";
  }

  if (myParams === "") {
    return imageService + path;
  }

  // Rewrite the URL to the redirect link to mask the API endpoint.
  let imageUrl = imageService + myParams + path;

  imageUrl = imageUrl.replace(
    /http?(s):\/\/a\.storyblok\.com/gi,
    `${config.assetCdn}a`
  );
  imageUrl = imageUrl.replace(
    /http?(s):\/\/img?[0-9]\.storyblok\.com/gi,
    `${config.assetCdn}i`
  );

  return imageUrl;
};

export default transformImage;
