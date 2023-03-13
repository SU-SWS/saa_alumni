import React from 'react';
import { dcnb } from 'cnbuilder';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './userNavItems.styles';

const UserNavItems = ({ expanded, Initial, userProfile }) => {
  const getProfileLinks = () => {
    const affiliation = [
      'GSB Alum',
      'GSB SEP',
      'GSB Life Member',
      'GSB Student',
      'GSB Defined Alums and Students',
      'Student',
      'SAA Alum',
      'Med CRT Graduate',
      'Med Alum',
      'Med Student',
      'Law Alum',
      'Law Student',
      'EDU Alum',
      'EDU Student',
    ];

    const alumFilter = userProfile.affiliations.filter((item) =>
      affiliation.includes(item)
    );
    const isAlumni = alumFilter.length;

    let profileLinks = [
      {
        text: 'Edit my information',
        url: 'https://myaccount.stanford.edu/profile',
      },
    ];

    if (isAlumni) {
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
            '!su-text-digital-red-xlight hocus:!su-text-white su-font-bold su-text-18 su-leading-display su-flex su-items-center su-no-underline hocus:su-underline'
          )}
        >
          {key !== 0 && (
            <span className="su-w-1 su-h-[2rem] su-flex su-bg-digital-red-light su-mx-12" />
          )}
          {link.text}
        </a>
      </li>
    ));
  };

  return (
    <div aria-hidden={!expanded} className={styles.menuWrapper(expanded)}>
      <div className="su-px-26 lg:su-px-18 su-rs-pb-1 su-flex su-items-center su-pt-[1.8rem]">
        <div className="su-w-[54px] su-h-[54px] su-text-[34px]">
          <Initial />
        </div>

        <div className="su-pl-10">
          <div className=" su-text-23 su-leading-display su-font-semibold">
            {userProfile.name?.digitalName || userProfile.session?.firstName}
          </div>
          <ul className="su-list-unstyled su-leading-snug su-flex">
            {getProfileLinks()}
          </ul>
        </div>
      </div>

      <ul className={styles.menu}>
        <li>
          <a
            href="https://myaccount.stanford.edu"
            className={styles.utilityNavLink}
          >
            My Account
            <HeroIcon
              iconType="arrow-right"
              isAnimate
              className={styles.heroicon}
            />
          </a>
        </li>

        {/* To add back when donor logic is added */}
        {/* <li> */}
        {/*  <a href="https://TODO" className={styles.utilityNavLink}> */}
        {/*    My Giving */}
        {/*    <HeroIcon */}
        {/*      iconType="arrow-right" */}
        {/*      isAnimate */}
        {/*      className={styles.heroicon} */}
        {/*    /> */}
        {/*  </a> */}
        {/* </li> */}
      </ul>

      <ul className={styles.menu2}>
        <li>
          <a
            href="https://alumni.stanford.edu/help/"
            className={styles.utilityNav2Link}
          >
            Help
          </a>
        </li>
        <li>
          <a href="/api/auth/logout" className={styles.utilityNav2Link}>
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserNavItems;
