import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal'

import { fetchPostComments, updatePostVotes, updateCommentVotes } from '../actions';

import moment from 'moment/moment.js';
import 'moment/min/locales.min';

class Post extends Component {
    state = {
        commentsModalOpen: false
    }
    updateVote(vote, postId) {
        this.props.submitVote(vote, postId);
    }
    updateCommentVote(vote, commentId) {
        this.props.submitCommentVote(vote, commentId);
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.getComments(postId);
    }
    showCommentModal() {
        this.setState({ commentsModalOpen: true });
    }
    closeCommentsModal(){
        this.setState({ commentsModalOpen: false });
    }
    render() {
        const { commentsModalOpen } = this.state;
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
                            <span>Votes: {post.voteScore} <button onClick={() => this.updateVote('downVote', post.id)} className="decrease-vote">-</button><button onClick={() => this.updateVote('upVote', post.id)} className="increment-vote">+</button></span>
                        </div>
                    </header>
                    <section>{post.body}</section>
                    <div className="post-info body-footer">
                        <span>Created: {moment(post.timestamp).calendar()}</span>
                        <span>Category: #{post.category}</span>
                    </div>
                    <div className="comments">
                        <button className="newComment" onClick={() => this.showCommentModal()}>Add a new comment +</button>
                        { comments.length > 0 && <h3 className="comments-title">Comments</h3>}
                        { comments.length > 0 && comments.map( comment => (
                            <div className="comment" key={comment.id}>
                                <div className="comment-info">
                                    <span>by: {comment.author}</span>
                                    <span>Created: {moment(comment.timestamp).calendar()}</span>
                                    <span>Votes: {comment.voteScore} <button onClick={() => this.updateCommentVote('downVote', comment.id)} className="decrease-vote">-</button><button onClick={() => this.updateCommentVote('upVote', comment.id)} className="increment-vote">+</button></span>
                                </div>
                                <p className="comment-body">{comment.body}</p>
                            </div>
                        ))
                        }
                    </div>
                </article>
            }
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={commentsModalOpen}
                onRequestClose={this.closeCommentsModal}
                contentLabel='Modal'>
                <button className="closeModal" onClick={() => this.closeCommentsModal()}>X</button>
            </Modal>
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
        submitVote: (vote, postId) => dispatch(updatePostVotes(vote, postId)),
        submitCommentVote: (vote, commentId) => dispatch(updateCommentVotes(vote, commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);