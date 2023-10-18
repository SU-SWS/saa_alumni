import React, { useEffect, useContext } from 'react';
import SbEditable from 'storyblok-react';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import CreateBloks from '../../../utilities/createBloks';
import getNumBloks from '../../../utilities/getNumBloks';
import Ankle from '../../partials/ankle/ankle';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import AuthContext from '../../../contexts/AuthContext';
import Hero from '../../composite/hero';
import * as styles from './lightFormPage.styles';

const LightFormPage = (props) => {
  const {
    blok: {
      title,
      isSrOnlyTitle,
      heroImage: { filename, alt, focus } = {},
      formInfo,
      giveGabForm,
      ankleContent,
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

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
        <Layout hasHero {...props}>
          <Container
            as="main"
            id="main-content"
            className={styles.container}
            width="full"
          >
            <Hero blok={heroProps} />
            <Heading
              level={1}
              align="left"
              font="serif"
              srOnly={isSrOnlyTitle}
              id="page-title"
            >
              {title}
            </Heading>
            <Grid gap xs={12}>
              <GridCell xs={12} md={10} lg={10} xl={8} xxl={6}>
                <div>
                  <Heading level={2}>{formInfo}</Heading>
                </div>
                <CreateBloks
                  blokSection={giveGabForm}
                  bgCardStyle="su-bg-transparent"
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

export default LightFormPage;
