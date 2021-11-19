import React from 'react';
import { dcnb } from 'cnbuilder';
import SbEditable from 'storyblok-react';
import { Heading } from '../simple/Heading';
import {
  smallPaddingTop,
  smallPaddingBottom,
} from '../../utilities/dataSource';

export const SBHeading = ({ blok }) => {
  const {
    title,
    fontSize,
    headingLevel = 2,
    spacingTop = 'none',
    spacingBottom = 'lg',
  } = blok;

  const paddingTop = smallPaddingTop[spacingTop];
  const paddingBottom = smallPaddingBottom[spacingBottom];

  return (
    <SbEditable content={blok}>
      <Heading
        level={headingLevel}
        size={fontSize === 'default' ? null : fontSize}
        font="serif"
        className={dcnb(paddingTop, paddingBottom)}
      >
        {title}
      </Heading>
    </SbEditable>
  );
};
