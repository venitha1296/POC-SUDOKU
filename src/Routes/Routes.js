
import React, { Component } from 'react';
import { Router, Route, Switch,Redirect } from 'react-router-dom';
import { history } from './History';
import Home from '../Components/Home/Home';
import Board from '../Components/GameBoard/Board';

class Routes extends Component
{
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        {/* This route is for home component 
                        with exact path "/", in component props 
                        we passes the imported component*/}
                        <Route exact path="/" component={Home} />
                            
                        {/* This route is for NewGame component 
                        with exact path "/new-game", in component 
                        props we passes the imported component*/}
                        <Route path="/new-game" component={Board} />
                                
                        {/* If any route mismatches the upper 
                        route endpoints then, redirect triggers 
                        and redirects app to home component with to="/" */}
                        <Redirect to="/" />
                    </Switch>   
                </div>
            </Router>
        );
    }

}
export default Routes;