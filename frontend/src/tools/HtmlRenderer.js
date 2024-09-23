import React from 'react';
import DOMPurify from 'dompurify';

function HtmlRenderer({ htmlContent }) {
  // Sanitize the HTML content while allowing specific attributes
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_ATTR: ['class', 'id', 'href', 'src', 'style', 'datetime']
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default HtmlRenderer;
