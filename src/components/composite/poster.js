import React from "react";
import SbEditable from "storyblok-react";
import { Container, FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import { render } from "storyblok-rich-text-react-renderer";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CircularImage from "../media/circularImage";

const Poster = ({
  blok: {
    cta,
    borderColor,
    isBigHeadline,
    image: { filename } = {},
    imageFocus,
    headline,
    headingLevel,
    text,
    isIntroText,
    layout,
  },
  blok,
}) => {
  const numCta = getNumBloks(cta);
  const rendered = render(text);
  const numText = getNumBloks(rendered);

  let wrapperClasses = "su-bg-white su-text-black su-rs-pt-4 su-rs-pb-5";
  let imageWrapper = "";
  let contentWrapper = "su-max-w-700";
  let bodyText = "su-big-paragraph";
  let headingSpacing = "su-mb-0";

  // Option to make headline font larger
  let headlineSize = "su-type-2";

  if (isBigHeadline) {
    headlineSize = "su-type-4";
  }

  if (isIntroText) {
    bodyText = "su-subheading";
  }

  if (layout === "left") {
    wrapperClasses = dcnb(
      "su-flex su-flex-col su-justify-center md:su-flex-row",
      wrapperClasses
    );
    imageWrapper =
      "su-min-w-[14rem] su-rs-mb-2 su-mx-auto md:su-rs-mr-4 md:su-mb-0 md:su-ml-0";
    contentWrapper = dcnb("su-items-start md:su-flex-grow", contentWrapper);
  } else {
    wrapperClasses = dcnb(
      "su-flex su-flex-col su-items-center",
      wrapperClasses
    );
    contentWrapper = dcnb("su-items-center su-text-center", contentWrapper);
    imageWrapper = "su-rs-mb-2";
  }

  // If text contains content, add margin bottom to heading
  if (numText) {
    headingSpacing = "su-mb-03em";
  }

  return (
    <SbEditable content={blok}>
      <Container className={dcnb("poster su-basefont-23", wrapperClasses)}>
        {filename?.startsWith("http") && (
          <CircularImage
            borderColor={borderColor}
            filename={filename}
            imageFocus={imageFocus}
            className={imageWrapper}
            loading="lazy"
          />
        )}
        <FlexBox direction="col" className={contentWrapper}>
          <Heading
            font="serif"
            weight="bold"
            level={headingLevel ?? 2}
            className={dcnb(headingSpacing, headlineSize)}
          >
            {headline}
          </Heading>
          {numText > 0 && (
            <RichTextRenderer wysiwyg={text} className={bodyText} />
          )}
          {numCta > 0 && (
            <div className="su-rs-mt-2">
              <CreateBloks blokSection={cta} />
            </div>
          )}
        </FlexBox>
      </Container>
    </SbEditable>
  );
};

export default Poster;
