import React, { useCallback, useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useCurrentRefinements, useNumericMenu } from 'react-instantsearch';
import { Slider } from '@mui/material';
import { DateTime } from 'luxon';
import { FilterAccordion } from '../FilterAccordion';
import { luxonToday } from '../../../../utilities/dates';
import { RadioInput } from './RadioInput';

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
        triggerRefine({ start: plus7Days });
        return;
      }

      if (value === '30') {
        triggerRefine({ start: plus30Days });
        return;
      }

      if (value === '60') {
        triggerRefine({ start: plus60Days });
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

  const rangeStart = useMemo(() => {
    if (!startRefinement) {
      return 0;
    }

    return Math.floor(
      DateTime.fromSeconds(startRefinement.value).diff(midnight, 'days').days
    );
  }, [startRefinement, midnight]);

  const rangeEnd = useMemo(() => {
    if (!endRefinement) {
      return 90;
    }

    return Math.floor(
      DateTime.fromSeconds(endRefinement.value).diff(midnight, 'days').days
    );
  }, [endRefinement, midnight]);

  const handleRangeChange = useCallback(
    (event, newValue, activeThumb) => {
      if (activeThumb === 0) {
        triggerRefine({
          start: getTimestamp(Math.min(newValue[0], rangeEnd - 7)),
          end: endRefinement?.value,
        });
      } else {
        triggerRefine({
          start: startRefinement?.value,
          end: getTimestamp(Math.max(newValue[1], rangeStart + 7)),
        });
      }
    },
    [
      startRefinement,
      endRefinement,
      rangeStart,
      rangeEnd,
      getTimestamp,
      triggerRefine,
    ]
  );

  const isAllChecked = useMemo(
    () => !custom && !endRefinement && !startRefinement,
    [custom, endRefinement, startRefinement]
  );
  const is7Checked = useMemo(
    () =>
      !custom &&
      !endRefinement &&
      startRefinement &&
      startRefinement.value === plus7Days,
    [custom, endRefinement, startRefinement, plus7Days]
  );
  const is30Checked = useMemo(
    () =>
      !custom &&
      !endRefinement &&
      startRefinement &&
      startRefinement.value === plus30Days,
    [custom, endRefinement, startRefinement, plus30Days]
  );
  const is60Checked = useMemo(
    () =>
      !custom &&
      !endRefinement &&
      startRefinement &&
      startRefinement.value === plus60Days,
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
              <div className="su-flex su-mt-16 su-pl-22 su-pr-30">
                <Slider
                  getAriaLabel={(activeThumb) =>
                    activeThumb === 0
                      ? 'From days after today'
                      : 'To days after today'
                  }
                  value={[rangeStart, rangeEnd]}
                  valueLabelDisplay="auto"
                  onChange={handleRangeChange}
                  getAriaValueText={(v) => `${v} days from today`}
                  disableSwap
                  min={0}
                  max={90}
                  step={1}
                  marks={[
                    { value: 0, label: 'Today' },
                    { value: 30, label: '30 days' },
                    { value: 60, label: '60 days' },
                    { value: 90, label: '90 days' },
                  ]}
                  className="[&_*]:!su-font-sans [&_*]:!su-text-14 !su-text-digital-red"
                />
              </div>
              <div className="su-flex su-gap-4" />
            </>
          )}
        </fieldset>
      </FilterAccordion>
    </LocalizationProvider>
  );
};
