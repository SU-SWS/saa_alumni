import React, { useContext, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import { FormContext } from '../../../contexts/FormContext';
import * as styles from './MembershipCard.styles';
import { Heading } from '../../simple/Heading';

const MembershipCard = ({
  heading,
  subheading,
  initial,
  newContact = false,
  memberData,
  enabled = false,
  membershipInfo,
  ...props
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

  useEffect(() => {
    if (enabled && !membershipInfo) {
      toggleRelationship();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membershipInfo, enabled]);

  return (
    <FlexBox direction="col" className={styles.root}>
      <button
        type="button"
        className={dcnb(
          styles.membershipCardWrapper(membershipInfo),
          newContact && !isSelected && 'su-border-dashed',
          isSelected &&
            'su-bg-saa-black su-gradient-border su-border-to-rt-palo-verde-dark-to-saa-electric-blue'
        )}
        onClick={toggleRelationship}
        disabled={membershipInfo}
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
        <Heading level={3} size={1} className="su-mb-0">
          {heading}
        </Heading>
        <p className={styles.subheading}>{subheading}</p>
        {membershipInfo ? (
          <>
            <p className={styles.membershipDetails}>
              {membershipInfo.membershipType} Membership
            </p>
            <p className={styles.membershipDetails}>
              #{membershipInfo.membershipNumber}
            </p>
          </>
        ) : (
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
              <div
                className={
                  isSelected
                    ? styles.membershipCardSelectedLink
                    : styles.membershipCardLink
                }
              >
                {isSelected ? 'Selected' : 'Select'}
              </div>
            )}
          </FlexBox>
        )}
      </button>
    </FlexBox>
  );
};

export default MembershipCard;
