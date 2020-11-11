import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import LoginView from "./LoginView";
import EntriesView from "./EntriesView";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginView/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/entries" push={false} />
                    </Route>
                    <Route path="/entries">
                        <EntriesView/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
