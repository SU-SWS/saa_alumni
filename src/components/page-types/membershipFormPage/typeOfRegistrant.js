import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
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

const TypeOfRegistrant = (props) => {
  const {
    blok: { heroImage: { filename, alt, focus } = {} },
    blok,
  } = props;

  const { userProfile } = useContext(AuthContext);
  const helmetTitle = 'Stanford Alumni Association Membership';

  return (
    <AuthenticatedPage>
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
                className={styles.formWrapper}
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
                <div className=" su-basefont-23 su-p-36 su-w-full su-cc su-bg-saa-black-dark su-border-3 su-border-saa-black-dark">
                  <FlexBox justifyContent="center" className="su-rs-py-2">
                    <Logo className="su-w-200 md:su-w-300 2xl:su-w-[350px]" />
                  </FlexBox>
                  <p className="su-intro-text">
                    Become a member of the Stanford Alumni Association and
                    you&apos;ll enjoy a host of benefits.
                  </p>
                  <p>
                    To be eligible for alumni membership, you need to have
                    completed a minimum of three quarters of matriculated
                    coursework at either the undergraduate or graduate level.
                    Stanford faculty, staff, interns, residents, fellows,
                    certificate holders, postdocs, Travel/Study participants
                    Stanford parents are eligible for an affiliate membership.
                  </p>
                  <FlexBox justifyContent="center">
                    <Link to="/" className={styles.benefitsLink}>
                      Benefits of Membership
                      <HeroIcon
                        iconType="arrow-right"
                        className={styles.benefitsLinkIcon}
                        isAnimate
                      />
                    </Link>
                  </FlexBox>
                </div>
              </GridCell>
              <GridCell xs={12}>
                <div className="su-basefont-23 su-rs-p-5 su-w-full su-cc su-bg-saa-black-dark su-border-3 su-border-saa-black-dark">
                  <Heading level={2} size={4} align="left" font="serif">
                    Who do you wish to purchase a membership for?
                  </Heading>
                  <Grid gap xs={12} className="su-rs-pb-2 su-rs-pt-1">
                    <GridCell xs={12} md={6}>
                      <MembershipCard
                        heading="Myself"
                        subheading={
                          userProfile?.name?.digitalName ||
                          `${userProfile?.session.firstName} ${userProfile?.session.lastName} `
                        }
                        initial={
                          userProfile?.name?.firstName ||
                          userProfile?.session.firstName
                        }
                      />
                    </GridCell>
                    <GridCell xs={12} md={6}>
                      <MembershipCard
                        heading="Someone else"
                        subheading="Existing contact or new contact"
                        initial="?"
                      />
                    </GridCell>
                  </Grid>
                  <FlexBox justifyContent="center">
                    <Link to="/" className={styles.benefitsLink}>
                      Select membership type
                      <HeroIcon
                        iconType="arrow-right"
                        className={styles.benefitsLinkIcon}
                        isAnimate
                      />
                    </Link>
                  </FlexBox>

                  <Grid gap xs={12}>
                    <GridCell xs={12} md={8} className="md:su-col-start-3">
                      <p className="su-text-center su-rs-py-2">
                        Please note: All memberships, both domestic and
                        international, will have access to a digital membership
                        card card in lieu of a physical membership packet.
                        Additionally, we are unable to send SAA Member key tags
                        to of the US.
                      </p>
                    </GridCell>
                  </Grid>
                </div>
              </GridCell>
            </Grid>
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default TypeOfRegistrant;
