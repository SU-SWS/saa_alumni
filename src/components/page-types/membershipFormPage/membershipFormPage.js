import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
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
import * as styles from './membershipFormPage.style';

const MembershipFormPage = (props) => {
  const {
    blok: {
      heroImage: { filename, alt, focus } = {},
      giveGabForm,
      ankleContent,
    },
    blok,
  } = props;

  const { userProfile } = useContext(AuthContext);
  const numAnkle = getNumBloks(ankleContent);
  const helmetTitle = `Stanford Alumni Association Membership`;
  const heroProps = {
    image: { filename, alt, focus },
    sansSuper: 'Stanford Alumni Association Membership',
    headline: `Welcome, ${
      userProfile.name.firstname || userProfile.session.firstname
    }`,
    headlineSize: 'medium',
    isDarkGradient: 'true',
    isHideScroll: 'true',
  };

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
              <Grid
                gap
                xs={12}
                className={styles.contentWrapper}
                id="su-gg-embed"
              >
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

export default MembershipFormPage;
