import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import { Button } from "decanter-react";
import { MenuIcon } from "@heroicons/react/outline";
import CreateBloks from "../../utilities/createBloks";

const MainNav = ({ blok: { mainMenuGroups }, blok, className }) => (
  <SbEditable content={blok}>
    <nav className={dcnb("main-nav", className)} aria-label="Main Menu">
      <Button
        variant="unset"
        size="minimal"
        className="su-flex su-flex-col su-items-center su-rs-ml-0 su-text-14 su-font-semibold lg:su-hidden"
      >
        <MenuIcon aria-hidden="true" className="su-w-[2.4rem]" />
        Menu
      </Button>
      <ul className="su-hidden lg:su-flex su-flex-col lg:su-ml-auto lg:su-flex-row lg:su-items-end su-list-unstyled children:su-mb-0">
        <CreateBloks blokSection={mainMenuGroups} />
      </ul>
    </nav>
  </SbEditable>
);

export default MainNav;
