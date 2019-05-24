import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Setting.css';

class Setting extends Component {

    state = {
        'rss': {
            'url': '',
            'interval': 1
        },
        showSuccessMessage: false
    }

    componentDidMount() {
        let config = localStorage.getItem('config');
        let configObj = config ? JSON.parse(config) : { 'url': 'https://www.upwork.com/ab/feed/topics/rss?securityToken=9f7f80a7d422990c430c18712cb07d3706ff27623860a37ad27e416f151be16f82720c05b9a2a61e53538dd3f81167b50ba8f24f1c5502a891bda329ef85f95b&userUid=948783120980930560&orgUid=948783120980930562', 'interval': 5 };

        this.setState({ 'rss': configObj });
    }

    onTextFieldChange = (e, id) => {

        let rss = {
            ...this.state.rss
        };

        rss[id] = e.target.value
        this.setState({ 'rss': rss });
    }

    _saveConfig = () => {
        localStorage.setItem('config', JSON.stringify(this.state.rss));
        this.setState({
            ...this.state,
            showSuccessMessage: true
        });

        setTimeout(() => {
            this.props.history.push({ pathname: '/' });
        }, 1000);
    }

    render() {
        let styles = {
            visibility: 'hidden',
            textAlign: 'center'
        }

        if (this.state.showSuccessMessage) {
            styles = {
                ...styles,
                visibility: 'visible'
            }
        }

        return (
            <div className="form-container fit">
                <div className="form">
                    <TextField
                        className="input-field"
                        id="url"
                        label="RSS URL"
                        value={this.state.rss.url}
                        onChange={(e) => this.onTextFieldChange(e, 'url')} />
                    <TextField
                        className="input-field"
                        id="interval"
                        type="number"
                        label="Refresh Interval (in Minutes)"
                        value={this.state.rss.interval}
                        onChange={(e) => this.onTextFieldChange(e, 'interval')} />
                    <Button id="saveBtn" variant="contained" color="primary" onClick={this._saveConfig}>Save</Button>

                    <div style={styles}>Saved. Moving to Home...</div>
                </div>
            </div>
        );
    }
}

export default Setting;