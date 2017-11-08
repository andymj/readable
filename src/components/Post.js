import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import uuidv4 from 'uuid/v4';

import { fetchPostComments,
        updatePostVotes,
        updateCommentVotes,
        createComment,
        fetchPosts,
        editComment,
        deleteComment,
        submitPost, 
        editPost, 
        deletePost } from '../actions';

import moment from 'moment/moment.js';
import 'moment/min/locales.min';

class Post extends Component {

    // initial state used for Form field updates.
    state = {
        commentsModalOpen: false,
        commentAuthor: '',
        commentBody: '',
        commentId: '',
        updateComment: false,
        postModalOpen: false,
        postAuthor: '',
        postTitle: '',
        postBody: '',
        postCategory: '',
        postId: '',
        updatePost: false
    }

    // resets comments properties.
    resetCommentState() {
        this.setState({
            updateComment: false,
            commentsModalOpen: false,
            commentAuthor: '',
            commentBody: '',
            commentId: '' 
        })
    }
    updateVote(vote, postId) {
        this.props.submitVote(vote, postId);
    }
    updateCommentVote(vote, commentId) {
        this.props.submitCommentVote(vote, commentId);
    }

    // after post is mounted render comments.
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.getComments(postId);
    }
    showCommentModal() {
        this.setState({ commentsModalOpen: true });
    }
    closeCommentsModal = () => this.resetCommentState();

    // Handle updates for form field values.
    handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    // submits the data for a comment.
    submitComment = (e) => {
        e.preventDefault();
        let commentData = {};

        // conditional to create ot edit a comment.
        if( !this.state.updateComment ) {
            commentData = {
                id: uuidv4(),
                timestamp: Date.now(),
                body: this.state.commentBody,
                author: this.state.commentAuthor,
                parentId: this.props.match.params.postId
            }
            this.props.addCommentToPost(commentData);
        } else {
            commentData = {
                timestamp: Date.now(),
                body: this.state.commentBody,
            }
            this.props.editComment(this.state.commentId, commentData);
        }
        this.props.reloadPosts();
        this.resetCommentState();
    }

    // sets the State property with the comment values 
    // in order to be editted. and used in a form
    editComment = (event, comment) => {
        event.preventDefault();
        this.setState({
            commentBody: comment.body,
            commentId: comment.id,
            timestamp: Date.now(),
            commentsModalOpen: true,
            updateComment: true
        })
    }
    deleteComment = (commentId, postId) => {
        this.props.removeComment(commentId, postId);
        this.props.reloadPosts();
    }

    postModalOpen = () => {
        this.setState({
            postModalOpen: true
        })
    }
    closePostModal = () => {
        this.resetPostForm();
    }
    resetPostForm() {
        this.setState({
            postModalOpen: false,
            postAuthor: '',
            postTitle: '',
            postCategory: '',
            postBody: '',
            postId: '',
            updatePost: false
        })
    }
    editPostHandler(post) {
        this.setState({
            postTitle: post.title,
            postBody: post.body,
            postId: post.id,
            updatePost: true,
            postModalOpen: true
        })
    }
    submitForm = (e) => {
        e.preventDefault();
        let postData = {};
        if (!this.state.updatePost) {
            postData = {
                id: uuidv4(),
                timestamp: Date.now(),
                body: this.state.postBody,
                author: this.state.postAuthor,
                title: this.state.postTitle,
                category: this.state.postCategory
            }
            this.props.submitPost(postData);
        } else {
            postData = {
                title: this.state.postTitle,
                body: this.state.postBody,
            }
            this.props.editPost(postData, this.state.postId);
        }
        this.closePostModal();
    }
    
    render() {
        const { commentsModalOpen, commentAuthor, commentBody, updateComment } = this.state;
        let { postModalOpen, postTitle, postCategory, postAuthor, postBody, updatePost } = this.state;
        const { posts, comments } = this.props;
        const postId = this.props.match.params.postId;
        const post = posts ? posts.filter(post => post.id === postId).pop() : '';

        return (
            <div className="post-wrapper">
            {post ?
                <article className="single-post"> 
                    <header className="post-header">
                            <button onClick={this.postModalOpen} className="add-new-post">Add a new post <span className="plus-icon">+</span></button>
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
                        <span>
                            <button className="edit" onClick={() => this.editPostHandler(post)}>Edit</button>
                            <button className="delete" onClick={() => this.props.deletePost(post.id)}>Delete</button>
                        </span>
                    </div>
                    <div className="comments">
                        <button className="newComment" onClick={() => this.showCommentModal()}>Add a new comment +</button>
                        { comments.length > 0 && <h3 className="comments-title">Comments</h3>}
                        { comments.length > 0 && comments.map( comment => (
                            <div className="comment" key={comment.id}>
                                <div><button onClick={(event) => this.editComment(event, comment)} className="edit">Edit</button><button onClick={() => this.deleteComment(comment.id, postId)} className="delete">Delete</button></div>
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
                </article> :  <h2>Sorry Post doesn't exist</h2>
            }
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={commentsModalOpen}
                onRequestClose={this.closeCommentsModal}
                contentLabel='Modal'>
                <h2>{updateComment ? "Edit" : "Create a new"} comment</h2>
                <form onSubmit={this.submitComment} className="comment-form">
                { !updateComment && 
                    <label>
                        Author: 
                        <input 
                            type="text" 
                            value={commentAuthor}
                            onChange={this.handleInputChange}
                            name="commentAuthor" />
                    </label>
                }
                    <label>
                        Comment: 
                        <textarea 
                            name="commentBody"
                            value={commentBody}
                            onChange={this.handleInputChange}
                            rows="10"
                            cols="50"/>
                    </label>
                    <button className="submit" type="submit">Submit</button>
                </form>
                <button className="closeModal" onClick={() => this.closeCommentsModal()}>X</button>
            </Modal>
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={postModalOpen}
                onRequestClose={this.closePostModal}
                contentLabel='Modal'>
                <h2>{updatePost ? "Edit" : "Create a new"} Post</h2>
                <form onSubmit={this.submitForm} className="post-form">
                    {!updatePost &&
                        <div>
                            <label>
                                Author:
                                <input
                                    type="text"
                                    value={postAuthor}
                                    onChange={this.handleInputChange}
                                    name="postAuthor" />
                            </label>
                            <label>
                                Select a category:
                                <select
                                    name="postCategory"
                                    value={postCategory}
                                    onChange={this.handleInputChange}>
                                    <option value="react">React</option>
                                    <option value="redux">Redux</option>
                                    <option value="udacity">Udacity</option>
                                </select>
                            </label>
                        </div>
                    }
                    <label>
                        Title:
                            <input
                            type="text"
                            value={postTitle}
                            onChange={this.handleInputChange}
                            name="postTitle" />
                    </label>
                    <label>
                        Content:
                            <textarea
                            name="postBody"
                            value={postBody}
                            onChange={this.handleInputChange}
                            rows="10"
                            cols="50" />
                    </label>
                    <button className="submit" type="submit">Submit</button>
                </form>
                <button className="closeModal" onClick={() => this.closePostModal()}>X</button>
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
        submitCommentVote: (vote, commentId) => dispatch(updateCommentVotes(vote, commentId)),
        addCommentToPost: (commentData) => dispatch(createComment(commentData)),
        reloadPosts: () => dispatch(fetchPosts()),
        editComment: (commentId, commentData) => dispatch(editComment(commentId, commentData)),
        removeComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
        submitPost: (data) => dispatch(submitPost(data)),
        editPost: (data, postId) => dispatch(editPost(data, postId)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);