import SbEditable from 'storyblok-react';
import React from 'react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import { Heading } from 'decanter-react';

const PerkCardView = ({
    blok: {
      image: {
        filename
      },
      isNew,
      title,
      headingLevel,
      intro,
    },
    blok
  }) => {
  return (
    <SbEditable content={blok}>
      <article className='perk-card'>
        <Heading level={headingLevel ?? 3}>{title}</Heading>
        <p>{intro}</p>
      </article>
    </SbEditable>
  );
};
export default PerkCardView;
