import React from 'react'
import CreateBloks from "../../utilities/createBloks";
import CreateStories from '../../utilities/createStories'
import { StaticQuery, graphql } from "gatsby";

const VerticalNav = ({blok}) => {
  console.log(blok)
  return (
    <nav>
      <CreateStories blokSection={blok} />
    </nav>
  )
}

export default VerticalNav;