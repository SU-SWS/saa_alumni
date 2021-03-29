import React from "react";
import SbEditable from "storyblok-react";
import { Heading } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";

const LinkGroup = (props) => {
  let numLinks = getNumBloks(props.blok.linkList);

  return (
    <SbEditable content={props.blok}>
      <div className={props.classes}>
        {props.blok.heading &&
          <Heading level={3} font='serif' weight='bold' className='su-text-20'>{props.blok.heading}</Heading>
        }
        {props.blok.text &&
          <p className='last:su-mb-0'>{props.blok.text}</p>
        }
        {numLinks > 0 &&
          <ul className='su-list-unstyled'>
            <CreateBloks blokSection={props.blok.linkList}/>
          </ul>
        }
      </div>
    </SbEditable>
  )
}

export default LinkGroup;
