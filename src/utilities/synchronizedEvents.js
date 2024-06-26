import { luxonDate } from './dates';

const isString = (val) => typeof val === 'string';

const isLink = (val) =>
  typeof val === 'object' && !!Object.getOwnPropertyDescriptor(val, 'linktype');

const isWysiwyg = (val) =>
  typeof val === 'object' &&
  !!Object.getOwnPropertyDescriptor(val, 'type') &&
  val.type === 'doc';

const isArray = (val) => Array.isArray(val);

const hasOverrideValue = (val) => {
  if (isString(val)) {
    return !!val;
  }

  if (isArray(val)) {
    return !!val.length;
  }

  if (isLink(val)) {
    return !!val?.url;
  }

  if (isWysiwyg(val)) {
    return !!val?.content[0]?.content;
  }

  return false;
};

export const mergeEventOverrides = (eventContent) => {
  const merged = { ...eventContent };

  const overrides = Object.entries(eventContent).filter(([key]) =>
    key.endsWith('Override')
  );

  overrides.forEach(([key, val]) => {
    // Delete override key
    delete merged[key];

    if (!val) {
      return;
    }

    // Get non-override key
    const nonOverrideKey = key.slice(0, -8);

    if (hasOverrideValue(val)) {
      merged[nonOverrideKey] = val;
    }
  });

  return merged;
};

export const storyToAlgoliaEvent = (story) => {
  const storyId = story.data.story.uuid;
  const eventData = story.data.story.content;
  const mergedEventData = mergeEventOverrides(eventData);
  const startTimestamp = mergedEventData.start
    ? luxonDate(mergedEventData.start).toUnixInteger()
    : null;
  const endTimestamp = mergedEventData.end
    ? luxonDate(mergedEventData.end).toUnixInteger()
    : null;
  const lat = parseFloat(mergedEventData.latitude);
  const lng = parseFloat(mergedEventData.longitude);
  const hasValidLat = !!lat || lat === 0;
  const hasValidLng = !!lng || lng === 0;
  const geo = hasValidLat && hasValidLng ? { lat, lng } : null;

  return {
    objectID: storyId,
    startTimestamp,
    endTimestamp,
    _geoloc: geo,
    ...mergedEventData,
  };
};
