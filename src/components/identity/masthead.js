import React from "react";
import SbEditable from "storyblok-react";
import { Container, FlexBox, FlexCell } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";
import SearchBar from "../search/searchBar";
import Logo from "./logo";

const Masthead = ({ blok: { mainNav, utilityNav }, blok }) => (
  <SbEditable content={blok}>
    <Container
      className="masthead su-relative lg:su-absolute su-z-20"
      width="full"
    >
      <FlexBox direction="row">
        <FlexCell className="lg:su-px-45 xl:su-pr-30 2xl:su-cc 2xl:su-pr-70 su-py-30 xl:su-pt-72 xl:su-pb-45 2xl:su-pb-48 2xl:su-pt-78 su-rs-pb-3 su-ml-0 su-bg-gradient-to-b su-from-digital-red su-to-cardinal-red">
          <Logo className="su-w-[18rem] lg:su-w-[20rem] 2xl:su-w-[26rem]" />
        </FlexCell>
        <FlexCell
          grow
          className="su-flex su-flex-col 2xl:su-cc xl:su-pl-30 xl:su-pr-45 2xl:su-pl-61 su-mr-0 su-bg-cardinal-red-xdark xl:su-bg-transparent xl:su-bg-gradient-to-b xl:su-from-masthead-black-top xl:su-to-masthead-black-bottom su-backface-hidden"
        >
          <FlexBox direction="row" className="su-rs-mt-0 su-flex-grow">
            <nav
              aria-label="Utility Menu"
              className="su-inline-block su-text-right su-flex-grow"
            >
              <ul className="su-list-unstyled su-inline-block su-link-white su-link-no-underline su-link-regular su-text-18 children:su-inline-block children:su-mr-[2em] su-underline-offset">
                <CreateBloks blokSection={utilityNav} hasExternalIcon />
              </ul>
            </nav>
            <SearchBar />
          </FlexBox>
          <CreateBloks blokSection={mainNav} className="su-hidden xl:su-flex" />
        </FlexCell>
      </FlexBox>
      <CreateBloks
        blokSection={mainNav}
        className="lg:su-pl-26 lg:su-flex xl:su-hidden su-rs-pt-2 su-bg-masthead-black-bottom"
      />
    </Container>
  </SbEditable>
);

export default Masthead;
