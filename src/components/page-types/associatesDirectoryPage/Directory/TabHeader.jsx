import React from 'react';
import PropTypes from 'prop-types';

const TabHeaderProps = {
  group: PropTypes.string,
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func,
  handleKeyPress: PropTypes.func,
};

const TabHeader = ({ group, activeTab, handleTabClick, handleKeyPress }) => {
  const isActive = activeTab === group;

  return (
    <a
      key={`tab-${group}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={group}
      className={`${
        isActive
          ? 'su-bg-cardinal-red-xdark'
          : 'su-bg-saa-black su-bg-opacity-[80%]'
      } su-py-[8px] su-px-[15px] su-text-white hover:su-text-white hover:su-no-underline focus:su-text-white focus:su-no-underline su-border su-border-solid su-border-1 su-border-black-30-opacity-40`}
      href={`#${group}`}
      onClick={handleTabClick}
      data-group={group}
      onKeyDown={handleKeyPress}
    >
      {group}
    </a>
  );
};
TabHeader.propTypes = TabHeaderProps;

export default TabHeader;
