import React from 'react';
import SbEditable from 'storyblok-react';
import { useEvents } from '../../../hooks/useEvents';
import { SynchronizedEventCard } from './SynchronizedEventCard';
import CreateBloks from '../../../utilities/createBloks';

const SynchronizedEventCardList = ({
  blok: {
    numEventsShown,
    subjects,
    regions,
    formats,
    lastCard = [],
    headingLevel = 3,
  },
  blok,
}) => {
  const hasLastCard = !!lastCard?.length;
  const events = useEvents({
    subjects,
    regions,
    formats,
    maxNumEvents: hasLastCard ? numEventsShown - 1 : numEventsShown,
  });

  if (!events?.length) {
    return null;
  }

  return (
    <SbEditable content={blok}>
      <div className="su-grid su-cc su-grid-cols-1 md:su-grid-cols-2 xl:su-grid-cols-3 su-justify-items-center su-items-stretch su-gap-y-xl md:su-gap-y-50 xl:su-gap-y-70 su-grid-gap">
        {events.map((event) => (
          <SynchronizedEventCard
            key={event.id}
            headingLevel={headingLevel}
            {...event.content}
          />
        ))}
        {hasLastCard && <CreateBloks blokSection={lastCard} />}
      </div>
    </SbEditable>
  );
};

export default SynchronizedEventCardList;
