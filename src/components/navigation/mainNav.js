import React from "react";
import SbEditable from "storyblok-react";
import { dcnb } from "cnbuilder";
import { MenuIcon } from "@heroicons/react/outline";
import CreateBloks from "../../utilities/createBloks";
import { Popover, Transition } from "@headlessui/react";

const MainNav = ({ blok: { mainMenuGroups }, blok, className }) => (
  <SbEditable content={blok}>
    <nav className={dcnb("main-nav-desktop su-hidden lg:su-block", className)} aria-label="Main Menu">
      <ul className="su-hidden lg:su-flex su-flex-col lg:su-ml-auto lg:su-flex-row lg:su-items-end su-list-unstyled children:su-mb-0">
        <CreateBloks blokSection={mainMenuGroups} />
      </ul>
    </nav>
    <Popover as="nav" className={dcnb("main-nav-mobile lg:!su-hidden", className)} aria-label="Main Menu">
      <Popover.Button className="su-flex su-flex-col su-items-center su-rs-ml-0 su-text-14 su-font-semibold lg:su-hidden">
          <MenuIcon aria-hidden="true" className="su-w-[2.4rem]" />
          Menu
      </Popover.Button>
      <Popover.Panel as="ul" className="su-absolute su-right-0 su-cc su-w-full su-bg-cardinal-red-xdark su-border-t su-border-solid su-border-digital-red-xlight su-flex su-flex-col su-list-unstyled children:su-mb-0">
        <CreateBloks blokSection={mainMenuGroups} />
      </Popover.Panel>
    </Popover>
  </SbEditable>
);

export default MainNav;
