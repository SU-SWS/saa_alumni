import PropTypes from 'prop-types';
import { SBLinkType } from './storyblok/SBLinkType';

export const NavItemType = {
  text: PropTypes.string,
  link: SBLinkType,
};
