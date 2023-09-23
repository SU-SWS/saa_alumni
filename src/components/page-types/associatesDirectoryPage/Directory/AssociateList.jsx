import React from 'react';
import PropTypes from 'prop-types';

import Associate from './Associate';
import BackToTopLink from './BackToTopLink';

const AssociateListProps = {
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

const AssociateList = ({ letter, associates, onlyNewMembers, recentYear }) => (
  <div>
    <h4 className="su-p-10 su-text-cardinal-red-xdark su-font-serif su-border-b su-border-dashed su-border-1 su-border-black-30-opacity-40">
      {letter}
    </h4>
    <div>
      {associates?.map((person, index) => (
        <Associate
          // eslint-disable-next-line react/no-array-index-key
          key={`person-${person.entryTitle}-${index}`}
          person={person}
          isEnabled={!onlyNewMembers || person.yearAdded === recentYear}
        />
      ))}
    </div>
    <BackToTopLink />
  </div>
);

AssociateList.propTypes = AssociateListProps;

export default AssociateList;
