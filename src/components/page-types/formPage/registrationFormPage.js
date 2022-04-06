import React, { useState } from 'react';
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
import SbLink from '../../../utilities/sbLink';
import HeroIcon from '../../simple/heroIcon';
import FormProvider from '../../../contexts/FormContext';
// import AuthenticatedPage from '../../auth/AuthenticatedPage';

const FormPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        full_slug: fullSlug,
        content: { title: tripTitle },
      },
      heroImage: { filename, alt, focus } = {},
      interstitialContent,
      giveGabForm,
      ankleContent,
    },
    blok,
  } = props;
  const numAnkle = getNumBloks(ankleContent);
  const title = `Register for your trip: ${tripTitle}`;
  const tripURL = `/${fullSlug.replace(/^\//, '')}`;

  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(true);
  };

  return (
    // <AuthenticatedPage>
    <FormProvider>
      <SbEditable content={blok}>
        <Layout {...props}>
          <Container
            as="main"
            id="main-content"
            className="basic-page su-relative su-flex-grow su-w-full"
            width="full"
          >
            <Helmet titleTemplate={title} title={title} />
            {showForm ? (
              <>
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
                      <SbLink
                        link={tripURL}
                        classes="su-group su-inline-block su-rs-mb-6 su-no-underline su-transition-colors"
                      >
                        <HeroIcon
                          iconType="arrow-left"
                          className="su-inline-block su-text-digital-red-light group-hocus:su-text-cardinal-red"
                          isAnimate
                        />
                        Back to {tripTitle}
                      </SbLink>
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
              </>
            ) : (
              <Container className="su-cc su-rs-pb-8">
                <Heading level={1} align="left" font="serif" id="page-title">
                  {title}
                </Heading>
                {hasRichText(body) && (
                  <RichTextRenderer
                    wysiwyg={body}
                    className="su-card-paragraph children:su-leading-snug children:!su-mb-06em children:last:!su-mb-0"
                  />
                )}
                <CreateBloks blokSection={interstitialContent} />
                <button
                  type="button"
                  className="su-button"
                  onClick={toggleForm}
                >
                  Next
                </button>
              </Container>
            )}
            {numAnkle > 0 && <Ankle isDark {...props} />}
          </Container>
        </Layout>
      </SbEditable>
    </FormProvider>
    // </AuthenticatedPage>
  );
};

export default FormPage;
