import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListInventory from './components/ListInventory';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateInventory from './components/CreateInventory';
import ViewInventory from './components/ViewInventory';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListInventory}></Route>
            <Route path="/add/:id" exact component={CreateInventory}></Route>
            <Route path="/:id" exact component={CreateInventory}></Route>
            <Route path="/view/:id" exact component={ViewInventory}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
