import SbEditable from "storyblok-react";
import React from "react";
import { Heading } from "decanter-react";
import CardImage from "../../media/cardImage";
import Layout from "../../partials/layout";

const PerkPageView = (props) => {
  // Destructure props
  const {
    blok: {
      image: { filename } = {},
      imageFocus,
      isNew,
      title,
      intro,
      externalUrl,
    },
    blok,
  } = props;

  return (
    <SbEditable content={blok}>
      <Layout {...props}>
        <article className="perk-page">
          <Heading level={1}>{title}</Heading>
          {filename?.startsWith("http") && (
            <div className="su-max-w-800">
              <div className="perk-image-wrapper su-aspect-w-4 su-aspect-h-3">
                <figure className="su-overflow-hidden su-w-full su-h-full">
                  <CardImage
                    filename={filename}
                    imageFocus={imageFocus}
                    className="su-w-full su-h-full su-object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>
          )}
          <p>{intro}</p>
        </article>
      </Layout>
    </SbEditable>
  );
};

export default PerkPageView;
