import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AssociateList from './AssociateList';
import TabHeader from './TabHeader';

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

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      const currentIndex = Object.keys(tabsGroups).indexOf(activeTab);
      if (currentIndex === 0) return;

      const nextIndex = currentIndex - 1;
      const nextTab = Object.keys(tabsGroups)[nextIndex];
      setActiveTab(nextTab);
    }
    if (event.key === 'ArrowRight') {
      const currentIndex = Object.keys(tabsGroups).indexOf(activeTab);
      if (currentIndex === Object.keys(tabsGroups).length - 1) return;

      const nextIndex = currentIndex + 1;
      const nextTab = Object.keys(tabsGroups)[nextIndex];
      setActiveTab(nextTab);
    }
  };

  return (
    <div>
      <nav
        className="su-flex su-flex-wrap su-border-b su-border-black-30/40"
        aria-label="Groups of Associates"
      >
        {Object.keys(tabsGroups).map((group) => (
          <TabHeader
            key={`tab-${group}`}
            group={group}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            handleKeyPress={handleKeyPress}
          />
        ))}
      </nav>
      <div className="su-my-20">
        {Object.keys(tabsGroups).map((group) => (
          <div key={`content-${group}`} hidden={activeTab !== group}>
            {tabsGroups[group].map((letter) => (
              <AssociateList
                key={`content-${letter}`}
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
