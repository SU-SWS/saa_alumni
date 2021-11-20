import React from 'react';
import SbEditable from 'storyblok-react';
import { GlobalFooter } from '../identity/GlobalFooter/GlobalFooter';
import CreateBloks from '../../utilities/createBloks';

/**
 * The Footer component is referenced and used in the Layout component.
 * It incorporates the Local Footer and Global Footer, based on page settings.
 */

const Footer = ({ blok: { localFooter }, blok }) => (
  <SbEditable content={blok}>
    <footer className="su-w-full su-flex-grow-0 su-relative">
      <CreateBloks blokSection={localFooter} />
      <GlobalFooter />
    </footer>
  </SbEditable>
);

export default Footer;
