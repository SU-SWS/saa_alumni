import React from 'react'
import CreateBloks from "../../utilities/createBloks";
import { dcnb } from "cnbuilder";

const VerticalNavWrapper = ({blok: {items}}) => {
  
  return (
    <nav className='su-my-20' aria-label="Vertical Menu">
      <ul class='su-list-none su-p-0'>
        <CreateBloks blokSection={items} />
      </ul>
    </nav>
  )
}

export default VerticalNavWrapper;