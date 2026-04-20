import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './pages/Tasks';

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">

        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow p-4 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Schedulr</h1>
            <div className="flex gap-6 items-center">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</Link>
              <Link to="/tasks" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">My Tasks</Link>
              <button
                onClick={() => setDark(!dark)}
                className="w-12 h-6 rounded-full relative focus:outline-none transition-colors duration-300"
                style={{ background: dark ? "#4f46e5" : "#d1d5db" }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
                  style={{ transform: dark ? "translateX(24px)" : "translateX(0)" }}
                />
              </button>
              <span>{dark ? "🌙" : "☀️"}</span>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-20">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                  Welcome to Schedulr
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
                  Click on My Tasks to manage your daily tasks
                </p>
              </div>
            } />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-transparent py-4 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 flex justify-end">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created by <span className="font-light text-white-600">अनुराग</span>
            </p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;