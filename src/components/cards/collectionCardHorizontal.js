import React from "react";
import SbEditable from "storyblok-react";
import GradientCard from "./gradientCard";

const CollectionCardHorizontal = ({
  blok: {
    headline,
    description,
    link,
    image: { filename, focus } = {},
    imageFocus,
    spacingBottom,
    headingLevel,
  },
  blok,
}) => (
  <SbEditable content={blok}>
    <GradientCard
      orientation="horizontal"
      headline={headline}
      description={description}
      link={link || ""}
      filename={filename}
      focus={focus}
      imageFocus={imageFocus}
      spacingBottom={spacingBottom}
      headingLevel={headingLevel}
      className="collection-card-horizontal"
    />
  </SbEditable>
);

export default CollectionCardHorizontal;
