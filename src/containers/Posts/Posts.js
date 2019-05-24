import React, { Component } from "react";

import * as rssParser from 'react-native-rss-parser';
import TimeAgo from 'react-timeago';

import './Posts.css'

import _ from 'lodash';

class Posts extends Component {

    state = {
        posts: [],
        intervalId: '',
        errorShown: false
    }

    componentDidMount() {

        let config = localStorage.getItem('config');
        let configObj = config ? JSON.parse(config) : { 'url': 'https://www.upwork.com/ab/feed/topics/rss?securityToken=9f7f80a7d422990c430c18712cb07d3706ff27623860a37ad27e416f151be16f82720c05b9a2a61e53538dd3f81167b50ba8f24f1c5502a891bda329ef85f95b&userUid=948783120980930560&orgUid=948783120980930562', 'interval': 1 };

        this.fetchData(configObj);
        let intervalId = setInterval(() => {
            console.log('Fetching...')
            this.fetchData(configObj);
        }, configObj.interval * 60 * 1000);

        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }


    fetchData = (configObj) => {


        if (!configObj.url.startsWith('https://www.upwork.com')) {
            alert('URL must be of Upwork.');
            return;
        }

        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        fetch(CORS_PROXY + configObj.url)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                let rssData = rss.items; // new data
                let oldState = {
                    ...this.state
                };

                if (oldState.posts.length > 0) {

                    // get different array
                    let different = rssData.filter((newItem) => {
                        return _.findIndex(oldState.posts, { 'id': newItem.id }) === -1;
                    });

                    // update array to add 'new: true' in new array
                    rssData.forEach(item => {
                        let idx = _.findIndex(different, { 'id': item.id });
                        if (idx !== -1) {
                            let idxInNewArr = _.findIndex(rssData, { 'id': item.id });
                            rssData[idxInNewArr] = {
                                ...item,
                                new: true
                            }
                        }
                    });
                } else {
                    rssData.map((item) => {
                        return rssData[rssData.indexOf(item)] = {
                            ...item,
                            firstTime: true
                        }
                    })
                }

                console.log(rssData);
                this.setState({
                    posts: rssData
                })
            }).catch((err) => {
                if (!this.state.errorShown === true) {
                    alert('URL is wrong. Try changing settings.');
                }

                this.setState({
                    ...this.state,
                    errorShown: true
                });

                setTimeout(() => {
                    this.fetchData(configObj);
                }, 30000);
            });
    }

    getCardClasses(post) {
        let cardClasses = ['card'];

        if (post.new) {
            cardClasses.push('animated');
            cardClasses.push('fadeInLeft');
        }

        if (post.firstTime) {
            cardClasses.push('animated');
            cardClasses.push('fadeInUp');
        }

        return cardClasses.join(' ');
    }

    render() {

        // const renderHTML = (post) => React.createElement("div", { dangerouslySetInnerHTML: { __html: post.title }, className: 'card', key: post.id });

        return (
            <div className="container">
                {
                    this.state.posts.map((post) => {

                        return (
                            <div className={this.getCardClasses(post)} key={post.id}>
                                <a href={post.links[0].url} target="_blank" rel="noopener noreferrer">{post.title}</a>
                                <div className="time-container">
                                    <TimeAgo date={post.published} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    } s
}

export default Posts;