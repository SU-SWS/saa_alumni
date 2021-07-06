import React from 'react'
import CreateBloks from '../../utilities/createBloks'
import { Heading } from 'decanter-react'

const LinkList = ({blok}) => {
  return (
    <div>
      <Heading level={parseInt(blok.headingLevel, 10)} size={1}>
        {blok.title}
      </Heading>
      <CreateBloks blokSection={blok.links} />
    </div>
  )
}

export default LinkList