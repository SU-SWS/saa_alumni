import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { DrGrid } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const Grid = (props) => {
  return (
    <SbEditable content={props.blok}>
      <DrGrid xs={1} md={2} lg={props.blok.numCol} gap={true} className='grid'>
        <CreateBloks />
      </DrGrid>
    </SbEditable>
  );
};

export default Grid;
