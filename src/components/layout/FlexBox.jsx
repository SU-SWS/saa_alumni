import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import {
  BoxElementType,
  FlexDirectionType,
  FlexWrapType,
  JustifyContentType,
  JustifyItemsType,
  AlignContentType,
  AlignItemsType,
} from '../../types/LayoutType';
import { ClassNameType } from '../../types/CommonType';
import {
  flexDirection,
  flexWrap,
  alignContent,
  alignItems,
  justifyContent,
  justifyItems,
} from '../../utilities/dataSource';

const FlexBoxProps = {
  as: BoxElementType,
  direction: FlexDirectionType,
  wrap: FlexWrapType,
  gap: PropTypes.bool,
  justifyContent: JustifyContentType,
  justifyItems: JustifyItemsType,
  alignContent: AlignContentType,
  alignItems: AlignItemsType,
  className: ClassNameType,
  children: PropTypes.node,
};

export const FlexBox = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    direction,
    wrap,
    gap,
    justifyContent: justifyContentProp,
    justifyItems: justifyItemsProp,
    alignContent: alignContentProp,
    alignItems: alignItemsProp,
    className,
    children,
    ...rest
  } = props;

  const directionClass = flexDirection[direction];
  const wrapClass = flexWrap[wrap];
  const gapClass = gap ? 'su-grid-gap' : '';
  const justifyContentClass = justifyContent[justifyContentProp];
  const justifyItemsClass = justifyItems[justifyItemsProp];
  const alignContentClass = alignContent[alignContentProp];
  const alignItemsClass = alignItems[alignItemsProp];

  return (
    <Element
      className={dcnb(
        'su-flex',
        directionClass,
        wrapClass,
        gapClass,
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
FlexBox.propTypes = FlexBoxProps;
