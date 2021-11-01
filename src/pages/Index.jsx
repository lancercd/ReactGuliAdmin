import React, {Component, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Loading from "../components/Loading";


const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const MainLayout = lazy(() => import("../components/MainLayout"));
const NotFound = lazy(() => import("./NotFound"));


class Index extends Component {

    render() {
        return (
            <Router>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="/" component={MainLayout} />
                        <Route to="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

export default Index;
