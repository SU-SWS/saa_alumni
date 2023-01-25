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

const Initial = ({ userProfile }) => {
  const string =
    userProfile.name?.digitalName || userProfile.session?.firstName;
  const initial = string?.substr(0, 1);
  return (
    <div
      className={dcnb(
        'su-flex su-justify-center su-transition su-leading su-text-center su-border-2',
        'su-border-digital-red-xlight su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark',
        'su-w-full su-h-full'
      )}
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
    final_destination: location.pathname + location.search,
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

  // TODO: Add donor logic
  const isDonor = true;

  const linkClasses =
    'su-flex su-items-baseline su-justify-between su-group su-w-full su-px-20 su-py-12 su-no-underline su-leading-display su-text-white hocus:su-underline hocus:su-text-white hocus:su-bg-cardinal-red-xxdark !su-underline-offset-[3px] lg:!su-decoration-digital-red-xlight su-text-20';

  const links = [
    {
      text: 'My Account',
      url: 'https://myaccount.stanford.edu',
      icon: true,
      classes: 'su-border-t su-border-b su-py-14',
    },
  ];

  if (isDonor) {
    links.push({
      text: 'My Giving',
      url: '',
      icon: true,
      classes: 'su-border-b su-py-14',
    });
  }

  links.push(
    {
      text: 'Help',
      url: 'https://alumni.stanford.edu/help/',
      classes: 'su-link-regular',
    },
    {
      text: 'Log out',
      url: '/api/auth/logout',
      classes: 'su-link-regular',
    }
  );

  const getProfileLinks = (userProfile) => {
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
                    >{`Hi, ${
                      userProfile.name?.digitalName ||
                      `${`${userProfile.session.firstName} ${userProfile.session.lastName}`}`
                    }`}</span>
                    <SrOnlyText>
                      {`${expanded ? ' Close' : ' Open'} user menu`}
                    </SrOnlyText>
                    <div className="su-w-40 su-h-40 su-text-24">
                      <Initial userProfile={userProfile} />
                    </div>
                    <ChevronDownIcon
                      className={`su-inline-block lg:su-relative su-ml-8 su-w-[19px] lg:su-w-[19px] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 su-text-white lg:group-hover:su-text-digital-red-xlight group-focus:su-text-digital-red-xlight su-transition
                ${expanded ? 'su-rotate-180 su-transform-gpu' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`su-transform-gpu su-transition su-origin-top md:su-origin-top-right su-bg-cardinal-red-xdark su-z-10 su-absolute su-rs-px-1 su-rs-pt-0 su-rs-pb-1 su-w-screen su-mr-[-2rem] sm:su-mr-[-3rem] md:su-w-[38rem] su-right-0 su-mt-8 su-text-left
                      ${
                        expanded
                          ? 'su-scale-y-100 md:su-scale-x-100 su-opacity-100 su-visible'
                          : 'su-scale-y-0 md:su-scale-x-0 su-opacity-0 su-invisible'
                      }
                    `}
                    aria-hidden={!expanded}
                  >
                    <div className="su-px-20 su-flex su-items-center su-pb-[2.8rem]">
                      <div className="su-w-[54px] su-h-[54px] su-text-[34px]">
                        <Initial userProfile={userProfile} />
                      </div>

                      <div className="su-pl-10">
                        <div className=" su-text-23 su-leading-tight su-font-semibold">
                          {userProfile.name?.digitalName ||
                            userProfile.session?.firstName}
                        </div>
                        <ul className="su-list-unstyled su-leading-snug su-flex">
                          {getProfileLinks(userProfile)}
                        </ul>
                      </div>
                    </div>
                    <ul className="su-list-none su-p-0  children:su-mb-02em">
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
                  </div>
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
