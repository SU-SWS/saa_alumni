import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { Grid as DrGrid } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import WidthBox from './widthBox';

const Grid = (props) => {
  // Options to have regular grid gap or 1px horizontal gaps
  let gapClasses = 'su-grid-gap';

  if (props.blok.removeGap) {
    gapClasses = 'su-gap-x-[1px]'
  }

  let grid =
    <DrGrid xs={1} md={2} lg={props.blok.numCol} className={dcnb('su-items-start su-justify-items-center su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]', gapClasses)}>
      <CreateBloks blokSection={props.blok.content} />
    </DrGrid>

  if (props.blok.numCol === 'auto') {
    grid =
      <DrGrid className={dcnb('su-grid-cols-[repeat(auto-fit,minmax(34rem,1fr))] su-items-start su-justify-items-center su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]', gapClasses)}>
        <CreateBloks blokSection={props.blok.content} />
      </DrGrid>;
  }

  return (
    <SbEditable content={props.blok}>
      <WidthBox width={props.blok.width} className='saa-grid'>
        {grid}
      </WidthBox>
    </SbEditable>
  );
};

export default Grid;
