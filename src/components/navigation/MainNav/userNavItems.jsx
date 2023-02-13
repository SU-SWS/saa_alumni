import React from 'react';
import { dcnb } from 'cnbuilder';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './userNavItems.styles';

const UserNavItems = ({ expanded, Initial, userProfile }) => {
  // TODO: Add donor logic
  const isDonor = false;

  const links = [
    {
      text: 'My Account',
      url: 'https://myaccount.stanford.edu',
      icon: true,
      classes:
        'lg:su-m-0 su-border-t lg:su-border-b su-border-digital-red-xlight lg:su-py-14',
    },
  ];

  if (isDonor) {
    links.push({
      text: 'My Giving',
      url: '',
      icon: true,
      classes:
        'lg:su-m-0 lg:su-border-b lg:su-border-digital-red-xlight lg:su-py-14',
    });
  }

  links.push(
    {
      text: 'Help',
      url: 'https://alumni.stanford.edu/help/',
      classes: 'su-link-regular lg:su-m-0 lg:su-pt-14',
    },
    {
      text: 'Log out',
      url: '/api/auth/logout',
      classes: 'su-link-regular',
    }
  );

  const getProfileLinks = () => {
    const affiliation = [
      'GSB Alum',
      'SAA Alum',
      'Med Alum',
      'Law Alum',
      'EDU Alum',
    ];

    const alumFilter = userProfile.affiliations.filter((item) =>
      affiliation.includes(item)
    );
    const isAlumni = !alumFilter.length;

    let profileLinks = [
      {
        text: 'Edit my information',
        url: 'https://myaccount.stanford.edu/profile',
      },
    ];

    if (!isAlumni) {
      profileLinks = [
        {
          text: 'View Profile',
          url: 'https://alumnidirectory.stanford.edu/profile/me',
        },
        {
          text: 'Edit',
          url: 'https://myaccount.stanford.edu/profile',
        },
      ];
    }

    return profileLinks.map((link, key) => (
      <li className="su-m-0">
        <a
          href={link.url}
          className={dcnb(
            '!su-text-digital-red-xlight su-text-19 su-flex su-items-center su-no-underline hocus:su-underline'
          )}
        >
          {key !== 0 && (
            <span className="su-w-1 su-h-[2.1rem] su-flex su-bg-digital-red-light su-mx-12" />
          )}
          {link.text}
        </a>
      </li>
    ));
  };

  return (
    <div aria-hidden={!expanded} className={styles.menuWrapper(expanded)}>
      {/* className="su-transform-gpu su-transition su-origin-top lg:su-origin-top-right su-bg-cardinal-red-xdark su-z-10 su-absolute su-rs-px-1 su-rs-pt-2 su-rs-pb-1 su-w-screen su-mr-[-2rem] sm:su-mr-[-3rem] lg:su-w-[38rem] su-right-0 su-mt-8 su-text-left"> */}

      <div className="su-px-20 su-flex su-items-center su-pt-[1.8rem] su-pb-[2.2rem]">
        <div className="su-w-[54px] su-h-[54px] su-text-[34px]">
          <Initial />
        </div>

        <div className="su-pl-10">
          <div className=" su-text-23 su-leading-tight su-font-semibold">
            {userProfile.name?.digitalName || userProfile.session?.firstName}
          </div>
          <ul className="su-list-unstyled su-leading-snug su-flex">
            {getProfileLinks()}
          </ul>
        </div>
      </div>

      <ul className={styles.desktopMenu}>
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
    </div>
  );
};

export default UserNavItems;
