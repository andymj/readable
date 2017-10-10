import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import * as readableAPI from "../utils/readableAPI";
import { connect } from 'react-redux'

import { getPosts, getCategories } from '../actions';

class App extends Component {
	
	state = {
		posts: null
	}

	render() {
		const posts = this.props.posts;
		console.log(posts);
		return (
		<div className="App">
			<section>
			{!!posts ? (
				[...posts].map(post => (
					<article key={post.id}>
						<header> 
							<h2>{post.title}</h2>
							<div>by <span>{post.author}</span> | <span>{post.timestamp}</span> | <span>{post.category}</span></div>
						</header>
						<p>{post.body}</p>
					</article>))
			) : (
				"Loading ..."
			)}
			</section>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(mapStateToProps)(App);
