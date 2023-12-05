import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroSection } from './components';
import { JobList } from './pages';

// Import Syncfusion CSS
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';

const App = () => {
  return (
    <Router>
      <HeroSection />
      <Routes>
        <Route path="/" element={<JobList />} />
      </Routes>
    </Router>
  );
};

export default App;
