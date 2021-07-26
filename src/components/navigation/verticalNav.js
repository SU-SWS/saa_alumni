import React from 'react'
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

  return (
    <VerticalNavWrapper blok={content} />
  )
}

export default VerticalNav;