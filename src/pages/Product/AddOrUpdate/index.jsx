import React, {Component} from 'react';

class AddOrUpdate extends Component {
    render() {
        return (
            <div>
                <h3>addOrUpdate</h3>
                <span>
                    id:{this.props.match.params.id}
                </span>
            </div>
        );
    }
}

export default AddOrUpdate;
