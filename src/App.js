import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SafeRoutes from './pages/SafeRoutes';
import ReportIncident from './pages/ReportIncident';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/routes">Safe Routes</Link></li>
            <li><Link to="/report">Report Incident</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/routes" element={<SafeRoutes />} />
          <Route path="/report" element={<ReportIncident />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;