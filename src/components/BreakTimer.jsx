import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import React from "react";

export default function BreakTime({ breakTime, setBreakTime, formateTime }) {
  return (
    <div className=" container2">
      <h3 id="break-label">Break Length</h3>
      <div id="break-div" className="flex-center">
        <button
          className="down"
          id="break-decrement"
          onClick={() => {
            breakTime > 0
              ? setBreakTime(breakTime - 60)
              : setBreakTime(breakTime);
          }}
        >
          <FaArrowCircleDown />
        </button>
        <p className="time" id="break-length">
          {formateTime(breakTime)}
        </p>
        <button
          className="up"
          id="break-increment"
          onClick={() => {
            breakTime < 60 * 60
              ? setBreakTime(breakTime + 60)
              : setBreakTime(breakTime);
          }}
        >
          <FaArrowCircleUp />
        </button>
      </div>
    </div>
  );
}
