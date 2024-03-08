import { useGlobalContext } from "../hooks/useGlobalContext";
import Modal from "./Modal";
import Settings from "./Settings";

function SettingsButtonGroup() {
  const { takeShortBreak, takeLongBreak } = useGlobalContext();
  return (
    <div className="flex justify-center gap-2 justify-self-end align-middle">
      <button
        className="group relative text-2xl text-rose-400"
        onClick={() => takeLongBreak()}
      >
        Long Break
        <span className="absolute -bottom-1 left-0 h-1 w-0 bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
      </button>
      <button
        className="group relative text-2xl text-rose-400"
        onClick={() => takeShortBreak()}
      >
        Short Break
        <span className="absolute -bottom-1 left-0 h-1 w-0 bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
      </button>
      <Modal>
        <Modal.Open opens="settings">
          <button className="group relative text-2xl">
            Settings
            <span className="absolute -bottom-1 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
        </Modal.Open>

        <Modal.Window name="settings">
          <Settings onCloseModal={() => {}} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default SettingsButtonGroup;
