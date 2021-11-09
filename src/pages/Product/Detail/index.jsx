import React, {Component} from 'react';

class Detail extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }


    render() {
        return (
            <div>
                <h3>detail</h3>
                id:{this.props.match.params.id}
            </div>
        );
    }
}

export default Detail;
