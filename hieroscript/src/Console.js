import React, { useEffect, useRef } from 'react';
import './Console.scss';

export default function Console({ history, clearHistory }) {

  //this is all commented out bc for some crazy reason react-dnd and animations
  //are not friends. take up web dev they said, it'd be fun they said...
  
  // const scrollDiv = useRef(null);

  // useEffect(
  //   () => {
  //     scrollToBottom();
  //   },
  //   [history]
  // );

  // const scrollToBottom = () => {
  //   animateScroll(300);
  // };

  // // First, define a helper function.
  // const animateScroll = duration => {
  //   var start = scrollDiv.current.scrollTop;
  //   var end = scrollDiv.current.scrollHeight;
  //   var change = end - start;
  //   var increment = 20;

  //   function easeInOut(currentTime, start, change, duration) {
  //     // by Robert Penner
  //     currentTime /= duration / 2;
  //     if (currentTime < 1) {
  //       return (change / 2) * currentTime * currentTime + start;
  //     }
  //     currentTime -= 1;
  //     return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
  //   }

  //   function animate(elapsedTime) {
  //     elapsedTime += increment;
  //     var position = easeInOut(elapsedTime, start, change, duration);
  //     scrollDiv.current.scrollTop = position;
  //     if (elapsedTime < duration) {
  //       setTimeout(function() {
  //         animate(elapsedTime);
  //       }, increment);
  //     }
  //   }

  //   animate(0);
  // };

  return (
    <div className="playground-console-container">
      <div className="playground-console"> 
      {/* this div used to have ref={scrollDiv} to link with the animation stuff */}
        <ul>
          {history.map((item, index) => (
            <li key={index} className="console-line">
              <span className="console-carrot">></span>{' '}
              <span className="console-text">{item.text}</span>
            </li>
          ))}
          <li>
            <span className="console-carrot">></span>
          </li>
        </ul>

        <button
          onClick={clearHistory}
          className="button is-white is-outlined is-small"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
