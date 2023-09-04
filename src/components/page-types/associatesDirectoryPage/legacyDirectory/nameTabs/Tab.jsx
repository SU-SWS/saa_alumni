import React from 'react';

function Tab({ active, eventKey, onClick, title }) {
  const tabClass = active ? 'active' : '';

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li className={tabClass} onClick={() => onClick(eventKey)}>
      <a href={`#${eventKey}`} data-toggle="tab">
        {title}
      </a>
    </li>
  );
}
export default Tab;
