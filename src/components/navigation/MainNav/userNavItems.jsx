import React from 'react';
import { dcnb } from 'cnbuilder';
import useDisplay from '../../../hooks/useDisplay';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './userNavItems.styles';

const UserNavItems = ({ expanded }) => {
  const { showDesktop } = useDisplay();

  const linkClasses =
    'su-flex su-items-baseline su-justify-between su-group su-w-full su-px-20 su-py-12 su-no-underline su-leading-display su-text-white hocus:su-underline hocus:su-text-white hocus:su-bg-cardinal-red-xxdark !su-underline-offset-[3px] lg:!su-decoration-digital-red-xlight su-text-20';

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
      {showDesktop && (
        <ul
          className={` su-transform-gpu su-transition su-origin-top md:su-origin-top-right su-bg-cardinal-red-xdark su-z-10 su-list-none su-absolute su-rs-px-1 su-rs-pt-0 su-rs-pb-1 children:su-mb-02em su-w-screen su-mr-[-2rem] sm:su-mr-[-3rem] md:su-w-[32rem] su-right-0 su-mt-8 su-text-left
                          ${
                            expanded
                              ? 'su-scale-y-100 md:su-scale-x-100 su-opacity-100 su-visible'
                              : 'su-scale-y-0 md:su-scale-x-0 su-opacity-0 su-invisible'
                          }
                        `}
          aria-hidden={!expanded}
        >
          {links.map((link) => (
            <li className={link.classes} key={link.url}>
              <a href={link.url} className={linkClasses}>
                {link.text}
                {link.icon && (
                  <HeroIcon
                    iconType="arrow-right"
                    isAnimate
                    className="su-relative su-inline-block su-mt-0 su-text-digital-red-xlight group-hover:su-text-white group-focus:su-text-white"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      {!showDesktop && (
        <ul className="su-z-10 su-p-0 su-list-none su-w-screen su-text-left lg:su-hidden">
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
                    className="su-relative su-inline-block su-mt-0 su-text-digital-red-xlight group-hover:su-text-white group-focus:su-text-white"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserNavItems;
