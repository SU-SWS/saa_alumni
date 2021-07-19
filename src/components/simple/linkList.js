import React from "react";
import { Heading } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";

const LinkList = ({
  blok: { title, headingLevel, headingSize, headingColor, headingFont, links },
}) => (
  <div>
    <Heading
      level={parseInt(headingLevel, 10)}
      font={headingFont}
      className={`
      su-mb-30
      su-font-semibold
      ${headingColor ? `su-text-${headingColor}` : "su-text-black"}
      ${headingSize ? `su-text-${headingSize}` : "su-text-m0"}
    `}
    >
      {title}
    </Heading>
    <CreateBloks blokSection={links} />
  </div>
);

export default LinkList;
