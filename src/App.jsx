import React, { useEffect } from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { FaStopCircle } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import BreakTime from "./components/BreakTimer";
import SessionTime from "./components/SessionTimer";
import BreakAudio from "./assets/Beep.mp3";

export default function App() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [displayTime, setDisplayTime] = React.useState(25 * 60);
  const [isBreak, setIsBreak] = React.useState(false);

  function playBreakSound() {
    new Audio(BreakAudio).play();
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let secounds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (secounds < 10 ? "0" + secounds : secounds)
    );
  }

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;

    if (!isRunning) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !isBreak) {
              playBreakSound();
              setIsBreak(true);
              return breakTime;
            } else if (prev <= 0 && isBreak) {
              playBreakSound();
              setIsBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);

      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (isRunning) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    setIsRunning(!isRunning);
  };

  function reset() {
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setDisplayTime(25 * 60);
    isRunning(false);
    isBreak(false);
    localStorage.clear();
  }

  return (
    <div className="container">
      <h1>25 + 5 CLOCK</h1>
      <div className="flex-center">
        <SessionTime
          setSessionTime={setSessionTime}
          sessionTime={sessionTime}
          formateTime={formatTime}
          isRunning={isRunning}
          setDisplayTime={setDisplayTime}
        />
        <BreakTime
          setBreakTime={setBreakTime}
          breakTime={breakTime}
          formateTime={formatTime}
        />
      </div>
      <div id="timer-label">
        <h3>{isBreak ? "Break" : "Session"}</h3>
        <div className="time displayTime" id="time-left">
          {formatTime(displayTime)}
        </div>
      </div>
      <div id="buttons">
        <button id="start_stop" onClick={controlTime}>
          {isRunning ? (
            <FaStopCircle className="stop" />
          ) : (
            <IoIosPlayCircle className="start" />
          )}
        </button>
        <button id="reset" className="reset" onClick={reset}>
          <LuTimerReset />
        </button>
      </div>
    </div>
  );
}
