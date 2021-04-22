import React from 'react';
import transformImage from '../../utilities/transformImage';
import getImageWidth from '../../utilities/getImageWidth';
import { objectPosition } from '../../utilities/dataSource';
import { dcnb } from 'cnbuilder';

const FullWidthImage = ({ image, className, alt, imageFocus, loading, ...props}) => {
  const imgFocus = objectPosition[imageFocus] ?? objectPosition['center'];
  const imgLoading = loading ?? 'auto';

  let largeImg, mediumImg, smallImg, originalImg = '';
  let imgSrcset, imgSizes, imgSrc = '';

  if (image.filename != null) {
    let imgWidth = '';

    // Get image width from URL of storyblok image
    if (image.filename?.startsWith('http')) {
      imgWidth = getImageWidth(image.filename);
    }

    originalImg = transformImage(image.filename, '');

    if (imgWidth >= 800) {
      smallImg = transformImage(image.filename, '/800x0');
    }

    if (imgWidth >= 1200) {
      mediumImg = transformImage(image.filename, '/1200x0');
    }

    if (imgWidth >= 2000) {
      largeImg = transformImage(image.filename, '/2000x0');
    }

    imgSrcset = smallImg ? smallImg + ' 800w' : '';
    imgSrcset += mediumImg ? ',' + mediumImg + ' 1200w ' : '';
    imgSrcset += largeImg ? ',' + largeImg + ' 2000w ' : '';

    // Include the original image in the srcset if its width is > 800px and < 2000px
    if (imgWidth > 800 && imgWidth < 2000) {
      imgSrcset += originalImg ? ',' + originalImg + ' ' + imgWidth + 'w ' : '';
    }

    // Set sizes attribute only if imgSrcset is not empty (imgSrcset is empty if image width is < 800px)
    if (imgSrcset) {
      imgSizes = '100vw';
    }

    // If image is > 2000px, use the resized 2000px version for the src. Otherwise use original image.
    imgSrc = largeImg || originalImg;
  }

  return (
    <img
      {...(imgSrcset ? {srcSet: imgSrcset} : {})}
      {...(imgSizes ? {sizes: imgSizes} : {})}
      src={imgSrc}
      className={dcnb(className, imgFocus)}
      alt={alt}
      loading={imgLoading}
      {...props}
    />
  );
};

export default FullWidthImage;
