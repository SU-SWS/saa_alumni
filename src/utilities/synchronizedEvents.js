import { DateTime } from 'luxon';
import TurndownService from 'turndown';
import markdownToRichtextService from 'storyblok-markdown-richtext';
import { luxonDate } from './dates';
import { slugify } from './slugify';

const { markdownToRichtext } = markdownToRichtextService;
const turndownService = new TurndownService();

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

export const storyToAlgoliaEvent = (story, regionDataSource) => {
  const storyId = story.uuid;
  const eventData = story.content;
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
  const { region } = mergedEventData;
  let usRegion = '';
  let intRegion = '';

  if (region && regionDataSource) {
    const regionDimension = regionDataSource?.find(
      (ds) => ds.value === region
    )?.dimension_value;

    if (regionDimension === 'us') {
      usRegion = region;
    } else if (regionDimension === 'international') {
      intRegion = region;
    }
  }

  return {
    objectID: storyId,
    startTimestamp,
    endTimestamp,
    usRegion,
    intRegion,
    _geoloc: geo,
    ...mergedEventData,
  };
};

const googleDateTimeToStoryDateTime = (date, time, timezone) => {
  if (!date) {
    return '';
  }

  const combinedRaw = time ? `${date} ${time}` : date;
  const dateFormat = 'M/d/yy';
  const timeFormat = 'h:mm a';
  const combinedRawFormat = time ? `${dateFormat} ${timeFormat}` : dateFormat;
  const luxonDatetime = DateTime.fromFormat(combinedRaw, combinedRawFormat, {
    zone: timezone,
  });

  if (!luxonDatetime.isValid) {
    return '';
  }

  return luxonDatetime.toFormat('yyyy-MM-dd T', { zone: 'UTC' });
};

export const googleRowToStoryContent = (data, source) => {
  const processedData = Object.entries(data).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key]: val?.trim(),
    }),
    {}
  );

  const {
    externalID: externalId,
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    timezone: localTimezone = 'America/Los_Angeles',
    eventUrlRaw = '',
    location = '',
    city = '',
    state = '',
    country = '',
    address = '',
    subject: subjectRaw = '',
    format: formatRaw = '',
    region = '',
    latitude = '',
    longitude = '',
    description: descriptionRaw = '',
    experience = '',
  } = processedData;

  const start = googleDateTimeToStoryDateTime(
    startDate,
    startTime,
    localTimezone
  );
  const end = googleDateTimeToStoryDateTime(endDate, endTime, localTimezone);

  const format = formatRaw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s.length);
  const subject = subjectRaw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s.length);
  const generalTags = subject.filter(
    (s, index, arr) =>
      s !== 'Diversity/Identity' &&
      (index === 0 || arr.at(index - 1) !== 'Diversity/Identity')
  );
  const identityTags = subject.filter(
    (s, index, arr) =>
      s !== 'Diversity/Identity' &&
      (index === 0 || arr.at(index - 1) === 'Diversity/Identity')
  );
  const eventUrl = eventUrlRaw
    ? {
        url: eventUrlRaw,
        linktype: 'url',
        fieldtype: 'multilink',
        cached_url: eventUrlRaw,
      }
    : null;
  const description = descriptionRaw
    ? markdownToRichtext(turndownService.turndown(descriptionRaw))
    : null;

  return {
    component: 'synchronizedEvent',
    externalId,
    title,
    start,
    end,
    description,
    eventUrl,
    experience: experience.toLowerCase(),
    location,
    city,
    state,
    country,
    address,
    generalTags,
    identityTags,
    format,
    region,
    latitude,
    longitude,
    localTimezone,
    source,
  };
};

export const googleRowToStory = (row, source) => {
  const { title, externalID: externalId } = row;
  const content = googleRowToStoryContent(row, source);
  const slug = `${slugify(externalId)}-${slugify(title)}`;

  return {
    name: title,
    content,
    slug,
  };
};

export const combineStories = (fromStory, toStory) => ({
  ...toStory,
  name: toStory.name !== fromStory.name ? fromStory.name : toStory.name,
  slug: toStory.slug !== fromStory.slug ? fromStory.slug : toStory.slug,
  content: {
    ...toStory.content,
    ...fromStory.content,
  },
});

export const compareStoryContent = (a, b) => {
  // TODO: Do we need to check description?
  const sortedTagsA = [
    ...(a.generalTags?.sort?.() ?? []),
    ...(a.identityTags?.sort?.() ?? []),
  ];
  const sortedTagsB = [
    ...(b.generalTags?.sort?.() ?? []),
    ...(b.identityTags.sort?.() ?? []),
  ];
  const isTagsEq =
    sortedTagsA.length === sortedTagsB.length &&
    sortedTagsA.every((e, i) => e === sortedTagsB[i]);

  const sortedFormatA = a.format?.sort?.() ?? [];
  const sortedFormatB = b.format?.sort?.() ?? [];
  const isFormatEq =
    sortedFormatA.length === sortedFormatB.length &&
    sortedFormatA.every((e, i) => e === sortedFormatB[i]);

  return (
    a.title !== b.title ||
    a.start !== b.start ||
    a.end !== b.end ||
    a.localTimezone !== b.localTimezone ||
    a.location !== b.location ||
    a.experience !== b.experience ||
    a.city !== b.city ||
    a.state !== b.state ||
    a.country !== b.country ||
    a.address !== b.address ||
    a.region !== b.region ||
    a.latitude !== b.latitude ||
    a.longitude !== b.longitude ||
    a.eventUrl?.url !== b.eventUrl?.url ||
    !isTagsEq ||
    !isFormatEq
  );
};
