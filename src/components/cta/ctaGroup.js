import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { ctaGroupDisplay } from '../../utilities/dataSource';

const ctaGroup = (props) => {
  // Display type
  const display = ctaGroupDisplay[props.blok.display] ?? ctaGroupDisplay['adjacent'];

  return (
    <SbEditable content={props.blok}>
      <div className={`cta-group su-flex ${display} children:su-mx-10 children:su-mb-20 children:last:su-mb-0`}>
        <CreateBloks blokSection={props.blok.cta} />
      </div>
    </SbEditable>
  );
};

export default ctaGroup;
