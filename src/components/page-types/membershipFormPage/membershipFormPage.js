import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { FormContextProvider } from '../../../contexts/FormContext';
import AuthContext from '../../../contexts/AuthContext';
import * as styles from './membershipFormPage.styles';
import { Heading } from '../../simple/Heading';

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

  return (
    <AuthenticatedPage>
      <FormContextProvider>
        <SbEditable content={blok}>
          <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
          <Layout {...props}>
            <Container
              as="main"
              id="main-content"
              className={styles.container}
              width="full"
            >
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
                  <div className={styles.contentStyle}>
                    <span className={styles.superHead}>
                      Stanford Alumni Association Membership
                    </span>
                    <Heading
                      level={1}
                      size="6"
                      align="center"
                      font="serif"
                      id="page-title"
                    >
                      Welcome,{' '}
                      {userProfile?.name?.firstName ||
                        userProfile?.session.firstName}
                    </Heading>
                  </div>
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
