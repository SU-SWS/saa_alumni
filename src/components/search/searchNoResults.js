import React from 'react'
import CreateBloks from "../../utilities/createBloks";

const SearchNoResults = ({heading, body, additionalContent}) => {
  // TODO: Replace hard-coded markup with values from Storyblok.
  return (
    <div>
      <h2>{heading}</h2>
      <div>{body}</div>
      
      <div>
        <CreateBloks blokSection={additionalContent} />
      </div>
    </div>
  )
}

export default SearchNoResults