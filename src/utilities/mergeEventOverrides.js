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
