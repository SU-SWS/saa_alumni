import React from "react";

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
    <div className={`${className || "su-mb-58"}`}>
      <p className="su-text-21 su-font-semibold">{label}</p>
      {preparedFacetValues.map((option, index) => (
        <label
          key={option.name}
          className={`su-flex su-items-center su-cursor-pointer su-text-19 ${
            index ? "su-mt-20" : ""
          }`}
        >
          <input
            type="checkbox"
            value={option.name}
            name={attribute}
            defaultChecked={selectedOptions.includes(option.name)}
            className="su-mr-15 su-max-w-[1.7rem] su-custom-checkbox su-max-h-[1.7rem] su-appearance-none !su-border su-rounded-[0.3rem]"
            onChange={(e) => handleCheckboxChange(e)}
          />
          <span className={optionClasses}>
            {option.name}
            <span> ({option.count.toLocaleString("en-us")})</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacet;
