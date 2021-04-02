import React from 'react';
import { Link } from 'gatsby';
import CreateBloks from '../../utilities/createBloks';
import SbEditable from 'storyblok-react';
import { Container, Grid, GridCell, SrOnlyText } from 'decanter-react';
import getImageWidth from '../../utilities/getImageWidth';
import transformImage from '../../utilities/transformImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import SbLink from '../../utilities/sbLink';


const LocalFooter = (props) => {
  // Display background image option
  let bgImageStyle = {};
  let processedImg = '';

  // Process image and set inline background image styles if image exists,
  // and if hide background image option is not toggled on.
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
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      };
    }
  }

  return (
    <SbEditable content={props.blok}>
      <Container className='su-bg-saa-black su-text-white su-link-white su-link-no-underline su-border-b su-border-solid su-border-black-80' width='full'>
        <div>
          <Container style={bgImageStyle} className='su-rs-pt-10 su-rs-pb-6'>
            <Link to='/'>
              <img src='/images/saa-logo-white.svg' className='su-w-200 md:su-w-300 2xl:su-w-[350px]' alt='Stanford Alumni Association' />
            </Link>
          </Container>
        </div>
        <Container className='su-rs-pb-5'>
          <Grid xs={6} gap={true}>
            <GridCell xs={6} sm={3} md={2} xxl={3}>
              <div className='su-font-semibold su-pb-02em'><strong>{props.blok.organization}</strong></div>
              <address>
                <div className='su-pb-02em'>{props.blok.address1}</div>
                <div className='su-pb-02em'>{props.blok.address2}</div>
                <div className='su-pb-02em'>{props.blok.address3}</div>
              </address>
              <SbLink link={props.blok.mapLink} classes='su-inline-block su-rs-mb-3'>Map</SbLink>
              <ul className='su-list-unstyled su-rs-mb-4'>
                <CreateBloks blokSection={props.blok.actionLinks} />
              </ul>
              <ul className='su-flex su-list-unstyled su-link-black-20'>
                <li className='su-mr-1em'>
                  <SbLink link={props.blok.fbLink} classe='hover:su-text-digital-red'>
                    <SrOnlyText srText='Facebook Page' />
                    <FontAwesomeIcon icon={faFacebookF} aria-hidden='true' size='lg' />
                  </SbLink>
                </li>
                <li className='su-mr-1em'>
                  <SbLink link={props.blok.fbLink}>
                    <SrOnlyText srText='LinkedIn Page' />
                    <FontAwesomeIcon icon={faLinkedinIn} aria-hidden='true' size='lg' />
                  </SbLink>
                </li>
                <li className='su-mr-1em'>
                  <SbLink link={props.blok.twitterLink}>
                    <SrOnlyText srText='Twitter Page' />
                    <FontAwesomeIcon icon={faTwitter} aria-hidden='true' size='lg' />
                  </SbLink>
                </li>
                <li className='su-mr-1em'>
                  <SbLink link={props.blok.igLink}>
                    <SrOnlyText srText='Instagram Page' />
                    <FontAwesomeIcon icon={faInstagram} aria-hidden='true' size='lg' />
                  </SbLink>
                </li>
                <li>
                  <SbLink link={props.blok.youtubeLink}>
                    <SrOnlyText srText='Youtube Channel' />
                    <FontAwesomeIcon icon={faYoutube} aria-hidden='true' size='lg' />
                  </SbLink>
                </li>
              </ul>
            </GridCell>
            <GridCell xs={6} sm={3} md={4} xxl={3}>
              <Grid xs={1} md={2} xl={3} className='su-rs-mb-4 su-gap-lg'>
                <CreateBloks blokSection={props.blok.linkGroups} />
              </Grid>
              <nav aria-label='Legal links'>
                <ul className='su-list-unstyled su-link-regular su-flex su-flex-wrap su-divide-x su-divide-white su-text-17 xl:su-text-20'>
                  {/* purgecss: su-px-1em su-pl-1em su-pr-1em */}
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
