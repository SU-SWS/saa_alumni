import React, { useState } from 'react'
import { useStaticQuery, graphql } from "gatsby";
import VerticalNavWrapper from "./verticalNavWrapper";

const VerticalNav = ({vertical_nav}) => {
  const data = useStaticQuery(graphql`
    {
      storyblokEntry(uuid: { eq: "20d82df6-b631-4f94-aa52-83633a8133ea" }) {
        content
      }
    }
  `);

  let story;
  let content;
  
  if (data) {
    story = data.storyblokEntry;
    content = JSON.parse(story.content);
  }

  const [toggleNav, setToggleNav]=useState(true)
  const showNav=()=> setToggleNav(!toggleNav);

  return (
    <>
      <button className="sm:su-hidden su-w-full su-text-center su-mt-20" onClick={showNav} 
      aria-label='Open section menu' 
      aria-expanded={toggleNav ? true : false}>
        Section Menu</button>
      {toggleNav && <VerticalNavWrapper className="su-hidden sm:su-block" blok={content} />}
    </>
  )
}

export default VerticalNav;