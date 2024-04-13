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
    <h4 className="su-p-10 su-text-cardinal-red-xdark su-font-serif su-border-b su-border-dashed su-border-black-30/40">
      {letter}
    </h4>
    <ul className="su-p-0 su-list-none">
      {associates?.map((person, index) => (
        <Associate
          // eslint-disable-next-line react/no-array-index-key
          key={`person-${person.entryTitle}-${index}`}
          person={person}
          isEnabled={!onlyNewMembers || person.yearAdded === recentYear}
        />
      ))}
    </ul>
    <BackToTopLink />
  </div>
);

AssociateList.propTypes = AssociateListProps;

export default AssociateList;
