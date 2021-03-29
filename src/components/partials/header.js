import React from 'react';
import SbEditable from 'storyblok-react';
import { Container, IdentityBar, Skiplink } from 'decanter-react';
import CreateBloks from '../../utilities/createBloks';

/**
 * The Header component is referenced and used in the Layout component.
 * It incorporates the Identity Bar and Local Header, based on page settings.
 */

const Header = (props) => (
  <SbEditable content={props.blok}>
    <Container element='header' width='full' className='su-shadow su-relative su-z-20'>
      <Skiplink />
      <IdentityBar color={props.blok.idBarColor} />
      <CreateBloks blokSection={props.blok.localHeader} />
    </Container>
  </SbEditable>
)

export default Header;
