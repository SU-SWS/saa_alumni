import React from 'react';
import { dcnb } from 'cnbuilder';
import { borderColors, bgColors } from '../../utilities/dataSource';
import CardImage from './cardImage';

const CircularImage = ({
  borderColor = 'digital-red',
  filename = '',
  alt,
  className,
  smartFocus,
  loading = 'lazy',
  width,
  height,
  ...props
}) => {
  // Option to display image as round thumbnail with colored border
  const imageBorderColor = borderColors[borderColor];
  const imageBgColor = bgColors[borderColor];

  return (
    <div
      className={dcnb(
        'su-w-[12rem] su-h-[12rem] md:su-w-[14rem] md:su-h-[14rem] su-rounded-full su-border-[7px] su-border-solid su-overflow-hidden print:su-hidden',
        imageBorderColor,
        imageBgColor,
        className
      )}
      aria-hidden={alt ? 'false' : 'true'}
      {...props}
    >
      <CardImage
        filename={filename}
        size="thumb"
        smartFocus={smartFocus}
        className="su-object-cover su-w-full su-h-full"
        loading={loading}
        alt={alt ?? ''}
        width={width}
        height={height}
      />
    </div>
  );
};

export default CircularImage;
