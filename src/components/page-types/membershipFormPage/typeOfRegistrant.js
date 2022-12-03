import React from 'react';
import { Helmet } from 'react-helmet';
import SbEditable from 'storyblok-react';
import { Link } from 'gatsby';
import { Container } from '../../layout/Container';
import { Heading } from '../../simple/Heading';
import Layout from '../../partials/layout';
import Hero from '../../composite/hero';
import { Grid } from '../../layout/Grid';
import AuthenticatedPage from '../../auth/AuthenticatedPage';
import { GridCell } from '../../layout/GridCell';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import Logo from '../../identity/logo';
import * as styles from './typeOfRegistrant.styles';

const TypeOfRegistrant = (props) => {
  const {
    blok: { heroImage: { filename, alt, focus } = {} },
    blok,
  } = props;
  const helmetTitle = 'Stanford Alumni Association Membership';
  const heroProps = {
    image: { filename, alt, focus },
    sansSuper: 'Stanford Alumni Association Membership',
    headline: 'Join now!',
    headlineSize: 'medium',
    isDarkGradient: 'true',
    isHideScroll: 'true',
  };

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
            <Hero blok={heroProps} />
            <Container className={styles.contentWrapper}>
              <Grid gap xs={12}>
                <GridCell xs={12}>
                  <span className={styles.superHead}>
                    Stanford Alumni Association Membership
                  </span>
                  <Heading
                    level={3}
                    size={5}
                    align="center"
                    font="serif"
                    id="page-title"
                  >
                    Join now!
                  </Heading>
                </GridCell>
              </Grid>
              <Grid gap xs={12} className={styles.contentWrapper}>
                <GridCell xs={12}>
                  <div className=" su-basefont-23 su-p-36 su-w-full su-cc su-bg-saa-black-dark su-border-3 su-border-saa-black-dark">
                    <FlexBox justifyContent="center" className="su-rs-py-2">
                      <Logo className="su-w-200 md:su-w-300 2xl:su-w-[350px]" />
                    </FlexBox>
                    <p className="su-intro-text">
                      Become a member of the Stanford Alumni Association and you'll enjoy a host of benefits.
                    </p>
                    <p>
                      To be eligible for alumni membership, you need to have
                      completed a minimum of three quarters of matriculated
                      coursework at either the undergraduate or graduate level.
                      Stanford faculty, staff, interns, residents, fellows,
                      certificate holders, postdocs, Travel/Study participants
                      and Stanford parents are eligible for an affiliate
                      membership.
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
              </Grid>
              <div className="su-p-36 su-w-full su-cc su-bg-saa-black-dark su-border-3 su-border-saa-black-dark">
                <Grid gap xs={12} className={styles.gridContent}>
                  <GridCell xs={12} lg={8}>
                    <Heading level={3} size={5} align="left" font="serif">
                      Who do you wish to purchase a membership for?
                    </Heading>
                  </GridCell>
                </Grid>
                <div className="su-card-centered">
                  <Grid gap xs={12}>
                    <GridCell xs={12} md={6}>
                      <div className="su-border-3 su-px-90 su-py-58">
                        {/* icon */}
                        <Heading level={4} size="3" align="center" font="serif">
                          Myself
                        </Heading>
                        {/* Name of myself */}
                        <p className="su-text-center">Kristin Southard</p>
                        <FlexBox justifyContent="center">
                          <Link to="/" className={styles.benefitsLink}>
                            Select
                          </Link>
                        </FlexBox>
                      </div>
                    </GridCell>
                    <GridCell xs={12} md={6}>
                      <div className="su-border-3 su-px-90 su-py-58">
                        {/* icon */}
                        <Heading level={4} size="3" align="center" font="serif">
                          Someone else
                        </Heading>
                        {/* Name of myself */}
                        <p>Existing contact or new contact</p>
                        <FlexBox justifyContent="center">
                          <Link to="/" className={styles.benefitsLink}>
                            Select
                          </Link>
                        </FlexBox>
                      </div>
                    </GridCell>
                  </Grid>
                </div>
                {/* tbd Promo code section  */}

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

                <div className="su-centered-text">
                  <p>
                    Please note: All memberships, both domestic and
                    international, will have access to a digital membership card
                    in lieu of a physical membership packet. Additionally, we
                    are unable to send SAA Member key tags to addresses outside
                    of the US. (note linked digital membership card)
                  </p>
                </div>
              </div>
            </Container>
          </Container>
        </Layout>
      </SbEditable>
    </AuthenticatedPage>
  );
};

export default TypeOfRegistrant;
