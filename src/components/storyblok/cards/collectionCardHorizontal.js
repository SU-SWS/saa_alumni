import React from 'react';
import SbEditable from 'storyblok-react';
import GradientCard from '../../cards/GradientCard/GradientCard';

export const SBCollectionCardHorizontal = ({ blok }) => {
  const {
    headline,
    description,
    link,
    image: { filename, focus } = {},
    imageFocus,
    spacingBottom,
    headingLevel,
  } = blok;

  return (
    <SbEditable content={blok}>
      <GradientCard
        orientation="horizontal"
        headline={headline}
        description={description}
        link={link || ''}
        filename={filename}
        focus={focus}
        imageFocus={imageFocus}
        spacingBottom={spacingBottom}
        headingLevel={headingLevel}
        className="collection-card-horizontal"
      />
    </SbEditable>
  );
};
