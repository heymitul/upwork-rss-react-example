import React from 'react';

import { NavLink } from 'react-router-dom';

import './Header.css';

const header = (props) => (
    <React.Fragment>
        <ul>
            <li><NavLink to="/posts">Home</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
        </ul>
    </React.Fragment>
)

export default header;