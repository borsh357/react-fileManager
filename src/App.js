import React from 'react';
import './App.css';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import FileManager from './Components/FileManager';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/0" />
          <Route path="/:currentFolderID" children={<FileManager />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
