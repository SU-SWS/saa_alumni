import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Grid as DrGrid } from 'decanter-react';
import CreateBloks from '../../utilities/createBloks';
import { ctaGroupDisplay } from '../../utilities/dataSource';
import WidthBox from '../layout/widthBox';

const ctaGroup = ({ blok: { display, cta } }, blok) => {
  // Display type
  const myDisplay = ctaGroupDisplay[display] ?? ctaGroupDisplay.adjacent;

  if (display === 'grid-col-3') {
    return (
      <SbEditable content={blok}>
        <WidthBox width="10">
          <DrGrid
            xs={1}
            lg={3}
            gap
            className="su-gap-y-xs md:su-gap-y-lg su-justify-items-center"
          >
            <CreateBloks blokSection={cta} />
          </DrGrid>
        </WidthBox>
      </SbEditable>
    );
  }

  return (
    <SbEditable content={blok}>
      <div
        className={dcnb(
          'cta-group su-flex children:su-mb-20 children:last:su-mb-0',
          myDisplay
        )}
      >
        <CreateBloks blokSection={cta} />
      </div>
    </SbEditable>
  );
};

export default ctaGroup;
