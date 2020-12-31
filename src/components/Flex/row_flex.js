import React, {PureComponent} from 'react';
import isEqual from 'lodash.isequal';
import lodashGet from 'lodash.get';

class Row extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            className: props.className ? props.className+' ' : '',
            style: props.style ? props.style : {}
        };
    }

    updateState(key, stateKey, defaultVal) {
        let newVal = lodashGet(this.props, key, defaultVal);
        if(!isEqual(newVal, this.state[stateKey])) {
            this.setState({
                [stateKey]: newVal
            });
        }
    }

    componentDidUpdate() {
        this.updateState('className', 'className', '');
        this.updateState('style', 'style', {});
    }

    handleClick() {
        return this.props.onClick ? this.props.onClick() : null;
    }

    render() {
        let X = this.props.children ? this.props.children : [];
        return (
            <div onClick={this.handleClick.bind(this)} className={'row-flex '+ this.state.className} style={this.state.style}>{X}</div>
        )
    }
}

export default Row;