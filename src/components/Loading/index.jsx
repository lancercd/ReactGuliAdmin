import React, {Component} from 'react';
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import LoadingCss from "./index.module.css";


class Loading extends Component {
    render() {
        return (
            <div className={LoadingCss.loadingAnimationBox}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
        );
    }
}

export default Loading;
