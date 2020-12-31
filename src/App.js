import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import './flex.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Home = lazy(() => import('./components/Home/home'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
