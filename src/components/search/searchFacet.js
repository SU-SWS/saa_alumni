import React, { useState } from "react";
import { Button, DismissButton } from "decanter-react";

const SearchFacet = ({ facetValues, attribute, selectedOptions, onChange }) => {
  const [opened, setOpened] = useState(false);

  const handleCheckboxChange = (e, clear = false) => {
    const values = [];
    if (clear) {
      const filters = document.getElementsByClassName("filters");
      if (filters) {
        Object.values(filters).forEach((set) => {
          Object.values(set.getElementsByTagName("input")).forEach(
            (checkbox) => {
              checkbox.checked = false;
            }
          );
        });
      }
    } else {
      const checkboxes = document.getElementsByName(e.target.name);
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          values.push(checkbox.value);
        }
      });
    }

    onChange(values);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleCheckboxChange(e);
    }
  };

  const filters = (
    <div className="filters">
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
              onChange={handleCheckboxChange}
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

  return (
    <div>
      <div
        className={`lg:su-hidden su-relative ${opened ? "su-shadow-xl" : ""}`}
      >
        <div
          className={`su-flex su-justify-between su-border su-text-20 su-font-semibold
          ${
            opened
              ? "su-border-digital-red su-text-white su-bg-digital-red su-px-[20px]"
              : "su-border-black-30 su-text-digital-red su-pl-[20px]"
          }`}
        >
          <span className="su-py-[14px] su-flex">Filter results</span>
          {opened ? (
            <DismissButton
              onClick={() => setOpened(false)}
              text="Close"
              icon="x"
              color="white"
              iconType="solid"
              className="su-ml-02em"
              iconSize="24"
            />
          ) : (
            <Button
              text="Open"
              variant="unset"
              className="su-mt-0 su-text-cardinal-red hocus:su-text-cardinal-red hocus:su-shadow-none"
              onClick={() => setOpened(true)}
            >
              <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.13597 1.0967C1.63485 0.61951 2.42611 0.637094 2.9033 1.13597L8.6 7.09161L14.2967 1.13597C14.7739 0.637093 15.5652 0.61951 16.064 1.0967C16.5629 1.57389 16.5805 2.36515 16.1033 2.86403L9.5033 9.76403C9.26749 10.0106 8.94116 10.15 8.6 10.15C8.25885 10.15 7.93251 10.0106 7.6967 9.76403L1.0967 2.86403C0.61951 2.36515 0.637094 1.57389 1.13597 1.0967Z" fill="#E50808"/>
              </svg>
            </Button>
          )}
        </div>

        {opened && (
          <div className="su-absolute su-top-[100%] su-left-0 su-w-full su-z-10 su-bg-white su-shadow-2xl">
            <div className="su-p-16">{filters}</div>

            <div className="su-flex su-justify-between su-px-[17px] su-pt-[18px] su-pb-[27px] su-pt-18 su-bg-foggy-light su-border-t su-border-black-20">
              <Button
                text="Clear all"
                variant="unset"
                className="su-rs-mt-0 su-text-cardinal-red hocus:su-text-cardinal-red hocus:su-shadow-none"
                onClick={(e) => handleCheckboxChange(e, true)}
              >
                Clear all
              </Button>

              <Button
                animate="right"
                icon="more"
                variant="solid"
                size="default"
                href="https://decanter.stanford.edu"
                className="su-rs-mt-0"
                onClick={() => setOpened(false)}
              >
                View Results
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="su-hidden lg:su-flex">{filters}</div>
    </div>
  );
};

export default SearchFacet;
