function getMinutes(seconds: number) {
  return Math.floor(seconds / 60);
}

function getRemainingSeconds(seconds: number) {
  return (seconds = seconds % 60);
}

function formatTime(time: number): string {
  const minutes = getMinutes(time);
  const seconds = getRemainingSeconds(time);

  const zeroMinutes = minutes < 10 ? "0" : "";
  const zeroSeconds = seconds >= 0 && seconds < 10 ? "0" : "";

  return `${zeroMinutes}${minutes}:${zeroSeconds}${seconds}`;
}

export { getMinutes, getRemainingSeconds, formatTime };
