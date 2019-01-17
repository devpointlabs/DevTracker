import React, {Component} from 'react';
import {connect} from 'react-redux';

class Application extends Component {
    state = {}

    render() {
        return(
            <>
            Hello
            </>
        )
    }
}


export default connect()(Application);