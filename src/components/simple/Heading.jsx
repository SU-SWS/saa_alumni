import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { HeadingLevelType } from '../../types/HeadingLevelType';
import {
  FontWeightType,
  FontStackType,
  ModularSizeType,
  LeadingType,
  TextAlignType,
  TrackingType,
} from '../../types/TypographyType';
import {
  fontStacks,
  fontWeights,
  fontLeadings,
  modularTypes,
  fontTrackings,
  textAlign,
} from '../../utilities/dataSource';

const HeadingProps = {
  level: HeadingLevelType,
  font: FontStackType,
  size: ModularSizeType,
  align: TextAlignType,
  weight: FontWeightType,
  leading: LeadingType,
  tracking: TrackingType,
  id: PropTypes.string,
  uppercase: PropTypes.bool,
  italic: PropTypes.bool,
  srOnly: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};

export const Heading = ({
  level = 2,
  font = 'sans',
  size,
  align,
  weight = 'bold',
  leading = 'display',
  tracking,
  id,
  uppercase,
  italic,
  srOnly,
  className,
  children,
  ...props
}) => {
  const HeadingTag = `h${level}`;
  const fontStack = fontStacks[font];
  const fontSize = modularTypes[size];
  const headingAlign = textAlign[align];
  const fontWeight = fontWeights[weight];
  const fontLeading = fontLeadings[leading];
  const fontTracking = fontTrackings[tracking];
  const isUppercase = uppercase ? 'su-uppercase' : '';
  const isItalic = italic ? 'su-italic' : '';
  const isSrOnly = srOnly ? 'su-sr-only' : '';

  return (
    <HeadingTag
      className={dcnb(
        fontStack,
        fontSize,
        headingAlign,
        fontWeight,
        fontLeading,
        fontTracking,
        isUppercase,
        isItalic,
        isSrOnly,
        className
      )}
      id={id}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};
Heading.propTypes = HeadingProps;
