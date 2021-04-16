import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';

const ctaGroup = (props) => {
  const display = props.blok.display === 'adjacent'
    ? 'su-flex-col su-space-y-20 lg:su-flex-row lg:su-flex-wrap lg:su-justify-center lg:su-space-y-0 lg:su-space-x-20'
    : 'su-flex-col su-space-y-20';

  return (
    <SbEditable content={props.blok}>
      <div className={`cta-group su-flex ${display}`}>
        <CreateBloks blokSection={props.blok.cta} />
      </div>
    </SbEditable>
  );
};

export default ctaGroup;
