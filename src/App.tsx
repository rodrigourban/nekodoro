import Home from "./pages/Home";

import { GlobalProvider } from "./hooks/useGlobalContext";

function App() {
  return (
    <div className="background-texture dark:background-texture-dark dark:text-red min-h-svh font-customFont">
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </div>
  );
}

export default App;
