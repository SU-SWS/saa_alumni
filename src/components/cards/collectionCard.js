import React from "react";
import SbEditable from "storyblok-react";
import GradientCard from "./gradientCard";

const CollectionCard = ({
  blok: {
    headline,
    description,
    link,
    image: { filename, focus } = {},
    tabText,
    headingLevel,
  },
  blok,
}) => (
  <SbEditable content={blok}>
    <GradientCard
      orientation="vertical"
      headline={headline}
      description={description}
      link={link}
      filename={filename}
      focus={focus}
      headingLevel={headingLevel}
      tabText={tabText}
    />
  </SbEditable>
);

export default CollectionCard;
