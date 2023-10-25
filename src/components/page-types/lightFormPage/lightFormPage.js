import React, { useEffect, useContext, useState } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
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
      widgetType,
      title,
      heroImage: { filename, alt, focus } = {},
      formHeading,
      orgId,
      dssId,
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
  const [kwoCreds, setKwoCreds] = useState('');

  // Use the useEffect hook to fetch nonce when the component mounts
  useEffect(() => {
    // Function to fetch nonce from the API route
    if (orgId && dssId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/membership/payment/${orgId}/${dssId}/3LF42K6`
          );
          if (response.ok) {
            const tokenData = await response.json();
            if (tokenData) {
              const { nonce } = tokenData;
              setKwoCreds(nonce);
            }
          } else {
            console.error('API request failed.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      fetchData();
    }
  }, [dssId, orgId]);

  console.log('kwoCreds', kwoCreds);

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
            <Heading level={1} srOnly id="page-title">
              {title}
            </Heading>
            <Grid gap xs={12} className={styles.gridContainerStyle}>
              <GridCell
                xs={12}
                md={10}
                lg={10}
                xl={8}
                xxl={6}
                className={dcnb(
                  'su-light-form',
                  widgetType,
                  styles.formCardStyle
                )}
              >
                <div>
                  <Heading
                    level={2}
                    size="2"
                    weight="semibold"
                    className="su-rs-mb-3"
                  >
                    {formHeading}
                  </Heading>
                </div>
                <CreateBloks
                  blokSection={giveGabForm}
                  bgCardStyle="su-bg-transparent"
                  kwoCredentials={kwoCreds}
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
