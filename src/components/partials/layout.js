import React from 'react';
import Header from './header';
import Footer from './footer';
import SEO from './SEO';
import { FlexBox } from "decanter-react";

/*
** The Layout component is referenced and used in all page-type components.
** It incorporates the Header and sticky Footer, based on page settings.
*/

const Layout = (props) => (
  <>
    <SEO {...props} />
    <FlexBox direction='col' className='su-min-h-screen su-overflow-x-hidden'>
      <Header {...props} />
        {props.children}
      <Footer {...props} />
    </FlexBox>
  </>
)

export default Layout;
