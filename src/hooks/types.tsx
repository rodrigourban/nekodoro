import { Active, Over } from "@dnd-kit/core";

export type ActionTypes = {
  type:
    | "timer/reset"
    | "timer/pause"
    | "timer/resume"
    | "timer/work"
    | "timer/break"
    | "timer/long-break"
    | "timer/decrease"
    | "timer/toogleLoop"
    | "audio/toggle-music"
    | "audio/toggle-rain";
};
export type ActionTypesWithPayload = {
  type:
    | "timer/change-time"
    | "timer/settings-update"
    | "audio/set-music-volume"
    | "audio/set-rain-volume"
    | "notifications/update"
    | "tasks/add-task"
    | "tasks/delete-task"
    | "tasks/move-tasks"
    | "tasks/update-tasks"
    | "tasks/complete-task";

  payload: any;
};

export type TaskType = {
  id: number;
  content: string;
  completed: boolean;
};
export type MoveTaskType = {
  active: Active;
  over: Over | null;
};

type StatusType = "work" | "break" | "long-break";

export type SettingsType = {
  mainCycle: number;
  shortBreak: number;
  longBreak: number;
};

export type StateProps = {
  status: StatusType;
  timerValue: number;
  mainCycle: number;
  shortBreak: number;
  longBreak: number;
  isLooping: boolean;
  cycleNumber: number;
  counting: boolean;
  allowNotifications: string;
  isPlayingMusic: boolean;
  isPlayingRain: boolean;
  rainVolume: number;
  musicVolume: number;
  taskList: TaskType[];
  currentTaskId: number;
  updatePermissions: () => void;
  resumeTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (payload: SettingsType) => void;
  toggleLoop: () => void;
  toggleMusic: () => void;
  toggleRain: () => void;
  takeShortBreak: () => void;
  takeLongBreak: () => void;
  addTask: (taskContent: string) => void;
  deleteTask: (taskId: number) => void;
  moveTasks: (payload: MoveTaskType) => void;
  updateTasks: (payload: TaskType[]) => void;
  completeTask: (taskId: number) => void;
  setMusicVolume: (volume: number) => void;
  setRainVolume: (volume: number) => void;
};
