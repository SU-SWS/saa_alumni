import React from 'react';
import SbEditable from 'storyblok-react';
import GradientCard from './GradientCard/GradientCard';

const CollectionCard = ({
  blok: {
    headline,
    description,
    link,
    image: { filename, focus } = {},
    headingLevel,
  },
  blok,
  isDark,
}) => (
  <SbEditable content={blok}>
    <GradientCard
      orientation="vertical"
      headline={headline}
      description={description}
      link={link || ''}
      filename={filename}
      focus={focus}
      headingLevel={headingLevel}
      className="collection-card"
      isDark={isDark}
    />
  </SbEditable>
);

export default CollectionCard;
