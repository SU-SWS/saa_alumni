import React from 'react';
import { Grid as DrGrid, Heading } from 'decanter-react';
import CreateBloks from '../../../utilities/createBloks';
import { SBBlokType } from '../../../types/storyblok/SBBlokType';
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
    <div className={styles.root}>
      <Heading
        level={3}
        size={4}
        align="center"
        font="serif"
        className={styles.heading}
      >
        {`Related trip${numTrips > 1 ? 's' : ''}`}
      </Heading>
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
