import React, {Component} from 'react';

class Detail extends Component {
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
