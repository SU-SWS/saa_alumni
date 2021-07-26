import React from 'react'
import CreateBloks from "../../utilities/createBloks";

const VerticalNavWrapper = ({blok: {items}}) => {
  return (
    <ul className='su-list-none su-py-12'>
      
      <CreateBloks blokSection={items} />
    </ul>
  )
}

export default VerticalNavWrapper;