import React from 'react'
import SbEditable from "storyblok-react"
import CreateBloks from "../utilities/createBloks";
import Footer from "./partials/footer";
import RichTextRenderer from "../utilities/richTextRenderer";

const Page = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className='su-flex su-flex-col su-min-h-screen'>
        <header>
          <h1>{props.blok.title}</h1>
          <RichTextRenderer wysiwyg={props.blok.intro} />
        </header>
        <main className='su-flex-grow'>
          <CreateBloks blokSection={props.blok.body}/>
        </main>
        <Footer {...props}/>
      </div>
    </SbEditable>
  )
}

export default Page
