import React from "react";
import SbEditable from "storyblok-react";
import { Container, FlexBox, FlexCell } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";
import Logo from "./logo";
import OpenSearchModalButton from "../search/openSearchModalButton";

const Masthead = ({ blok: { mainNav, utilityNav }, blok, hasHero }) => (
  <SbEditable content={blok}>
    <Container
      width="full"
      className="masthead-mobile su-relative lg:su-hidden su-bg-cardinal-red-xdark"
    >
      <nav
        aria-label="Utility Menu"
        className="su-w-full su-text-right su-bg-digital-red"
      >
        <ul className="su-cc su-list-unstyled su-inline-block su-link-white su-link-no-underline su-link-regular su-text-14 sm:su-text-16 children:su-inline-block children:su-ml-[2em] children:su-mb-0 children:su-leading-[4rem] su-underline-offset">
          <CreateBloks blokSection={utilityNav} hasExternalIcon />
        </ul>
      </nav>
    </Container>
    <Container
      className={`masthead-desktop su-hidden lg:su-block ${
        hasHero ? "su-absolute" : "su-relative"
      }  su-z-20`}
      width="full"
    >
      <FlexBox direction="row">
        <FlexCell className="su-flex su-items-center lg:su-px-30 xl:su-items-end xl:su-pl-61 xl:su-pr-45 2xl:su-pr-45 2xl:su-cc 3xl:su-pr-70 xl:su-pb-38 su-ml-0 su-bg-gradient-to-b su-to-digital-red su-from-cardinal-red">
          <Logo className="su-w-[18rem] lg:su-w-[20rem] xl:su-w-[19vw] 2xl:su-w-[26rem]" />
        </FlexCell>
        <FlexCell
          grow
          className="su-flex su-flex-col su-cc 2xl:su-cc lg:su-pr-30 xl:su-pr-61 xl:su-pl-30 2xl:su-pl-61 su-mr-0 su-bg-cardinal-red-xdark xl:su-bg-transparent xl:su-bg-gradient-to-b xl:su-from-masthead-black-top xl:su-to-masthead-black-bottom su-backface-hidden"
        >
          <FlexBox
            direction="row"
            className="su-rs-my-0 xl:su-mb-0 su-flex-grow"
          >
            <nav
              aria-label="Utility Menu"
              className="su-inline-block su-text-right su-flex-grow"
            >
              <ul className="su-list-unstyled su-inline-block su-link-white su-link-no-underline su-link-regular su-text-18 children:su-inline-block children:su-leading-[3.4rem] children:su-mr-[2em] children:su-mb-0 su-underline-offset">
                <CreateBloks blokSection={utilityNav} hasExternalIcon />
              </ul>
            </nav>
            <OpenSearchModalButton />
          </FlexBox>
          <CreateBloks
            blokSection={mainNav}
            className="su-hidden xl:su-flex xl:su-mt-12 2xl:su-mt-27"
          />
        </FlexCell>
      </FlexBox>
      <CreateBloks
        blokSection={mainNav}
        className="su-flex xl:su-hidden su-pl-26 su-rs-pt-2 su-bg-masthead-black-bottom"
      />
    </Container>
  </SbEditable>
);

export default Masthead;
