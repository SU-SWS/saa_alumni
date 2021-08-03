import React from "react";
import { Container, Grid } from "decanter-react";
import { dcnb } from "cnbuilder";

/**
 * A component for use as a wrapper container that sets the width
 * E.g., Edge-to-edge, site container width (12 of 12 columns), 10 of 12, 8 of 12 columns etc.
 * */

const WidthBox = ({ width, className, children, ...props }) => {
  // If it is an edge-to-edge container, no need to use a grid
  if (width === "edge-to-edge") {
    return (
      <Container width="full" className={className} {...props}>
        {children}
      </Container>
    );
  }

  // Options for grid width if not edge-to-edge
  let columnSpan = "";

  if (width === "4") {
    columnSpan =
      "su-col-span-12 sm:su-col-span-10 sm:su-col-start-2 md:su-col-span-8 md:su-col-start-3 lg:su-col-span-6 lg:su-col-start-4 xl:su-col-span-4 xl:su-col-start-5";
  } else if (width === "6") {
    columnSpan =
      "su-col-span-12 md:su-col-span-10 md:su-col-start-2 lg:su-col-span-8 lg:su-col-start-3 xl:su-col-span-6 xl:su-col-start-4";
  } else if (width === "8") {
    columnSpan =
      "su-col-span-12 lg:su-col-span-10 lg:su-col-start-2 xl:su-col-span-8 xl:su-col-start-3";
  } else if (width === "10") {
    columnSpan = "su-col-span-12 xl:su-col-span-10 xl:su-col-start-2";
  } else {
    columnSpan = "su-col-span-12";
  }

  return (
    <Grid xs={12} gap className={dcnb("su-cc", className)} {...props}>
      <div className={columnSpan}>{children}</div>
    </Grid>
  );
};

export default WidthBox;
