import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SrOnlyText } from 'decanter-react';
import * as styles from './Date.styles';
import { getDate } from './getDate';

export const DateProps = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  isMinimal: PropTypes.bool,
  className: PropTypes.string,
};

export const Date = ({ startDate, endDate, isMinimal, className }) => {
  const { start, end } = useMemo(
    () => ({ start: getDate(startDate), end: getDate(endDate) }),
    [startDate, endDate]
  );

  return (
    <div className={styles.root({ className, isMinimal })}>
      <div className={styles.dateWrapper({ isMinimal })}>
        <time dateTime={start.dateTime} className={styles.date}>
          <span className={styles.month}> {start.month}</span>
          <span className={styles.day}>{start.day}</span>
        </time>
        {end && (
          <>
            <span className={styles.dash} aria-hidden="true">
              &ndash;
            </span>
            <SrOnlyText srText="to" />
            <time dateTime={end.dateTime} className={styles.endDate}>
              <span className={styles.month}>{end.month}</span>
              <span className={styles.day}>{end.day}</span>
            </time>
          </>
        )}
      </div>
    </div>
  );
};
Date.propTypes = DateProps;
