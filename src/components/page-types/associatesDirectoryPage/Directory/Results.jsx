import React from 'react';
import PropTypes from 'prop-types';
import Associate from './Associate';
import BackToTopLink from './BackToTopLink';

const ResultsProps = {
  onlyNewMembers: PropTypes.bool,
  recentYear: PropTypes.number,
};

const Results = ({ filteredList }) => {
  const total = filteredList?.length;
  if (!total) {
    return <div className="su-my-50">No associates found.</div>;
  }
  return (
    <div>
      <div className="su-my-20">{total} associates found:</div>
      <ul className="su-p-0 su-list-none">
        {filteredList?.map((person, index) => (
          <Associate
            // eslint-disable-next-line react/no-array-index-key
            key={`person-${person.entryTitle}-${index}`}
            person={person}
          />
        ))}
      </ul>
      <BackToTopLink />
    </div>
  );
};

Results.propTypes = ResultsProps;

export default Results;
