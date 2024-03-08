import { useGlobalContext } from "../hooks/useGlobalContext";

const FILES = {
  work: "cat-working.gif",
  paused: "cat-standby.gif",
  break: "cat-short-break.gif",
  "long-break": "cat-long-break.gif",
};

function Cat() {
  const { status, counting } = useGlobalContext();

  const imgKey = status === "work" && !counting ? "paused" : status;
  return <img src={FILES[imgKey]} className="m-auto h-48 w-48 rounded-xl" />;
}

export default Cat;
