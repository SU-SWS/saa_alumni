import React from "react";
import { Heading } from "decanter-react";

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
        "su-mb-[24px] lg:su-mb-[66px] su-pb-[28px] " +
          "lg:su-pb-0 su-border-b lg:su-border-0 su-border-black-20"
      }`}
    >
      <Heading
        level={2}
        weight="semibold"
        className="su-text-18 lg:su-text-23 su-mb-18 lg:su-mb-21"
      >
        {label}
      </Heading>

      {preparedFacetValues.map((option, index) => (
        <label
          key={option.name}
          className={`su-label su-flex su-items-center su-cursor-pointer su-text-19 ${
            index ? "su-mt-20" : ""
          }`}
        >
          <input
            type="checkbox"
            value={option.name}
            name={attribute}
            defaultChecked={selectedOptions.includes(option.name)}
            className="su-checkbox su-mr-15 su-max-w-[1.7rem] su-cursor-pointer su-custom-checkbox su-max-h-[1.7rem] su-appearance-none !su-border su-rounded-[0.3rem]"
            onChange={(e) => handleCheckboxChange(e)}
          />
          <span className={`su-text-16 lg:su-text-19 ${optionClasses}`}>
            {option.name}
            <span> ({option.count.toLocaleString("en-us")})</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacet;
