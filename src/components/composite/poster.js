import React from "react";
import SbEditable from "storyblok-react";
import { FlexBox, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CircularImage from "../media/circularImage";

const Poster = ({
  blok: {
    cta,
    borderColor,
    isBigHeadline,
    image: { filename },
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

  let wrapperClasses = "su-bg-white su-text-black su-rs-pt-3 su-rs-pb-5";
  let imageWrapper = "";
  let contentWrapper = "su-max-w-700";
  let bodyText = "su-subheading";

  // Option to make headline font larger
  let headlineSize = "su-type-2";

  if (isBigHeadline) {
    headlineSize = "su-type-3";
  }

  if (isIntroText) {
    bodyText = "su-intro-text";
  }

  if (layout === "left") {
    wrapperClasses = dcnb(
      "su-flex su-flex-row su-justify-center",
      wrapperClasses
    );
    imageWrapper = "su-min-w-[14rem] su-rs-mr-4";
    contentWrapper = dcnb("su-items-start", contentWrapper);
  } else {
    wrapperClasses = dcnb(
      "su-flex su-flex-col su-items-center",
      wrapperClasses
    );
    contentWrapper = dcnb("su-items-center su-text-center", contentWrapper);
    imageWrapper = "su-rs-mb-2";
  }

  return (
    <SbEditable content={blok}>
      <div className={dcnb("su-poster su-basefont-23", wrapperClasses)}>
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
            level={headingLevel ?? 3}
            className={dcnb("su-font-serif su-bold su-mb-0", headlineSize)}
          >
            {headline}
          </Heading>
          {text && <RichTextRenderer wysiwyg={text} className={bodyText} />}
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
