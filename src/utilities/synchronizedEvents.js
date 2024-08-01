import { DateTime } from 'luxon';
import TurndownService from 'turndown';
import markdownConverter from 'storyblok-markdown-richtext';
import { luxonDate } from './dates';
import { slugify } from './slugify';
import regions from './regions.json';

const usRegions = new Map(
  regions
    .filter(({ zip }) => zip !== 'n/a')
    .map(({ zip, region }) => [zip.toString(), region])
);

const intRegions = new Map(
  regions
    .filter(({ zip }) => zip === 'n/a')
    .map(({ country, region }) => [country, region])
);

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

export const setStoryRegion = async (story, mapKey) => {
  const updatedStory = { ...story };
  const { region, latitude, longitude } = updatedStory.content;

  if (region || !latitude || !longitude) {
    return updatedStory;
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const hasValidLat = !!lat || lat === 0;
  const hasValidLng = !!lng || lng === 0;

  if (!hasValidLat || !hasValidLng) {
    return updatedStory;
  }

  try {
    const mapRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?result_type=country|postal_code&language=en&latlng=${latitude},${longitude}&key=${mapKey}`
    );

    if (!mapRes.ok) {
      throw new Error('Google maps error: ', mapRes.status);
    }

    const mapData = await mapRes.json();

    if (!mapData?.results?.length) {
      return updatedStory;
    }

    const zipData = mapData.results.find((r) =>
      r?.types?.includes('postal_code')
    );
    const zip = zipData?.address_components?.find((z) =>
      z?.types?.includes('postal_code')
    )?.short_name;
    const countryData = mapData.results.find((r) =>
      r?.types?.includes('country')
    );
    const country = countryData?.address_components?.find((z) =>
      z?.types?.includes('country')
    )?.long_name;

    if (country === 'United States' && !!zip) {
      updatedStory.content.region = usRegions.get(zip) ?? '';
    } else if (country) {
      updatedStory.content.region = intRegions.get(country) ?? '';
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return updatedStory;
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

const googleDateTimeToStoryDateTime = (date, time = '', timezone) => {
  if (!date) {
    return '';
  }

  const fixedTime = time.replace('a.m.', 'AM').replace('p.m.', 'PM');

  const combinedRaw = fixedTime ? `${date} ${fixedTime}` : date;
  const dateFormat = 'M/d/yy';
  const timeFormat = 'h:mm a';
  const combinedRawFormat = fixedTime
    ? `${dateFormat} ${timeFormat}`
    : dateFormat;
  const luxonDatetime = DateTime.fromFormat(combinedRaw, combinedRawFormat, {
    zone: timezone,
  });

  if (!luxonDatetime.isValid) {
    return '';
  }

  return luxonDatetime.toUTC().toFormat('yyyy-MM-dd T');
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
    timezone: eventTimezone = 'America/Los_Angeles',
    eventURL: eventUrlRaw = '',
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
    experience: experienceRaw = '',
  } = processedData;

  const start = googleDateTimeToStoryDateTime(
    startDate,
    startTime,
    eventTimezone
  );
  const end = googleDateTimeToStoryDateTime(endDate, endTime, eventTimezone);

  const format = formatRaw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s.length);
  const subject = subjectRaw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s.length && s !== 'D/I');

  const eventUrl = eventUrlRaw
    ? {
        id: '',
        url: eventUrlRaw,
        linktype: 'url',
        fieldtype: 'multilink',
        cached_url: eventUrlRaw,
      }
    : null;
  const description = descriptionRaw
    ? markdownConverter.markdownToRichtext(
        turndownService.turndown(descriptionRaw)
      )
    : null;

  const experinceRawLowerCase = experienceRaw.toLowerCase();
  let experience = '';

  if (experinceRawLowerCase === 'in-person') {
    experience = 'In-Person';
  } else if (experinceRawLowerCase === 'hybrid') {
    experience = 'Hybrid';
  } else if (
    experinceRawLowerCase === 'remote' ||
    experinceRawLowerCase === 'virtual'
  ) {
    experience = 'Virtual';
  }

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
    state,
    country,
    address,
    subject,
    format,
    region,
    latitude,
    longitude,
    eventTimezone,
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
  const sortedSubjectA = a.subject?.sort?.() ?? [];
  const sortedSubjectB = b.subject?.sort?.() ?? [];
  const isSubjectEq =
    sortedSubjectA.length === sortedSubjectB.length &&
    sortedSubjectA.every((s, i) => s === sortedSubjectB[i]);

  const sortedFormatA = a.format?.sort?.() ?? [];
  const sortedFormatB = b.format?.sort?.() ?? [];
  const isFormatEq =
    sortedFormatA.length === sortedFormatB.length &&
    sortedFormatA.every((e, i) => e === sortedFormatB[i]);

  return (
    a.title !== b.title ||
    a.start !== b.start ||
    a.end !== b.end ||
    a.eventTimezone !== b.eventTimezone ||
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
    !isSubjectEq ||
    !isFormatEq
  );
};
