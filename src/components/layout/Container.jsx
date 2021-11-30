import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';

const ContainerProps = {
  as: PropTypes.oneOf([
    'div',
    'section',
    'article',
    'main',
    'header',
    'footer',
    'aside',
    'nav',
    'form',
  ]).isRequired,
  width: PropTypes.oneOf(['full', 'screen', 'site']).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
