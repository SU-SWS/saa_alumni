import React from "react";
import SbEditable from "storyblok-react";
import { FlexBox, Heading } from "decanter-react";
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

  let wrapperClasses = "su-bg-white su-text-black su-cc su-rs-pt-3 su-rs-pb-5";
  let imageWrapper = "";
  let contentWrapper = "su-max-w-700";
  let bodyText = "su-subheading";
  let headingSpacing = "su-mb-0";

  // Option to make headline font larger
  let headlineSize = "su-type-2";

  if (isBigHeadline) {
    headlineSize = "su-type-4";
  }

  if (isIntroText) {
    bodyText = "su-intro-text";
  }

  if (layout === "left") {
    wrapperClasses = dcnb(
      "su-flex su-flex-col su-justify-center md:su-flex-row",
      wrapperClasses
    );
    imageWrapper =
      "su-min-w-[14rem] su-rs-mb-2 su-mx-auto md:su-rs-mr-4 md:su-mb-0 md:su-ml-0";
    contentWrapper = dcnb("su-items-start", contentWrapper);
  } else {
    wrapperClasses = dcnb(
      "su-flex su-flex-col su-items-center",
      wrapperClasses
    );
    contentWrapper = dcnb("su-items-center su-text-center", contentWrapper);
    imageWrapper = "su-rs-mb-2";
  }

  // If text contains content, add margin bottom to headingh
  if (numText) {
    headingSpacing = "su-mb-13";
  }

  return (
    <SbEditable content={blok}>
      <div className={dcnb("poster su-basefont-23", wrapperClasses)}>
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
      </div>
    </SbEditable>
  );
};

export default Poster;
