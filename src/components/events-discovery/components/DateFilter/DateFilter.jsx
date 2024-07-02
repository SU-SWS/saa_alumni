import React, { useCallback, useMemo, useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useCurrentRefinements, useNumericMenu } from 'react-instantsearch';
import { ThemeProvider, createTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { FilterAccordion } from '../FilterAccordion';
import { luxonToday } from '../../../../utilities/dates';
import { RadioInput } from './RadioInput';

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: [
      '"Source Sans 3"',
      '"Source Sans Pro"',
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ],
  },
});

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {() => void} [toggleFacet]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const DateFilter = () => {
  const { items } = useCurrentRefinements({
    includedAttributes: ['startTimestamp'],
  });
  const { refine } = useNumericMenu({
    attribute: 'startTimestamp',
    items: [{}],
  });
  const midnight = useMemo(
    () =>
      luxonToday()
        .setZone('America/Los_Angeles')
        .plus({ days: 1 })
        .startOf('day'),
    []
  );
  const getTimestamp = useCallback(
    (daysFromNow) =>
      midnight.plus({ days: daysFromNow }).toUTC().toUnixInteger(),
    [midnight]
  );
  const plus7Days = useMemo(() => getTimestamp(7), [getTimestamp]);
  const plus30Days = useMemo(() => getTimestamp(30), [getTimestamp]);
  const plus60Days = useMemo(() => getTimestamp(60), [getTimestamp]);

  const [custom, setCustom] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = useCallback(
    () => setExpanded((curr) => !curr),
    [setExpanded]
  );

  const triggerRefine = useCallback(
    (range) => {
      refine(encodeURI(JSON.stringify(range)));
    },
    [refine]
  );

  const handleOptionsSelect = useCallback(
    (value) => {
      if (value === '7') {
        triggerRefine({ end: plus7Days });
        return;
      }

      if (value === '30') {
        triggerRefine({ end: plus30Days });
        return;
      }

      if (value === '60') {
        triggerRefine({ end: plus60Days });
        return;
      }

      triggerRefine({});
    },
    [triggerRefine, plus7Days, plus30Days, plus60Days]
  );

  const startRefinement = useMemo(
    () => items?.[0]?.refinements?.find((r) => r.operator === '>='),
    [items]
  );

  const endRefinement = useMemo(
    () => items?.[0]?.refinements?.find((r) => r.operator === '<='),
    [items]
  );

  const dateStart = useMemo(() => {
    if (!startRefinement) {
      return null;
    }

    return DateTime.fromSeconds(startRefinement.value).endOf('day');
  }, [startRefinement]);

  const dateEnd = useMemo(() => {
    if (!endRefinement) {
      return null;
    }

    return DateTime.fromSeconds(endRefinement.value).endOf('day');
  }, [endRefinement]);

  const handleDateStartChange = useCallback(
    (newValue, context) => {
      if (!newValue || context.validationError || !newValue.isValid) {
        return;
      }
      triggerRefine({
        start: newValue.toUnixInteger(),
        end: endRefinement?.value,
      });
    },
    [triggerRefine, endRefinement]
  );

  const handleDateEndChange = useCallback(
    (newValue, context) => {
      if (!newValue || context.validationError || !newValue.isValid) {
        return;
      }
      triggerRefine({
        start: startRefinement?.value,
        end: newValue.toUnixInteger(),
      });
    },
    [triggerRefine, startRefinement]
  );

  const isAllChecked = useMemo(
    () => !custom && !endRefinement && !startRefinement,
    [custom, endRefinement, startRefinement]
  );
  const is7Checked = useMemo(
    () =>
      !custom &&
      !startRefinement &&
      endRefinement &&
      endRefinement.value === plus7Days,
    [custom, endRefinement, startRefinement, plus7Days]
  );
  const is30Checked = useMemo(
    () =>
      !custom &&
      !startRefinement &&
      endRefinement &&
      endRefinement.value === plus30Days,
    [custom, endRefinement, startRefinement, plus30Days]
  );
  const is60Checked = useMemo(
    () =>
      !custom &&
      !startRefinement &&
      endRefinement &&
      endRefinement.value === plus60Days,
    [custom, endRefinement, startRefinement, plus60Days]
  );
  const isCustomChecked = useMemo(
    () =>
      custom || (!isAllChecked && !is7Checked && !is30Checked && !is60Checked),
    [custom, isAllChecked, is7Checked, is30Checked, is60Checked]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <FilterAccordion
        expanded={expanded}
        label="Date"
        onToggle={toggleExpanded}
        showReset={!isAllChecked}
        onReset={() => {
          handleOptionsSelect();
          setCustom(false);
        }}
      >
        <fieldset className="su-flex su-flex-col su-gap-8 su-mt-8 su-pl-8">
          <legend className="su-sr-only">Narrow events by date range</legend>
          <RadioInput
            labelText="All"
            name="dateRange"
            value="all"
            checked={isAllChecked}
            onChange={() => {
              handleOptionsSelect();
              setCustom(false);
            }}
          />
          <RadioInput
            labelText="Next 7 Days"
            name="dateRange"
            value="7"
            checked={is7Checked}
            onChange={() => {
              handleOptionsSelect('7');
              setCustom(false);
            }}
          />
          <RadioInput
            labelText="Next 30 Days"
            name="dateRange"
            value="30"
            checked={is30Checked}
            onChange={() => {
              handleOptionsSelect('30');
              setCustom(false);
            }}
          />
          <RadioInput
            labelText="Next 60 Days"
            name="dateRange"
            value="60"
            checked={is60Checked}
            onChange={() => {
              handleOptionsSelect('60');
              setCustom(false);
            }}
          />
          <RadioInput
            labelText="Custom"
            name="dateRange"
            value="custom"
            checked={isCustomChecked}
            onChange={() => {
              handleOptionsSelect();
              setCustom(true);
            }}
          />
          {isCustomChecked && (
            <>
              <div className="su-flex su-gap-4 su-mt-16">
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    label="From"
                    value={dateStart}
                    minDate={midnight}
                    maxDate={dateEnd || midnight.plus({ days: 90 })}
                    onChange={handleDateStartChange}
                  />
                  <DesktopDatePicker
                    label="To"
                    value={dateEnd}
                    minDate={dateStart || midnight}
                    maxDate={midnight.plus({ days: 90 })}
                    onChange={handleDateEndChange}
                  />
                </ThemeProvider>
              </div>
            </>
          )}
        </fieldset>
      </FilterAccordion>
    </LocalizationProvider>
  );
};
