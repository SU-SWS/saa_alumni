import React, { useMemo } from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { DateTime } from 'luxon';
import { Chip } from './Chip';

export const ChipsComponent = () => {
  const { items, canRefine } = useCurrentRefinements();
  const midnight = useMemo(() => DateTime.local().endOf('day'), []);

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
          const now = DateTime.local();

          const startLuxonValue = startRefinement
            ? DateTime.fromSeconds(startRefinement.value).toLocal()
            : now;

          const endLuxonValue = endRefinement
            ? DateTime.fromSeconds(endRefinement.value).toLocal()
            : midnight.plus({ days: 90 });

          const startLabel = startLuxonValue.hasSame(now, 'day')
            ? 'Today'
            : startLuxonValue.toFormat('M/d/yyyy');

          const endLabel = startLuxonValue.hasSame(endLuxonValue, 'day')
            ? ''
            : ` to ${endLuxonValue.toFormat('M/d/yyyy')}`;

          const label = `${startLabel}${endLabel}`;

          return [
            ...acc,
            {
              key: 'startTimestamp',
              attribute: 'startTimestamp',
              label,
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
