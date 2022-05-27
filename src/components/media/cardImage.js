import React, { useState, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import transformImage from '../../utilities/transformImage';
import getImageSize from '../../utilities/getImageSize';
import { objectPosition } from '../../utilities/dataSource';

const CardImage = ({
  filename,
  alt,
  size,
  className,
  imageFocus = 'center',
  smartFocus,
  loading = 'auto',
  ...props
}) => {
  // Work-around for hydration bug. See: https://github.com/gatsbyjs/gatsby/discussions/17914
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), [setIsClient]);

  const imgFocus = objectPosition[imageFocus];
  const imgLoading = loading;

  let originalImg = '';
  let imgSrc = '';

  if (filename) {
    let imgWidth = '';

    // Get image width from URL of storyblok image
    if (filename?.startsWith('http')) {
      imgWidth = getImageSize(filename).width;
    }

    originalImg = transformImage(filename, '', smartFocus, true);

    if (size === 'vertical' && imgWidth > 800) {
      imgSrc = transformImage(filename, '/800x0', smartFocus);
    } else if (size === 'thumb' && imgWidth > 200) {
      imgSrc = transformImage(filename, '/200x200', smartFocus, true);
    } else if (size === 'horizontal' && imgWidth > 1200) {
      imgSrc = transformImage(filename, '/1200x0', smartFocus);
    } else if (size === 'medium_2x1') {
      imgSrc = transformImage(filename, '/900x450', smartFocus, true);
    } else if (size === 'vertical_3x2') {
      imgSrc = transformImage(filename, '/600x400', smartFocus, true);
    } else if (size === 'large_3x2') {
      imgSrc = transformImage(filename, '/1200x800', smartFocus, true);
    } else {
      imgSrc = originalImg;
    }
  }

  return (
    <img
      src={imgSrc}
      className={dcnb('su-object-cover', className, imgFocus)}
      alt={alt ?? ''}
      loading={imgLoading}
      key={isClient}
      {...props}
    />
  );
};

export default CardImage;
