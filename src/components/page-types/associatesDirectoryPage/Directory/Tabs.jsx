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

const tabKeys = Object.keys(tabsGroups);

const Tabs = ({ groupedNames, onlyNewMembers, recentYear }) => {
  const [activeTab, setActiveTab] = useState('A-B');

  const handleTabClick = (event) => {
    setActiveTab(event.target.dataset.group);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      const currentIndex = tabKeys.indexOf(activeTab);
      const isStart = currentIndex === 0;
      const nextIndex = isStart ? tabKeys.length - 1 : currentIndex - 1;
      const nextTab = tabKeys[nextIndex];
      setActiveTab(nextTab);
    }
    if (event.key === 'ArrowRight') {
      const currentIndex = tabKeys.indexOf(activeTab);
      const isEnd = currentIndex === tabKeys.length - 1;
      const nextIndex = isEnd ? 0 : currentIndex + 1;
      const nextTab = tabKeys[nextIndex];
      setActiveTab(nextTab);
    }
  };

  return (
    <div>
      <div
        className="su-flex su-flex-wrap su-border-b su-border-black-30/40"
        aria-label="Groups of Associates"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="tablist"
      >
        {tabKeys.map((group) => (
          <TabHeader
            key={`tab-${group}`}
            group={group}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            handleKeyPress={handleKeyPress}
          />
        ))}
      </div>
      <div className="su-my-20">
        {tabKeys.map((group) => (
          <div
            id={`content-${group}`}
            key={`content-${group}`}
            role="tabpanel"
            tabIndex={0}
            hidden={activeTab !== group}
          >
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
