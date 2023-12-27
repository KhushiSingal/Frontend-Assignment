import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div id="footer">
      <p>Copyright ⓒ {year}</p>
    </div>
  );
}

export default Footer;