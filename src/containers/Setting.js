import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Setting.css';

class Setting extends Component {

    state = {
        'rss': {
            'url': '',
            'interval': 1
        }
    }

    componentDidMount() {
        let config = localStorage.getItem('config');
        let configObj = config ? JSON.parse(config) : { 'url': 'http://feeds.feedburner.com/ndtvnews-top-stories', 'interval': 5 };

        this.setState({ 'rss': configObj });
    }

    onTextFieldChange = (e, id) => {
        console.log(this.state);

        let rss = {
            ...this.state.rss
        };

        rss[id] = e.target.value
        this.setState({ 'rss': rss });
        console.log(this.state.rss);
    }

    _saveConfig = () => {
        localStorage.setItem('config', JSON.stringify(this.state.rss));
    }

    render() {
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
                </div>
            </div>
        );
    }
}

export default Setting;