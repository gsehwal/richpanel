import React, {PureComponent} from 'react';
import lodashGet from 'lodash.get';
import isEqual from 'lodash.isequal';

class Col extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            className: props.className ? props.className : '',
            style: props.style ? props.style : {},
            id: props.id ? props.id : ''
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
            <div onClick={this.handleClick.bind(this)} className={'col-flex '+ this.state.className} id={this.state.id} style={this.state.style}>{X}</div>
        )
    }
}

export default Col;