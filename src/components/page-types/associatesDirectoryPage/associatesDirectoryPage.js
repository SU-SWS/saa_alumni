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
        <Container as="main" id="main-content">
          <header className="su-basefont-23">
            <Container>
              <Heading align="center" font="serif" id="page-title">
                {title}
              </Heading>
            </Container>
          </header>
          {hasRichText(intro) && (
            <div className={dcnb('su-big-paragraph su-max-w-prose')}>
              <RichTextRenderer
                wysiwyg={intro}
                className="children:su-leading-display"
              />
            </div>
          )}
        </Container>

        <Container className="basic-page su-relative su-flex-grow su-w-full">
          <CreateBloks blokSection={directory} />
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default AssociatesDirectoryPage;
