import { useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import CurrentTask from "../ui/CurrentTask";
import TaskListModal from "../ui/TaskListModal";
import Cat from "./Cat";
import Timer from "../ui/Timer";
import TimerButtonGroup from "../ui/TimerButtonGroup";
import SettingsButtonGroup from "../ui/SettingsButtonGroup";
import AudioButtonGroup from "../ui/AudioButtonGroup";
import Clock from "../ui/Clock";
import DarkModeSwitcher from "../ui/DarkModeSwitcher";

export function PomodoroTimer() {
  const { updatePermissions, isPlayingRain } = useGlobalContext();

  useEffect(function () {
    updatePermissions();
  }, []);

  return (
    <div
      className={`${isPlayingRain ? "animate-[rain_0.45s_linear_infinite] bg-[url('./rain.png')]" : ""} relative flex h-svh flex-col items-center justify-between p-5`}
    >
      <DarkModeSwitcher />
      <TaskListModal />
      <CurrentTask />
      <div className="h-4/5">
        <Timer />
        <Cat />
        <Clock />
        <TimerButtonGroup />
      </div>
      <SettingsButtonGroup />
      <AudioButtonGroup />
    </div>
  );
}

export default PomodoroTimer;
