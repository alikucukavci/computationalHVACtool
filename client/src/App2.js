import React, {useState} from 'react'

const App2 = (props) => {
    const [user, setUser] = useState(props.user)

        return (
            <div className="App">
                <Navbar />
                
              <Switch>
              <Route
              exact
              path="/"
              component={Home}
            />
            <Route
                  exact
                  path="/signup"
                 component={SignUp}
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

export default App2
