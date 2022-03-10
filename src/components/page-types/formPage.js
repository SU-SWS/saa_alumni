import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Container } from '../layout/Container';
import { Heading } from '../simple/Heading';
import Layout from '../partials/layout';
import CreateBloks from '../../utilities/createBloks';
import getNumBloks from '../../utilities/getNumBloks';
import Ankle from '../partials/ankle/ankle';
import { HeroImage } from '../composite/HeroImage/HeroImage';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';

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
              overlay={false}
              aspectRatio="5x2"
              className="su-object-cover su-h-full su-w-full"
            />
          </div>
          <Grid
            gap={false}
            xs={12}
            className="su-relative su-cc su-z-10 su-justify-between"
          >
            <GridCell xs={12} lg={5} xl={5} className="su-h-fit su-sticky">
              <Heading
                level={1}
                align="center"
                font="serif"
                srOnly={isSrOnlyTitle}
                id="page-title"
                className="su-max-w-900 su-mb-0 su-rs-py-5 xl:su-rs-py-7 su-type-6 su-mx-auto su-max-w-1200"
              >
                {title}
              </Heading>
              <CreateBloks blokSection={formContent} />
            </GridCell>
            <GridCell xs={12} lg={5} xl={5}>
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
