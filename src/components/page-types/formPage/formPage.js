import React from 'react';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';

const FormPage = (props) => {
  const {
    blok: {
      title,
      isSrOnlyTitle,
      heroImage: { filename, alt, focus } = {},
      formContent,
      giveGabForm,
      ankleContent,
    },
    blok,
  } = props;
  const numAnkle = getNumBloks(ankleContent);

  return (
    <SbEditable content={blok}>
      <Layout {...props}>
        <Container
          as="main"
          id="main-content"
          className="basic-page su-relative su-flex-grow su-w-full"
          width="full"
        >
          <div className="su-fixed su-top-0 su-z-0 su-h-full su-w-full">
            <HeroImage
              filename={filename}
              alt={alt}
              focus={focus}
              overlay="formDark"
              aspectRatio="5x2"
              className="su-object-cover su-h-full su-w-full"
            />
          </div>
          <Grid gap xs={12} className="su-relative su-cc su-z-10 su-rs-pb-8">
            <GridCell xs={12} lg={5} xl={5}>
              <div className="su-sticky su-top-0 su-h-fit su-text-white su-rs-pt-6">
                <Heading
                  level={1}
                  align="left"
                  font="serif"
                  srOnly={isSrOnlyTitle}
                  id="page-title"
                  className="su-drop-shadow"
                >
                  {title}
                </Heading>
                <CreateBloks
                  blokSection={formContent}
                  className="su-rs-mt-2 su-drop-shadow"
                />
              </div>
            </GridCell>
            <GridCell xs={12} lg={5} xl={5} className=" su-rs-pt-6 su-rs-mt-5">
              <CreateBloks blokSection={giveGabForm} />
            </GridCell>
          </Grid>
          {numAnkle > 0 && <Ankle isDark {...props} />}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default FormPage;
