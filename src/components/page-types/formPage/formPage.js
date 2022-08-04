import React, { useEffect, useContext } from 'react';
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
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import AuthContext from '../../../contexts/AuthContext';
import {
  setGiveGabVars,
  unsetGiveGabVars,
} from '../../../utilities/giveGabVars';
import Hero from '../../composite/hero';
import {
  formatFmDate,
  formatEmailDate,
} from '../../../utilities/transformDate';
import * as styles from './formPage.styles';

const FormPage = (props) => {
  const {
    blok: {
      trip,
      title,
      isSrOnlyTitle,
      heroImage: { filename, alt, focus } = {},
      formContent,
      giveGabForm,
      ankleContent,
      isSingleColumn,
    },
    blok,
  } = props;
  const { userProfile } = useContext(AuthContext);
  const numAnkle = getNumBloks(ankleContent);
  const heroProps = {
    image: { filename, alt, focus },
    headline: title,
    headlineSize: 'large',
    isDarkGradient: 'true',
    isHideScroll: 'true',
  };

  useEffect(() => {
    window.su_trip_id = trip?.content?.tripId;
    window.su_trip_name = trip?.name;

    // Trip Dates for Notify Me form
    window.su_trip_url = trip?.full_slug;
    if (trip?.content?.startDate && trip?.content?.endDate) {
      window.su_trip_start_date = formatFmDate(trip?.content?.startDate);
      window.su_trip_end_date = formatFmDate(trip?.content?.endDate);
      window.su_email_start_date = formatEmailDate(trip?.content?.startDate);
      window.su_email_end_date = formatEmailDate(trip?.content?.endDate);
    }

    if (userProfile) {
      setGiveGabVars(userProfile);
    }
    return () => {
      unsetGiveGabVars();
    };
  }, [userProfile, trip]);

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
        <Layout hasHero={isSingleColumn} {...props}>
          <Container
            as="main"
            id="main-content"
            className={styles.container}
            width="full"
          >
            {isSingleColumn ? (
              <Hero blok={heroProps} />
            ) : (
              <div className={styles.fixedHero}>
                <HeroImage
                  filename={filename}
                  alt={alt}
                  focus={focus}
                  overlay="formDark"
                  aspectRatio="5x2"
                  className={styles.fixedHeroImg}
                />
              </div>
            )}
            <Grid
              gap
              xs={12}
              className={styles.gridContainerStyle({ isSingleColumn })}
            >
              <GridCell
                xs={12}
                lg={isSingleColumn ? 12 : 5}
                xl={isSingleColumn ? 12 : 5}
              >
                <div className={styles.contentStyle({ isSingleColumn })}>
                  {!isSingleColumn && title && (
                    <Heading
                      level={1}
                      align="left"
                      font="serif"
                      srOnly={isSrOnlyTitle}
                      id="page-title"
                      className={styles.header}
                    >
                      {title}
                    </Heading>
                  )}
                  <CreateBloks blokSection={formContent} trip={trip} />
                </div>
              </GridCell>
              <GridCell
                xs={12}
                md={isSingleColumn ? 8 : 5}
                lg={6}
                xl={isSingleColumn ? 6 : 5}
                className={styles.formCardStyle({ isSingleColumn })}
              >
                <CreateBloks
                  blokSection={giveGabForm}
                  bgCardStyle={isSingleColumn}
                />
              </GridCell>
            </Grid>
            {numAnkle > 0 && <Ankle isDark {...props} />}
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default FormPage;
