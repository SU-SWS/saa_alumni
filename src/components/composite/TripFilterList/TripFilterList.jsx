import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'decanter-react';
import { FilterCheckbox } from '../../simple/FilterCheckbox/FilterCheckbox';
import * as styles from './TripFilterList.styles';

export const TripFilterProps = {
  filter: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    available: PropTypes.number,
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        available: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
  clearFilterType: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};
export const TripFilterList = ({ filter, clearFilterType, toggleFilter }) => {
  const filtersToRender = useMemo(
    // Quite possibly the greatest, clearest line of code I've ever written... 👯
    () => filter.filters.filter((f) => f.available),
    [filter.filters]
  );

  return (
    <div className={styles.root}>
      <Heading level={3} weight="semibold" className={styles.heading}>
        {filter.name}
      </Heading>
      <div className={styles.filterlist}>
        <FilterCheckbox
          label={`All ${filter.name.toLowerCase()}s`}
          onChange={() => clearFilterType(filter.key)}
          checked={!filter.active}
        />
        {filtersToRender.map((f) => (
          <FilterCheckbox
            className="su-w"
            key={`${f.datasource}-${f.value}`}
            label={f.name}
            onChange={() => toggleFilter(f.datasource, f.value, toggleFilter)}
            checked={f.selected}
          />
        ))}
      </div>
    </div>
  );
};
TripFilterList.propTypes = TripFilterProps;
