import { useGlobalContext } from "../hooks/useGlobalContext";

function LoopCheckbox() {
  const { isLooping, toggleLoop } = useGlobalContext();
  return (
    <div className="group flex-1">
      <div className="mx-auto flex w-full items-end justify-center pt-2 text-center text-gray-400 group-hover:text-rose-400">
        <span className="block pt-2.5">
          <input
            type="checkbox"
            name="loop"
            id="loop"
            className="mb-[9px] h-7 w-10 accent-rose-200 hover:cursor-pointer "
            value={isLooping ? "checked" : "unchecked"}
            onChange={toggleLoop}
          />

          <label className="block pb-2 text-xs uppercase" htmlFor="loop">
            Loop
          </label>
          <span className="mx-auto block h-1 w-5 rounded-full group-hover:bg-rose-400"></span>
        </span>
      </div>
    </div>
  );
}

export default LoopCheckbox;
