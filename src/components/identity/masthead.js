import React from "react";
import SbEditable from "storyblok-react";
import { Container, FlexBox, FlexCell } from "decanter-react";
import { Link } from "gatsby";
import CreateBloks from "../../utilities/createBloks";
import SearchBar from "../search/searchBar";

const Masthead = ({ blok: { mainNav, utilityNav }, blok }) => (
  <SbEditable content={blok}>
    <Container
      className="masthead su-relative xl:su-absolute su-z-20"
      width="full"
    >
      <FlexBox direction="row">
        <FlexCell className="su-cc xl:su-pr-30 2xl:su-pr-70 su-rs-pt-5 su-rs-pb-3 su-ml-0 su-bg-gradient-to-b su-from-digital-red su-to-cardinal-red ">
          <Link to="/" className="su-block su-w-fit">
            <img
              src="/images/saa-logo-white.svg"
              className="su-w-[18rem] 2xl:su-w-[26rem]"
              alt="Stanford Alumni Association"
            />
          </Link>
        </FlexCell>
        <FlexCell
          grow
          className="su-flex su-flex-col su-cc xl:su-pl-30 2xl:su-pl-61 su-mr-0 su-bg-gradient-to-b su-from-masthead-black-top su-to-masthead-black-bottom su-backface-hidden"
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
          <CreateBloks blokSection={mainNav} />
        </FlexCell>
      </FlexBox>
    </Container>
  </SbEditable>
);

export default Masthead;
