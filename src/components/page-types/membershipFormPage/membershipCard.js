import React, { useContext } from 'react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import { FormContext } from '../../../contexts/FormContext';
import * as styles from './MembershipCard.styles';

const MembershipCard = ({
  heading,
  subheading,
  initial,
  newContact = false,
  memberData,
  props,
}) => {
  const [state, dispatch] = useContext(FormContext);
  const { registrantsData } = state;
  const isSelected = registrantsData.find(
    (selectedMember) =>
      selectedMember.su_recipient_suid === memberData?.su_recipient_suid
  );

  const addRelationship = () => {
    dispatch({
      type: 'addSingleRegistrant',
      payload: memberData,
    });
  };

  const removeRelationship = () => {
    dispatch({
      type: 'removeRegistrant',
      payload: memberData.su_did,
    });
  };

  const toggleRelationship = () => {
    if (isSelected) {
      removeRelationship();
    } else {
      addRelationship();
    }
  };

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <button
        type="button"
        className={dcnb(
          styles.membershipCardWrapper,
          newContact && !isSelected && 'su-border-dashed',
          isSelected &&
            'su-bg-saa-black su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue'
        )}
        onClick={toggleRelationship}
        {...props}
      >
        <FlexBox
          justifyContent="center"
          className={styles.initialAndSelectionWrapper}
        >
          {isSelected && (
            <div className={styles.selectionWrapper} aria-hidden="true">
              <HeroIcon iconType="check" className={styles.checkLinkIcon} />
              <span>Selected</span>
            </div>
          )}
          <FlexBox
            justifyContent="center"
            alignItems="center"
            className={styles.initialWrapper}
            aria-hidden="true"
          >
            {newContact ? (
              <HeroIcon iconType="plus" />
            ) : (
              <span>{initial.slice(0, 1)}</span>
            )}
          </FlexBox>
        </FlexBox>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.subheading}>{subheading}</div>
        <FlexBox justifyContent="center">
          {newContact ? (
            <div
              className={
                isSelected
                  ? styles.membershipCardSelectedLink
                  : styles.membershipCardLink
              }
            >
              Create new <HeroIcon iconType="plus" />
            </div>
          ) : (
            <button
              type="button"
              className={
                isSelected
                  ? styles.membershipCardSelectedLink
                  : styles.membershipCardLink
              }
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          )}
        </FlexBox>
      </button>
    </FlexBox>
  );
};

export default MembershipCard;
