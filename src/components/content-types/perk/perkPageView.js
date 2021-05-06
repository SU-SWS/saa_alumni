import SbEditable from 'storyblok-react';
import React from 'react';

const PerkPageView = (props) => {
  return (
    <SbEditable content={props.blok}>
      <article className='perk-page'>
      </article>
    </SbEditable>
  );
};

export default PerkPageView;
