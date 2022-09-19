import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Redirect, useLocation } from '@reach/router';
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
import AuthContext from '../../../contexts/AuthContext';
import {
  formatEmailDate,
  formatFmDate,
} from '../../../utilities/transformDate';
import * as styles from './registrationFormPage.styles';

const RegistrationFormPage = (props) => {
  const {
    blok: {
      trip: {
        name: tripConfigTitle,
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
          roomCategory,
        },
      },
      heroImage: { filename, alt, focus } = {},
      giveGabForm,
      ankleContent,
    },
    blok,
    location,
    pageContext,
  } = props;
  const windowLocation = useLocation();
  const { userProfile } = useContext(AuthContext);
  const numAnkle = getNumBloks(ankleContent);
  const helmetTitle = `Register for your trip: ${tripTitle}`;
  const heroProps = {
    image: { filename, alt, focus },
    sansSuper: 'Registration for',
    headline: tripTitle,
    headlineSize: 'medium',
    isDarkGradient: 'true',
    isHideScroll: 'true',
  };

  const registrationSlug = pageContext?.story?.full_slug;
  const travelers = location?.state?.travelers;

  useEffect(() => {
    const tripUrl = `/${fullSlug.replace(/^\//, '')}`;
    // StoryBlok trip related data
    window.su_trip_id = tripId;
    window.su_trip_name = tripConfigTitle;
    window.su_trip_url = tripUrl;
    window.su_trip_start_date = formatFmDate(startDate);
    window.su_trip_end_date = formatFmDate(endDate);

    window.su_email_start_date = formatEmailDate(startDate);
    window.su_email_end_date = formatEmailDate(endDate);
    // Global function for the trip cancellation policy link in givegab.
    // GG Doesn't support dynamic urls in their forms so we added an onclick
    // with this function.
    window.navigateToTripPolicy = () => {
      const destUrl = new URL(tripUrl, window.location.origin);
      destUrl.hash = 'cancellation-policy';
      window.open(destUrl, '_blank');
      return false;
    };

    // Trip room category check
    if (roomCategory.includes('None')) {
      window.su_category_request = 'none';
      window.su_category_first = 'None';
      window.su_category_second = 'None';
    }

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

    // Check if there is a pre-extension trip, if so set window vars for FM and email dates
    if (extendStartDate) {
      window.su_pre_extension_start = formatFmDate(extendStartDate);
      window.su_pre_extension_end = formatFmDate(extendEndDate);
      window.su_email_pre_extension_start = formatEmailDate(extendStartDate);
      window.su_email_pre_extension_end = formatEmailDate(extendEndDate);
    }
    // Check if there is a post-extension trip, if so set window vars for FM and email dates
    if (postExtendStartDate) {
      window.su_post_extension_start = formatFmDate(postExtendStartDate);
      window.su_post_extension_end = formatFmDate(postExtendEndDate);
      window.su_email_post_extension_start =
        formatEmailDate(postExtendStartDate);
      window.su_email_post_extension_end = formatEmailDate(postExtendEndDate);
    }

    window.su_extension = extension();

    // Provides registrant's encodedSUID as an identifying piece for FM
    window.su_registrant_did = userProfile?.session?.encodedSUID;
    window.prefillData = travelers;
    if (travelers) {
      window.prefillData = travelers;
    } else {
      window.su_did = userProfile?.session?.encodedSUID;
    }
  }, [
    travelers,
    fullSlug,
    tripId,
    tripConfigTitle,
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
    roomCategory,
    userProfile,
  ]);

  // In the event that the user goes directly to the registration form,
  // redirect user back to insteritial page to select travelers
  // Storyblok patch: Check window location params if viewing from editor, skip redirect
  // TODO: Rework ADAPT-5181
  const isStoryBlok = windowLocation?.pathname?.match(/^\/editor\/?$/);
  if (!location?.state?.travelers && !isStoryBlok) {
    return <Redirect to={registrationSlug} noThrow />;
  }

  return (
    <AuthenticatedPage>
      <FormContextProvider>
        <SbEditable content={blok}>
          <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
          <Layout hasHero="true" {...props}>
            <Container
              as="main"
              id="main-content"
              className={styles.container}
              width="full"
            >
              <Hero blok={heroProps} />
              <Grid gap xs={12} className={styles.contentWrapper}>
                <GridCell
                  xs={12}
                  md={10}
                  xl={8}
                  xxl={6}
                  className={styles.formWrapper}
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
