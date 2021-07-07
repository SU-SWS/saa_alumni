import React from "react";
import { Heading as DecanterHeading } from "decanter-react";
import { dcnb } from "cnbuilder";
import {
  smallPaddingTop,
  smallPaddingBottom,
} from "../../utilities/dataSource";

const Heading = ({
  blok: { title, fontSize, headingLevel, spacingBottom, spacingTop },
}) => {
  const paddingTop = smallPaddingTop[spacingTop] ?? smallPaddingTop.lg;
  const paddingBottom =
    smallPaddingBottom[spacingBottom] ?? smallPaddingBottom.lg;

  return (
    <DecanterHeading
      level={parseInt(headingLevel, 10) || 2}
      size={fontSize === "default" ? null : fontSize}
      font="serif"
      weight="bold"
      className={dcnb(paddingTop, paddingBottom)}
    >
      {title}
    </DecanterHeading>
  );
};

export default Heading;
