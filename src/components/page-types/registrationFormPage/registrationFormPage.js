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

const RegistrationFormPage = (props) => {
  const {
    blok: {
      body,
      trip: {
        full_slug: fullSlug,
        content: {
          title: tripTitle,
          tripId,
          startDate,
          endDate,
          extendHeading,
          extendStartDate,
          extendEndDate,
          extendPrice,
          postExtendHeading,
          postExtendStartDate,
          postExtendEndDate,
          postExtendPrice,
        },
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

  useEffect(() => {
    const tripUrl = `/${fullSlug.replace(/^\//, '')}`;
    // StoryBlok trip related data
    window.su_trip_id = tripId;
    window.su_trip_name = tripTitle;
    window.su_trip_url = tripUrl;
    window.su_trip_start_date = startDate;
    window.su_trip_end_date = endDate;
    // Global function for the trip cancellation policy link in givegab.
    // GG Doesn't support dynamic urls in their forms so we added an onclick
    // with this function.
    window.navigateToTripPolicy = () => {
      const destUrl = new URL(tripUrl, window.location.origin);
      destUrl.hash = 'pricing-section';
      window.location.href = destUrl;
    };

    // Trip extension related data
    window.su_pre_extension_name = extendHeading;
    window.su_post_extension_name = postExtendHeading;
    const extension = () => {
      if (extendStartDate && postExtendEndDate) {
        return 'Both';
      }
      if (extendStartDate) {
        return 'Pre-trip only';
      }
      if (postExtendEndDate) {
        return 'Post-trip only';
      }
      return 'None';
    };
    window.su_pre_extension_start = extendStartDate;
    window.su_pre_extension_end = extendEndDate;
    window.su_post_extension_start = postExtendStartDate;
    window.su_post_extension_end = postExtendEndDate;
    window.su_extension = extension();

    if (travelers) {
      window.prefillData = travelers;
    }
  }, [
    travelers,
    fullSlug,
    tripId,
    tripTitle,
    startDate,
    endDate,
    extendHeading,
    extendStartDate,
    extendEndDate,
    extendPrice,
    postExtendHeading,
    postExtendStartDate,
    postExtendEndDate,
    postExtendPrice,
  ]);

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
                  <CreateBloks blokSection={giveGabForm} tripId={tripId} />
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
