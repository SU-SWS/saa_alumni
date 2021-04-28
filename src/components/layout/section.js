import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import { Heading } from 'decanter-react';
import { bgColors } from '../../utilities/dataSource';
import SbLink from '../../utilities/sbLink';
import { dcnb } from 'cnbuilder';

const Section = (props) => {
  const bgColor = bgColors[props.blok.bgColor] ?? bgColors['white'];

  let superLinkColor = 'su-text-black hocus:su-text-saa-electric-blue su-border-saa-electric-blue';

  if (props.blok.bgColor === 'black') {
    superLinkColor = 'su-text-white hocus:su-text-saa-electric-blue-light su-border-saa-electric-blue-light';
  }

  return (
    <SbEditable content={props.blok}>
      <section className={dcnb('section su-rs-py-6 su-basefont-23', bgColor)} id={props.blok.id}>
        <header className='su-cc su-text-center su-rs-mb-5'>
          {props.blok.superhead &&
            <SbLink link={props.blok.superLink}
                    classes={dcnb('su-inline-block su-rs-mb-6 su-pb-6 su-no-underline su-gradient-border-bottom su-border-b-[4px] su-border-solid su-transition-colors hocus:su-no-gradient-border', superLinkColor)}
            >
              {props.blok.superhead}
            </SbLink>
          }
          {props.blok.title &&
            <Heading level={1}
                     font='serif'
                     weight='bold'
                     className={`su-mb-02em su-type-5`}
                     srOnly={props.blok.isSrOnlyTitle}
            >
              {props.blok.title}
            </Heading>
          }
          <div className='su-big-paragraph su-max-w-prose su-mx-auto'>
            <RichTextRenderer wysiwyg={props.blok.intro} className='children:su-leading-display' />
          </div>
        </header>
        <CreateBloks blokSection={props.blok.content} />
      </section>
    </SbEditable>
  );
};

export default Section;
