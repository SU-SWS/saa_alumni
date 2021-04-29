import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { Grid as DrGrid } from 'decanter-react';
import { dcnb } from 'cnbuilder';
import WidthBox from './widthBox';

const Grid = ({blok: { removeGap, numCol, content, width }, blok}) => {
  // Options to have regular grid gap or 1px horizontal gaps
  let gapClasses = 'su-grid-gap';

  if (removeGap) {
    gapClasses = 'su-gap-x-[1px]'
  }

  let grid =
    <DrGrid xs={1} md={2} lg={numCol} className={dcnb('su-items-start su-justify-items-center su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]', gapClasses)}>
      <CreateBloks blokSection={content} />
    </DrGrid>

  if (numCol === 'auto') {
    grid =
      <DrGrid className={dcnb('su-grid-cols-[repeat(auto-fit,minmax(34rem,1fr))] su-items-start su-justify-items-center su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]', gapClasses)}>
        <CreateBloks blokSection={content} />
      </DrGrid>;
  }

  return (
    <SbEditable content={blok}>
      <WidthBox width={width} className='saa-grid'>
        {grid}
      </WidthBox>
    </SbEditable>
  );
};

export default Grid;
