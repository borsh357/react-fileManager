import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FileManager from './Components/FileManager';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <FileManager currentFolderID={0} />
          </Route>
          <Route path="/folder:id">
            <FileManager currentFolderID={1} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
