import React from "react";
import { Heading } from "decanter-react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";
import {
  largePaddingTop,
  largePaddingBottom,
} from "../../utilities/dataSource";

const SearchSuggestions = ({
  blok: { content, title, titleColor, spacingTop, spacingBottom },
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
        font="serif"
        size={2}
        level={3}
        className={dcnb(
          "su-rs-mb-3",
          `${titleColor === "white" ? "su-text-white" : "su-text-black"}`
        )}
      >
        {title}
      </Heading>
      {content && <CreateBloks blokSection={content} />}
    </div>
  </SbEditable>
);

export default SearchSuggestions;
