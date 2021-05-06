import SbEditable from 'storyblok-react';
import React from 'react';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';

const PerkCardView = (props) => {

  return (
    <SbEditable content={props.blok}>
      <article className='perk-card'>
      </article>
    </SbEditable>
  );
};

export default PerkCardView;
