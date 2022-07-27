import React, { useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useLocation } from '@reach/router';
import { dcnb } from 'cnbuilder';
import AuthContext from '../../contexts/AuthContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useEscape from '../../hooks/useEscape';
import { isExpanded } from '../../utilities/menuHelpers';
import useDisplay from '../../hooks/useDisplay';
import NavItem from './navItem';
import HeroIcon from '../simple/heroIcon';
import { SrOnlyText } from '../accessibility/SrOnlyText';

const Initial = ({ string }) => {
  const initial = string.substr(0, 1);
  return (
    <div
      className="su-flex su-justify-center su-transition su-leading su-text-center su-w-40 su-h-40 su-text-24 su-border-2 su-border-digital-red-xlight su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark"
      aria-hidden
    >
      {initial}
    </div>
  );
};

const AccountLinks = ({ mainLinkClasses }) => {
  const location = useLocation();
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const loginParams = new URLSearchParams({
    final_destination: location.pathname,
  });

  // Use the useDisplay hook to determine whether to display the desktop of mobile header
  const { showDesktop } = useDisplay('xl');

  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  useEscape(() => {
    if (buttonRef.current && isExpanded(buttonRef.current)) {
      setExpanded(false);
      buttonRef.current.focus();
    }
  });

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
    <AuthContext.Consumer>
      {({ isAuthenticated, isAuthenticating, userProfile }) => (
        <>
          {isAuthenticating && (
            <li className="su-pt-10 su-pb-10 lg:su-pt-0 lg:su-pb-0">
              <div className="su-spinner su-flex su-relative su-w-[4rem] su-h-[4rem]">
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin su-delay-75" />
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
              </div>
            </li>
          )}

          {!isAuthenticating && (
            <>
              {isAuthenticated && (
                <li
                  className="su-text-white su-relative su-pt-10 su-pb-10 lg:su-pt-0 lg:su-pb-0"
                  ref={ref}
                >
                  <button
                    type="button"
                    ref={buttonRef}
                    aria-expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                    className="su-flex su-items-center su-group"
                  >
                    <span
                      className={`su-inline-block su-mr-10 ${
                        showDesktop ? '' : 'su-sr-only'
                      }`}
                    >{`Hi, ${userProfile.name.fullNameParsed.firstName} ${userProfile.name.fullNameParsed.lastName}`}</span>
                    <SrOnlyText>
                      {`${expanded ? ' Close' : ' Open'} user menu`}
                    </SrOnlyText>
                    <Initial
                      string={userProfile.name.fullNameParsed.firstName}
                    />
                    <ChevronDownIcon
                      className={`su-inline-block lg:su-relative su-ml-8 su-w-[19px] lg:su-w-[19px] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 su-text-white lg:group-hover:su-text-digital-red-xlight group-focus:su-text-digital-red-xlight su-transition
                ${expanded ? 'su-rotate-180 su-transform-gpu' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <ul
                    className={`su-transform-gpu su-transition su-origin-top md:su-origin-top-right su-bg-cardinal-red-xdark su-z-10 su-list-none su-absolute su-rs-px-1 su-rs-pt-0 su-rs-pb-1 children:su-mb-02em su-w-screen su-mr-[-2rem] sm:su-mr-[-3rem] md:su-w-[32rem] su-right-0 su-mt-8 su-text-left
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
                </li>
              )}
              {!isAuthenticated && (
                <>
                  <NavItem
                    className={dcnb(
                      'su-pt-10 su-pb-10 lg:su-pt-0 lg:su-pb-0',
                      mainLinkClasses
                    )}
                    blok={{
                      link: {
                        url: `/api/auth/login${
                          loginParams ? `?${loginParams.toString()}` : ''
                        }`,
                      },
                      text: 'Log in',
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default AccountLinks;
