import {
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ModalNameType = "settings" | "task-list" | "";

type WindowType = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  name: ModalNameType;
};

type ModalContextType = {
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
};

type OpenType = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  opens: string;
};

const initialState = {
  openName: "",
  close: () => {},
  open: () => {},
};

const ModalContext = createContext<ModalContextType>(initialState);

function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }: OpenType) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: WindowType) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div
      className={
        "fixed left-0 top-0 z-[1000] h-svh w-full bg-black/10 backdrop-blur-sm transition-all duration-300"
      }
    >
      <section className="fixed left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 rounded-lg bg-rose-50 text-black shadow-xl">
        <div className="relative">
          <button onClick={close} className="absolute right-5 top-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="px-3 py-6 md:px-12 md:py-14">
            {cloneElement(children, { onCloseModal: close })}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
