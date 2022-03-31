import React, { useState } from 'react';

const TripRelationShipCard = ({ travelers, setTravelers }) => {
  const [removeBtn, setRemoveBtn] = useState(false);
  let addedStyle = 'su-none';
  let removedStyle = 'su-none';
  const addRelationship = (event) => {
    const user = event.value;
    setTravelers({ ...travelers, user });
    addedStyle = 'su-block';
    setRemoveBtn(true);
  };

  const removeRelationship = (e) => {
    setTravelers({ ...travelers.filter((user) => user !== e.value) });
    addedStyle = 'su-none';
    removedStyle = 'su-block';
    setRemoveBtn(false);
  };

  return (
    // <div>
    //   <div>Icon</div>
    //   <div>Added confirmation</div>
    //   <div>Name</div>
    //   <div>Add/Remove</div>
    // </div>
    <FlexBox
      direction="col"
      className={dcnb(
        'icon-card print:su-hidden su-group su-relative su-block children:su-mx-auto su-text-center sm:su-max-w-[42rem] lg:su-max-w-[50rem] xl:su-max-w-full su-w-full su-mx-auto su-rs-px-3 md:su-rs-px-1 xl:su-rs-px-3 su-rs-py-3 xl:su-rs-py-4 su-basefont-23 su-break-words su-border su-border-solid su-shadow-sm hover:su-shadow-md',
        cardStyles
      )}
    >
      <div className="su-text-m2">
        <FaIcon
          iconChoice={propsIcon}
          iconType={type}
          proFaIcon={proFaIcon}
          isOutline={isOutline}
          fixedWidth
          className="su-mb-02em su-transition-colors"
        />
      </div>
    </FlexBox>
  );
};

export default TripRelationShipCard;
