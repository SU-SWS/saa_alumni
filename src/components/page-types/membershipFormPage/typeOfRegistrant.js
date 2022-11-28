import React from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import Ankle from '../../partials/ankle/ankle';
import Hero from '../../composite/hero';
import { Grid } from '../../layout/Grid';
import { FormContext } from '../../../contexts/FormContext';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { GridCell } from '../../layout/GridCell';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './typeOfRegistrant.styles';

const TypeOfRegistrant = (props) => {
  const {
    blok: { heroImage: { filename, alt, focus } = {} },
    blok,
  } = props;
  const helmetTitle = 'Stanford Alumni Association Membership';

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
        <Helmet titleTemplate={helmetTitle} title={helmetTitle} />
        <Layout hasHero="true" {...props}>
          <Container
            as="main"
            id="main-content"
            className={styles.container}
            width="full"
          >
            {/* <Hero blok={heroProps} /> */}
            <Container className={styles.contentWrapper}>
              <Grid gap xs={12} className={styles.depositWrapper}>
                <GridCell
                  xs={12}
                  lg={10}
                  xl={8}
                  className={styles.depositContent}
                >
                  <Heading
                    level={3}
                    size={5}
                    align="left"
                    font="serif"
                    className={styles.noMarginBottom}
                  >
                    Join now!
                  </Heading>
                </GridCell>
              </Grid>
              <Grid gap xs={12} className={styles.gridContent}>
                <GridCell xs={12} lg={8}>
                  <Heading
                    level={3}
                    size={5}
                    align="left"
                    font="serif"
                    className={styles.noMarginBottom}
                  >
                    Select who you wish to purchase a membership for:
                  </Heading>
                </GridCell>
              </Grid>
            </Container>
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default TypeOfRegistrant;
