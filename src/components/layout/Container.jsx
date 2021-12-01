import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { BoxElementType } from '../../types/LayoutType';
import { ClassNameType } from '../../types/CommonType';

const ContainerProps = {
  as: BoxElementType,
  width: PropTypes.oneOf(['full', 'screen', 'site']),
  className: ClassNameType,
  children: PropTypes.node,
};

export const Container = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    width = 'site',
    className,
    children,
    ...rest
  } = props;

  let widthClass;

  switch (width) {
    case 'full':
      widthClass = 'su-w-full'; // width: 100%
      break;

    case 'screen':
      widthClass = 'su-w-screen'; // width: 100vw
      break;

    case 'site':
      widthClass = 'su-cc';
      break;

    default:
      widthClass = 'su-cc';
  }

  return (
    <Element ref={ref} className={dcnb(widthClass, className)} {...rest}>
      {children}
    </Element>
  );
});
Container.propTypes = ContainerProps;
