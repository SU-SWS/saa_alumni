import React from 'react'
import SbLink from '../../utilities/sbLink';
import CreateBloks from "../../utilities/createBloks";

const VerticalNavItem = ({blok: {text, link, child_items, is_top_level}}) => {
  
  // Check if current link is active
  const isActive = window.location.href.indexOf(link.cached_url) > -1 ? true : false;

  return (
      <li className={`${ is_top_level ? "su-border-t su-border-solid su-border-gray su-basefont-21 su-py-12" : "su-py-4" } su-m-0 su-basefont-20`}>
        <SbLink
        classes={`su-no-underline su-py-2 su-block su-pl-15 su-transition-all hover:su-text-black ${ isActive ? "su-text-black su-border-l-4 su-border-black-90 " : "" }`}
        link={link}
      >
        {text}
      </SbLink>
        
        {!!child_items.length && isActive &&
        <ul className={`${ is_top_level ? "su-py-12" : "" } su-list-none su-pl-30`}>
          <CreateBloks blokSection={child_items} />
          </ul>
        }
      </li>
  )
}

export default VerticalNavItem;