import React from 'react';
import transformImage from '../../utilities/transformImage';
import getImageWidth from '../../utilities/getImageWidth';
import { objectPosition } from '../../utilities/dataSource';
import { dcnb } from 'cnbuilder';

const CardImage = ({ image, size, className, imageFocus, loading, ...props}) => {
  const imgFocus = objectPosition[imageFocus] ?? objectPosition['center'];
  const imgLoading = loading ?? 'auto';

  let originalImg = '';
  let imgSrc = '';

  if (image.filename != null) {
    let imgWidth = '';

    // Get image width from URL of storyblok image
    if (image.filename?.startsWith('http')) {
      imgWidth = getImageWidth(image.filename);
    }

    originalImg = transformImage(image.filename, '');

    if (size === 'vertical' && imgWidth > 800 ) {
      imgSrc = transformImage(image.filename, '/800x0');
    }
    else if (size === 'thumb' && imgWidth > 200) {
      imgSrc = transformImage(image.filename, '/200x0');
    }
    else if (size === 'horizontal' && imgWidth > 1200) {
      imgSrc = transformImage(image.filename, '/1200x0');
    }
    else {
      imgSrc = originalImg;
    }
  }

  return (
    <img
      src={imgSrc}
      className={dcnb(className, imgFocus)}
      alt=''
      loading={imgLoading}
      {...props}
    />
  );
};

export default CardImage;
