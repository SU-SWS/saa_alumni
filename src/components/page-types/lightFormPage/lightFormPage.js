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

const NoMembershipError = () => (
  <div>
    <Heading level={2} size="2" weight="semibold" className="su-rs-mb-3">
      Interested in joining SAA?
    </Heading>
    <p className="su-card-paragraph">
      <a href="/membership/join">Join now</a> or visit our{' '}
      <a href="/membership/faq">Membership FAQs</a> page to learn more details
      about our membership planms and benefits.
    </p>
    <p className="su-card-paragraph su-mb-0">
      If you purchased your membership online more than one business day ago,
      and your membership is not recognized after logging in, call us at (650)
      725-0692 or email us at{' '}
      <a href="mailto:membership@alumni.stanford.edu">
        membership@alumni.stanford.edu
      </a>
    </p>
  </div>
);

const FullPaidMembership = () => (
  <div>
    <Heading level={2} size="2" weight="semibold" className="su-rs-mb-3">
      Your membership plan has been paid in full.
    </Heading>
    <p className="su-card-paragraph su-mb-0">
      Find your membership card <a href="/membership/saacard">here</a> and{' '}
      <a href="/perks/">learn more about your SAA membership benefits</a>.
    </p>
  </div>
);

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
  const memberships = userProfile?.memberships;
  const [kwoCreds, setKwoCreds] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paymentRefId, setPaymentRefId] = useState(false);

  // Use the useEffect hook to fetch nonce when the component mounts
  useEffect(() => {
    if (!orgId || !dssId) {
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

    const findPaymentRefId = () => {
      const saaMembership = memberships?.find(
        (membership) => membership.membershipGroup === 'SAA'
      );

      console.log('SAA MEMBERSHIP: ', saaMembership);

      if (saaMembership) {
        setPaymentRefId(saaMembership?.membershipGGPaymentReferenceID);
        if (paymentRefId === null) {
          console.error('PaymentRefId is missing.');
          setError(true);
          setLoading(false);
        } else {
          setLoading(false);
          fetchData();
        }
      } else {
        console.error('No SAA Membership found');
        setError(true);
        setLoading(false);
      }
    };

    if (memberships?.length === 0) {
      setPaymentRefId(false);
      setError(true);
      setLoading(false);
    } else if (memberships) {
      findPaymentRefId();
    }
  }, [orgId, dssId, memberships, paymentRefId]);

  return (
    <AuthenticatedPage>
      <SbEditable content={blok}>
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
                        <>
                          {paymentRefId === null ? (
                            <FullPaidMembership />
                          ) : (
                            <NoMembershipError />
                          )}
                        </>
                      ) : (
                        <>
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
                        </>
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
