import { useGlobalContext } from "../hooks/useGlobalContext";
import LoopCheckbox from "./LoopCheckbox";
import PlaybackButton from "./PlaybackButton";

function TimerButtonGroup() {
  const { timerValue, resumeTimer, pauseTimer, resetTimer } =
    useGlobalContext();

  return (
    <div className="mb-2 flex  gap-1 align-middle">
      <div className="flex w-full justify-between space-x-2">
        <PlaybackButton type="reset" onClick={resetTimer} />
        <PlaybackButton
          type="resume"
          onClick={resumeTimer}
          disabled={timerValue <= 0}
        />
        <PlaybackButton
          type="pause"
          onClick={pauseTimer}
          disabled={timerValue <= 0}
        />
        <LoopCheckbox />
      </div>
    </div>
  );
}

export default TimerButtonGroup;
