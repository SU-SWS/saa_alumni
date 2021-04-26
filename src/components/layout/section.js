import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import { Heading } from 'decanter-react';
import { bgColors } from '../../utilities/dataSource';
import SbLink from '../../utilities/sbLink';

const Section = (props) => {
  const bgColor = bgColors[props.blok.bgColor] ?? bgColors['white'];

  return (
    <SbEditable content={props.blok}>
      <section className={`section su-text-center ${bgColor}`}>
        {props.blok.superhead &&
          <SbLink link={props.blok.superLink}>
            {props.blok.superhead}
          </SbLink>
        }
        {props.blok.title &&
          <Heading level={1}
                   font='serif'
                   weight='bold'
                   className={`su-mb-04em su-type-5`}
          >
            {props.blok.title}
          </Heading>
        }
        <div className='su-text-m1 su-max-w-prose su-mx-auto'>
          <RichTextRenderer wysiwyg={props.blok.intro}/>
        </div>
      </section>
    </SbEditable>
  );
};

export default Section;
