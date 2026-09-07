import { useState } from "react";

function App() {
  const [value, setValue] = useState(5);
  const [colorPicker, setColorPicker] = useState("#155dfc");
  const [progressText, setProgressText] = useState(0);
  const [activeProgressBar, setActiveProgressBar] = useState(false);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleStart = () => {
    setActiveProgressBar(true);
    let initial = 0;
    let timer;
    const totalDurationMs = Number(value) * 1000;
    const stepInterval = totalDurationMs / 100;

    clearInterval(timer);

    timer = setInterval(() => {
      if (initial <= 100) {
        setProgressText(initial);
        initial++;
      } else {
        clearInterval(timer);
        setActiveProgressBar(false);
      }
    }, stepInterval);
  };
  console.log(colorPicker);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
      <p className="text-2xl">Progress Bar</p>
      <div className="w-[250px] flex flex-col justify-center items-center gap-2 my-1">
        <div className="flex flex-row gap-4">
          <input
            value={value}
            type="number"
            onChange={(e) => handleChangeValue(e)}
            min="1"
            placeholder="Enter seconds"
            className={`p-2 w-30 font-[1rem] border rounded-sm border-[#ccc] ${activeProgressBar && "cursor-not-allowed"}}`}
            disabled={activeProgressBar}
          />

          <button
            disabled={activeProgressBar}
            onClick={() => handleStart()}
            className={`px-6 py-2 bg-[#007bff] text-white border-none cursor-pointer font-medium rounded-sm ${activeProgressBar ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            Start
          </button>
        </div>
        <p>Choose your colors:</p>

        <div className="flex items-center justify-center gap-2">
          <input
            type="color"
            id="foreground"
            name="foreground"
            value={colorPicker}
            onChange={(e) => setColorPicker(e.target.value)}
          />
          <label for="progress-bar" className="mb-2">
            progressBar color
          </label>
        </div>
        <div className="h-7.5 w-full rounded-[15px] bg-gray-400 relative overflow-hidden flex items-center justify-center">
          <div
            className={`h-full transition-[width] duration-[0.1] ease-in-out absolute left-0 top-0`}
            style={{
              backgroundColor: `${colorPicker}`,
              width: `${progressText}%`,
            }}
          />

          <span className="progress-text relative z-10 text-center font-medium text-white text-sm">
            {progressText}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
