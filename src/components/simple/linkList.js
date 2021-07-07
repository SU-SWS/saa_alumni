import React from "react";
import { Heading } from "decanter-react";
import CreateBloks from "../../utilities/createBloks";

const LinkList = ({ blok }) => (
  <div>
    <Heading level={parseInt(blok.headingLevel, 10)} size={1}>
      {blok.title}
    </Heading>
    <CreateBloks blokSection={blok.links} />
  </div>
);

export default LinkList;
