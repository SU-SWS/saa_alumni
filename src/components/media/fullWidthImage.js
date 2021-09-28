import React from 'react';
import { dcnb } from 'cnbuilder';
import transformImage from '../../utilities/transformImage';
import getImageSize from '../../utilities/getImageSize';
import { objectPosition } from '../../utilities/dataSource';

const FullWidthImage = ({
  filename,
  className,
  alt,
  imageFocus,
  smartFocus,
  loading,
  ...props
}) => {
  const imgFocus = objectPosition[imageFocus] ?? objectPosition.center;
  const imgLoading = loading ?? 'auto';

  let largeImg;
  let mediumImg;
  let smallImg;
  let originalImg = '';
  let imgSrcset;
  let imgSizes;
  let imgSrc = '';
  let imgAspectRatio = '';

  if (filename) {
    // Get image size from URL of storyblok image
    const originalWidth = getImageSize(filename).width;
    const originalHeight = getImageSize(filename).height;
    imgAspectRatio = originalWidth / originalHeight;

    originalImg = transformImage(filename, '', smartFocus);
    if (originalWidth >= 800) {
      smallImg = transformImage(filename, '/800x0', smartFocus);
    }

    if (originalWidth >= 1200) {
      mediumImg = transformImage(filename, '/1200x0', smartFocus);
    }

    if (originalWidth >= 2000) {
      largeImg = transformImage(filename, '/2000x0', smartFocus);
    }

    imgSrcset = smallImg ? `${smallImg} 800w` : '';
    imgSrcset += mediumImg ? `,${mediumImg} 1200w ` : '';
    imgSrcset += largeImg ? `,${largeImg} 2000w ` : '';

    // Include the original image in the srcset if its width is > 800px and < 2000px
    if (originalWidth > 800 && originalWidth < 2000) {
      imgSrcset += originalImg ? `,${originalImg} ${originalWidth}w ` : '';
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
      {...(imgSrcset ? { srcSet: imgSrcset } : {})}
      {...(imgSizes ? { sizes: imgSizes } : {})}
      src={imgSrc}
      className={dcnb(className, imgFocus)}
      alt={alt ?? ''}
      loading={imgLoading}
      width="2000"
      height={Math.round(2000 / imgAspectRatio)}
      {...props}
    />
  );
};

export default FullWidthImage;
