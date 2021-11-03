import React, { useState } from 'react';
import { Heading } from 'decanter-react';
import Modal from '../../layout/modal';
import { drillDownFilterTypes } from '../../../utilities/filterTrips';
import { TripFilterList } from '../../composite/TripFilterList/TripFilterList';
import { Chip } from '../../simple/Chip/Chip';
import * as styles from './TripFilterModal.styles';
import FaIcon from '../../simple/faIcon';

const TripFilterModal = ({
  primaryFilter,
  filters,
  activeFilters,
  toggleFilter,
  clearFilterType,
  clearAllFilters,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.filterModalButton}
        aria-label="Open trips filtering modal"
        onClick={() => setModalOpen(true)}
      >
        <span>Filters</span>
        <FaIcon proFaIcon="sliders-h" className={styles.filterIcon} />
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Heading level={2} className={styles.modalHeading}>
          Filter by
        </Heading>
        <div className={styles.filterChips}>
          {activeFilters.map((filter) => (
            <Chip
              key={`chip:${filter.datasource}:${filter.value}`}
              label={filter.name}
              aria-label={`Clear ${filter.datasource}=${filter.name} filter`}
              onClick={() => toggleFilter(filter.datasource, filter.value)}
            />
          ))}
        </div>
        <div className={styles.filtersList}>
          {filters
            .filter(
              ({ key }) =>
                key !== primaryFilter.datasource ||
                drillDownFilterTypes.includes(key)
            )
            .map((filter) => (
              <TripFilterList
                key={filter.key}
                filter={filter}
                clearFilterType={clearFilterType}
                toggleFilter={toggleFilter}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export default TripFilterModal;
