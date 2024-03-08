import { FormEvent, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { getMinutes } from "../utils/formatTime";

function Settings({ onCloseModal }: { onCloseModal: () => void | undefined }) {
  const { mainCycle, shortBreak, longBreak, updateSettings } =
    useGlobalContext();

  const [newSettings, setNewSettings] = useState({
    mainCycle: getMinutes(mainCycle),
    shortBreak: getMinutes(shortBreak),
    longBreak: getMinutes(longBreak),
  });

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { mainCycle, shortBreak, longBreak } = newSettings;
    if (mainCycle && shortBreak && longBreak) {
      updateSettings({
        mainCycle,
        shortBreak,
        longBreak,
      });
      onCloseModal?.();
    }
  }

  function handleInputChange(
    target: string,
    min: number,
    max: number,
    value: string,
  ) {
    if (value == "") setNewSettings({ ...newSettings, [target]: 0 });
    const numValue = Number(value);
    if (!!numValue && (numValue >= min || numValue < max))
      setNewSettings({ ...newSettings, [target]: numValue });
  }

  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      className="flex min-w-64 flex-col"
    >
      <h1 className="text-lg font-bold">Set your own cycles! 🐱‍🏍</h1>

      <div className="flex flex-col">
        <label htmlFor="mainCycle" className="mt-2 text-sm font-semibold">
          Main cycle length
        </label>
        <input
          type="text"
          name="mainCycle"
          id="mainCycle"
          value={newSettings.mainCycle}
          onChange={(e) =>
            handleInputChange(e.target.name, 1, 60, e.target.value)
          }
          className="mt-1 h-8 rounded-full px-3 accent-rose-200 focus:outline-none focus:ring focus:ring-rose-400 focus:ring-offset-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="shortBreak" className="mt-2 text-sm font-semibold">
          Short break cycle length
        </label>
        <input
          type="text"
          name="shortBreak"
          id="shortBreak"
          value={newSettings.shortBreak}
          onChange={(e) =>
            handleInputChange(e.target.name, 1, 40, e.target.value)
          }
          className="mt-1 h-8 rounded-full px-3 accent-rose-200 focus:outline-none focus:ring focus:ring-rose-400 focus:ring-offset-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="longBreak" className="mt-2 text-sm font-semibold">
          Long break cycle length
        </label>
        <input
          type="text"
          name="longBreak"
          id="longBreak"
          value={newSettings.longBreak}
          onChange={(e) =>
            handleInputChange(e.target.name, 1, 60, e.target.value)
          }
          className="mt-1 h-8 rounded-full px-3 accent-rose-200 focus:outline-none focus:ring focus:ring-rose-400 focus:ring-offset-1"
        />
      </div>
      <div className="mt-8 flex items-center justify-around">
        <button
          onClick={onCloseModal}
          className="inline-block w-full rounded-full border-2 border-pink-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-block w-full rounded-full bg-pink-200 hover:bg-pink-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Settings;
