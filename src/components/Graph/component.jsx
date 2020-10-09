import React from 'react';
import Element from './index';
import ElementComponent from '../Element/component';

class ButtonComponent extends ElementComponent {
    constructor(props) {
        super(props);
        this.elementClass = Element;
    }
}

ButtonComponent.propTypes = {};

ButtonComponent.defaultProps = {
};

export default ButtonComponent;