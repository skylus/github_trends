import React from 'react';
import logo from './logo.svg';
import './App.css';
import TrendingRepos from "./components/TrendingsRepos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TrendingRepos/>
      </header>
    </div>
  );
}

export default App;
