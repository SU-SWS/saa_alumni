import SbEditable from 'storyblok-react';
import React from 'react';
import GradientCard from '../../cards/GradientCard/GradientCard';

const PerkCardView = ({
  blok: {
    image: { filename, focus } = {},
    imageFocus,
    isNew,
    title,
    descriptionShort,
    cardUrl,
  },
  blok,
  headingLevel,
  orientation,
  spacingBottom,
  cardImageFocus,
  isDark,
}) => (
  <SbEditable content={blok}>
    <GradientCard
      orientation={orientation}
      headline={title}
      description={descriptionShort}
      link={cardUrl || ''}
      filename={filename}
      focus={focus}
      imageFocus={cardImageFocus || imageFocus}
      headingLevel={parseInt(headingLevel, 10)}
      spacingBottom={spacingBottom}
      tabText={isNew ? 'New' : ''}
      isDark={isDark}
      className={`perk-card${
        orientation === 'horizontal' ? '-horizontal' : ''
      }`}
    />
  </SbEditable>
);

export default PerkCardView;
