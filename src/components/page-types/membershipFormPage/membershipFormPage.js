import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Redirect } from '@reach/router';
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
import { FlexBox } from '../../layout/FlexBox';

const MembershipFormPage = (props) => {
  const {
    blok: {
      heroImage: { filename, alt, focus } = {},
      giveGabForm,
      ankleContent,
    },
    blok,
    location,
    pageContext: {
      story: { full_slug: registrationSlug },
    },
  } = props;

  const { userProfile } = useContext(AuthContext);
  const numAnkle = getNumBloks(ankleContent);
  const helmetTitle = `Stanford Alumni Association Membership`;
  const registrant = location?.state?.registrant;
  const promoCode = location?.state?.promoCode;
  console.log('REGISTRANT PASS THROUGH: ', registrant);

  useEffect(() => {
    if (registrant?.su_reg_type !== 'newContact') {
      window.prefillData = registrant;
    }
  }, [registrant]);

  // In the event that the user goes directly to the related contact page,
  // redirect user back to insteritial page to select registration type
  if (!registrant) {
    return <Redirect to={registrationSlug} noThrow />;
  }

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
              <FlexBox direction="col" className={styles.contentWrapper}>
                <div className={styles.contentStyle}>
                  <Heading
                    level={1}
                    size="6"
                    align="center"
                    font="serif"
                    id="page-title"
                  >
                    Stanford Alumni Association Membership
                  </Heading>
                </div>
                <Grid gap xs={12} id="su-gg-embed">
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
                      urlData={promoCode}
                    />
                  </GridCell>
                </Grid>
              </FlexBox>
              {numAnkle > 0 && <Ankle isDark {...props} />}
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default MembershipFormPage;
