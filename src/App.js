import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import LoginView from "./LoginView";
import EntriesView from "./EntriesView";
import UsersView from "./UsersView";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginView/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/login" push={false} />
                    </Route>
                    <Route path="/entries">
                        <EntriesView/>
                    </Route>
                    <Route path="/users">
                        <UsersView/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
