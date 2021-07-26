import React from 'react'
import CreateBloks from "../../utilities/createBloks";
import CreateStories from '../../utilities/createStories'


const VerticalNav = ({blok}) => {
  console.log(blok)
  return (
    <nav>
      <CreateStories blokSection={blok} />
    </nav>
  )
}

export default VerticalNav;