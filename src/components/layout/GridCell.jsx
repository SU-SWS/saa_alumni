import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { BoxElementType, GridColumnSpanType } from '../../types/LayoutType';
import { ClassNameType } from '../../types/CommonType';
import { gridColSpan } from '../../utilities/dataSource';

const GridCellProps = {
  as: BoxElementType,
  xs: GridColumnSpanType,
  sm: GridColumnSpanType,
  md: GridColumnSpanType,
  lg: GridColumnSpanType,
  xl: GridColumnSpanType,
  xxl: GridColumnSpanType,
  className: ClassNameType,
  children: PropTypes.node,
};

export const GridCell = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    xs: xsProp,
    sm: smProp,
    md: mdProp,
    lg: lgProp,
    xl: xlProp,
    xxl: xxlProp,
    className,
    children,
    ...rest
  } = props;

  const xsClass = gridColSpan.xs[xsProp];
  const smClass = gridColSpan.sm[smProp];
  const mdClass = gridColSpan.md[mdProp];
  const lgClass = gridColSpan.lg[lgProp];
  const xlClass = gridColSpan.xl[xlProp];
  const xxlClass = gridColSpan.xxl[xxlProp];

  return (
    <Element
      className={dcnb(
        xsClass,
        smClass,
        mdClass,
        lgClass,
        xlClass,
        xxlClass,
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
});
GridCell.propTypes = GridCellProps;
