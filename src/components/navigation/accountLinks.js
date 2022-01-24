import React, { useState, createRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useAuth } from '../../hooks/useAuth';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Initial = ({ string }) => {
  const initial = string.substr(0, 1);
  return (
    <div className="su-inline-block su-text-center su-ml-12 su-w-40 su-h-40 su-text-24 su-border-2 su-border-solid su-border-digital-red-light su-rounded-full">
      {initial}
    </div>
  );
};

const AccountLinks = (props) => {
  const ref = createRef();
  const [expanded, setExpanded] = useState(false);
  const redirectUnauthenticated = false;
  const { user, isAuthenticated } = useAuth(redirectUnauthenticated);

  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  const linkClasses =
    'su-block su-group su-w-full su-px-20 su-py-8 su-no-underline su-leading-display su-text-white su-font-regular hocus:su-underline hocus:su-text-white lg:hocus:su-bg-cardinal-red-xxdark !su-underline-offset lg:!su-underline-digital-red-xlight hocus:su-bg-digital-red';

  if (isAuthenticated && user) {
    return (
      // eslint-disable-next-line prettier/prettier
      <li className="su-text-white su-relative" ref={ref}>
        <button type="button" onClick={() => setExpanded(!expanded)}>
          <span>{`Hi, ${user.firstName} ${user.lastName}`}</span>
          <Initial string={user.firstName} />
          <ChevronDownIcon
            className={`su-inline-block lg:su-relative lg:su--top-3 lg:su-mr-0 lg:su-ml-8 lg:su-w-[0.9em] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 lg:su-bg-transparent lg:group-hocus:su-text-digital-red-xlight lg:group-hocus:!su-bg-transparent su-transition
            ${expanded ? 'su-rotate-180 su-transform-gpu' : ''}`}
            aria-hidden="true"
          />
        </button>
        <ul
          className={`su-bg-digital-red-dark su-z-10 su-list-none su-absolute su-py-8 su-px-8 su-w-[300px] su-right-0 su-text-left
          ${expanded ? 'su-block' : 'su-hidden'}
        `}
        >
          <li>
            <span className={linkClasses}>Log out</span>
          </li>
        </ul>
      </li>
    );
  }
  return (
    <li>
      <span>Login</span>
    </li>
  );
};

export default AccountLinks;
