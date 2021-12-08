import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Grid } from '../layout/Grid';
import CreateBloks from '../../utilities/createBloks';
import WidthBox from '../layout/widthBox';

export const SBGrid = ({
  blok: {
    numCol,
    content,
    width,
    isStretchItems,
    alignment = 'center',
    gapWidth,
    isMdLgOneColumn,
  },
  blok,
  isDark,
}) => {
  // Horizontal grid gap options
  let gapClasses;

  if (gapWidth === 'none') {
    gapClasses = 'su-gap-x-[1px]';
  } else if (gapWidth === 'large') {
    gapClasses =
      'su-gap-xs md:su-gap-x-lg lg:su-gap-x-2xl xl:su-gap-x-[6rem] 2xl:su-gap-x-[7rem]';
  } else {
    gapClasses = 'su-grid-gap';
  }

  let grid;

  if (numCol === 'auto') {
    grid = (
      <Grid
        alignItems={isStretchItems ? 'stretch' : 'start'}
        justifyItems={alignment}
        className={dcnb(
          'su-grid-cols-[repeat(auto-fit,minmax(34rem,1fr))] su-gap-y-xl md:su-gap-y-[5rem] xl:su-gap-y-[7rem]',
          gapClasses
        )}
      >
        <CreateBloks blokSection={content} isDark={isDark} />
      </Grid>
    );
  } else {
    grid = (
      <Grid
        xs={1}
        md={
          width === '4' || width === '6' || numCol === '1' || isMdLgOneColumn
            ? 1
            : 2
        }
        xl={numCol}
        alignItems={isStretchItems ? 'stretch' : 'start'}
        justifyItems={alignment}
        className={dcnb(
          'su-gap-y-xl md:su-gap-y-[5rem] xl:su-gap-y-[7rem]',
          gapClasses
        )}
      >
        <CreateBloks blokSection={content} isDark={isDark} />
      </Grid>
    );
  }

  return (
    <SbEditable content={blok}>
      <WidthBox width={width} className="saa-grid">
        {grid}
      </WidthBox>
    </SbEditable>
  );
};
