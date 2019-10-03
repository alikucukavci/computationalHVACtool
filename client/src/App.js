import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Signup from './components/Signup';
import Login from "./components/Login";
import { Route, Redirect } from "react-router-dom";import { Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Home from "./components/Home";

const App = (props) => {
  const [user, setUser] = useState(props.user)
  console.log(props.user)
  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/signup"
          // component={Signup setUser={setUser}}
          component={props => <Signup setUser={setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          // component={Login setUser={setUser}}
          component={props => <Login setUser={setUser} {...props} />}
        />
        <Route
          exact
          path="/projects"
          // component={Projects}

          component={props => {
            if (user) return <Projects {...props} />;
            else return <Redirect to="/" />;
          }}
          
        />
      </Switch>
    </div>
  );
}

export default App;
