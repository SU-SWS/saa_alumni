import React, { useCallback, useMemo, useState } from 'react';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useCurrentRefinements, useNumericMenu } from 'react-instantsearch';
import { ThemeProvider, createTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { MobileParentFilter } from '../Filters/MobileParentFilter';

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
 * @property {() => void} [onCloseMenu]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const MobileDateFilter = ({ onCloseMenu = () => null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const { items } = useCurrentRefinements({
    includedAttributes: ['startTimestamp'],
  });
  const { refine } = useNumericMenu({
    attribute: 'startTimestamp',
    items: [{}],
  });
  const midnight = useMemo(() => DateTime.local().endOf('day'), []);
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

  const startRefinement = useMemo(
    () => items?.[0]?.refinements?.find((r) => r.operator === '>='),
    [items]
  );

  const endRefinement = useMemo(
    () => items?.[0]?.refinements?.find((r) => r.operator === '<='),
    [items]
  );

  const hasRefinement = useMemo(
    () => !!startRefinement || !!endRefinement,
    [startRefinement, endRefinement]
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

  return (
    <MobileParentFilter
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      label="Date"
      count={hasRefinement ? 1 : 0}
      onCloseMenu={() => {
        close();
        onCloseMenu();
      }}
    >
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <fieldset className="su-flex su-flex-col su-gap-8 su-mt-8 su-px-8">
          <legend className="su-sr-only">Narrow events by date range</legend>
          <div className="su-flex su-items-center su-gap-16 su-mt-16">
            <ThemeProvider theme={theme}>
              <MobileDatePicker
                label="Start"
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
                    fullWidth: true,
                  },
                }}
              />
              <span>to</span>
              <MobileDatePicker
                label="End"
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
                    fullWidth: true,
                  },
                }}
              />
            </ThemeProvider>
          </div>
        </fieldset>
      </LocalizationProvider>
    </MobileParentFilter>
  );
};
