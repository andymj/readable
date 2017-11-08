import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Route } from 'react-router'

import "../App.css";

import Posts from './Posts';
import Sidenav from './Sidenav';
import Post from './Post';

class App extends Component {

	render() {
		return (
			<div>
				<h1><Link to="/">READABLE</Link></h1>
				<div className="App">
					<div className="home-wrapper">
						<Sidenav />
						<Route exact path="/" component={Posts} />
						<Route path="/:category/posts" component={Posts} />
						<Route path="/posts/:postId" component={Post} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
