import { useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Timer() {
  const { status, counting, decreaseTimer } = useGlobalContext();

  useEffect(
    function () {
      if (counting) {
        const timeoutId = setInterval(function () {
          decreaseTimer();
        }, 1000);
        return () => {
          clearInterval(timeoutId);
        };
      }
    },
    [counting, decreaseTimer],
  );
  console.log(status);

  return (
    <div className="text-center dark:text-rose-50">
      <p className="text-2xl">{status === "work" && "Let's work! 📝"}</p>
      <p className="mb-2 text-2xl">
        {status === "break" && "Great work, let's take a short break ☕"}
      </p>
      <p className="mb-2 text-xl">
        {status === "long-break" &&
          "You're doing great! Take a long break to refresh your mind 😸"}
      </p>
      <p>{!counting && "Paused, click play to resume!"}</p>
    </div>
  );
}

export default Timer;
