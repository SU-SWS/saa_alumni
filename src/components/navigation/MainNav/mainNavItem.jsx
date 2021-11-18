import React from 'react';
import SbLink from '../../../utilities/sbLink';
import * as styles from './mainNavitem.styles';

// 2nd level Nav Items for SAA shared and Homesite Main Navs
const MainNavItem = ({ blok: { link, text }, isHomesite }) => (
  <li className={styles.root}>
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
