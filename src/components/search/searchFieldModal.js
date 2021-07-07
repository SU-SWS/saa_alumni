import React from "react";
import { Search } from "react-hero-icon/solid";

const SearchFieldModal = React.forwardRef((props, ref) => {
  const inputClasses = `su-bg-transparent su-text-30 su-text-black-40 su-font-semibold su-w-full su-flex-1 su-border-0 su-border-b-2
  su-border-solid su-border-black-10 su-pl-20 su-pr-70 xl:su-pr-126 su-py-10 su-text-m2 focus:su-outline-none`;

  const submitBtnClasses = `su-w-70 su-h-70 su-rounded-full su-bg-digital-red
   su-p-20 su-origin-center su-transform su-rotate-90 su-ml-20`;

  return (
    <div className="su-flex">
      <input className={inputClasses} type="text" ref={ref} />
      <button type="submit" className={submitBtnClasses}>
        <Search className="su-text-white su-w-[32px] su-h-[32px] su-stroke-2" />
      </button>
    </div>
  );
});

export default SearchFieldModal;
