import React from "react";
import { Link } from "gatsby";
import AlumniLogo from "../../images/saa-logo-white.svg";

const Logo = ({ className, ...props }) => (
  <Link to="/" className="logo su-block su-w-fit" {...props}>
    <img
      src={AlumniLogo}
      className={className}
      alt="Stanford Alumni Association"
    />
  </Link>
);

export default Logo;
