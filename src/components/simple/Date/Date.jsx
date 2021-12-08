import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import * as styles from './Date.styles';
import { getDate } from './getDate';

export const DateProps = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  isMinimal: PropTypes.bool,
  isSmall: PropTypes.bool,
  className: PropTypes.string,
};

export const Date = ({ startDate, endDate, isMinimal, isSmall, className }) => {
  const { start, end } = useMemo(
    () => ({ start: getDate(startDate), end: getDate(endDate) }),
    [startDate, endDate]
  );

  return (
    <div className={styles.root({ className, isMinimal })}>
      <div className={styles.dateWrapper({ isMinimal, isSmall })}>
        <time dateTime={start.dateTime} className={styles.date}>
          <span className={styles.month}> {start.month}</span>
          <span className={styles.day({ isSmall })}>{start.day}</span>
        </time>
        {end && (
          <>
            <span className={styles.dash({ isSmall })} aria-hidden="true">
              &ndash;
            </span>
            <SrOnlyText>to</SrOnlyText>
            <time dateTime={end.dateTime} className={styles.endDate}>
              <span className={styles.month}>{end.month}</span>
              <span className={styles.day({ isSmall })}>{end.day}</span>
            </time>
          </>
        )}
      </div>
    </div>
  );
};
Date.propTypes = DateProps;
