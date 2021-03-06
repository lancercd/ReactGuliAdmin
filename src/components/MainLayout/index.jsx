import React, {Component, lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Layout} from "antd";
import MainMenu from "../MainMenu";
import MainHeader from "../MainHeader";
import Loading from "../Loading";


const Home = lazy(() => import("../../pages/Home"));
const Admin = lazy(() => import("../../pages/Admin"));
const Category = lazy(() => import("../../pages/Product/Category")),
      Goods = lazy(() => import("../../pages/Product/Goods")),
      Detail = lazy(() => import("../../pages/Product/Detail")),
      AddOrUpdate = lazy(() => import("../../pages/Product/AddOrUpdate"));
const Role = lazy(() => import("../../pages/Role"));
const User = lazy(() => import("../../pages/User"));
const NotFound = lazy(() => import("../../pages/NotFound"));


const { Header, Footer, Sider, Content } = Layout;

/**
 * 页面主要布局
 */
class MainLayout extends Component {


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
                        <Route exact path="/user/list"    component={User} />
                        <Route exact path="/product/category" component={Category} />
                        <Route exact path="/product/goods" component={Goods} />
                        <Route exact path="/product/goods/detail/:id" component={Detail} />
                        <Route exact path="/product/goods/add" component={AddOrUpdate} />
                        <Route exact path="/product/goods/update/:id" component={AddOrUpdate} />
                        <Route exact path="/role"    component={Role} />
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
                    <MainMenu/>
                </Sider>
                <Layout>
                    <Header style={{backgroundColor: "#f0f2f5"}}>
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
