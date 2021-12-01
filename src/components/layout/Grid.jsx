import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import {
  BoxElementType,
  NumColumnsType,
  JustifyContentType,
  JustifyItemsType,
  AlignContentType,
  AlignItemsType,
} from '../../types/LayoutType';
import { ClassNameType } from '../../types/CommonType';
import {
  gridCols,
  alignContent,
  alignItems,
  justifyContent,
  justifyItems,
} from '../../utilities/dataSource';

const GridProps = {
  as: BoxElementType,
  xs: NumColumnsType,
  sm: NumColumnsType,
  md: NumColumnsType,
  lg: NumColumnsType,
  xl: NumColumnsType,
  xxl: NumColumnsType,
  gap: PropTypes.bool,
  justifyContent: JustifyContentType,
  justifyItems: JustifyItemsType,
  alignContent: AlignContentType,
  alignItems: AlignItemsType,
  className: ClassNameType,
  children: PropTypes.node,
};

export const Grid = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    gap,
    xs: xsProp,
    sm: smProp,
    md: mdProp,
    lg: lgProp,
    xl: xlProp,
    xxl: xxlProp,
    justifyContent: justifyContentProp,
    justifyItems: justifyItemsProp,
    alignContent: alignContentProp,
    alignItems: alignItemsProp,
    className,
    children,
    ...rest
  } = props;

  const gapClass = gap ? 'su-grid-gap' : '';
  const xsClass = gridCols.xs[xsProp];
  const smClass = gridCols.sm[smProp];
  const mdClass = gridCols.md[mdProp];
  const lgClass = gridCols.lg[lgProp];
  const xlClass = gridCols.xl[xlProp];
  const xxlClass = gridCols.xxl[xxlProp];
  const justifyContentClass = justifyContent[justifyContentProp];
  const justifyItemsClass = justifyItems[justifyItemsProp];
  const alignContentClass = alignContent[alignContentProp];
  const alignItemsClass = alignItems[alignItemsProp];

  return (
    <Element
      className={dcnb(
        'su-grid',
        gapClass,
        xsClass,
        smClass,
        mdClass,
        lgClass,
        xlClass,
        xxlClass,
        justifyContentClass,
        justifyItemsClass,
        alignContentClass,
        alignItemsClass,
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
});
Grid.propTypes = GridProps;
