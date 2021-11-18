import React, { useMemo, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { Heading } from 'decanter-react';
import { FilterCheckbox } from '../../simple/FilterCheckbox/FilterCheckbox';
import * as styles from './TripFilterList.styles';

export const TripFilterProps = {
  filter: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    count: PropTypes.number,
    facets: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        count: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
  clearFilterType: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};
export const TripFilterList = ({ filter, clearFilterType, toggleFilter }) => {
  const facetsToRender = useMemo(
    () => filter.facets.filter((facet) => facet.count > 0 && !facet.primary),
    [filter.facets]
  );
  const allIsActive = useMemo(
    () =>
      filter.facets.find((facet) => facet.active && !facet.primary) ===
      undefined,
    [filter.facets]
  );

  const [panelOpened, setPanelOpened] = useState(false);
  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  };

  const CheckboxList = (
    <>
      <FilterCheckbox
        label={`All ${filter.name.toLowerCase()}s`}
        onChange={() => clearFilterType(filter.key)}
        checked={allIsActive}
      />
      {facetsToRender.map((facet) => (
        <FilterCheckbox
          key={`${facet.datasource}-${facet.value}`}
          label={facet.name}
          count={facet.count}
          onChange={() =>
            toggleFilter(facet.datasource, facet.value, toggleFilter)
          }
          checked={facet.active}
        />
      ))}
    </>
  );

  return (
    <>
      <div className={styles.root}>
        <Heading level={3} weight="semibold" className={styles.heading}>
          {filter.name}
        </Heading>
        <div className={styles.filterlist}>{CheckboxList}</div>
      </div>

      <div className={styles.rootMobile}>
        <button
          type="button"
          className={styles.toggle({ panelOpened })}
          aria-expanded={panelOpened}
          onClick={togglePanel}
        >
          <Heading level={3} weight="semibold" className={styles.toggleHeading}>
            {filter.name}
          </Heading>
          <ChevronDownIcon
            className={styles.chevron({ panelOpened })}
            aria-hidden="true"
          />
        </button>
        <div
          className={styles.filterlistMobile({ panelOpened })}
          aria-hidden={!panelOpened}
        >
          {CheckboxList}
        </div>
      </div>
    </>
  );
};
TripFilterList.propTypes = TripFilterProps;
