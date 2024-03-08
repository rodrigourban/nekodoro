type PlaybackButtonProps = {
  type: "resume" | "pause" | "reset";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const ICONS = {
  pause: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto mb-1 block h-10 w-10 pt-1 text-2xl dark:text-white dark:hover:text-inherit"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  ),
  resume: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto mb-1 block h-10 w-10 pt-1 text-2xl dark:text-white dark:hover:text-inherit"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    </svg>
  ),
  reset: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto mb-1 block h-10 w-10 pt-1 text-2xl dark:text-white dark:hover:text-inherit"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  ),
};

function PlaybackButton({ type, onClick, disabled }: PlaybackButtonProps) {
  return (
    <div className="group flex-1">
      <button
        className="mx-auto flex w-full items-end justify-center px-2 pt-2 text-center text-gray-400 group-hover:text-rose-400 dark:text-white"
        onClick={onClick}
        disabled={disabled || false}
      >
        <span className="block px-1 pb-1 pt-1">
          {ICONS[type]}
          <span className="block pb-2 text-xs uppercase">{type}</span>
          <span className="mx-auto block h-1 w-5 rounded-full group-hover:bg-rose-400"></span>
        </span>
      </button>
    </div>
  );
}

export default PlaybackButton;
