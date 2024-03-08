import { useGlobalContext } from "../hooks/useGlobalContext";
import { formatTime } from "../utils/formatTime";

function Clock() {
  const { timerValue } = useGlobalContext();
  return (
    <p className="mb-2 text-center text-4xl font-semibold tracking-wide dark:text-rose-50">
      {formatTime(timerValue)}
    </p>
  );
}

export default Clock;
