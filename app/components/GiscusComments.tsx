'use client'; // Giscus script needs to run client-side

import React, { useEffect, useRef } from 'react';

const GiscusComments: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Set data attributes
    script.setAttribute('data-repo', 'inannan423/jetlab');
    script.setAttribute('data-repo-id', 'R_kgDOJOZuOQ');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOJOZuOc4CpyMY');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');

    // Append the script to the div
    ref.current.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      if (ref.current) {
         // Check if the script element exists before trying to remove it
          const giscusScript = ref.current.querySelector('script[src="https://giscus.app/client.js"]');
          if (giscusScript) {
             ref.current.removeChild(giscusScript);
          }
          // Giscus also adds an iframe, remove that too if it exists
          const giscusIframe = ref.current.querySelector('iframe.giscus-frame');
          if (giscusIframe) {
              ref.current.removeChild(giscusIframe);
          }
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <div ref={ref} className="mt-8" />; // Add margin-top for spacing
};

export default GiscusComments;
