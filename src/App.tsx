import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';

import TrendingRepos from "./components/TrendingsRepos";

function App() {
  return (
    <div className="App">
      <TrendingRepos />
    </div>
  );
}

export default App;
