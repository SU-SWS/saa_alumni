import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import RichTextRenderer from '../../utilities/richTextRenderer';
import getNumBloks from '../../utilities/getNumBloks';
import { Container, Heading } from 'decanter-react';
import { bgColors, largePaddingTop, largePaddingBottom } from '../../utilities/dataSource';
import SbLink from '../../utilities/sbLink';
import { dcnb } from 'cnbuilder';

const Section = ({
  blok: {
    superhead,
    superLink,
    title,
    intro,
    cta,
    content,
    isSrOnlyTitle,
    bgColor,
    spacingTop,
    spacingBottom,
    id
  },
  blok
}) => {
  const numCta = getNumBloks(cta);

  const sectionBgColor = bgColors[bgColor] ?? bgColors['white'];

  let superLinkColor = 'su-text-black hocus:su-text-saa-electric-blue su-border-saa-electric-blue';

  if (bgColor === 'black') {
    superLinkColor = 'su-text-white hocus:su-text-saa-electric-blue-light su-border-saa-electric-blue-light';
  }

  const paddingTop = largePaddingTop[spacingTop] ?? largePaddingTop['lg'];
  const paddingBottom = largePaddingBottom[spacingBottom] ?? largePaddingBottom['lg'];

  return (
    <SbEditable content={blok}>
      <section className={dcnb('section su-basefont-23', sectionBgColor, paddingTop, paddingBottom)} id={id}>
        <header className='su-cc su-text-center su-rs-mb-5'>
          {superhead &&
            <SbLink link={superLink}
                    classes={dcnb('su-inline-block su-rs-mb-6 su-pb-6 su-no-underline su-gradient-border su-border-to-r-palo-verde-dark-to-saa-electric-blue su-border-b-[4px] su-border-solid su-transition-colors hocus:su-no-gradient-border', superLinkColor)}
            >
              {superhead}
            </SbLink>
          }
          {title &&
            <Heading level={1}
                     font='serif'
                     weight='bold'
                     className={`su-mb-02em su-type-5`}
                     srOnly={isSrOnlyTitle}
            >
              {title}
            </Heading>
          }
          <div className='su-big-paragraph su-max-w-prose su-mx-auto'>
            <RichTextRenderer wysiwyg={intro} className='children:su-leading-display' />
          </div>
        </header>
        <CreateBloks blokSection={content} />
        {numCta > 0 &&
          <Container width='site' className='su-rs-mt-6'>
            <CreateBloks blokSection={cta}/>
          </Container>
        }
      </section>
    </SbEditable>
  );
};

export default Section;
