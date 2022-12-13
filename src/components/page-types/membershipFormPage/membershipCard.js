import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './MembershipCard.styles';

export const MembershipCardProps = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  initial: PropTypes.string,
  newContact: PropTypes.bool,
};

const MembershipCard = ({
  heading,
  subheading,
  initial,
  newContact = false,
}) => {
  // @TODO - return to this in ADAPTSM-53
  // const [state, dispatch] = useContext(FormContext);
  // const { membersData } = state;
  // const buttonDisplay = membersData.find(
  //   (selectedMember) => selectedMember.su_did === member.su_did
  // );

  // const addRelationship = () => {
  //   dispatch({
  //     type: 'addMember',
  //     payload: member,
  //   });
  // };

  // const removeRelationship = () => {
  //   dispatch({
  //     type: 'removeMember',
  //     payload: member.su_did,
  //   });
  // };

  // const toggleRelationship = () => {
  //   if (buttonDisplay) {
  //     removeRelationship();
  //   } else {
  //     addRelationship();
  //   }
  // };

  // for testing purposes
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <button
        type="button"
        className="su-basefont-23 su-p-36 su-stretch-link su-w-full su-transition-all su-bg-saa-black-dark su-border-3 su-border-white hocus:su-gradient-border hocus:su-border-to-rt-palo-verde-dark-to-saa-electric-blue"
        // onClick={toggleRelationship}
        onClick={handleClick}
      >
        <FlexBox justifyContent="center">
          <FlexBox
            justifyContent="center"
            alignItems="center"
            className="su-leading su-text-center su-w-50 su-h-50 su-text-24 su-border-2 su-rounded-full"
            aria-hidden="true"
          >
            {newContact ? (
              <HeroIcon iconType="plus" />
            ) : (
              <span>{initial.slice(0, 1)}</span>
            )}
          </FlexBox>
          {isSelected && (
            <FlexBox
              className="su-absolute su-right-0 su-text-16 su-font-semibold"
              aria-hidden="true"
            >
              <HeroIcon
                iconType="check"
                className="su-inline-block su-text-saa-electric-blue su-w-[1.4em] su-mt-[-2px] su-mr-[5px]"
              />
              <span>Selected</span>
            </FlexBox>
          )}
        </FlexBox>
        <div className="su-text-center su-type-2 su-font-bold su-rs-mt-1 su-leading">
          {heading}
        </div>
        <div className="su-text-center su-leading ">{subheading}</div>
        {newContact ? (
          <FlexBox justifyContent="center">
            {isSelected ? (
              <div className={styles.membershipCardSelectedLink}>
                Create new <HeroIcon iconType="plus" />
              </div>
            ) : (
              <div className={styles.membershipCardLink}>
                Create new <HeroIcon iconType="plus" />
              </div>
            )}
          </FlexBox>
        ) : (
          <FlexBox justifyContent="center">
            {isSelected ? (
              <div className={styles.membershipCardSelectedLink}>Selected</div>
            ) : (
              <div className={styles.membershipCardLink}>Select</div>
            )}
          </FlexBox>
        )}
      </button>
    </FlexBox>
  );
};
MembershipCard.propTypes = MembershipCardProps;

export default MembershipCard;
