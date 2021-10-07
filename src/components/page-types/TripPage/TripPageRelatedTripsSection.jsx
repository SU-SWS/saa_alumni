import React from 'react';
import { Grid as DrGrid } from 'decanter-react';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
import { TripPageSectionHeader } from './TripPageSectionHeader';
import * as styles from './TripPageRelatedTripsSection.styles';
import getNumBloks from '../../../utilities/getNumBloks';
import WidthBox from '../../layout/widthBox';

export const TripPageRelatedTripsSectionProps = {
  relatedTrips: SBBlokType,
};

export const TripPageRelatedTripsSection = (props) => {
  const { relatedTrips } = props;
  const numTrips = getNumBloks(relatedTrips);
  let tripGridWidth = '12';
  let numColumns = 3;

  if (numTrips === 1) {
    tripGridWidth = '4';
    numColumns = 1;
  } else if (numTrips === 2) {
    tripGridWidth = '8';
    numColumns = 2;
  }

  return (
    <div className="su-rs-mt-7 su-rs-mb-9">
      <TripPageSectionHeader
        isCenter
        heading={`Related Trip${numTrips > 1 ? 's' : ''}`}
      />
      <WidthBox width={tripGridWidth}>
        <DrGrid
          xs={1}
          md={numTrips > 1 ? 2 : 1}
          xl={numColumns}
          gap
          className={styles.tripGrid}
        >
          <CreateBloks blokSection={relatedTrips} />
        </DrGrid>
      </WidthBox>
    </div>
  );
};
TripPageRelatedTripsSection.propTypes = TripPageRelatedTripsSectionProps;
