import React, { useEffect, useContext, useState } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { ClipLoader } from 'react-spinners';
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
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import * as styles from './lightFormPage.styles';
import { FlexBox } from '../../layout/FlexBox';

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
  const [kwoCreds, setKwoCreds] = useState('');
  const memberships = userProfile?.memberships;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let paymentRefId = false;

  if (memberships && loading) {
    memberships.forEach((membership) => {
      if (!paymentRefId && membership.membershipGroup === 'SAA') {
        paymentRefId = membership.membershipGGPaymentReferenceID;
      } else {
        paymentRefId = null;
      }
    });
  }

  // Use the useEffect hook to fetch nonce when the component mounts
  useEffect(() => {
    if (!orgId || !dssId) {
      return;
    }

    if (paymentRefId === null) {
      console.log('paymentRefId is missing.');
      setError('Payment reference ID is missing.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      if (paymentRefId) {
        try {
          const response = await fetch(
            `/api/membership/payment/${orgId}/${dssId}/${paymentRefId}`
          );

          if (response.ok) {
            const { nonce } = await response.json();
            setKwoCreds(nonce);
          } else {
            console.error('API request failed.');
            setError('API request failed.');
          }
        } catch (err) {
          console.error('An error occurred:', err);
          setError('An error occurred while fetching data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [orgId, dssId, paymentRefId]);

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
            <FlexBox direction="col" className={styles.contentWrapper}>
              <div className={styles.contentStyle}>
                <Heading
                  level={1}
                  size="6"
                  align="center"
                  font="serif"
                  id="page-title"
                >
                  {title}
                </Heading>
              </div>
              <Grid gap xs={12}>
                <GridCell
                  xs={12}
                  md={10}
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
                  {loading ? (
                    <div className="su-flex su-flex-row">
                      <ClipLoader color="#00BFFF" height={50} width={50} />
                      <p className="su-ml-03em">Loading form...</p>
                      <noscript>
                        Sorry, but you must have Javascript enabled to use the
                        form.
                      </noscript>
                    </div>
                  ) : (
                    <>
                      {error ? (
                        <div>
                          <Heading>An Error has occured</Heading>
                          <p>{error}</p>
                        </div>
                      ) : (
                        <CreateBloks
                          blokSection={giveGabForm}
                          bgCardStyle="su-bg-transparent"
                          kwoCredentials={kwoCreds}
                        />
                      )}
                    </>
                  )}
                </GridCell>
              </Grid>
            </FlexBox>
            {numAnkle > 0 && <Ankle isDark {...props} />}
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default LightFormPage;
