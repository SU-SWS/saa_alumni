import React, { useState, useRef } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { dcnb } from "cnbuilder";
import VerticalNavWrapper from "./verticalNavWrapper";
import UseEscape from "../../hooks/useEscape";
import UseOnClickOutside from "../../hooks/useOnClickOutside";

const VerticalNav = ({ blok: { verticalNav }, className }) => {
  const [navOpened, setNavOpened] = useState(false);
  const ref = useRef(null);
  const burgerRef = useRef(null);

  const toggleNav = () => {
    setNavOpened(!navOpened);
  };

  const isExpanded = (x) => x.getAttribute("aria-expanded") === "true";

  let NavIcon = MenuIcon;
  if (navOpened) {
    NavIcon = XIcon;
  }

  // Close menu if escape key is pressed and return focus to the menu button
  UseEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setNavOpened(false);
      burgerRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setNavOpened(false));

  return (
    <nav
      className={dcnb(
        "su-relative",
        className,
        navOpened ? "su-shadow-xl" : ""
      )}
      aria-label="Section Menu"
      ref={ref}
    >
      <button
        type="button"
        className={dcnb(
          "lg:su-hidden su-w-full su-flex su-justify-between su-font-semibold su-items-center su-mt-20 su-border-solid su-border su-border-black-30-opacity-40 su-py-12 su-px-20 hocus:su-bg-digital-red hocus:su-text-white",
          navOpened
            ? "su-bg-digital-red su-text-white"
            : "su-text-digital-red-xlight"
        )}
        onClick={toggleNav}
        aria-label={`${navOpened ? "Close" : "Open"} section menu`}
        aria-expanded={!!navOpened}
        ref={burgerRef}
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

      {typeof verticalNav[0].content !== `undefined` && (
        <VerticalNavWrapper
          className={`${
            navOpened ? "su-block" : "su-hidden"
          } lg:su-hidden su-block su-absolute su-z-20 su-shadow-xl su-bg-white su-w-full`}
          blok={verticalNav[0].content}
          aria-hidden={!navOpened}
        />
      )}
    </nav>
  );
};

export default VerticalNav;
