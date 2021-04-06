import React from 'react';
import { Link } from 'gatsby';
import CreateBloks from '../../utilities/createBloks';
import SbEditable from 'storyblok-react';
import { Container, Grid, GridCell } from 'decanter-react';
import getImageWidth from '../../utilities/getImageWidth';
import transformImage from '../../utilities/transformImage';
import SocialIconLink from '../simple/socialIconLink';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { bgPositionVertical } from '../../utilities/dataSource';

const LocalFooter = (props) => {
  // Display background image option
  let bgImageStyle = {};
  let processedImg = '';

  // Process image and set inline background image if image exists
  if (props.blok.bgImage?.filename != null) {

    if (props.blok.bgImage.filename.startsWith('http')) {
      let originalWidth = getImageWidth(props.blok.bgImage.filename);

      // Downsize image if it's wider than 2000px, otherwise just reduce jpg quality to 60%
      if (originalWidth > 2000) {
        processedImg = transformImage(props.blok.bgImage.filename, '/2000x0');
      } else {
        processedImg = transformImage(props.blok.bgImage.filename, '');
      }

      // Set background image style
      bgImageStyle = {
        backgroundImage: `linear-gradient(to bottom, transparent, #181D1C), url('${processedImg}')`,
      };
    }
  }

  // Background image vertical focus
  const bgCrop = bgPositionVertical[props.blok.vCrop] ?? bgPositionVertical['center'];

  return (
    <SbEditable content={props.blok}>
      <Container className='local-footer su-bg-saa-black su-text-black-20 su-link-no-underline su-border-b su-border-solid su-border-black-80' width='full'>
        <Container style={bgImageStyle} width='site' className={`su-rs-pt-10 su-rs-pb-6 su-bg-cover su-bg-no-repeat ${bgCrop}`}>
          <Link to='/' className='su-block su-w-fit'>
            <img src='/images/saa-logo-white.svg' className='su-w-200 md:su-w-300 2xl:su-w-[350px]' alt='Stanford Alumni Association' />
          </Link>
        </Container>
        <Container className='su-rs-pb-5'>
          <Grid xs={6} className='su-gap-y-xl sm:su-gap-x-lg md:su-gap-x-xl'>
            <GridCell xs={6} sm={3} md={2} xxl={3}>
              <div className='su-font-semibold su-pb-02em'><strong>{props.blok.organization}</strong></div>
              <address>
                <div className='su-pb-02em'>{props.blok.address1}</div>
                <div className='su-pb-02em'>{props.blok.address2}</div>
                <div className='su-pb-02em'>{props.blok.address3}</div>
              </address>
              <CreateBloks blokSection={props.blok.mapLink} />
              <ul className='su-list-unstyled su-rs-mt-3 su-rs-mb-4'>
                <CreateBloks blokSection={props.blok.actionLinks} />
              </ul>
              <ul className='su-flex su-list-unstyled'>
                <li className='su-mr-1em'>
                  <SocialIconLink
                    icon={faFacebookF}
                    size='lg'
                    srText='Facebook Page'
                    href={props.blok.fbLink}
                    className='su-text-black-20 hover:su-text-facebook focus:su-text-facebook su-transition-colors'
                  />
                </li>
                <li className='su-mr-1em'>
                  <SocialIconLink
                    icon={faLinkedinIn}
                    size='lg'
                    srText='LinkedIn Page'
                    href={props.blok.linkedinLink}
                    className='su-text-black-20 hover:su-text-linkedin focus:su-text-linkedin su-transition-colors'
                  />
                </li>
                <li className='su-mr-1em'>
                  <SocialIconLink
                    icon={faTwitter}
                    size='lg'
                    srText='Twitter Page'
                    href={props.blok.twitterLink}
                    className='su-text-black-20 hover:su-text-twitter focus:su-text-twitter su-transition-colors'
                  />
                </li>
                <li className='su-mr-1em'>
                  <SocialIconLink
                    icon={faInstagram}
                    size='lg'
                    srText='Instagram Page'
                    href={props.blok.igLink}
                    className='su-text-black-20 hover:su-text-instagram focus:su-text-instagram su-transition-colors'
                  />
                </li>
                <li>
                  <SocialIconLink
                    icon={faYoutube}
                    size='lg'
                    srText='Youtube Channel'
                    href={props.blok.youtubeLink}
                    className='su-text-black-20 hover:su-text-youtube focus:su-text-youtube su-transition-colors'
                  />
                </li>
              </ul>
            </GridCell>
            <GridCell xs={6} sm={3} md={4} xxl={3} className='su-link-black-20 su-underline-offset !su-link-underline-saa-digital-red'>
              <Grid element='nav' xs={1} md={2} xl={3} className='su-rs-mb-4 su-gap-x-lg su-gap-y-2xl' aria-label='SAA Links'>
                <CreateBloks blokSection={props.blok.linkGroups} />
              </Grid>
              <nav aria-label='Legal links'>
                <ul className='su-list-unstyled su-link-regular su-divide-x su-divide-white su-text-17 xl:su-text-20'>
                  <CreateBloks blokSection={props.blok.legalLinks} />
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
