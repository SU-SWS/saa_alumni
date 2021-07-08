import React, { useState, useRef } from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import { MenuIcon } from "@heroicons/react/outline";
import { Button } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";
import UseEscape from "../../hooks/useEscape";
import UseOnClickOutside from "../../hooks/useOnClickOutside";

const MainNav = ({ blok: { mainMenuGroups }, blok, className }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <SbEditable content={blok}>
      <nav
        className={dcnb("main-nav-desktop su-hidden lg:su-block", className)}
        aria-label="Main Menu"

      >
        <ul className="su-hidden lg:su-flex su-flex-col lg:su-ml-auto lg:su-flex-row lg:su-items-end su-list-unstyled children:su-mb-0">
          <CreateBloks blokSection={mainMenuGroups} />
        </ul>
      </nav>
      <nav className="main-nav-mobile lg:su-hidden" aria-label="Main Menu">
        <Button
          variant="unset"
          size="minimal"
          className="su-group su-flex su-flex-col su-w-40 su-items-center su-rs-ml-0 su-text-14 su-font-semibold lg:su-hidden"
          onClick={toggleMenu}
          aria-expanded={menuOpened}
          aria-label={menuOpened ? "Close Menu" : "Open Menu"}
        >
          <MenuIcon
            aria-hidden="true"
            className="su-transition-colors su-w-[2.4rem] group-hocus:su-text-digital-red-xlight"
          />
          {menuOpened ? "Close" : "Menu"}
        </Button>
        <ul
          className={`${
            menuOpened ? "" : "su-hidden "
          }su-absolute su-right-0 su-top-[107px] md:su-top-[119px] su-cc su-w-full su-bg-cardinal-red-xdark su-shadow-lg su-border-t su-border-solid su-border-digital-red-xlight su-flex su-flex-col su-list-unstyled children:su-mb-0`}
          aria-hidden={!menuOpened}
        >
          <CreateBloks blokSection={mainMenuGroups} />
        </ul>
      </nav>
    </SbEditable>
  );
};

export default MainNav;
