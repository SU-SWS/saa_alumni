import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import { Grid as DrGrid } from 'decanter-react';

const Grid = (props) => {
  return (
    <SbEditable content={props.blok}>
      <DrGrid xs={1} md={2} lg={props.blok.numCol} gap={true} className='grid su-items-start su-justify-items-center'>
        {/* PurgeCSS: su-grid-cols-1 md:su-grid-cols-2 lg:su-grid-cols-3 lg:su-grid-cols-2 */}
        <CreateBloks blokSection={props.blok.content} />
      </DrGrid>
    </SbEditable>
  );
};

export default Grid;
