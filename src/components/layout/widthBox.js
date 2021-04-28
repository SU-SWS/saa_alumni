import React from 'react';
import { Grid } from 'decanter-react';
import { dcnb } from 'cnbuilder';

const WidthBox = ({ width, className, children, ...props}) => {
  // Sets whether wrapper is edge-to-edge
  let wrapperClasses = '';

  if (width !== 'edge-to-edge') {
    wrapperClasses = 'su-cc';
  }

  // Options for grid width if not edge-to-edge
  let gridWidth = '';

  if (width === '6') {
    gridWidth = 'su-col-span-12 md:su-col-span-10 md:su-col-start-2 lg:su-col-span-8 lg:su-col-start-3 xl:su-col-span-6 xl:su-col-start-4';
  }
  else if (width === '8') {
    gridWidth = 'su-col-span-12 lg:su-col-span-10 lg:su-col-start-2 xl:su-col-span-8 xl:su-col-start-3';
  }
  else if (width === '10') {
    gridWidth = 'su-col-span-12 xl:su-col-span-10 xl:su-col-start-2';
  }
  else {
    gridWidth = 'su-col-span-12';
  }

  return (
    <Grid xs={12} className={dcnb(className, wrapperClasses)} {...props}>
      <div className={gridWidth}>
        {children}
      </div>
    </Grid>
  );
};

export default WidthBox;
