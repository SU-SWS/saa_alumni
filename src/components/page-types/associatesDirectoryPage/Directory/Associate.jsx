import React from 'react';
import PropTypes from 'prop-types';

const AssociateProps = {
  isEnabled: PropTypes.bool,
  person: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    yearAdded: PropTypes.number,
  }),
};

const Associate = ({ isEnabled = true, person }) => {
  if (!isEnabled) return null;

  return (
    <div className="su-flex even:su-bg-black-10">
      <div className="su-flex-1 su-w-[50%] su-py-10 su-pl-30">
        {person.name.first} {person.name.last}
      </div>
      <div> </div>
      <div className="su-flex-1 su-w-[50%] su-py-10">
        {Object.values(person.years || []).join(', ')}
      </div>
    </div>
  );
};

Associate.propTypes = AssociateProps;

export default Associate;
