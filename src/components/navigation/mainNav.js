import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";

const MainNav = ({ blok: { mainMenuGroups }, blok, className }) => (
  <SbEditable content={blok}>
    <nav className={dcnb("main-nav", className)} aria-label="Main Menu">
      <ul className="su-flex su-flex-col lg:su-ml-auto lg:su-flex-row lg:su-items-end su-list-unstyled children:su-mb-0">
        <CreateBloks blokSection={mainMenuGroups} />
      </ul>
    </nav>
  </SbEditable>
);

export default MainNav;
