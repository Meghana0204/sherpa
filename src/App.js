import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getAnalytics } from 'firebase/analytics';
import Routes from './pages/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Report from './pages/Report';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/report" component={Report} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/profile" component={Profile} />
            <Route path="/routes" component={Routes} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;