import React, { useState } from 'react'
import VerticalNavWrapper from "./verticalNavWrapper";

const VerticalNav = ({blok: {vertical_nav}}) => {

  // TODO: Add breakpoint function to toggle state of navigation based on the screensize
  const [toggleNav, setToggleNav]=useState(true)
  const showNav=()=> setToggleNav(!toggleNav);

  return (
    <>
      <button className="sm:su-hidden su-w-full su-text-center su-mt-20" onClick={showNav} 
      aria-label='Open section menu' 
      aria-expanded={toggleNav ? true : false}>
        Section Menu</button>
      {toggleNav && <VerticalNavWrapper className="su-hidden sm:su-block" blok={vertical_nav[0].content} />}
    </>
  )
}

export default VerticalNav;