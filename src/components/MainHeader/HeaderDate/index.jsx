import React, {Component} from 'react';
import dayJsPlugin from "dayjs";

class HeaderDate extends Component {
    constructor(props) {
        super(props);
        // 时间显示刷新定时器
        this.timer = null;
    }

    /**
     * 顶部时间格式化模板
     * @type {string}
     */
    static dateFormatTemplate = "YYYY年 MM月DD日 HH:mm:ss";

    state = {
        // header中时间格式化显示
        date: dayJsPlugin().format(HeaderDate.dateFormatTemplate)
    }

    componentDidMount() {
        this.timmer = setInterval(() => {
            this.setState({date: dayJsPlugin().format(HeaderDate.dateFormatTemplate)})
        }, 1000);
    }

    componentWillUnmount() {
        if(this.timmer) {
            clearInterval(this.timmer);
            this.timmer = null;
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.date !== nextState.date;
    }

    render() {
        return (
            <>
                <div className="time">
                    <div>{this.state.date}</div>
                </div>
                <div className="img-box">
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
                </div>
            </>
        );
    }
}

export default HeaderDate;
