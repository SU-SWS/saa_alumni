import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
import RichTextRenderer from '../../../utilities/richTextRenderer';
import hasRichText from '../../../utilities/hasRichText';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { FormContextProvider } from '../../../contexts/FormContext';
import { unsetGiveGabVars } from '../../../utilities/giveGabVars';

const RegistrationFormPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        content: { title: tripTitle },
      },
      heroImage: { filename, alt, focus } = {},
      giveGabForm,
      ankleContent,
    },
    blok,
    location,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const title = `Register for your trip: ${tripTitle}`;

  const travelers = location?.state?.travelers;
  // TODO: REMOVE THIS CONSOLE LOG BEFORE MERGE. This is for testing purposes only.
  console.log('Prefill Data Obj: ', travelers);

  useEffect(() => {
    // StoryBlok trip related data
    window.trip_id = blok.trip.id;
    window.trip_name = blok.trip.content.title;
    window.trip_url = blok.trip.content.url;
    window.trip_start_date = blok.trip.content.startDate;
    window.trip_end_date = blok.trip.content.endDate;
    window.trip_pre_extension = blok.trip.content.preExtension || '';
    window.trip_post_extension = blok.trip.content.postExtension || '';
    unsetGiveGabVars();

    if (travelers) {
      // TODO: REMOVE THIS CONSOLE LOG BEFORE MERGE. This is for testing purposes only.
      console.log('Travelers Data: ', travelers);
      window.prefillData = travelers;
    }
  }, [travelers, blok]);

  return (
    <AuthenticatedPage>
      <FormContextProvider>
        <SbEditable content={blok}>
          <Layout {...props}>
            <Container
              as="main"
              id="main-content"
              className="basic-page su-relative su-flex-grow su-w-full"
              width="full"
            >
              <Helmet titleTemplate={title} title={title} />
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
              <Grid
                gap
                xs={12}
                className="su-relative su-cc su-z-10 su-rs-pb-8"
              >
                <GridCell xs={12} lg={5} xl={5}>
                  <div className="su-sticky su-top-0 su-h-fit su-text-white su-rs-pt-6">
                    <Heading
                      level={1}
                      align="left"
                      font="serif"
                      id="page-title"
                    >
                      {title}
                    </Heading>
                    {hasRichText(body) && (
                      <RichTextRenderer
                        wysiwyg={body}
                        className="su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
                      />
                    )}
                  </div>
                </GridCell>
                <GridCell
                  xs={12}
                  lg={5}
                  xl={5}
                  className=" su-rs-pt-6 su-rs-mt-5"
                >
                  <CreateBloks blokSection={giveGabForm} />
                </GridCell>
              </Grid>
              {numAnkle > 0 && <Ankle isDark {...props} />}
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default RegistrationFormPage;
