import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import AddContact from './AddContact/AddContact';
import EditContact from './Edit/Edit';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/addcontact" component={AddContact} />
        <Route path="/edit/:id" component={EditContact} />
      </Switch>
    </Router>
  )
}

export default App;