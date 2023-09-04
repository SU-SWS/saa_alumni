import React, { useState } from 'react';
import Tab from './Tab';

function Tabs({ defaultActiveKey, children }) {
  const [activeTab, setActiveTab] = useState(defaultActiveKey);

  const handleTabClick = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
    <div className="tabs">
      <ul className="nav nav-tabs">
        {React.Children.map(children, (child) => {
          if (child.type === Tab) {
            return React.cloneElement(child, {
              active: activeTab === child.props.eventKey,
              onClick: handleTabClick,
            });
          }
          return null;
        })}
      </ul>
      <div className="tab-content">
        {React.Children.map(children, (child) => {
          if (child.type === Tab && activeTab === child.props.eventKey) {
            return child.props.children;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Tabs;
