import React from "react";
import { dcnb } from "cnbuilder";
import { FlexBox, Heading } from "decanter-react";
import { render } from "storyblok-rich-text-react-renderer";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const BasicCardContent = ({
  headline,
  headingLevel,
  text,
  cta,
  isBigHeadline,
  isDark,
  className,
  ...props
}) => {
  const hasCta = getNumBloks(cta) > 0;
  const renderedText = render(text);
  const hasText = getNumBloks(renderedText) > 0;
  // Option to make headline font larger
  let headlineSize = "su-type-2";

  if (isBigHeadline) {
    headlineSize = "su-type-3";
  }

  return (
    <FlexBox
      direction="col"
      className={dcnb("card-body", className)}
      {...props}
    >
      <Heading
        level={parseInt(headingLevel, 10) || 3}
        font="serif"
        weight="bold"
        className={dcnb(
          "su-mb-0",
          `${isDark ? "su-text-white" : ""}`,
          headlineSize
        )}
      >
        {headline}
      </Heading>
      {hasText && (
        <RichTextRenderer
          wysiwyg={text}
          isDark={isDark}
          className="su-card-paragraph su-rs-mt-neg1 children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
        />
      )}
      {hasCta > 0 && (
        <div className="su-rs-mt-2">
          <CreateBloks blokSection={cta} />
        </div>
      )}
    </FlexBox>
  );
};

export default BasicCardContent;
