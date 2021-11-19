import React from 'react';
import { dcnb } from 'cnbuilder';
import { Heading } from '../simple/Heading';
import {
  smallPaddingTop,
  smallPaddingBottom,
} from '../../utilities/dataSource';

export const SBHeading = ({
  blok: {
    title,
    fontSize,
    headingLevel = 2,
    spacingBottom = 'lg',
    spacingTop = 'none',
  },
}) => {
  const paddingTop = smallPaddingTop[spacingTop];
  const paddingBottom = smallPaddingBottom[spacingBottom];

  return (
    <Heading
      level={headingLevel}
      size={fontSize === 'default' ? null : fontSize}
      font="serif"
      className={dcnb(paddingTop, paddingBottom)}
    >
      {title}
    </Heading>
  );
};
