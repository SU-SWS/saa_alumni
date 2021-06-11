import React from "react";
import SbEditable from "storyblok-react";
import { Alert as DecanterAlert } from "decanter-react";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CreateBloks from "../../utilities/createBloks";
import "../../styles/alert.css";

const Alert = ({ blok }) => {
  const { type, alertCta, label, heading, body } = blok;
  const isLinkDark = type === "warning";
  const footerContent = (
    <CreateBloks blokSection={alertCta} isLinkDark={isLinkDark} />
  );

  const customStyles = {
    footerWrapper: "su-rs-mt-1",
    body: "su-alert-body-link-light",
  };

  return (
    <SbEditable content={blok}>
      <DecanterAlert
        type={type}
        label={label}
        heading={heading}
        footer={footerContent}
        classes={customStyles}
        hasDismiss
      >
        <RichTextRenderer wysiwyg={body} />
      </DecanterAlert>
    </SbEditable>
  );
};

export default Alert;
