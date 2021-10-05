import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Grid, GridCell } from 'decanter-react';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import SocialIconLink from '../simple/socialIconLink';
import { bgPositionVertical } from '../../utilities/dataSource';
import addBgImage from '../../utilities/addBgImage';
import Logo from './logo';

const LocalFooter = ({
  blok: {
    bgImage: { filename } = {},
    vCrop,
    organization,
    address1,
    address2,
    address3,
    mapLink,
    actionLinks,
    fbLink,
    linkedinLink,
    twitterLink,
    igLink,
    youtubeLink,
    linkGroups,
    legalLinks,
  },
  blok,
}) => {
  // Background image vertical focus
  const bgCrop = bgPositionVertical[vCrop] ?? bgPositionVertical.center;

  return (
    <SbEditable content={blok}>
      <Container
        className="local-footer su-bg-saa-black su-text-black-20 su-link-no-underline su-border-b su-border-solid su-border-black-80"
        width="full"
      >
        <Container
          style={addBgImage(filename)}
          width="site"
          className={dcnb(
            'su-rs-pt-10 su-rs-pb-6 su-bg-cover su-bg-no-repeat',
            bgCrop
          )}
        >
          <Logo className="su-w-200 md:su-w-300 2xl:su-w-[350px]" />
        </Container>
        <Container className="su-rs-pb-5">
          <Grid xs={6} className="su-gap-y-xl sm:su-gap-x-lg md:su-gap-x-xl">
            <GridCell xs={6} sm={3} md={2} xxl={3}>
              <div className="su-font-semibold su-pb-02em">
                <strong>{organization}</strong>
              </div>
              <address>
                <div className="su-pb-02em">{address1}</div>
                <div className="su-pb-02em">{address2}</div>
                <div className="su-pb-02em">{address3}</div>
              </address>
              <CreateBloks blokSection={mapLink} />
              <ul className="su-list-unstyled su-rs-mt-3 su-rs-mb-4 children:su-mb-05em children:last:su-mb-0 children:su-leading-none">
                <CreateBloks blokSection={actionLinks} as="li" />
              </ul>
              <ul className="su-flex su-list-unstyled">
                <li className="su-mr-1em">
                  <SocialIconLink
                    icon={faFacebookF}
                    size="lg"
                    srText="Facebook Page"
                    href={fbLink}
                    className="su-text-black-20 hocus:su-text-facebook su-transition-colors"
                  />
                </li>
                <li className="su-mr-1em">
                  <SocialIconLink
                    icon={faLinkedinIn}
                    size="lg"
                    srText="LinkedIn Page"
                    href={linkedinLink}
                    className="su-text-black-20 hocus:su-text-linkedin su-transition-colors"
                  />
                </li>
                <li className="su-mr-1em">
                  <SocialIconLink
                    icon={faTwitter}
                    size="lg"
                    srText="Twitter Page"
                    href={twitterLink}
                    className="su-text-black-20 hocus:su-text-twitter su-transition-colors"
                  />
                </li>
                <li className="su-mr-1em">
                  <SocialIconLink
                    icon={faInstagram}
                    size="lg"
                    srText="Instagram Page"
                    href={igLink}
                    className="su-text-black-20 hocus:su-text-instagram su-transition-colors"
                  />
                </li>
                <li>
                  <SocialIconLink
                    icon={faYoutube}
                    size="lg"
                    srText="Youtube Channel"
                    href={youtubeLink}
                    className="su-text-black-20 hocus:su-text-youtube su-transition-colors"
                  />
                </li>
              </ul>
            </GridCell>
            <GridCell
              xs={6}
              sm={3}
              md={4}
              xxl={3}
              className="su-link-black-20 su-underline-offset !su-link-underline-digital-red-xlight"
            >
              <Grid
                element="nav"
                xs={1}
                md={2}
                xl={3}
                className="su-rs-mb-4 su-gap-x-lg su-gap-y-2xl children:su-text-black-20"
                aria-label="Alumni Links"
              >
                <CreateBloks blokSection={linkGroups} />
              </Grid>
              <nav aria-label="Legal links">
                <ul className="su-list-unstyled su-link-regular su-divide-x su-divide-white su-text-17 xl:su-text-20 children:su-inline-block children:su-mb-10 children:su-px-1em children:su-leading-display children:first:su-pl-0 children:last:su-pr-0">
                  <CreateBloks blokSection={legalLinks} />
                </ul>
              </nav>
            </GridCell>
          </Grid>
        </Container>
      </Container>
    </SbEditable>
  );
};

export default LocalFooter;
