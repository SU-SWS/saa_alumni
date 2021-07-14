import React from "react";
import { Heading } from "decanter-react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";
import {
  largePaddingTop,
  largePaddingBottom,
} from "../../utilities/dataSource";

const SearchSuggestions = ({
  blok: { content, title, titleColor, titleFont, spacingTop, spacingBottom },
  blok,
}) => (
  <SbEditable content={blok}>
    <div
      className={`
      ${largePaddingTop[spacingTop]}
      ${largePaddingBottom[spacingBottom]}
    `}
    >
      <Heading
        font={titleFont}
        size={1}
        level={3}
        className={`
        ${titleColor ? `su-text-${titleColor}` : `su-text-black`}
      `}
      >
        {title}
      </Heading>
      {content && <CreateBloks blokSection={content} />}
    </div>
  </SbEditable>
);

export default SearchSuggestions;
