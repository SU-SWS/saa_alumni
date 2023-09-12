import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AssociateList from './AssociateList';

const TabsProps = {
  onlyNewMembers: PropTypes.bool,
  recentYear: PropTypes.number,
};

const tabsGroups = {
  'A-B': ['A', 'B'],
  'C-D': ['C', 'D'],
  'E-F': ['E', 'F'],
  'G-H': ['G', 'H'],
  'I-J': ['I', 'J'],
  'K-L': ['K', 'L'],
  'M-N': ['M', 'N'],
  'O-P': ['O', 'P'],
  'Q-R': ['Q', 'R'],
  'S-T': ['S', 'T'],
  'U-V': ['U', 'V'],
  'W-X': ['W', 'X'],
  'Y-Z': ['Y', 'Z'],
};
const Tabs = ({ groupedNames, onlyNewMembers, recentYear }) => {
  const [activeTab, setActiveTab] = useState('A-B');

  const handleTabClick = (event) => {
    setActiveTab(event.target.dataset.group);
  };

  return (
    <div>
      <nav>
        {Object.keys(tabsGroups).map((group) => (
          <a
            key={`tab-${group}`}
            className={`${
              activeTab === group
                ? 'su-bg-cardinal-red-xdark'
                : 'su-bg-saa-black su-bg-opacity-[80%]'
            } su-py-5 su-px-10 su-text-white hover:su-text-white hover:su-no-underline focus:su-text-white focus:su-no-underline su-border su-border-solid su-border-1 su-border-black-30-opacity-40`}
            href={`#${group}`}
            onClick={handleTabClick}
            data-group={group}
          >
            {group}
          </a>
        ))}
      </nav>
      <div className="su-my-20">
        {Object.keys(tabsGroups).map((group) => (
          <div key={`content-${group}`}>
            {tabsGroups[group].map((letter) => (
              <AssociateList
                key={`content-${letter}`}
                isEnabled={activeTab === group}
                tabsGroups={tabsGroups}
                letter={letter}
                associates={groupedNames[letter]}
                onlyNewMembers={onlyNewMembers}
                recentYear={recentYear}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = TabsProps;

export default Tabs;
