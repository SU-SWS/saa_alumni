import React from 'react';
import { dcnb } from 'cnbuilder';
import transformImage from '../../utilities/transformImage';
import getImageSize from '../../utilities/getImageSize';
import { objectPosition } from '../../utilities/dataSource';
import { convertAspectRatio } from '../../utilities/convertAspectRatio';

const FullWidthImage = ({
  filename,
  className,
  alt,
  imageFocus,
  smartFocus,
  loading,
  aspectRatio,
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
  let heightRatio = 0;
  let isCropped = false;

  if (aspectRatio) {
    isCropped = true;
    imgAspectRatio = convertAspectRatio(aspectRatio);
    heightRatio = 1 / imgAspectRatio;
  }

  if (filename) {
    // Get image size from URL of storyblok image
    const originalWidth = getImageSize(filename).width;
    const originalHeight = getImageSize(filename).height;

    if (!aspectRatio) {
      imgAspectRatio = originalWidth / originalHeight;
    }

    originalImg = transformImage(
      filename,
      `/${originalWidth}x${Math.round(originalWidth * heightRatio)}`,
      smartFocus,
      isCropped
    );

    if (originalWidth >= 800) {
      smallImg = transformImage(
        filename,
        `/800x${Math.round(800 * heightRatio)}`,
        smartFocus,
        isCropped
      );
    }

    if (originalWidth >= 1200) {
      mediumImg = transformImage(
        filename,
        `/1200x${Math.round(1200 * heightRatio)}`,
        smartFocus,
        isCropped
      );
    }

    if (originalWidth >= 2000) {
      largeImg = transformImage(
        filename,
        `/2000x${Math.round(2000 * heightRatio)}`,
        smartFocus,
        isCropped
      );
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
