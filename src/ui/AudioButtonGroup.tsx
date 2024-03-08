import { useGlobalContext } from "../hooks/useGlobalContext";

function AudioButtonGroup() {
  const {
    isPlayingMusic,
    isPlayingRain,
    toggleMusic,
    toggleRain,
    musicVolume,
    rainVolume,
    setMusicVolume,
    setRainVolume,
  } = useGlobalContext();
  const musicIcon = isPlayingMusic ? "music-slash-icon.svg" : "music-icon.svg";
  const rainIcon = isPlayingRain ? "cloud-icon.svg" : "rain-icon.svg";
  return (
    <div className="absolute right-5 top-2 flex gap-3">
      <button onClick={() => toggleMusic()}>
        <img src={musicIcon} className="h-5 w-5" />
      </button>
      {isPlayingMusic && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={musicVolume}
          onChange={(e) => setMusicVolume(Number(e.target.value))}
        />
      )}

      <button onClick={() => toggleRain()}>
        <img src={rainIcon} className="h-5 w-5" />
      </button>
      {isPlayingRain && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={rainVolume}
          onChange={(e) => setRainVolume(Number(e.target.value))}
        />
      )}
    </div>
  );
}

export default AudioButtonGroup;
