import React from "react";
import SbEditable from "storyblok-react";
import { Grid as DrGrid } from "decanter-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";
import WidthBox from "./widthBox";
import { justifyItems } from "../../utilities/dataSource";

const Grid = ({
  blok: { numCol, content, width, isStretchItems, alignment, gapWidth },
  blok,
  isDark,
}) => {
  const alignmentClasses = justifyItems[alignment] || justifyItems.center;

  // Horizontal grid gap options
  let gapClasses;

  if (gapWidth === "none") {
    gapClasses = "su-gap-x-[1px]";
  } else if (gapWidth === "large") {
    gapClasses =
      "su-gap-xs md:su-gap-x-lg lg:su-gap-x-2xl xl:su-gap-x-[6rem] 2xl:su-gap-x-[7rem]";
  } else {
    gapClasses = "su-grid-gap";
  }

  // By default, items in a row are top-aligned vertically
  let itemClasses = "su-items-start";

  // Option to force items in the same row to stretch to the height of the tallest item
  if (isStretchItems) {
    itemClasses = "su-items-stretch";
  }

  let grid = (
    <DrGrid
      xs={1}
      md={width === "4" || width === "6" ? 1 : 2}
      xl={parseInt(numCol, 10)}
      className={dcnb(
        "su-gap-y-xl md:su-gap-y-[5rem] xl:su-gap-y-[7rem]",
        alignmentClasses,
        gapClasses,
        itemClasses
      )}
    >
      <CreateBloks blokSection={content} isDark={isDark} />
    </DrGrid>
  );

  if (numCol === "auto") {
    grid = (
      <DrGrid
        className={dcnb(
          "su-grid-cols-[repeat(auto-fit,minmax(34rem,1fr))] su-gap-y-xl md:su-gap-y-[5rem] xl:su-gap-y-[7rem]",
          alignmentClasses,
          gapClasses,
          itemClasses
        )}
      >
        <CreateBloks blokSection={content} isDark={isDark} />
      </DrGrid>
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

export default Grid;
