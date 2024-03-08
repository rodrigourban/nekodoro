import Home from "./pages/Home";

import { GlobalProvider } from "./hooks/useGlobalContext";

function App() {
  return (
    <div className="background-texture font-customFont min-h-svh">
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </div>
  );
}

export default App;
