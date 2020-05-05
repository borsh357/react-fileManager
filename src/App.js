import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FileManager from './Components/FileManager';

function App() {
  return (
    <div className="App">
      <FileManager />
    </div>
  );
}

export default App;
