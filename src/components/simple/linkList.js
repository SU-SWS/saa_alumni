import React from 'react'
import CreateBloks from '../../utilities/createBloks'

const LinkList = ({blok}) => {
  return (
    <div>
      <div>{blok.title}</div>
      <CreateBloks blokSection={blok.links} />
    </div>
  )
}

export default LinkList