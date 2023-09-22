import React from 'react';
import PropTypes from 'prop-types';

import Associate from './Associate';

const AssociateListProps = {
  isEnabled: PropTypes.bool,
  letter: PropTypes.string,
  associates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
      }),
      yearAdded: PropTypes.number,
    })
  ),
  onlyNewMembers: PropTypes.bool,
  recentYear: PropTypes.number,
};

const AssociateList = ({
  isEnabled,
  letter,
  associates,
  onlyNewMembers,
  recentYear,
}) => {
  if (!isEnabled) return null;

  return (
    <div>
      <h4 className="su-p-10 su-text-cardinal-red-xdark su-font-serif su-border-b su-border-dashed su-border-1 su-border-black-30-opacity-40">
        {letter}
      </h4>
      <div>
        {associates?.map((person, index) => (
          <Associate
            key={`person-${person.entryTitle}-${index}`}
            person={person}
            isEnabled={!onlyNewMembers || person.yearAdded === recentYear}
          />
        ))}
      </div>
    </div>
  );
};

AssociateList.propTypes = AssociateListProps;

export default AssociateList;
