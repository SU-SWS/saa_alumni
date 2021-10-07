import React from 'react';
import { FlexBox } from 'decanter-react';
import Header from './header';
import Footer from './footer';
import Seo from './seo';

/**
 * The Layout component is referenced and used in all page-type components.
 * It incorporates the Header and sticky Footer, based on page settings.
 */
const Layout = ({ children, hasHero, isDark, ...rest }) => (
  <>
    <Seo {...rest} />
    <FlexBox direction="col" className="su-min-h-screen">
      <Header hasHero={hasHero} isDark={isDark} {...rest} />
      {children}
      <Footer {...rest} />
    </FlexBox>
  </>
);

export default Layout;
