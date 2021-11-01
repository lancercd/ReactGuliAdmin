import React, {Component, lazy, Suspense} from 'react';
import {connect as ConnectRedux} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import {Layout} from "antd";
import MainMenu from "../MainMenu";
import MainHeader from "../MainHeader";
import Loading from "../Loading";
import {USER_INFO_STORE_NAME} from "../../store/constant";


const Home = lazy(() => import("../../pages/Home"));
const Admin = lazy(() => import("../../pages/Admin"));
const Product = lazy(() => import("../../pages/Product"));
const Role = lazy(() => import("../../pages/Role"));
const User = lazy(() => import("../../pages/User"));
const NotFound = lazy(() => import("../../pages/NotFound"));


const { Header, Footer, Sider, Content } = Layout;

const mapStateToProps = (state) => ({isLogin: state[USER_INFO_STORE_NAME].isLogin});
const mapDispatchToProps = {}


/**
 * 页面主要布局
 */
@ConnectRedux(mapStateToProps, mapDispatchToProps)
class MainLayout extends Component {

    /**
     * 渲染content中的route
     * @returns {JSX.Element}
     */
    renderRoutes() {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/home"    component={Home} />
                        <Route exact path="/admin"   component={Admin} />
                        <Route exact path="/product" component={Product} />
                        <Route exact path="/role"    component={Role} />
                        <Route exact path="/user"    component={User} />
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
                        {this.renderRoutes()}
                    </Content>
                    <Footer style={{textAlign: "center"}}>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;
