import SbEditable from 'storyblok-react';
import React from 'react';
import GradientCard from '../../cards/gradientCard';

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
      headlingLevel={headingLevel}
      spacingBottom={spacingBottom}
      tabText={isNew ? 'New' : ''}
      className={`perk-card${
        orientation === 'horizontal' ? '-horizontal' : ''
      }`}
    />
  </SbEditable>
);
export default PerkCardView;
