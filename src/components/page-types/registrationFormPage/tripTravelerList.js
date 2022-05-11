import React, { useContext } from 'react';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import { FormContext } from '../../../contexts/FormContext';
import TripTravelerListItem from './tripTravelerListItem';

const TripTravelerList = () => {
  const [state, dispatch] = useContext(FormContext);

  if (state.travelersData.length === 0) {
    return <p>No travelers have been selected</p>;
  }

  return (
    <Grid md={12}>
      <GridCell
        md={4}
        className="icon-card su-bg-white print:su-hidden su-group su-relative su-block children:su-mx-auto su-text-center sm:su-max-w-[42rem] lg:su-max-w-[50rem] xl:su-max-w-full su-w-full su-mx-auto su-rs-px-3 md:su-rs-px-1 xl:su-rs-px-3 su-rs-py-3 xl:su-rs-py-4 su-basefont-23 su-break-words su-border su-border-solid su-shadow-sm hover:su-shadow-md"
      >
        {state.travelersData.map((traveler) => (
          <TripTravelerListItem
            key={traveler.relationshipID || traveler.id}
            traveler={traveler}
          />
        ))}
      </GridCell>
    </Grid>
  );
};

export default TripTravelerList;
