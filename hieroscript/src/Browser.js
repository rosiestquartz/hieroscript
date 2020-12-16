import React, { useEffect, useRef } from 'react';

/*
   builds the code iframe. Remember rosie, separate iframe.html doesn't work in React, 
   it crashed the browser!
 
   scotchLog function sends data up to the parent through postMessage
 */
const buildIframeSrc = (html, css, js) => ` 
  <html>
  <head>
    <style>${css}</style>
  </head>
  <body>
  ${html}

  <script>
    function scotchLog() {
      let output = "", arg, i;
      for (i = 0; i < arguments.length; i++) {
        arg = arguments[i];
        output += typeof arg === "object" ? JSON.stringify(arg) : arg;
      }
      window.parent.postMessage(output, '*');
      console.log(...arguments);
    }

    // -----------------------------------------

    try {
      ${js}
    } catch (err) {
      window.parent.postMessage(err.message, '*');
      console.error(err.message);
    }
  </script>
  </body>
  </html>
`;

/**
 * The browser component has a nested iframe
 * Every time the js props change, destroy the iframe and create a new one
 */
export default function Browser({ sandboxId, html, css, js, addHistory }) {
  const iframeContainer = useRef(null);
   
  /**
   * event listener for postMessage coming from our iframe
   */
  useEffect(() => {
    window.addEventListener('message', e => {
      
      if (!e.data) return false; // only handle if theres data
      if (typeof e.data !== 'string') return false; // data must be a string
      if (e.data.includes('_')) return false; // dont watch for events emitted by the react library
      addHistory(e.data);
    });
  }, []);

  /**
   * Run the code, yay fun!
   */
  useEffect(() => execute(), [html, css, js]);

  /**
   * Run all our code in the iframe
   * Destroys the iframe
   * Rebuilds the iframe
   */
  const execute = () => {
    // remove all children
    while (iframeContainer.current.hasChildNodes()) {
      iframeContainer.current.removeChild(iframeContainer.current.lastChild);
    }

    // create new iframe
    let iframe = document.createElement('iframe');
    iframe.height = '100%';
    iframe.width = '100%';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    iframe.style.border = 'none';
    iframe.background = '#fff';

    // convert all console.log to use scotchLog
    // scotchLog will send events back up to this parent
    // will add to code history
    // scotchLog will also run console.log()
   const newJs = js.replace(new RegExp('console.log', 'g'), 'scotchLog');
   iframe.srcdoc = buildIframeSrc(html, css, newJs);
   iframeContainer.current.appendChild(iframe);
  };

  const display = !html && !css ? 'none' : 'block';

  return (
    <div
      ref={iframeContainer}
      className="iframe-container"
      style={{
        height: '100%',
        width: '100%',
        background: 'white',
        display
      }}
    />
  );
}
