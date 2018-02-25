import React from 'react';
import {Switch, Route} from "react-router-dom";

import Home from './components/Home';
import BoardDashboard from './components/board/BoardDashboard';
import BoardForm from './components/board/BoardForm';
import BoardList from './components/board/BoardList';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default class Routes extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/user/login" component={SignIn} />
                <Route path="/user/register" component={SignUp} />
                <Route path="/boards" component={BoardList} />
                <Route path="/board/create" component={BoardForm} />
                <Route path="/board/:id" component={BoardDashboard} />
            </Switch>           
        );
    }

} 