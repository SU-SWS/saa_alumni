import React from 'react';
import PropTypes from 'prop-types';
import {
  BanIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';
import { dcnb } from 'cnbuilder';
import { DismissButton } from '../../simple/DismissButton/DismissButton';
import { Heading } from '../../simple/Heading';
import * as styles from './Alert.styles';
import { FlexBox } from '../../layout/FlexBox';

const AlertProps = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  label: PropTypes.string,
  heading: PropTypes.string,
  hasDismiss: PropTypes.bool,
  dismissFunction: PropTypes.func,
  children: PropTypes.node,
};

export const Alert = (props) => {
  const {
    type,
    label,
    heading,
    hasDismiss,
    dismissFunction,
    children,
    ...rest
  } = props;

  let Icon;
  switch (type) {
    case 'success':
      Icon = CheckCircleIcon;
      break;

    case 'info':
      Icon = InformationCircleIcon;
      break;

    case 'warning':
      Icon = ExclamationCircleIcon;
      break;

    case 'error':
      Icon = BanIcon;
      break;

    default:
      Icon = InformationCircleIcon;
  }

  return (
    <div
      className={dcnb('su-alert print:su-hidden', styles.root({ type }))}
      {...rest}
    >
      <FlexBox wrap="wrap" className={styles.wrapper}>
        {hasDismiss && (
          <div className={styles.dismissWrapper}>
            <DismissButton
              text="Dismiss"
              icon="x-circle"
              srText="alert"
              color={type === 'warning' ? 'black' : 'white'}
              onClick={dismissFunction}
              className={styles.dismissButton}
              iconClass={styles.dismissIcon}
            />
          </div>
        )}
        <div className={styles.labelWrapper}>
          <span className={styles.iconWrapper} aria-hidden>
            <Icon aria-hidden height="20" width="20" />
          </span>
          {label && (
            <Heading
              level={2}
              tracking="widest"
              uppercase
              className={styles.label}
            >
              {label}
            </Heading>
          )}
        </div>
        <div className={styles.contentWrapper}>
          {heading && (
            <Heading level={label ? 3 : 2} size={1} className={styles.heading}>
              {heading}
            </Heading>
          )}
          {children}
        </div>
      </FlexBox>
    </div>
  );
};
Alert.propTypes = AlertProps;
