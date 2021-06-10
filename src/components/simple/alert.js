import React from "react";
import SbEditable from "storyblok-react";
import { Alert as DecanterAlert } from "decanter-react";
import RichTextRenderer from "../../utilities/richTextRenderer";
import CreateBloks from "../../utilities/createBloks";
import "../../styles/alert.css";

const Alert = ({ blok }) => {
  const isLinkDark = blok.type === "warning";
  console.log(isLinkDark, "isLinkDark");
  const footerContent = (
    <CreateBloks blokSection={blok.alertCta} isLinkDark={isLinkDark} />
  );

  const customStyles = {
    footerWrapper: "su-rs-mt-1",
    body: "su-alert-body-link-light",
  };

  return (
    <SbEditable content={blok}>
      <DecanterAlert
        type={blok.type}
        label={blok.label}
        heading={blok.heading}
        hasDismiss={blok.hasDismiss}
        footer={footerContent}
        classes={customStyles}
      >
        <RichTextRenderer wysiwyg={blok.body} />
      </DecanterAlert>
    </SbEditable>
  );
};

export default Alert;
