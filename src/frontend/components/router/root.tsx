import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import HomeWrapper from '@components/home/HomeWrapper';
import PageNotFound from '@components/specials/PageNotFound';
import About from '@components/about/about';

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomeWrapper}/>
                    <Route exact path='/about' component={About}/>
                    <Route component={PageNotFound}/>
            </Switch>
        );
    }
}