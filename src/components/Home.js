import React, { Component } from "react";

import * as readableAPI from "../utils/readableAPI";
import { getPosts, getCategories, sortByDate, sortByVotes } from '../actions';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import moment from 'moment/moment.js';
import 'moment/min/locales.min';

class Home extends Component {
    state = {
        posts: null,
        categories: null
    }

    render() {
        const { posts, categories } = this.props;
        return (
            <div className="home-wrapper">
            <a href="#" className="add-new-post">Add a new post <span className="plus-icon">+</span></a>
            <aside className="categories">
                <section>
                    <h2>Categories</h2>
                    <ul>
                        {!!categories ? categories
                            .map(category => (
                                <li key={category.name}>
                                    <Link to={`/${category.path}/posts`}>{category.name}</Link>
                                </li>
                            )) : ""}
                    </ul>
                </section>
                <section>
                    <h2>Sort by</h2>
                    <ul className="order-by">
                        <li><a href="#" onClick={(event) => { event.preventDefault(); this.props.sortByDate(posts) }}>Date</a></li>
                        <li><a href="#" onClick={(event) => { event.preventDefault(); this.props.sortByVotes(posts) }}>Votes</a></li>
                    </ul>
                </section>
            </aside>
            <section className="posts">
                <h2>Posts</h2>
                {!!posts ? posts.map(post => {
                    let body = post.body.substring(0, 60);
                    body = body.length >= 60 ? `${body}...` : body;

                    return <article key={post.id}>
                        <header className="post-header">
                            <h3 className="post-title">
                                <a href={`/posts/${post.id}`}>{post.title}</a>
                            </h3>
                            <div className="post-info">
                                <span>by: {post.author}</span>
                                <span>
                                    Created: {moment(post.timestamp).calendar()}
                                </span>
                                <span>Category: {post.category}</span>
                                <span>Votes: {post.voteScore}</span>
                            </div>
                        </header>
                        <p className="post-body">{body}</p>
                    </article>;
                }) : "Loading ..."}
            </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sortByDate: (posts) => dispatch(sortByDate(posts)),
        sortByVotes: (posts) => dispatch(sortByVotes(posts))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);