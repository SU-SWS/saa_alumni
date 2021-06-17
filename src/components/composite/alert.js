import React, { useEffect, useState } from "react";
import SbEditable from "storyblok-react";
import { Alert as DecanterAlert, DismissButton } from "decanter-react";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CreateBloks from "../../utilities/createBloks";
import "../../styles/alert.css";

const Alert = ({
  blok: { type, alertCta, label, heading, body, hasDismiss },
  blok,
}) => {
  const [isAlertDismissed, setIsAlertDismissed] = useState(true);
  const isLinkDark = type === "warning";
  const footerContent = (
    <CreateBloks blokSection={alertCta} isLinkDark={isLinkDark} />
  );

  useEffect(() => {
    const isDismissed = sessionStorage.getItem(blok._uid);
    if (isDismissed) setIsAlertDismissed(false);
  }, []);

  const dismissHandler = () => {
    sessionStorage.setItem(blok._uid, "dismissed");
    setIsAlertDismissed(false);
  };

  const DismissBtn = (
    <DismissButton
      iconProps={{ className: "su-ml-02em" }}
      text="Dismiss"
      srText="alert"
      onClick={dismissHandler}
      color={isLinkDark ? "black" : "white"}
      className="su-text-17 su-uppercase su-font-bold su-inline-block su-tracking-widest su-mr-0 su-ml-auto"
    />
  );

  const customStyles = {
    footerWrapper: "su-rs-mt-1",
    body: "su-alert-body-link-light",
  };

  if (!isAlertDismissed) return null;

  return (
    <SbEditable content={blok}>
      <DecanterAlert
        type={type}
        label={label}
        heading={heading}
        footer={footerContent}
        classes={customStyles}
        dismissBtn={DismissBtn}
        hasDismiss={hasDismiss}
      >
        <RichTextRenderer wysiwyg={body} />
      </DecanterAlert>
    </SbEditable>
  );
};
export default Alert;
