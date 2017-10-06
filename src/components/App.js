import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import * as readableAPI from "../utils/readableAPI";
import { connect } from 'react-redux'

import { getPosts } from '../actions';

class App extends Component {
	
	state = {
		posts: null
	}
	
	componentDidMount() {
		readableAPI.getAllPosts()
		.then((response) => {
			this.props.fetchPosts(response)
			return;
		});
	}

	// mapStateToProps(state, props) {
	// 	this.props = { state }
	// }
	render() {
		const posts = this.props.posts;
		console.log(posts);
		return (
		<div className="App">
			<section>
			{!!posts ? (
				posts.map(post => (
					<article key={post.id}>
						<header> 
							<h2>{post.title}</h2>
							<div>by <span>{post.author}</span> | <span>{post.timestamp}</span> | <span>{post.category}</span></div>
						</header>
						<p>{post.body}</p>
					</article>))
			) : (
				"nothing here"
			)}
			</section>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts };
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: (posts) => dispatch(getPosts(posts))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
