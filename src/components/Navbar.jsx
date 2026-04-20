import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './Tasks';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">

        {/* Navbar */}
        <nav className="bg-white shadow p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Schedulr</h1>
            
            <div className="flex gap-6">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/tasks" className="hover:text-blue-600">My Tasks</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>

          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <div className="text-center py-20">
                <h1 className="text-5xl font-bold text-gray-800">
                  Welcome to Schedulr
                </h1>
                <p className="text-xl text-gray-600 mt-4">
                  Frontend is working now
                </p>
              </div>
            } 
          />

          {/* Tasks Page */}
          <Route path="/tasks" element={<Tasks />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;