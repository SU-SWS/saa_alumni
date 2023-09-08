import React, { useState, useRef } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { dcnb } from 'cnbuilder';
import useEscape from '../../hooks/useEscape';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import CreateStories from '../../utilities/createStories';
import { isExpanded } from '../../utilities/menuHelpers';

const VerticalNav = ({ blok: { verticalNav }, className, id, pageLink }) => {
  const [navOpened, setNavOpened] = useState(false);
  const ref = useRef(null);
  const burgerRef = useRef(null);

  const toggleNav = () => {
    setNavOpened(!navOpened);
  };

  let NavIcon = MenuIcon;
  if (navOpened) {
    NavIcon = XIcon;
  }

  // Close menu if escape key is pressed and return focus to the menu button
  useEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setNavOpened(false);
      burgerRef.current.focus();
    }
  });

  useOnClickOutside(ref, () => setNavOpened(false));

  return (
    <nav
      className={dcnb(
        'su-relative',
        className,
        navOpened ? 'su-shadow-xl' : ''
      )}
      id={id}
      aria-label="Section Menu"
      ref={ref}
    >
      <button
        type="button"
        className={dcnb(
          'su-group lg:su-hidden su-w-full su-flex su-justify-between su-font-semibold su-items-center su-mt-20 su-transition-colors su-border-solid su-border su-border-black-30 su-py-12 su-px-20 hocus:su-bg-digital-red hocus:su-border-digital-red hocus:su-text-white hocus:su-shadow-lg',
          navOpened
            ? 'su-bg-digital-red su-text-white su-border-digital-red'
            : 'su-text-digital-red-light'
        )}
        onClick={toggleNav}
        aria-label={`${navOpened ? 'Close' : 'Open'} section menu`}
        aria-expanded={!!navOpened}
        ref={burgerRef}
      >
        <span>{navOpened ? 'Close' : 'Section menu'}</span>
        <NavIcon
          aria-hidden
          className="su-transition-colors su-w-[2.4rem] group-hocus:su-text-white"
        />
      </button>
      <CreateStories
        stories={verticalNav}
        className="su-hidden lg:su-block"
        pageLink={pageLink}
      />
      <CreateStories
        stories={verticalNav}
        pageLink={pageLink}
        className={dcnb(
          'lg:su-hidden su-absolute su-z-20 su-shadow-xl su-bg-white su-w-full',
          `${navOpened ? 'su-block' : 'su-hidden'}`
        )}
        aria-hidden={!navOpened}
      />
    </nav>
  );
};

export default VerticalNav;
