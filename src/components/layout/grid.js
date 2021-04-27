import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { Grid as DrGrid } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const Grid = (props) => {
  let gapClasses = 'su-grid-gap';

  if (props.blok.removeGap) {
    gapClasses = 'su-gap-x-[1px] su-gap-y-2xl md:su-gap-y-[100px]'
  }

  let gridWidth = '';

  if (props.blok.width === '12') {
    gridWidth = 'su-cc'
  }

  return (
    <SbEditable content={props.blok}>
      <DrGrid xs={1} md={2} lg={props.blok.numCol} className={dcnb('grid su-items-start su-justify-items-center', gridWidth, gapClasses)}>
        {/* PurgeCSS: su-grid-cols-1 md:su-grid-cols-2 lg:su-grid-cols-3 lg:su-grid-cols-2 */}
        <CreateBloks blokSection={props.blok.content} />
      </DrGrid>
    </SbEditable>
  );
};

export default Grid;
