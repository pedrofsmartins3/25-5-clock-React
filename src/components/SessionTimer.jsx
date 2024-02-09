import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import React from "react";

export default function SessionTime({
  sessionTime,
  setSessionTime,
  formateTime,
  isRunning,
  setDisplayTime,
}) {
  return (
    <div className=" container2">
      <h3 id="session-label">Session Length</h3>
      <div id="session-div" className="flex-center">
        <button
          className="down"
          id="session-decrement"
          onClick={() => {
            sessionTime > 0
              ? setSessionTime(sessionTime - 60)
              : setSessionTime(sessionTime);

            if (!isRunning) {
              setDisplayTime(sessionTime - 60);
            }
          }}
        >
          <FaArrowCircleDown />
        </button>
        <p className="time" id="session-length">
          {formateTime(sessionTime)}
        </p>

        <button
          className="up"
          id="session-increment"
          onClick={() => {
            sessionTime < 60 * 60
              ? setSessionTime(sessionTime + 60)
              : setSessionTime(sessionTime);

            if (!isRunning) {
              setDisplayTime(sessionTime + 60);
            }
          }}
        >
          <FaArrowCircleUp />
        </button>
      </div>
    </div>
  );
}
