import React, { useCallback, useMemo, useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useCurrentRefinements, useNumericMenu } from 'react-instantsearch';
import { ThemeProvider, createTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { FilterAccordion } from '../FilterAccordion';
import { RadioInput } from './RadioInput';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';

const theme = createTheme({
  typography: {
    fontSize: 18,
    fontFamily: [
      '"Source Sans 3"',
      '"Source Sans Pro"',
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ],
  },
  components: {
    MuiPickersCalendarHeader: {
      styleOverrides: {
        labelContainer: {
          fontSize: '1.6rem',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          boxShadow: 'none !important',
          fontSize: '1.4rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '0',
          padding: '0 1rem',
        },
      },
    },
  },
});

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {() => void} [onToggleExpanded]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const DateFilter = ({ expanded, onToggleExpanded = () => null }) => {
  const { items } = useCurrentRefinements({
    includedAttributes: ['startTimestamp'],
  });
  const { refine } = useNumericMenu({
    attribute: 'startTimestamp',
    items: [{}],
  });
  const midnight = useMemo(() => DateTime.local().endOf('day'), []);
  const getTimestamp = useCallback(
    (daysFromNow) => midnight.plus({ days: daysFromNow }).toUnixInteger(),
    [midnight]
  );
  const plus7Days = useMemo(() => getTimestamp(7), [getTimestamp]);
  const plus30Days = useMemo(() => getTimestamp(30), [getTimestamp]);
  const plus60Days = useMemo(() => getTimestamp(60), [getTimestamp]);

  const [custom, setCustom] = useState(false);
  const [startValidationError, setStartValidationError] = useState('');
  const [endValidationError, setEndValidationError] = useState('');

  const getValidationMessage = (err) => {
    if (err === 'minDate') return 'Please pick a later date';
    if (err === 'maxDate') return 'Please pick an earlier date';
    if (err) return 'Not a valid date';
    return '';
  };

  const triggerRefine = useCallback(
    (range) => {
      refine(encodeURI(JSON.stringify(range)));
    },
    [refine]
  );

  const handleOptionsSelect = useCallback(
    (value, isCustom = false) => {
      setCustom(isCustom);
      setEndValidationError('');
      setStartValidationError('');

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

    return DateTime.fromSeconds(startRefinement.value).toLocal().startOf('day');
  }, [startRefinement]);

  const dateEnd = useMemo(() => {
    if (!endRefinement) {
      return null;
    }

    return DateTime.fromSeconds(endRefinement.value).toLocal().endOf('day');
  }, [endRefinement]);

  const handleDateStartChange = useCallback(
    (newValue, context) => {
      setStartValidationError(getValidationMessage(context.validationError));

      if (!newValue || context.validationError || !newValue.isValid) {
        return;
      }

      triggerRefine({
        start: newValue.startOf('day').toUnixInteger(),
        end: endRefinement?.value,
      });
    },
    [triggerRefine, endRefinement]
  );

  const handleDateEndChange = useCallback(
    (newValue, context) => {
      setEndValidationError(getValidationMessage(context.validationError));

      if (!newValue || context.validationError || !newValue.isValid) {
        return;
      }

      triggerRefine({
        start: startRefinement?.value,
        end: newValue.endOf('day').toUnixInteger(),
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
        resetLabel={
          <>
            Reset <SrOnlyText>date</SrOnlyText> filter
          </>
        }
        onToggleExpanded={onToggleExpanded}
        showReset={!isAllChecked}
        onReset={() => {
          handleOptionsSelect();
        }}
      >
        <fieldset className="su-flex su-flex-col su-gap-8 su-mt-8 su-px-8">
          <legend className="su-sr-only">Narrow events by date range</legend>
          <RadioInput
            labelText="All"
            name="dateRange"
            value="all"
            checked={isAllChecked}
            onChange={() => {
              handleOptionsSelect(null);
            }}
          />
          <RadioInput
            labelText="Next 7 Days"
            name="dateRange"
            value="7"
            checked={is7Checked}
            onChange={() => {
              handleOptionsSelect('7');
            }}
          />
          <RadioInput
            labelText="Next 30 Days"
            name="dateRange"
            value="30"
            checked={is30Checked}
            onChange={() => {
              handleOptionsSelect('30');
            }}
          />
          <RadioInput
            labelText="Next 60 Days"
            name="dateRange"
            value="60"
            checked={is60Checked}
            onChange={() => {
              handleOptionsSelect('60');
            }}
          />
          <RadioInput
            labelText="Custom"
            name="dateRange"
            value="custom"
            checked={isCustomChecked}
            onChange={() => {
              handleOptionsSelect(null, true);
            }}
          />
          {isCustomChecked && (
            <>
              <div className="su-flex su-flex-col su-gap-16 su-mt-16 su-max-w-170">
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    label="From"
                    value={dateStart}
                    minDate={midnight}
                    maxDate={dateEnd || midnight.plus({ days: 90 })}
                    onChange={handleDateStartChange}
                    timezone="system"
                    views={['day']}
                    format="MM/dd/yyyy"
                    slotProps={{
                      textField: {
                        helperText: startValidationError,
                      },
                    }}
                  />
                  <DesktopDatePicker
                    label="To"
                    value={dateEnd}
                    minDate={dateStart || midnight}
                    maxDate={midnight.plus({ days: 90 })}
                    onChange={handleDateEndChange}
                    timezone="system"
                    views={['day']}
                    format="MM/dd/yyyy"
                    slotProps={{
                      textField: {
                        helperText: endValidationError,
                      },
                    }}
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
