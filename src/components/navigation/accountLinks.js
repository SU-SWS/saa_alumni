import React, { useState, createRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import AuthContext from '../../contexts/AuthContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useDisplay from '../../hooks/useDisplay';
import NavItem from './navItem';
import HeroIcon from '../simple/heroIcon';

const Initial = ({ string }) => {
  const initial = string.substr(0, 1);
  return (
    <div className="su-flex su-justify-center su-leading su-text-center su-w-40 su-h-40 su-text-24 su-border-2 su-border-solid su-border-digital-red-xlight lg:su-border-digital-red-light su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark">
      {initial}
    </div>
  );
};

const AccountLinks = ({ mainLinkClasses }) => {
  const ref = createRef();
  const [expanded, setExpanded] = useState(false);
  const loginDestination =
    typeof window !== 'undefined' ? window.location.pathname : null;
  const loginParams = new URLSearchParams({
    final_destination: loginDestination,
  });

  // Use the useDisplay hook to determine whether to display the desktop of mobile header
  const { showDesktop } = useDisplay('xl');

  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  const linkClasses =
    'su-flex su-justify-between su-group su-w-full su-px-20 su-py-8 su-no-underline su-leading-display su-text-white hocus:su-underline hocus:su-text-white ' +
    'hocus:su-bg-cardinal-red-xxdark !su-underline-offset lg:!su-underline-digital-red-xlight su-text-20';

  const links = [
    {
      text: 'My Account Settings',
      url: 'https://alumni.stanford.edu/get/page/my-account/profile',
      icon: true,
    },
    {
      text: 'Your Giving',
      url: 'https://give.stanford.edu',
      icon: true,
    },
    {
      text: 'Stanford Groups',
      url: 'https://alumni.stanford.edu/groups/',
      icon: true,
    },
    {
      text: 'Help',
      url: 'https://alumni.stanford.edu/help/',
      classes:
        'su-border-t su-border-digital-red-xlight su-pt-[9px] su-link-regular',
    },
    {
      text: 'Log out',
      url: '/api/auth/logout',
      classes: 'su-link-regular',
    },
  ];

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, userProfile, userSession }) => (
        <>
          {isAuthenticated && (
            <li className="su-text-white su-relative" ref={ref}>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="su-flex su-items-center su-py-8 su-group"
              >
                <span
                  className={`su-inline-block su-mr-10 ${
                    showDesktop ? '' : 'su-sr-only'
                  }`}
                >
                  Hi,{' '}
                  {userProfile
                    ? `${userProfile.name.fullNameParsed.firstName} ${userProfile.name.fullNameParsed.lastName}`
                    : `${userSession.firstName} ${userSession.lastName}`}
                </span>
                <Initial
                  string={
                    userProfile
                      ? userProfile.name.fullNameParsed.firstName
                      : userSession.firstName
                  }
                />
                <ChevronDownIcon
                  className={`su-inline-block lg:su-relative su-ml-8 su-w-[19px] lg:su-w-[19px] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 su-text-white lg:group-hover:su-text-digital-red-xlight group-focus:su-text-digital-red-xlight su-transition
            ${expanded ? 'su-rotate-180 su-transform-gpu' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <ul
                className={`su-transform-gpu su-transition su-origin-top md:su-origin-top-right su-bg-digital-red-dark su-z-10 su-list-none su-absolute su-py-[24px] su-px-[24px] su-w-screen su-mr-[-20px] sm:su-mr-[-30px] md:su-w-[300px] su-right-0 su-text-left
                  ${
                    expanded
                      ? 'su-scale-y-100 md:su-scale-x-100 su-opacity-100 su-visible'
                      : 'su-scale-y-0 md:su-scale-x-0 su-opacity-0 su-invisible'
                  }
                `}
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
            </li>
          )}

          {!isAuthenticated && (
            <>
              <NavItem
                className={`${mainLinkClasses} su-link-regular`}
                blok={{
                  link: {
                    url: 'https://alumni.stanford.edu/get/page/my-account/profile',
                    linktype: 'url',
                  },
                  text: 'My Account',
                }}
                hasExternalIcon
              />

              <NavItem
                className={mainLinkClasses}
                blok={{
                  link: {
                    url: `/api/auth/login${
                      loginParams ? `?${loginParams.toString()}` : ''
                    }`,
                  },
                  text: 'Login',
                }}
              />
            </>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default AccountLinks;
