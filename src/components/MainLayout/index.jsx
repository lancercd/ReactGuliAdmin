import React, {Component, lazy, Suspense} from 'react';
import {Layout} from "antd";
import MainMenu from "../MainMenu";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "../../pages/Home";
import Admin from "../../pages/Admin";
import Product from "../../pages/Product";
import Role from "../../pages/Role";
import User from "../../pages/User";
import MainHeader from "../MainHeader";
import Loading from "../Loading";

const NotFound = lazy(() => import("../../pages/NotFound"));

const { Header, Footer, Sider, Content } = Layout;


class MainLayout extends Component {

    renderRoutes() {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/product" component={Product} />
                        <Route exact path="/role" component={Role} />
                        <Route exact path="/user" component={User} />
                        <Redirect exact from="/" to="/home" />
                        <Route to="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </>
        )
    }

    render() {
        return (
            <Layout style={{height: "100%"}}>
                <Sider width={250} theme={"light"}><MainMenu /></Sider>
                <Layout>
                    <Header style={{backgroundColor: "#f0f2f5"}}>
                        <MainHeader />
                    </Header>
                    <Content style={{backgroundColor: "#fff"}}>
                        {
                            this.renderRoutes()
                        }
                    </Content>
                    <Footer style={{textAlign: "center"}}>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;
