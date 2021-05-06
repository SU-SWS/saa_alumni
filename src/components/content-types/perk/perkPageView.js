import SbEditable from 'storyblok-react';
import React from 'react';
import { Heading } from 'decanter-react';

const PerkPageView = ({
  blok: {
    image: {
      filename
    },
    isNew,
    title,
    intro,
  },
  blok
  }) => {
  return (
    <SbEditable content={blok}>
      <article className='perk-page'>
        <Heading level={1}>{title}</Heading>
        <p>{intro}</p>
      </article>
    </SbEditable>
  );
};

export default PerkPageView;
