import React from 'react';

const button = (props) => {
    return (
        <button onClick={props.click}>
            {props.btnText}
        </button>
    )
}

export default button;