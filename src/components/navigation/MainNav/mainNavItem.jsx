import React from 'react';
import SbLink from '../../../utilities/sbLink';
import * as styles from './mainNavitem.styles';

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
