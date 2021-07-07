import React from "react";

const SearchFacet = ({ facetValues, attribute, selectedOptions, onChange }) => {
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
  return (
    <div>
      <p className="su-text-21 su-font-semibold">Filter by</p>
      {Object.keys(facetValues).map((option, index) => {
        const count = facetValues[option];
        return (
          <label
            key={option}
            className={`su-flex su-items-center su-cursor-pointer su-text-19 ${
              index ? "su-mt-20" : ""
            }`}
          >
            <input
              type="checkbox"
              value={option}
              name={attribute}
              defaultChecked={selectedOptions.includes(option)}
              className="su-mr-15 su-max-w-[1.7rem] su-custom-checkbox su-max-h-[1.7rem] su-appearance-none !su-border su-rounded-[0.3rem]"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <span>
              {option}
              <span> ({count})</span>
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default SearchFacet;
