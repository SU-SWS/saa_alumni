import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from '../../layout/FlexBox';
import HeroIcon from '../../simple/heroIcon';
import AuthContext from '../../../contexts/AuthContext';
import * as styles from './MembershipCard.styles';

export const MembershipCardProps = {
  name: PropTypes.string,
  type: PropTypes.string,
};

const MembershipCard = ({ name, type }) => {
  const { userProfile } = useContext(AuthContext);
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
  // const buttonDisplay = true;
  const buttonDisplay = false;

  return (
    <FlexBox direction="col" as="article" className={styles.root}>
      <button
        type="button"
        className="su-basefont-23 su-p-36 su-stretch-link su-w-full su-transition-all su-bg-saa-black-dark su-border-3 su-border-white hocus:su-gradient-border hocus:su-border-to-rt-palo-verde-dark-to-saa-electric-blue"
        // onClick={toggleRelationship}
      >
        <div>
          <FlexBox justifyContent="center">
            <FlexBox
              justifyContent="center"
              alignItems="center"
              className="su-leading su-text-center su-w-50 su-h-50 su-text-24 su-border-2 su-rounded-full"
              aria-hidden="true"
            >
              <span>
                {userProfile?.name?.firstName?.slice(0, 1) ||
                  userProfile?.session.firstName?.slice(0, 1)}
              </span>
            </FlexBox>
            {buttonDisplay && (
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
            Myself
          </div>
          <div className="su-text-center su-leading ">
            {userProfile?.name?.firstName || userProfile?.session.firstName}{' '}
            {userProfile?.name?.lastName || userProfile?.session.lastName}
          </div>
          <FlexBox justifyContent="center">
            {buttonDisplay ? (
              <div className={styles.membershipCardSelectedLink}>Selected</div>
            ) : (
              <div className={styles.membershipCardLink}>Select</div>
            )}
          </FlexBox>
        </div>
      </button>
    </FlexBox>
  );
};
MembershipCard.propTypes = MembershipCardProps;

export default MembershipCard;
