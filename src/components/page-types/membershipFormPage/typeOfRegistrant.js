import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { dcnb } from 'cnbuilder';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import { HeroImage } from '../../composite/HeroImage/HeroImage';
import { Grid } from '../../layout/Grid';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { GridCell } from '../../layout/GridCell';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import Logo from '../../identity/logo';
import MembershipCard from './membershipCard';
import AuthContext from '../../../contexts/AuthContext';
import * as styles from './typeOfRegistrant.styles';
import {
  FormContextProvider,
  FormContext,
} from '../../../contexts/FormContext';
import CreateBloks from '../../../utilities/createBloks';

const TypeOfRegistrant = (props) => {
  const {
    blok: {
      heroImage: { filename, alt, focus } = {},
      intro,
      membershipCardNote,
    },
    blok,
  } = props;
  const { userProfile } = useContext(AuthContext);
  const helmetTitle = 'Stanford Alumni Association Membership';

  const primaryUser = {
    su_did: 1234,
    su_dname: userProfile?.name
      ? userProfile?.name?.digitalName
      : `${userProfile?.session.firstName} ${userProfile?.session.lastName} `,
    su_title: 'Mr',
    su_first_name: userProfile?.name
      ? userProfile?.name?.firstName
      : userProfile?.session.firstName,
    su_middle_name: 'Middle Name',
    su_last_name: 'Last Name',
    su_relation: 'Self',
    su_dob: '12/12/1999',
    su_email: undefined,
    su_phone: undefined,
  };

  const newContact = { su_did: 'newContact' };

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
              <Grid gap xs={12} className={styles.contentWrapper}>
                <GridCell
                  xs={12}
                  md={10}
                  xl={8}
                  xxl={6}
                  className={styles.benefitsWrapper}
                >
                  <span className={styles.superHead}>
                    Stanford Alumni Association Membership
                  </span>
                  <Heading
                    level={1}
                    size={6}
                    align="center"
                    font="serif"
                    id="page-title"
                  >
                    Join now!
                  </Heading>
                  <div className={dcnb('su-p-36', styles.formWrapper)}>
                    <FlexBox
                      justifyContent="center"
                      className={styles.logoWrapper}
                    >
                      <Logo className={styles.logo} />
                    </FlexBox>
                    <CreateBloks blokSection={intro} />
                  </div>
                </GridCell>
                <GridCell xs={12}>
                  <div className={dcnb('su-rs-p-5', styles.formWrapper)}>
                    <Heading level={2} size={4} align="left" font="serif">
                      Who do you wish to purchase a membership for?
                    </Heading>
                    <Grid gap xs={12} className={styles.cardGridWrapper}>
                      <GridCell xs={12} md={6}>
                        <MembershipCard
                          heading="Myself"
                          subheading={primaryUser.su_dname}
                          initial={primaryUser.su_dname.slice(0, 1)}
                          memberData={primaryUser}
                        />
                      </GridCell>
                      <GridCell xs={12} md={6}>
                        <MembershipCard
                          heading="Someone else"
                          subheading="Existing contact or new contact"
                          initial="?"
                          memberData={newContact}
                        />
                      </GridCell>
                    </Grid>
                    <FormContext.Consumer>
                      {(value) => (
                        <FlexBox justifyContent="center">
                          <Link
                            to="/"
                            className={styles.benefitsLink}
                            state={{ registrant: selectedContact }}
                          >
                            Select membership type
                            <HeroIcon
                              iconType="arrow-right"
                              className={styles.benefitsLinkIcon}
                              isAnimate
                            />
                          </Link>
                        </FlexBox>
                      )}
                    </FormContext.Consumer>
                    <Grid gap xs={12}>
                      <GridCell
                        xs={12}
                        md={8}
                        className={styles.cardNoteWrapper}
                      >
                        <CreateBloks blokSection={membershipCardNote} />
                      </GridCell>
                    </Grid>
                  </div>
                </GridCell>
              </Grid>
            </Container>
          </Layout>
        </SbEditable>
      </FormContextProvider>
    </AuthenticatedPage>
  );
};

export default TypeOfRegistrant;
