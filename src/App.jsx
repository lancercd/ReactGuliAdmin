import React, {Component, Fragment} from 'react';
import Index from "./pages/Index";
import {Provider} from "react-redux";

import store from "./store";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Provider store={store} >
                    <Index />
                </Provider>
            </Fragment>
        );
    }
}

export default App;
