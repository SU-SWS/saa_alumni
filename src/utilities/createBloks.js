import React from "react";
import Components from "../components/components";

// Create nested components in Storyblok

const CreateBloks = ({ blokSection, ...props }) => {
  if (blokSection) {
    return blokSection.map((blok) =>
      React.createElement(Components(blok.component), {
        // eslint-disable-next-line no-underscore-dangle
        key: blok._uid,
        blok,
        ...props,
      })
    );
  }

  // Return null if no content provided.
  return null;
};

export default CreateBloks;
