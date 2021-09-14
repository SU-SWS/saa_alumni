import React from 'react';
import { Heading } from 'decanter-react';

const SearchFacet = ({
  label,
  facetValues,
  attribute,
  selectedOptions,
  onChange,
  className,
  optionClasses,
  exclude = [],
}) => {
  const handleCheckboxChange = (e) => {
    const values = [];
    const checkboxes = document.getElementsByName(e.target.name);

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        values.push(checkbox.value);
      }
    });

    onChange(values);
  };

  let preparedFacetValues = Object.keys(facetValues).map((value) => {
    if (exclude.includes(value)) {
      return null;
    }
    return {
      name: value,
      count: facetValues[value],
    };
  });

  preparedFacetValues = preparedFacetValues.filter((el) => el != null);
  if (preparedFacetValues.length === 0) {
    return null;
  }

  return (
    <div
      className={`${
        className ||
        'su-rs-mb-1 lg:su-rs-mb-3 su-rs-pb-3 lg:su-pb-0 su-border-b lg:su-border-0 su-border-black-20'
      }`}
    >
      <Heading level={3} weight="semibold" className="su-rs-mb-0 su-text-m0">
        {label}
      </Heading>

      {preparedFacetValues.map((option, index) => (
        <label
          key={option.name}
          className={`su-label su-flex su-items-center su-cursor-pointer su-text-19 hover:su-text-digital-red-xlight ${
            index ? 'su-mt-20' : ''
          }`}
        >
          <input
            type="checkbox"
            value={option.name}
            name={attribute}
            defaultChecked={selectedOptions.includes(option.name)}
            className="su-peer su-form-checkbox su-text-digital-red-light su-mr-10 su-w-[1.5rem] su-h-[1.5rem] su-cursor-pointer su-rounded su-border-black-40 hocus:su-border-none hocus:su-ring hocus:su-ring-digital-red-light hocus:su-ring-offset-0"
            onChange={(e) => handleCheckboxChange(e)}
          />
          <span
            className={`su-text-16 lg:su-text-19 peer-hover:su-text-digital-red-light peer-focus:su-text-digital-red-light peer-hover:su-underline peer-focus:su-underline hover:su-underline hover:su-text-digital-red-light ${
              optionClasses || ''
            }`}
          >
            {option.name}
            <span> ({option.count.toLocaleString('en-us')})</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacet;
