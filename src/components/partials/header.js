import React from "react";
import SbEditable from "storyblok-react";
import { Container, Skiplink } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";
import GlobalAlert from "../composite/globalAlert";

/**
 * The Header component is referenced and used in the Layout component.
 * It incorporates the Local Header and the skip link, based on page settings.
 */

const Header = ({ blok: { masthead, alert }, blok, hasHero, isDark }) => (
  <SbEditable content={blok}>
    <GlobalAlert />
    <CreateBloks blokSection={alert} />
    <Container element="header" width="full" className="su-relative su-z-20">
      <Skiplink />
      <CreateBloks blokSection={masthead} hasHero={hasHero} isDark={isDark} />
    </Container>
  </SbEditable>
);

export default Header;
