import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updatePostVotes } from '../actions'

import moment from 'moment/moment.js';
import 'moment/min/locales.min';

class Posts extends Component {
    updateVote(vote, postId) {
        this.props.submitVote(vote, postId);
    }
    render() {
        let { posts } = this.props;
        const category = this.props.match.params.category;
        posts = category && posts ? posts.filter( post => post.category === category ) : posts;
        
        return (
            <section className="posts">
                <h2>Posts</h2>
                {!!posts ? posts.map(post => {
                    let body = post.body.substring(0, 60);
                    body = body.length >= 60 ? `${body}...` : body;

                    return <article key={post.id}>
                        <header className="post-header">
                            <h3 className="post-title">
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </h3>
                            <div className="post-info">
                                <span>by: {post.author}</span>
                                <span>Votes: {post.voteScore} <button onClick={() => this.updateVote('upVote', post.id)} className="increment-vote">+</button><button onClick={() => this.updateVote('downVote', post.id)} className="decrease-vote">-</button></span>
                            </div>
                        </header>
                        <p className="post-body">{body}</p>
                        <footer className="post-info">
                            <span>Created: {moment(post.timestamp).calendar()}</span>
                            <span>Category: #{post.category}</span>
                            <span>Total comments: {post.commentCount}</span>
                        </footer>
                    </article>;
                }) : "Loading ..."}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        submitVote: (vote, postId) => dispatch(updatePostVotes(vote, postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);