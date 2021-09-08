import React from "react";
import SbEditable from "storyblok-react";
import {
  Container,
  FlexBox,
  FlexCell,
  Heading,
  SrOnlyText,
} from "decanter-react";
import { ArrowDownIcon } from "@heroicons/react/outline";
import { dcnb } from "cnbuilder";
import FullWidthImage from "../media/fullWidthImage";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const Hero = ({
  blok: {
    headlineSize,
    isDarkGradient,
    imageFocus,
    cta,
    image: { filename, focus } = {},
    sansSuper,
    sansSub,
    serifSuper,
    headline,
    isHideScroll,
  },
  blok,
}) => {
  let heroHeadlineSize = "md:su-text-m5 lg:su-text-m7 su-mx-auto su-max-w-900";

  if (headlineSize === "large") {
    heroHeadlineSize = "md:su-text-m6 lg:su-text-m8";
  } else if (headlineSize === "small") {
    heroHeadlineSize = "md:su-text-m5 lg:su-text-m6 su-mx-auto su-max-w-900";
  }

  let gradientFrom = "su-from-transparent";

  if (isDarkGradient) {
    gradientFrom = "su-from-black-true-opacity-20";
  }

  const numCta = getNumBloks(cta);

  return (
    <SbEditable content={blok}>
      <Container
        className="hero su-relative su-bg-saa-black lg:su-top-0"
        width="full"
      >
        {filename?.startsWith("http") && (
          <figure className="su-absolute su-top-0 su-overflow-hidden su-w-full su-h-full">
            <FullWidthImage
              filename={filename}
              imageFocus={imageFocus}
              smartFocus={focus}
              className="su-w-full su-h-full su-object-cover"
              loading="eager"
            />
          </figure>
        )}
        <div
          className={dcnb(
            "su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-b su-to-saa-black",
            gradientFrom
          )}
          aria-hidden="true"
        />
        <Container
          className={`su-relative su-rs-pt-9 ${
            isHideScroll ? "su-rs-pb-8" : "su-rs-pb-4"
          }`}
        >
          <FlexBox direction="col" className="lg:su-mt-[190px]">
            {(sansSuper || serifSuper || headline || sansSub) && (
              <FlexCell className="su-text-center su-text-white">
                {sansSuper && (
                  <p className="su-max-w-prose su-font-semibold su-leading-display su-text-m2 su-text-shadow-md md:su-text-m4 su-mx-auto su-mb-01em">
                    {sansSuper}
                  </p>
                )}
                {serifSuper && (
                  <p className="su-max-w-prose su-font-serif su-leading-display su-text-m1 md:su-text-m2 su-text-shadow su-mx-auto su-mb-05em">
                    {serifSuper}
                  </p>
                )}
                {headline && (
                  <Heading
                    level={2}
                    font="serif"
                    weight="bold"
                    className={dcnb(
                      "su-leading-tight su-tracking-normal su-text-shadow-lg su-mb-02em su-text-m4",
                      heroHeadlineSize
                    )}
                  >
                    {headline}
                  </Heading>
                )}
                {sansSub && (
                  <p className="su-max-w-prose su-text-20 md:su-text-m1 su-leading-display su-text-shadow su-mx-auto su-mb-0">
                    {sansSub}
                  </p>
                )}
              </FlexCell>
            )}
            {numCta > 0 && (
              <FlexCell className={sansSub ? "su-rs-mt-4" : ""}>
                <CreateBloks blokSection={cta} />
              </FlexCell>
            )}
            {!isHideScroll && (
              <FlexCell
                grow={false}
                className="su-text-center su-text-white su-rs-mt-5 su-font-serif su-font-regular su-text-19 md:su-text-22"
              >
                <p className="su-mb-02em">Scroll to explore</p>
                <a
                  href="#page-title"
                  className="su-block su-mx-auto su-w-fit su-group"
                >
                  <SrOnlyText srText="Jump to main content" />
                  <ArrowDownIcon
                    className="su-transition-colors su-text-digital-red-xlight su-w-40 su-h-40 su-p-6 su-border-2 su-border-cardinal-red su-rounded-full group-hocus:su-text-white group-hocus:su-bg-cardinal-red-dark"
                    aria-hidden="true"
                  />
                </a>
              </FlexCell>
            )}
          </FlexBox>
        </Container>
      </Container>
    </SbEditable>
  );
};

export default Hero;
