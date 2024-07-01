import React, { useMemo } from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { DateTime } from 'luxon';
import { Chip } from './Chip';
import { luxonToday } from '../../../../utilities/dates';

export const ChipsComponent = () => {
  const { items, canRefine } = useCurrentRefinements();
  const midnight = useMemo(
    () =>
      luxonToday()
        .setZone('America/Los_Angeles')
        .plus({ days: 1 })
        .startOf('day'),
    []
  );

  const processedItems = useMemo(
    () =>
      items.reduce((acc, item) => {
        if (item.attribute === 'startTimestamp') {
          const startRefinement = item.refinements.find(
            (r) => r.operator === '>='
          );
          const endRefinement = item.refinements.find(
            (r) => r.operator === '<='
          );
          let startLabel = 'today';
          let endLabel = '90';

          if (startRefinement) {
            const startLuxonValue = DateTime.fromSeconds(
              startRefinement.value
            ).setZone('America/Los_Angeles');
            const startDiff = startLuxonValue.diff(midnight, 'days');
            const startDays = Math.floor(startDiff.days);
            if (startDays !== 0) {
              startLabel = startDiff === 1 ? 'tomorrow' : `${startDays}`;
            }
          }

          if (endRefinement) {
            const endLuxonValue = DateTime.fromSeconds(
              endRefinement.value
            ).setZone('America/Los_Angeles');
            const endDiff = endLuxonValue.diff(midnight, 'days');
            const endDays = Math.floor(endDiff.days);
            endLabel = `${endDays}`;
          }

          return [
            ...acc,
            {
              key: 'startTimestamp',
              attribute: 'startTimestamp',
              label: `From ${startLabel} to ${endLabel} days from now`,
              remove: () => {
                if (startRefinement) item.refine(startRefinement);
                if (endRefinement) item.refine(endRefinement);
              },
            },
          ];
        }

        return [
          ...acc,
          ...item.refinements.map((refinement) => ({
            key: `${refinement.attribute}-${refinement.label}`,
            attribute: refinement.attribute,
            label: refinement.label,
            remove: () => item.refine(refinement),
          })),
        ];
      }, []),
    [items, midnight]
  );

  if (!canRefine) {
    return null;
  }

  return (
    <div className="su-max-w-500 lg:su-max-w-900">
      <div className="su-flex su-flex-row su-flex-wrap su-gap-4">
        {processedItems.map((refinement) => (
          <Chip
            key={refinement.key}
            attribute={refinement.attribute}
            label={refinement.label}
            remove={refinement.remove}
          />
        ))}
      </div>
    </div>
  );
};
