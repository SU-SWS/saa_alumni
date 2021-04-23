import React from 'react';
import transformImage from '../../utilities/transformImage';
import getImageWidth from '../../utilities/getImageWidth';
import { objectPosition } from '../../utilities/dataSource';
import { dcnb } from 'cnbuilder';

const FullWidthImage = ({ filename, element, imageClasses, alt, imageFocus, ...props}) => {
  const Element = element ?? 'figure';

  const imgFocus = objectPosition[imageFocus] ?? objectPosition['center'];

  let largeImg, mediumImg, smallImg, originalImg = '';
  let imgSrcset, imgSizes, imgSrc = '';

  if (filename != null) {
    let imgWidth = '';

    // Get image width from URL of storyblok image
    if (filename?.startsWith('http')) {
      imgWidth = getImageWidth(filename);
    }

    originalImg = transformImage(filename, '');

    if (imgWidth >= 800) {
      smallImg = transformImage(filename, '/800x0');
    }

    if (imgWidth >= 1200) {
      mediumImg = transformImage(filename, '/1200x0');
    }

    if (imgWidth >= 2000) {
      largeImg = transformImage(filename, '/2000x0');
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
    <Element {...props}>
      <img
        {...(imgSrcset ? {srcSet: imgSrcset} : {})}
        {...(imgSizes ? {sizes: imgSizes} : {})}
        src={imgSrc}
        className={dcnb(imageClasses, imgFocus)}
        alt={alt}
      />
    </Element>
  );
};

export default FullWidthImage;
