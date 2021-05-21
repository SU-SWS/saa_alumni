import React from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";

const MainNav = ({ blok: { mainMenuGroups }, blok }) => (
  <SbEditable content={blok}>
    <nav className="main-nav" aria-label="Main Menu">
      <ul>
        <CreateBloks blokSection={mainMenuGroups} />
      </ul>
    </nav>
  </SbEditable>
);

export default MainNav;
