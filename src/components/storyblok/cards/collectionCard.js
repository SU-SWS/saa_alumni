import React from 'react';
import SbEditable from 'storyblok-react';
import GradientCard from '../../cards/GradientCard/GradientCard';

export const SBCollectionCard = ({ blok, isDark }) => {
  const {
    headline,
    description,
    link,
    image: { filename, focus } = {},
    headingLevel,
  } = blok;

  return (
    <SbEditable content={blok}>
      <GradientCard
        orientation="vertical"
        headline={headline}
        description={description}
        link={link || ''}
        filename={filename}
        focus={focus}
        headingLevel={parseInt(headingLevel, 10)}
        className="collection-card"
        isDark={isDark}
      />
    </SbEditable>
  );
};
