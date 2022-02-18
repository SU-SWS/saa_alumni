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
    <div className="su-flex su-justify-center su-leading su-text-center su-w-40 su-h-40 su-text-24 su-border-2 su-border-solid su-border-digital-red-light su-rounded-full">
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
  const { showMobile } = useDisplay();

  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  const linkClasses =
    'su-flex su-justify-between su-group su-w-full su-px-20 su-py-8 su-no-underline su-leading-display su-text-white su-font-regular hocus:su-underline hocus:su-text-white lg:hocus:su-bg-cardinal-red-xxdark !su-underline-offset lg:!su-underline-digital-red-xlight hocus:su-bg-digital-red';

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
      classes: 'su-border-t su-border-digital-red-xlight su-pt-[9px]',
    },
    {
      text: 'Log out',
      url: '/api/auth/logout',
    },
  ];

  return (
    <AuthContext.Consumer>
      {(authState) => (
        <>
          {authState.isAuthenticated && authState.user && (
            <li className="su-text-white su-relative" ref={ref}>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="su-flex su-items-center su-py-8"
              >
                <span
                  className={`su-inline-block su-mr-10 ${
                    showMobile ? 'su-sr-only' : ''
                  }`}
                >{`Hi, ${authState.user.firstName} ${authState.user.lastName}`}</span>
                <Initial string={authState.user.firstName} />
                <ChevronDownIcon
                  className={`su-inline-block lg:su-relative lg:su--top-3 su-ml-8 su-w-[0.9em] lg:su-w-[0.9em] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 lg:su-bg-transparent lg:group-hocus:su-text-digital-red-xlight lg:group-hocus:!su-bg-transparent su-transition
            ${expanded ? 'su-rotate-180 su-transform-gpu' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <ul
                className={`su-bg-digital-red-dark su-z-10 su-list-none su-absolute su-py-8 su-px-8 su-w-screen su-mr-[-20px] sm:su-mr-[-30px] md:su-mr-0 md:su-w-[300px] su-right-0 su-text-left
                  ${expanded ? 'su-block' : 'su-hidden'}
                `}
              >
                {links.map((link) => (
                  <li className={link.classes}>
                    <a href={link.url} className={linkClasses}>
                      {link.text}
                      {link.icon && (
                        <HeroIcon
                          iconType="arrow-right"
                          isAnimate
                          className="su-relative su-inline-block"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!authState.isAuthenticated && (
            <>
              <NavItem
                className={mainLinkClasses}
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
