import React from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

function HtmlRenderer({ htmlContent }) {
  // Sanitize the HTML content while allowing specific attributes
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_ATTR: ["class", "id", "href", "src", "style", "datetime"],
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}

HtmlRenderer.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};

export default HtmlRenderer;
