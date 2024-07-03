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
  const { subject } = eventData;
  const generalTags = subject.filter(
    (s) => !s.endsWith('; Diversity/Inclusion')
  );
  const identityTags = subject
    .filter((s) => s.endsWith('; Diversity/Inclusion'))
    .map((s) => s.replace('; Diversity/Inclusion', ''));

  return {
    objectID: storyId,
    startTimestamp,
    endTimestamp,
    generalTags,
    identityTags,
    _geoloc: geo,
    ...mergedEventData,
  };
};

const googleDateTimeToStoryDateTime = (date, time) => {
  if (!date) {
    return '';
  }

  const combinedRaw = time ? `${date} ${time}` : date;
  const combinedRawFormat = time ? 'yyyy-MM-dd t' : 'yyyy-MM-dd';
  const luxonStartDate = DateTime.fromFormat(combinedRaw, combinedRawFormat, {
    zone: 'America/Los_Angeles',
  });

  return luxonStartDate.toFormat('yyyy-MM-dd T', { zone: 'UTC' });
};

export const googleRowToStoryContent = (data, source) => {
  const {
    externalID: externalId,
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    eventUrlRaw = '',
    location = '',
    city = '',
    country = '',
    address = '',
    subject: subjectRaw = '',
    format = '',
    region = '',
    latitude = '',
    longitude = '',
    description: descriptionRaw = '',
    experience: experienceRaw = '',
  } = data;

  const start = googleDateTimeToStoryDateTime(startDate, startTime);
  const end = googleDateTimeToStoryDateTime(endDate, endTime);
  const subject = subjectRaw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s.length);
  const experience = experienceRaw ? [experienceRaw] : [];
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
    experience,
    location,
    city,
    country,
    address,
    subject,
    format,
    region,
    latitude,
    longitude,
    source,
  };
};

export const googleRowToStory = (row, source) => {
  const { title, externalId } = row;
  const content = googleRowToStoryContent(row, source);
  const slug = `${slugify(externalId)}-${slugify(title)}`;

  return {
    name: title,
    content,
    slug,
    full_slug: `events/sync/${slug}`,
  };
};

export const compareStoryContent = (a, b) => {
  // TODO: Do we need to check description?
  const sortedExperienceA = a.experience.sort();
  const sortedExperienceB = b.experience.sort();
  const isExperienceEq =
    sortedExperienceA.length === sortedExperienceB.length &&
    sortedExperienceA.every((e, i) => e === sortedExperienceB[i]);

  const sortedSubjectA = a.subject.sort();
  const sortedSubjectB = b.subject.sort();
  const isSubjectEq =
    sortedSubjectA.length === sortedSubjectB.length &&
    sortedSubjectA.every((e, i) => e === sortedSubjectB[i]);

  return (
    a.title !== b.title ||
    a.start !== b.start ||
    a.end !== b.end ||
    a.location !== b.location ||
    a.city !== b.city ||
    a.country !== b.country ||
    a.address !== b.address ||
    a.format !== b.format ||
    a.region !== b.region ||
    a.latitude !== b.latitude ||
    a.longitude !== b.longitude ||
    a.eventUrl?.url !== b.eventUrl?.url ||
    !isExperienceEq ||
    !isSubjectEq
  );
};
