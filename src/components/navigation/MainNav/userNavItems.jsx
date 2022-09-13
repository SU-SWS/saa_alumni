import React from 'react';
import { dcnb } from 'cnbuilder';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './userNavItems.styles';

const UserNavItems = ({ expanded }) => {
  const links = [
    {
      text: 'My Account Settings',
      url: 'https://alumni.stanford.edu/get/page/my-account/profile',
      icon: true,
    },
    {
      text: 'Log out',
      url: '/api/auth/logout',
      classes: 'su-link-regular',
    },
  ];

  return (
    <>
      <ul className={styles.desktopMenu(expanded)} aria-hidden={!expanded}>
        {links.map((link) => (
          <li className={link.classes} key={link.url}>
            <a href={link.url} className={styles.link}>
              {link.text}
              {link.icon && (
                <HeroIcon
                  iconType="arrow-right"
                  isAnimate
                  className={styles.heroicon}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <ul className={styles.mobileMenu}>
        {links.map((link) => (
          <li
            className={dcnb('su-m-0 ', styles.utilityNavLink, link.classes)}
            key={link.url}
          >
            <a href={link.url} className="su-group">
              {link.text}
              {link.icon && (
                <HeroIcon
                  iconType="arrow-right"
                  isAnimate
                  className={styles.heroicon}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserNavItems;
