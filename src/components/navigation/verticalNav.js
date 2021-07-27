import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import VerticalNavWrapper from "./verticalNavWrapper";

const VerticalNav = ({ blok: { verticalNav } }) => {
  const [navOpened, setNavOpened] = useState(false);
  const toggleNav = () => {
    setNavOpened(!navOpened);
  };

  let NavIcon = MenuIcon;
  if (navOpened) {
    NavIcon = XIcon;
  }

  return (
    <nav
      className={`${navOpened ? "su-shadow-lg" : ""}  su-my-20`}
      aria-label="Vertical Menu"
    >
      <button
        type="button"
        className="lg:su-hidden su-w-full su-flex su-justify-between su-font-semibold su-items-center su-mt-20"
        onClick={toggleNav}
        aria-label="Open section menu"
        aria-expanded={!!navOpened}
      >
        <span>{navOpened ? "Close" : "Section menu"}</span>
        <NavIcon
          aria-hidden="true"
          className="su-transition-colors su-w-[2.4rem] group-hocus:su-text-digital-red-xlight"
        />
      </button>
      <VerticalNavWrapper
        className="su-hidden lg:su-block desktop-menu"
        blok={verticalNav[0].content}
      />

      {navOpened && (
        <VerticalNavWrapper
          className="lg:su-hidden su-block mobile-menu"
          blok={verticalNav[0].content}
        />
      )}
    </nav>
  );
};

export default VerticalNav;
