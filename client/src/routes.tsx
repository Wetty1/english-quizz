import React from "react";
import { Switch, Route } from 'react-router-dom';
import Constructor from './pages/Constructor';
// import Home from './pages/Home';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Constructor} />
    </Switch>
);

export default Routes;