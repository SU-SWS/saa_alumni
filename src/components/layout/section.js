import React from "react";
import SbEditable from "storyblok-react";
import { Container, Heading } from "decanter-react";
import { dcnb } from "cnbuilder";
import { render } from "storyblok-rich-text-react-renderer";
import CreateBloks from "../../utilities/createBloks";
import RichTextRenderer from "../../utilities/richTextRenderer";
import getNumBloks from "../../utilities/getNumBloks";
import {
  largePaddingTop,
  largePaddingBottom,
  bgTextColorPairs,
} from "../../utilities/dataSource";
import SbLink from "../../utilities/sbLink";

const Section = ({
  blok: {
    superhead,
    superLink,
    title,
    headingLevel,
    intro,
    cta,
    content,
    isLeftAlign,
    isSmallTitle,
    isSrOnlyTitle,
    isLessHeaderSpacing,
    bgColor,
    spacingTop,
    spacingBottom,
    id,
  },
  blok,
}) => {
  const numCta = getNumBloks(cta);
  const renderedIntro = render(intro);
  const numIntro = getNumBloks(renderedIntro);
  const hasHeader = (title && !isSrOnlyTitle) || numIntro > 0 || superhead;

  const sectionBgColor = bgTextColorPairs[bgColor] ?? bgTextColorPairs.white;
  let alignment = "su-text-center";
  let bodyAlign = "su-mx-auto";
  let headlineAlign = "su-mx-auto";

  let superLinkColor =
    "su-text-black hocus:su-text-saa-electric-blue su-border-saa-electric-blue";

  let isDarkSection = false;

  if (bgColor === "black") {
    superLinkColor =
      "su-text-white hocus:su-text-saa-electric-blue-light su-border-saa-electric-blue-light";
    isDarkSection = true;
  }

  let headlineSize = "su-type-4 lg:su-type-5";

  if (isSmallTitle) {
    headlineSize = "su-type-3";
  }

  let headerSpacing = "su-rs-mb-5";

  if (isLessHeaderSpacing) {
    headerSpacing = "su-rs-mb-3";
  }

  if (isLeftAlign) {
    alignment = "su-text-left";
    bodyAlign = "";
    headlineAlign = "su-ml-0";
  }

  const paddingTop = largePaddingTop[spacingTop] ?? largePaddingTop.lg;
  const paddingBottom =
    largePaddingBottom[spacingBottom] ?? largePaddingBottom.lg;

  return (
    <SbEditable content={blok}>
      <section
        className={dcnb(
          "section su-basefont-23",
          sectionBgColor,
          paddingTop,
          paddingBottom
        )}
        id={id}
      >
        {hasHeader && (
          <header className={dcnb("su-cc", alignment, headerSpacing)}>
            {superhead && (
              <SbLink
                link={superLink}
                classes={dcnb(
                  "su-inline-block su-rs-mb-6 su-pb-6 su-no-underline su-gradient-border su-border-to-r-palo-verde-dark-to-saa-electric-blue su-border-b-[4px] su-border-solid su-transition-colors hocus:su-no-gradient-border",
                  superLinkColor
                )}
              >
                {superhead}
              </SbLink>
            )}
            {title && (
              <Heading
                level={parseInt(headingLevel, 10) ?? 2}
                font="serif"
                weight="bold"
                className={dcnb(
                  "su-mb-02em su-max-w-800",
                  headlineAlign,
                  headlineSize
                )}
                srOnly={isSrOnlyTitle}
              >
                {title}
              </Heading>
            )}
            {numIntro > 0 && (
              <div
                className={dcnb("su-big-paragraph su-max-w-prose", bodyAlign)}
              >
                <RichTextRenderer
                  wysiwyg={intro}
                  className="children:su-leading-display"
                  isDark={isDarkSection}
                />
              </div>
            )}
          </header>
        )}
        <CreateBloks blokSection={content} isDark={isDarkSection} />
        {numCta > 0 && (
          <Container width="site" className="su-rs-mt-6">
            <CreateBloks blokSection={cta} />
          </Container>
        )}
      </section>
    </SbEditable>
  );
};

export default Section;
