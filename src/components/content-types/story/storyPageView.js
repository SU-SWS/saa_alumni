import SbEditable from "storyblok-react";
import React from "react";
import { Container, Heading } from "decanter-react";
import Layout from "../../partials/layout";
import CreateBloks from "../../../utilities/createBloks";
import FullWidthImage from "../../media/fullWidthImage";
import getNumBloks from "../../../utilities/getNumBloks";
import RichTextRenderer from "../../../utilities/richTextRenderer";
import WidthBox from "../../layout/widthBox";

const StoryPageView = (props) => {
  // Destructure props
  const {
    blok: {
      image: { filename, alt } = {},
      imageFocus,
      caption,
      title,
      intro,
      author,
      publishedDate,
      manualDate,
      content,
      belowContent,
    },
    blok,
  } = props;

  const numBelow = getNumBloks(belowContent);

  return (
    <SbEditable content={blok}>
      <Layout {...props}>
        <Container
          element="main"
          id="main-content"
          className="story-page su-relative su-flex-grow su-w-full su-basefont-23"
          width="full"
        >
          <article>
            <header className="su-basefont-23">
              <Container className="su-rs-py-7 su-rs-py-4">
                <Heading
                  level={1}
                  align="center"
                  font="serif"
                  className="su-max-w-900 su-mb-0 su-text-m3 md:su-text-m4 lg:su-text-m5 su-mx-auto su-max-w-1200"
                >
                  {title}
                </Heading>
                {intro && (
                  <p className="su-font-serif su-text-m1 su-leading-snug su-text-center su-max-w-prose su-mx-auto">
                    {intro}
                  </p>
                )}
              </Container>
              {filename?.startsWith("http") && (
                <figure className="su-rs-mb-5">
                  <div className="su-relative su-overflow-hidden su-w-full md:su-h-500 lg:su-h-700 xl:su-h-900">
                    <FullWidthImage
                      filename={filename}
                      imageFocus={imageFocus}
                      alt={alt ?? ""}
                      className="su-w-full su-h-full su-object-cover"
                      loading="eager"
                    />
                  </div>
                  {caption && (
                    <figcaption className="su-cc">
                      <RichTextRenderer
                        wysiwyg={caption}
                        className="su-caption su-max-w-prose su-mt-06em su-mr-0 su-ml-auto su-text-right children:su-leading-snug"
                      />
                    </figcaption>
                  )}
                </figure>
              )}
              {author && (
                <WidthBox width="8">
                  <p className="su-mb-0 su-font-serif">
                    <span className="su-italic">by</span> {author}
                  </p>
                </WidthBox>
              )}
            </header>
            <div className="story-content su-rs-mt-4 su-rs-mb-7">
              <CreateBloks blokSection={content} />
            </div>
            {numBelow > 0 && (
              <div className="basic-page-below-content">
                <CreateBloks blokSection={belowContent} />
              </div>
            )}
          </article>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default StoryPageView;
