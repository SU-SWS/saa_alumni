import React from "react";
import SbEditable from "storyblok-react";
import { Container, FlexBox, FlexCell } from "decanter-react";
import { Link } from "gatsby";
import CreateBloks from "../../utilities/createBloks";

const Masthead = ({ blok: { mainNav, utilityNav }, blok }) => (
  <SbEditable content={blok}>
    <Container
      className="masthead su-relative xl:su-absolute su-z-20"
      width="full"
    >
      <FlexBox direction="row">
        <FlexCell className="su-cc xl:su-pr-38 2xl:su-pr-90 su-rs-pt-5 su-rs-pb-3 su-ml-0 su-bg-gradient-to-b su-from-digital-red su-to-cardinal-red ">
          <Link to="/" className="su-block su-w-fit">
            <img
              src="/images/saa-logo-white.svg"
              className="su-w-[18rem] xl:su-w-[21rem] 2xl:su-w-[28rem]"
              alt="Stanford Alumni Association"
            />
          </Link>
        </FlexCell>
        <FlexCell
          grow
          className="su-cc 2xl:su-pl-80 su-mr-0 su-bg-gradient-to-b su-from-masthead-black-top su-to-masthead-black-bottom su-backface-hidden"
        >
          <nav aria-label="Utility Menu" className="su-rs-mt-0 su-text-right">
            <ul className="su-list-unstyled su-inline-block su-link-white su-link-no-underline su-link-regular su-text-18 children:su-inline-block children:su-mr-[2em] su-underline-offset">
              <CreateBloks blokSection={utilityNav} />
            </ul>
            <form className="su-inline-block">
              <label className="su-sr-only">Search Stanford Alumni</label>
              <input
                type="text"
                className="su-inline-block su-site-search__input"
                placeholder="Search"
              />
              <button
                value="Search"
                type="submit"
                name="submit"
                className="su-sr-only"
                aria-label="Search"
              >
                Submit Search
              </button>
            </form>
          </nav>
          <CreateBloks blokSection={mainNav} />
        </FlexCell>
      </FlexBox>
    </Container>
  </SbEditable>
);

export default Masthead;
