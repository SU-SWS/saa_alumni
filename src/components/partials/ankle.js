import { Heading, Grid as DrGrid } from "decanter-react";
import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";
import WidthBox from "../layout/widthBox";
import { bgTextColorPairs } from "../../utilities/dataSource";

/**
 * The ankle component is referenced and used in the page type components.
 * It allows for placing 1 to 3 icon cards above the local footer.
 */

const Ankle = ({
  blok: { ankleContent, ankleTitle, isAnkleTitleSrOnly, ankleBgColor },
  isDark,
}) => {
  let ankleBgStyles = bgTextColorPairs[ankleBgColor ?? "white"];
  let isAnkleDark;

  if (ankleBgStyles === "black") {
    isAnkleDark = true;
  }

  const ankleWrapperStyles = dcnb(
    "ankle su-relative su-rs-py-7",
    ankleBgStyles
  );

  return (
    <WidthBox width="" className={ankleWrapperStyles}>
      {ankleTitle && (
        <Heading
          srOnly={isAnkleTitleSrOnly}
          level={2}
          size={2}
          font="serif"
          weight="bold"
          align="center"
          className="su-rs-mb-3 su-mt-[-0.4em] su-mx-auto su-max-w-900"
        >
          {ankleTitle}
        </Heading>
      )}
      <DrGrid
        xs={1}
        md={3}
        gap
        className={dcnb("su-gap-y-2xl md:su-gap-y-[80px] xl:su-gap-y-[100px]")}
      >
        <CreateBloks blokSection={ankleContent} isDark={isAnkleDark} />
      </DrGrid>
    </WidthBox>
  );
};

export default Ankle;
