import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import hasRichText from '../../../utilities/hasRichText';
import RichTextRenderer from '../../../utilities/richTextRenderer';
import CreateBloks from '../../../utilities/createBloks';

const AssociatesDirectoryPage = (props) => {
  const {
    blok: { title, intro = {}, directory },
    blok,
  } = props;

  return (
    <SbEditable content={blok}>
      <Layout hasHero={false} {...props}>
        <Container
          as="main"
          id="main-content"
          className="basic-page su-relative su-flex-grow su-w-full su-rs-pb-7"
        >
          <header className="su-basefont-23">
            <Container>
              <Heading
                level={1}
                align="center"
                font="serif"
                id="page-title"
                className="su-max-w-900 su-mb-0 su-rs-py-5 xl:su-rs-py-7 su-type-6 su-mx-auto su-max-w-1200"
              >
                {title}
              </Heading>
            </Container>
          </header>
          {hasRichText(intro) && (
            <div className={dcnb('su-big-paragraph su-max-w-prose su-mx-auto')}>
              <RichTextRenderer
                wysiwyg={intro}
                className="children:su-leading-display"
              />
            </div>
          )}
          <CreateBloks blokSection={directory} />
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default AssociatesDirectoryPage;
