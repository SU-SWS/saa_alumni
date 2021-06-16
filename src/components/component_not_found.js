import React from "react";

const ComponentNotFound = ({ blok: { component } }) => (
  <div>Component {component} is not defined. Add it to components.js</div>
);

export default ComponentNotFound;
