import React from 'react';

import Header from './Header';
import './Layout.css';

const layout = (props) => (
    <React.Fragment>
        <Header></Header>
        <main>
            {props.children}
        </main>
    </React.Fragment>
)

export default layout;