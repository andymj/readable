import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPostComments, updatePostVotes } from '../actions';

import moment from 'moment/moment.js';
import 'moment/min/locales.min';

class Post extends Component {
    updateVote(vote, postId) {
        this.props.submitVote(vote, postId);
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.getComments(postId);
    }
    render() {
        const { posts, comments } = this.props;
        const postId = this.props.match.params.postId;
        const post = posts ? posts.filter(post => post.id === postId).pop() : '';

        return (
            <div className="post-wrapper">
            {post &&
                <article className="single-post"> 
                    <header className="post-header">
                        <h2 className="post-title">{ post.title }</h2>
                        <div className="post-info">
                            <span>by: {post.author}</span>
                            <span>Votes: {post.voteScore} <button onClick={() => this.updateVote('upVote', post.id)} className="increment-vote">+</button><button onClick={() => this.updateVote('downVote', post.id)} className="decrease-vote">-</button></span>
                        </div>
                    </header>
                    <section>{post.body}</section>
                    <div className="post-info body-footer">
                        <span>Created: {moment(post.timestamp).calendar()}</span>
                        <span>Category: #{post.category}</span>
                    </div>
                    <div className="comments">
                        { comments.length > 0 && <h3 className="comments-title">Comments</h3>}
                        { comments.length > 0 && comments.map( comment => (
                            <div className="comment" key={comment.id}>
                                <div className="comment-info">
                                    <span>by: {comment.author}</span>
                                    <span>Created: {moment(comment.timestamp).calendar()}</span>
                                    <span>Votes: {comment.voteScore}</span>
                                </div>
                                <p className="comment-body">{comment.body}</p>
                            </div>
                        ))
                        }
                    </div>
                </article>
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (postId) => dispatch(fetchPostComments(postId)),
        submitVote: (vote, postId) => dispatch(updatePostVotes(vote, postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);