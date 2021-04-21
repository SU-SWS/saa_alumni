import React from 'react';
import transformImage from '../../utilities/transformImage';
import getImageWidth from '../../utilities/getImageWidth';
import { objectPosition } from '../../utilities/dataSource';
import { dcnb } from 'cnbuilder';

const FullWidthImage = ({ filename, className, alt, imageFocus, loading, ...props}) => {
  const imgFocus = objectPosition[imageFocus] ?? objectPosition['center'];
  const imgLoading = loading ?? 'auto';

  let largeImg, mediumImg, smallImg, originalImg = '';
  let largeWebp, mediumWebp, smallWebp, originalWebp = '';
  let imgSrcset, imgSizes, imgSrc = '';

  if (filename != null) {
    let imgWidth = '';

    // Get image width from URL of storyblok image
    if (filename?.startsWith('http')) {
      imgWidth = getImageWidth(filename);
    }

    originalImg = transformImage(filename, '/filters:quality(60)');
    originalWebp = transformImage(filename, '/filters:format(webp)')

    if (imgWidth >= 800) {
      smallImg = transformImage(filename, '/800x0/filters:quality(60)');
      smallWebp = transformImage(filename, '/800x0/filters:format(webp)');
    }

    if (imgWidth >= 1200) {
      mediumImg = transformImage(filename, '/1200x0/filters:quality(60)');
      mediumWebp = transformImage(filename, '/1200x0/filters:format(webp)');
    }

    if (imgWidth >= 2000) {
      largeImg = transformImage(filename, '/2000x0/filters:quality(60)');
      largeWebp = transformImage(filename, '/2000x0/filters:format(webp)');
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
    <picture>
      <source media='(max-width: 800px)' srcSet={smallWebp} type='image/webp' />
      <source media='(max-width: 1200px)' srcSet={mediumWebp} type='image/webp' />
      <source media='(max-width: 2000px)' srcSet={largeWebp} type='image/webp' />
      <source media='(min-width: 2001px)' srcSet={originalWebp} type='image/webp' />
      <img
        {...(imgSrcset ? {srcSet: imgSrcset} : {})}
        {...(imgSizes ? {sizes: imgSizes} : {})}
        src={imgSrc}
        className={dcnb(className, imgFocus)}
        alt={alt}
        loading={imgLoading}
        {...props}
      />
    </picture>
  );
};

export default FullWidthImage;
