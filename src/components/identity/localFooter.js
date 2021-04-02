import React from "react";
import CreateBloks from "../../utilities/createBloks";
import getNumBloks from "../../utilities/getNumBloks";
import SbEditable from "storyblok-react";
import { Container, Grid, GridCell } from 'decanter-react';
import getImageWidth from "../../utilities/getImageWidth";
import transformImage from "../../utilities/transformImage";

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
      }
      else {
        processedImg = transformImage(props.blok.bgImage.filename, '');
      }

      // Set background image style
      bgImageStyle = {
        backgroundImage: `url('${processedImg}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      };
    }
  }

  return (
    <SbEditable content={props.blok}>
      <Container className='su-bg-saa-black su-text-white su-border-b su-border-solid su-border-black-80' width='full'>
        <div>
          <Container style={bgImageStyle}>
            <img src='/images/saa-logo-white.svg' className='su-rs-pt-10 su-rs-pb-6 su-w-200 md:su-w-300 2xl:su-w-[350px]' />
          </Container>
        </div>
        <Container className='su-rs-pb-5'>
          <Grid xs={6}>
            <GridCell xs={6} sm={3} md={2} xxl={3}>
              <div className='su-font-semibold su-pb-02em'><strong>{props.blok.organization}</strong></div>
              <address>
                <div className='su-pb-02em'>{props.blok.address1}</div>
                <div className='su-pb-02em'>{props.blok.address2}</div>
                <div>{props.blok.address3}</div>
              </address>
            </GridCell>
            <GridCell xs={6} sm={3} md={4} xxl={3}>
              <h1>Test</h1>
            </GridCell>
          </Grid>
        </Container>
      </Container>
    </SbEditable>
  )
};

export default LocalFooter;
