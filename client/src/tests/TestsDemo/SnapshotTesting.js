import { Button } from '@material-ui/core';
import React from 'react';

function SnapshotTesting(props) {
    return (
        <div>
            <h1>Hello world</h1>
            {props.sayGoodbye ? 
            'goodbye universe' 
            : 'nothing to see here!'}
        </div>
    )
}

export default SnapshotTesting;