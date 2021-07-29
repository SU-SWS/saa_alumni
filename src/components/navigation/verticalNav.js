import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import VerticalNavWrapper from "./verticalNavWrapper";

const VerticalNav = ({ blok: { verticalNav }, className }) => {
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
      className={`${
        navOpened ? "su-shadow-xl" : ""
      } 
      ${className}
      su-relative su-mx-20 su-my-20`}
      aria-label="Section Menu"
    >
      <button
        type="button"
        className="lg:su-hidden su-w-full su-flex su-justify-between su-font-semibold su-items-center su-mt-20"
        onClick={toggleNav}
        aria-label={`${navOpened ? "Close" : "Open"} section menu`}
        aria-expanded={!!navOpened}
      >
        <span>{navOpened ? "Close" : "Section menu"}</span>
        <NavIcon
          aria-hidden="true"
          className="su-transition-colors su-w-[2.4rem] group-hocus:su-text-digital-red-xlight"
        />
      </button>
      {typeof verticalNav[0].content !== `undefined` && (
        <VerticalNavWrapper
          className="su-hidden lg:su-block"
          blok={verticalNav[0].content}
        />
      )}

      {navOpened && typeof verticalNav[0].content !== `undefined` && (
        <VerticalNavWrapper
          className="lg:su-hidden su-block su-absolute su-z-20 su-shadow-xl su-bg-white su-w-full"
          blok={verticalNav[0].content}
        />
      )}
    </nav>
  );
};

export default VerticalNav;
