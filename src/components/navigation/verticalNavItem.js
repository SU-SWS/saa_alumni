import React from 'react'
import SbLink from '../../utilities/sbLink';
import CreateBloks from "../../utilities/createBloks";
const isChild = false;

const VerticalNavItem = ({blok: {text, link, child_items, is_top_level}}) => {
  
  // Check if current link is act
  const isActive = window.location.href.indexOf(link.cached_url) > -1 ? true : false;
  return (
      <li className={`${ is_top_level ? "su-border-t su-border-solid su-border-gray su-basefont-21" : "" } 
      su-m-0 su-basefont-20 su-py-6`}>
        <SbLink
        classes={`${ isActive ? "su-text-black su-border-l-3 su-border-solid u-border-black-90" : "" } su-no-underline su-py-2 su-block su-pl-15`}
        link={link}
      >
        {text}
      </SbLink>
        
        {!!child_items.length && isActive &&
        <ul className='su-list-none su-pl-30'>
          <CreateBloks blokSection={child_items} />
          </ul>
        }
      </li>
  )
}

export default VerticalNavItem;