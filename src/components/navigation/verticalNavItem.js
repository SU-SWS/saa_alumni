import React from "react";
import SbLink from "../../utilities/sbLink";
import CreateBloks from "../../utilities/createBloks";

const VerticalNavItem = ({
  blok: { text, link, childItems },
  showNestedLevels,
}) => {

  let isActive;
  const isBrowser = typeof window !== "undefined";
 
  // Check is browser and if current link is active
  if (isBrowser) {
     isActive = window.location.href.indexOf(link.cached_url) > -1;
  }

  return (
    <li className="su-m-0">
      <SbLink
        classes={`su-no-underline su-border-l-4 su-py-14 su-block su-pl-10 su-transition-all hover:su-text-cardinal-red-xdark hover:su-border-cardinal-red-xdark hover:su-underline focus:su-text-cardinal-red-xdark focus:su-border-cardinal-red-xdark focus:su-underline 
        ${isActive ? "su-text-black su-border-black-90 " : "su-border-white"}
        `}
        link={link}
      >
        {text}
      </SbLink>

      {((!!childItems.length && isActive) ||
        (!!childItems.length && showNestedLevels)) && (
        <ul className="su-pb-15 su-list-none su-pl-20 children:children:su-py-6 children:children:su-text-20">
          <CreateBloks blokSection={childItems} />
        </ul>
      )}
    </li>
  );
};

export default VerticalNavItem;
