import React from "react";
import SbEditable from "storyblok-react";
import { Container, Grid, GridCell } from "decanter-react";
import { Link } from "gatsby";
import CreateBloks from "../../utilities/createBloks";

const Masthead = ({ blok: { mainNav, utilityNav }, blok }) => (
  <SbEditable content={blok}>
    <Container
      className="masthead su-relative xl:su-absolute su-z-20"
      width="full"
    >
      <div className="su-bg-gradient-to-b su-from-digital-red su-to-cardinal-red">
        <Link
          to="/"
          className="su-block su-w-fit su-pl-20 sm:su-pl-30 md:su-pl-50 lg:su-pl-80 xl:su-pl-[100px] su-rs-pt-5 su-rs-pb-3"
        >
          <img
            src="/images/saa-logo-white.svg"
            className="su-w-[18rem] xl:su-w-[25rem] 2xl:su-w-[28rem]"
            alt="Stanford Alumni Association"
          />
        </Link>
        <CreateBloks blokSection={utilityNav} />
        <CreateBloks blokSection={mainNav} />
      </div>
    </Container>
  </SbEditable>
);

export default Masthead;
