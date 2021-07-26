import React from 'react'
import CreateBloks from "../../utilities/createBloks";

const VerticalNavWrapper = ({blok: {items}}) => {
  
  return (
    <nav className='su-my-20' aria-label="Vertical Menu">
      <ul className='su-list-none su-p-0'>
        <CreateBloks blokSection={items} />
      </ul>
    </nav>
  )
}

export default VerticalNavWrapper;