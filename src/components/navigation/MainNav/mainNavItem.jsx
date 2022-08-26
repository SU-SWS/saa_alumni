import React from 'react';
import { dcnb } from 'cnbuilder';
import SbLink from '../../../utilities/sbLink';
import * as styles from './mainNavitem.styles';

// 2nd level Nav Items for SAA shared and Homesite Main Navs
const MainNavItem = ({ blok: { link, text, mobileOnly }, isHomesite }) => (
  <li className={dcnb(styles.root, mobileOnly ? 'lg:su-hidden' : '')}>
    <SbLink
      link={link}
      classes={styles.link({ isHomesite })}
      hasExternalIcon
      externalIconClasses={styles.externalIcon}
      activeClass={styles.activeLink({ isHomesite })}
    >
      {text}
    </SbLink>
  </li>
);

export default MainNavItem;
