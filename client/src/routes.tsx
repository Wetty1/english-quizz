import React from "react";
import { Switch, Route } from 'react-router-dom';
import Constructor from './pages/Constructor';
import Room from "./pages/Room";
import history from "./services/history"

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Constructor} />
        <Route path="/room" exact component={Room} />
        <Route path="/room/:id" exact component={Room} />
    </Switch>
);

export default Routes;