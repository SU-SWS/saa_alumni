import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { Grid as DrGrid, GridCell } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const Grid = (props) => {
  // Sets whether wrapper is edge-to-edge
  let wrapperClasses = '';

  if (props.blok.width !== 'edge-to-edge') {
    wrapperClasses = 'su-cc';
  }

  // Options for grid width if not edge-to-edge
  let gridWidth = '';

  if (props.blok.width === '8') {
    gridWidth = 'su-col-span-12 lg:su-col-span-10 lg:su-col-start-2 xl:su-col-span-8 xl:su-col-start-3';
  }
  else if (props.blok.width === '10') {
    gridWidth = 'su-col-span-12 xl:su-col-span-10 xl:su-col-start-2';
  }
  else {
    gridWidth = 'su-col-span-12';
  }

  // Options to have regular grid gap or 1px horizontal gaps
  let gapClasses = 'su-grid-gap';

  if (props.blok.removeGap) {
    gapClasses = 'su-gap-x-[1px]'
  }

  return (
    <SbEditable content={props.blok}>
      <DrGrid xs={12} className={wrapperClasses}>
        <div className={gridWidth}>
          <DrGrid xs={1} md={2} lg={props.blok.numCol} className={dcnb('su-items-start su-justify-items-center su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]', gapClasses)}>
            <CreateBloks blokSection={props.blok.content} />
          </DrGrid>
        </div>
      </DrGrid>
    </SbEditable>
  );
};

export default Grid;
