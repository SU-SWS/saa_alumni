import React from 'react'
import SbEditable from "storyblok-react"
import CreateBloks from "../utilities/createBloks";
import Footer from "./partials/footer";

const Page = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className='su-flex su-flex-col su-min-h-screen'>
        <main className='su-flex-grow'>
          <CreateBloks blokSection={props.blok.body}/>
        </main>
        <Footer {...props}/>
      </div>
    </SbEditable>
  )
}

export default Page
