import React from 'react';
import SbEditable from 'storyblok-react';
import WidthBox from '../layout/widthBox';
import CreateBloks from '../../utilities/createBloks';

const Itinerary = ({ blok: { itineraryItems }, blok }) => (
  <SbEditable content={blok}>
    <WidthBox width="8">
      <ul className="itinerary su-list-unstyled su-overflow-hidden">
        <CreateBloks blokSection={itineraryItems} />
      </ul>
    </WidthBox>
  </SbEditable>
);

export default Itinerary;
