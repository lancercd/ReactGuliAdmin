import React, {Component, lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Layout} from "antd";
import MainMenu from "../MainMenu";
import MainHeader from "../MainHeader";
import Loading from "../Loading";


const Home = lazy(() => import("../../pages/Home"));
const Admin = lazy(() => import("../../pages/Admin"));
const Product = lazy(() => import("../../pages/Product"));
const Role = lazy(() => import("../../pages/Role"));
const User = lazy(() => import("../../pages/User"));
const NotFound = lazy(() => import("../../pages/NotFound"));


const { Header, Footer, Sider, Content } = Layout;

/**
 * 页面主要布局
 */
class MainLayout extends Component {

    /**
     * 渲染左侧菜单
     * @returns {JSX.Element}
     */
    renderMenu() {
        return (
            <MainMenu/>
        );
    }

    /**
     * 渲染header
     * @returns {JSX.Element}
     */
    renderHeader() {
        return (
            <MainHeader />
        );
    }


    /**
     * 渲染content中的route
     * @returns {JSX.Element}
     */
    renderContent() {
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


    /**
     * 渲染Footer
     * @returns {JSX.Element}
     */
    renderFooter() {
        return (
            "Footer"
        );
    }

    render() {
        return (
            <Layout style={{height: "100%"}}>
                <Sider width={250} theme={"light"}>
                    {this.renderMenu()}
                </Sider>
                <Layout>
                    <Header title="9999999" style={{backgroundColor: "#f0f2f5"}}>
                        {this.renderHeader()}
                    </Header>
                    <Content style={{backgroundColor: "#fff"}}>
                        {this.renderContent()}
                    </Content>
                    <Footer style={{textAlign: "center"}}>
                        {this.renderFooter()}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;
