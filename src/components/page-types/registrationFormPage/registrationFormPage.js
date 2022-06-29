import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import Hero from '../../composite/hero';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { FormContextProvider } from '../../../contexts/FormContext';

const RegistrationFormPage = (props) => {
  const {
    blok: {
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
  const title = `Register for your trip`;
  const helmetTitle = `Register for your trip: ${tripTitle}`;
  const heroProps = {
    image: { filename, alt, focus },
    headline: title,
    headlineSize: 'medium',
    isDarkGradient: 'true',
    isHideScroll: 'true',
  };

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
      destUrl.hash = 'cancellation-policy';
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
              <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
              <Hero blok={heroProps} />
              <Grid
                gap
                xs={12}
                className="su-relative su-cc su-z-10 su-rs-pb-8  su-bg-saa-black"
              >
                <GridCell
                  xs={12}
                  lg={6}
                  xl={6}
                  className="lg:su-col-start-4 xl:su-col-start-4"
                >
                  <div className="su-text-white">
                    <Heading
                      level={2}
                      align="center"
                      font="serif"
                      className="su-rs-mt-7"
                    >
                      {tripTitle}:<br />
                      Registration
                    </Heading>
                  </div>
                </GridCell>
                <GridCell
                  xs={12}
                  lg={6}
                  xl={6}
                  className="lg:su-col-start-4 xl:su-col-start-4"
                >
                  <CreateBloks
                    blokSection={giveGabForm}
                    bgCardStyle="su-bg-saa-black-dark"
                    tripId={tripId}
                  />
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
