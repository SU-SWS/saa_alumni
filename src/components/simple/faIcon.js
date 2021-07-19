import React from "react";
import { SrOnlyText } from "decanter-react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FaIcon = ({ iconChoice, iconType, isOutline, srText, ...props }) => {
  // Add all 3 types of FA icons to the library so you can use any of them
  library.add(fab, far, fas);

  // Remove "fa-" from Storyblok FA plugin to use Fontawesome React format
  const faIcon = iconChoice.replace("fa-", "");

  return (
    <>
      <FontAwesomeIcon
        icon={[isOutline ? "far" : iconType, faIcon]}
        {...props}
      />
      {srText && <SrOnlyText srText={srText} />}
    </>
  );
};

export default FaIcon;
