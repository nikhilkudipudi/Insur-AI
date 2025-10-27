import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-80 border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-semibold mb-4">
          React Counter App
        </h1>

        <h2 className="text-5xl font-bold mb-6">{count}</h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-medium"
          >
            −
          </button>
          <button
            onClick={reset}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-lg font-medium"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-medium"
          >
            +
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;
