import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, Skiplink } from 'decanter-react';

/**
 * The Header component is referenced and used in the Layout component.
 * It incorporates the Identity Bar and Local Header, based on page settings.
 */

const Header = ({ blok }) => (
  <SbEditable content={blok}>
    <Container element='header' width='full' className='su-shadow su-relative su-z-20'>
      <Skiplink />
    </Container>
  </SbEditable>
)

export default Header;
