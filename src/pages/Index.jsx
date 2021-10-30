import React, {Component, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {connect as ConnectRedux} from "react-redux";

import Loading from "../components/Loading";
import {USER_INFO_STORE_NAME} from "../store/constant";


const Login = lazy(() => import("./Login"));
const MainLayout = lazy(() => import("../components/MainLayout"));
const NotFound = lazy(() => import("./NotFound"));

const mapStateToProps = (state) => ({isLogin: state[USER_INFO_STORE_NAME].isLogin});
const mapDispatchToProps = {}


@ConnectRedux(mapStateToProps, mapDispatchToProps)
class Index extends Component {

    renderAuthChecker() {
        console.log(this.props);
        if(this.props.isLogin) {
            return (
                <>
                    <Route path="/" component={MainLayout} />
                    <Redirect to="/" />
                </>
            );
        }
        return (
            <>
                <Route exact path="/login" component={Login} />
                <Redirect exact to="/login" />
            </>
        );
    }


    render() {
        return (
            <Router>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {/*<Route exact path="/login" component={Login} />*/}
                        {/*<Route path="/" component={MainLayout} />*/}
                        {/*<Redirect to="/login" />*/}
                        {this.renderAuthChecker()}
                        <Route to="*" render={() => NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

export default Index;
