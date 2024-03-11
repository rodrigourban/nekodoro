import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { reducer } from "./reducer";
import { MoveTaskType, SettingsType, StateProps, TaskType } from "./types";

const initialState: StateProps = {
  status: "work",
  timerValue: 1500,
  mainCycle: 1500, // 25 minutes 1500
  shortBreak: 300, // 5 minutes 300
  longBreak: 1800, // 30 minutes 1800
  cycleNumber: 0,
  counting: false,
  isLooping: false,
  allowNotifications: "default",
  isPlayingMusic: false,
  isPlayingRain: false,
  musicVolume: 1,
  rainVolume: 1,
  taskList: [],
  currentTaskId: 0,
  updatePermissions: () => {},
  resumeTimer: () => {},
  pauseTimer: () => {},
  resetTimer: () => {},
  decreaseTimer: () => {},
  updateSettings: () => {},
  toggleLoop: () => {},
  toggleMusic: () => {},
  toggleRain: () => {},
  takeShortBreak: () => {},
  takeLongBreak: () => {},
  addTask: () => {},
  deleteTask: () => {},
  moveTasks: () => {},
  updateTasks: () => {},
  completeTask: () => {},
  setMusicVolume: () => {},
  setRainVolume: () => {},
};

const GlobalContext = createContext<StateProps>(initialState);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [context, dispatch] = useReducer(reducer, initialState, () => {
    // load taskList from storage

    const storedTaskList = localStorage.getItem("taskList");

    return {
      ...initialState,
      taskList: storedTaskList ? JSON.parse(storedTaskList) : [],
    };
  });

  const {
    status,
    timerValue,
    shortBreak,
    longBreak,
    cycleNumber,
    allowNotifications,
    isPlayingMusic,
    isPlayingRain,
    musicVolume,
    rainVolume,
    taskList,
  } = context;

  const notificationAudio = useRef<HTMLAudioElement>(
    new Audio("notification-sound.mp3"),
  );
  const musicAudio = useRef<HTMLAudioElement>(
    new Audio("chill-lofi-nekodoro.mp3"),
  );
  const rainAudio = useRef<HTMLAudioElement>(
    new Audio("soft-rain-nekodoro-2.mp3"),
  );

  async function updatePermissions() {
    if (!("Notification" in window)) {
      console.log("Browser does not support notifications");
      return;
    }
    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
      dispatch({ type: "notifications/update", payload: permission });
    } else {
      dispatch({ type: "notifications/update", payload: permission });
    }
  }

  async function toggleMusic() {
    dispatch({ type: "audio/toggle-music" });
  }

  async function toggleRain() {
    dispatch({ type: "audio/toggle-rain" });
  }

  function setMusicVolume(volume: number) {
    const newValue = volume >= 1 ? 1 : volume;
    dispatch({ type: "audio/set-music-volume", payload: newValue });
  }

  function setRainVolume(volume: number) {
    const newValue = volume >= 1 ? 1 : volume;
    dispatch({ type: "audio/set-rain-volume", payload: newValue });
  }

  function playAudio() {
    notificationAudio.current.play();
  }

  function resumeTimer() {
    dispatch({ type: "timer/resume" });
  }
  function pauseTimer() {
    dispatch({ type: "timer/pause" });
  }
  function resetTimer() {
    dispatch({ type: "timer/reset" });
  }

  function decreaseTimer() {
    if (timerValue <= 0) {
      if (status === "work") {
        if (cycleNumber === 3) dispatch({ type: "timer/long-break" });
        else dispatch({ type: "timer/break" });
      }
      if (status === "break" || status === "long-break") {
        dispatch({ type: "timer/work" });
      }
      playAudio();
    } else {
      dispatch({ type: "timer/decrease" });
    }
  }

  function takeShortBreak() {
    dispatch({ type: "timer/change-time", payload: shortBreak });
  }

  function takeLongBreak() {
    dispatch({ type: "timer/change-time", payload: longBreak });
  }

  function toggleLoop() {
    dispatch({ type: "timer/toogleLoop" });
  }

  function updateSettings(values: SettingsType) {
    dispatch({ type: "timer/settings-update", payload: values });
  }

  function addTask(taskContent: string) {
    dispatch({ type: "tasks/add-task", payload: taskContent });
  }

  function completeTask(taskId: number) {
    dispatch({ type: "tasks/complete-task", payload: taskId });
  }

  function deleteTask(taskId: number) {
    dispatch({ type: "tasks/delete-task", payload: taskId });
  }

  function moveTasks(payload: MoveTaskType) {
    dispatch({ type: "tasks/move-tasks", payload });
  }
  function updateTasks(payload: TaskType[]) {
    dispatch({ type: "tasks/update-tasks", payload });
  }

  useEffect(
    function () {
      if (isPlayingMusic) {
        musicAudio.current.loop = true;
        musicAudio.current.volume = musicVolume;
        musicAudio.current.play();
      } else {
        musicAudio.current.pause();
      }
    },
    [isPlayingMusic, musicVolume],
  );

  useEffect(
    function () {
      if (isPlayingRain) {
        rainAudio.current.loop = true;
        rainAudio.current.volume = rainVolume;
        rainAudio.current.play();
      } else {
        rainAudio.current.pause();
      }
    },
    [isPlayingRain, rainVolume],
  );

  async function notify(notificationText: string) {
    const notification = await new Notification(notificationText);
    await notification.close();
  }

  useEffect(
    function () {
      if (allowNotifications === "granted" && timerValue <= 0) {
        const notificationText =
          status === "work"
            ? "Great job! Take a rest!"
            : "Let's get back to work!";
        notify(notificationText);
      }
    },
    [allowNotifications, timerValue, status],
  );

  // save tasklist if it has changed
  useEffect(
    function () {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    },
    [taskList],
  );

  return (
    <GlobalContext.Provider
      value={{
        ...context,
        updatePermissions,
        resumeTimer,
        pauseTimer,
        resetTimer,
        decreaseTimer,
        updateSettings,
        toggleLoop,
        toggleMusic,
        toggleRain,
        takeShortBreak,
        takeLongBreak,
        addTask,
        deleteTask,
        moveTasks,
        updateTasks,
        completeTask,
        setMusicVolume,
        setRainVolume,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalContext(): StateProps {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("Using context outside provider");
  }
  return context;
}
export { GlobalProvider, useGlobalContext };
