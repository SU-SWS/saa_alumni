import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { ctaGroupDisplay } from '../../utilities/dataSource';

const ctaGroup = ({blok: { display, cta }}, blok) => {
  // Display type
  const myDisplay = ctaGroupDisplay[display] ?? ctaGroupDisplay['adjacent'];

  return (
    <SbEditable content={blok}>
      <div className={`cta-group su-flex ${myDisplay} children:su-mx-10 children:su-mb-20 children:last:su-mb-0`}>
        <CreateBloks blokSection={cta} />
      </div>
    </SbEditable>
  );
};

export default ctaGroup;
