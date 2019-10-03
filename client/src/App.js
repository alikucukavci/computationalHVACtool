import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Signup from './components/Signup';
import Login from "./components/Login";
import { Route, Redirect } from "react-router-dom";import { Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Home from "./components/Home";


{/* 

  import React, {useState, useEffect}


  
  const App = () => {
  // it is advised to seperate the state into multiple use state instead of creating a big state object.

  const [user, setUser] = useState(this.props.user)
  return (
  
  )
}
export default App
*/}
class App extends React.Component {
  state = {
    user: this.props.user
  };

 

  setUser = user => {
    this.setState({
      user: user
    });
  };



  render() {
  return (
    <div className="App">
    <Navbar user={this.state.user} setUser={this.setUser} />
      <Switch>
      <Route
      exact
      path="/"
      component={Home}
    />
    <Route
          exact
          path="/signup"
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />
         <Route
          exact
          path="/projects"
          render={props => {
            if (this.state.user) return <Projects {...props} />;
            else return <Redirect to="/" />;
          }}
        />

  </Switch>
    </div>
    );
  }
}

export default App;
