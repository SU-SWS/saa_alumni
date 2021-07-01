import React from 'react'
import CreateBloks from '../../utilities/createBloks'

const LinkList = ({blok}) => {
  return (
    <div>
      <div className="su-font-bold su-text-21 su-mb-32">{blok.title}</div>
      <CreateBloks blokSection={blok.links} />
    </div>
  )
}

export default LinkList