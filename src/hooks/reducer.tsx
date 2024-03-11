import { arrayMove } from "@dnd-kit/sortable";
import {
  StateProps,
  ActionTypes,
  ActionTypesWithPayload,
  TaskType,
} from "./types";

export function reducer(
  state: StateProps,
  action: ActionTypes | ActionTypesWithPayload,
): StateProps {
  let newTimerValue, newTaskList, task;
  switch (action.type) {
    case "timer/work":
      return {
        ...state,
        status: "work",
        timerValue: state.mainCycle,
        counting: state.isLooping,
      };

    case "timer/pause":
      return { ...state, counting: false };

    case "timer/reset":
      newTimerValue = state.mainCycle;
      if (state.status === "break") newTimerValue = state.shortBreak;
      if (state.status === "long-break") newTimerValue = state.longBreak;
      return { ...state, timerValue: newTimerValue };

    case "timer/resume":
      return {
        ...state,
        counting: true,
      };

    case "timer/break":
      return {
        ...state,
        status: "break",
        cycleNumber: state.cycleNumber + 1,
        timerValue: state.shortBreak,
        counting: state.isLooping,
      };

    case "timer/long-break":
      return {
        ...state,
        status: "long-break",
        cycleNumber: 0,
        timerValue: state.longBreak,
        counting: state.isLooping,
      };

    case "timer/decrease":
      return {
        ...state,
        timerValue: state.timerValue - 1,
        counting: state.isLooping || state.timerValue - 1 > 0,
      };

    case "timer/change-time":
      return { ...state, timerValue: action.payload };

    case "timer/toogleLoop":
      return { ...state, isLooping: !state.isLooping };

    case "timer/settings-update":
      return {
        ...state,
        mainCycle: action.payload.mainCycle * 60,
        shortBreak: action.payload.shortBreak * 60,
        longBreak: action.payload.longBreak * 60,
        timerValue: action.payload.mainCycle * 60,
      };

    case "notifications/update":
      return { ...state, allowNotifications: action.payload };

    case "audio/toggle-music":
      return { ...state, isPlayingMusic: !state.isPlayingMusic };

    case "audio/toggle-rain":
      return { ...state, isPlayingRain: !state.isPlayingRain };

    case "audio/set-music-volume":
      return { ...state, musicVolume: action.payload };

    case "audio/set-rain-volume":
      return { ...state, rainVolume: action.payload };

    case "tasks/add-task":
      return {
        ...state,
        taskList: [
          ...state.taskList,
          {
            content: action.payload,
            completed: false,
            id: state.taskList.length + 1,
          },
        ],
      };

    case "tasks/complete-task":
      newTaskList = [...state.taskList];
      task = newTaskList.find((task) => task.id === action.payload) as TaskType;
      task.completed = true;
      return { ...state, taskList: newTaskList };

    case "tasks/move-tasks":
      const mappedIds = state.taskList.map((item) => item.id);
      const oldIndex = mappedIds.indexOf(action.payload.active.id);
      const newIndex = mappedIds.indexOf(action.payload.over.id);
      return {
        ...state,
        taskList: arrayMove(state.taskList, oldIndex, newIndex),
      };

    case "tasks/update-tasks":
      return {
        ...state,
        taskList: action.payload,
      };

    case "tasks/delete-task":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };

    default:
      throw new Error("Invalid action type");
  }
}
