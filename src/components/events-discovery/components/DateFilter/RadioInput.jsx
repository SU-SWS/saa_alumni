import React from 'react';
import { dcnb } from 'cnbuilder';
import { CheckIcon } from '@heroicons/react/outline';

/**
 * @typedef {object} Props
 * @property {string} name
 * @property {string} value
 * @property {boolean} checked
 * @property {string} labelText
 * @property {() => void} [onChange]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const RadioInput = ({
  name,
  value,
  checked,
  labelText,
  onChange = () => null,
}) => (
  <label className="su-group su-flex su-items-center su-gap-6 su-cursor-pointer su-text-18 su-text-black">
    <input
      type="radio"
      name={name}
      value={value}
      className="su-sr-only"
      checked={checked}
      onChange={onChange}
    />
    <span
      className={dcnb(
        'su-flex su-items-center su-justify-center su-rounded-full su-w-20 su-aspect-1 su-border-2 su-border-digital-red group-hocus:su-bg-digital-red-dark su-transition su-duration-200 su-ease-in-out su-ring-offset-2 group-focus-within:su-ring-1 group-focus-within:su-ring-cardinal-red-light',
        {
          'su-bg-digital-red group-hocus:su-bg-digital-red': checked,
        }
      )}
    >
      {checked && (
        <CheckIcon className=" su-w-14 su-aspect-1 su-stroke-[5] su-text-white" />
      )}
    </span>
    <span>{labelText}</span>
  </label>
);
