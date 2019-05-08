import React from 'react';
import {connect} from 'redux';

import {ButtonBase} from './ButtonBase';

const mapStateToProps = (state) => {
    return {
	text: state.buttonText
    };
};

export default connect(mapStateToProps)(ButtonBase);
