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
  disabled = false,
}) => {
  const [state, dispatch] = useContext(FormContext);
  const { registrantsData } = state;
  const isSelected = registrantsData.find(
    (selectedMember) => selectedMember.su_did === memberData?.su_did
  );

  const addRelationship = () => {
    dispatch({
      type: 'addRegistrant',
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

  let newContactWrapper = '';

  if (newContact && isSelected) {
    newContactWrapper = 'su-bg-saa-black';
  } else if (newContact) {
    newContactWrapper = 'su-border-dashed';
  }

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <button
        type="button"
        className={dcnb(
          isSelected
            ? dcnb('su-bg-saa-black', styles.membershipCardWrapper(disabled))
            : styles.membershipCardWrapper(disabled),
          newContactWrapper
        )}
        onClick={toggleRelationship}
      >
        <FlexBox
          justifyContent="center"
          className={styles.initialAndSelectionWrapper}
        >
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
          {isSelected && (
            <FlexBox className={styles.selectionWrapper} aria-hidden="true">
              <HeroIcon iconType="check" className={styles.checkLinkIcon} />
              <span>Selected</span>
            </FlexBox>
          )}
        </FlexBox>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.subheading}>{subheading}</div>
        <FlexBox justifyContent="center">
          {newContact ? (
            <div
              className={
                isSelected
                  ? styles.membershipCardSelectedLink
                  : styles.membershipCardLink(disabled)
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
                  : styles.membershipCardLink(disabled)
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
