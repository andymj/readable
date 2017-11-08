import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import uuidv4 from 'uuid/v4';

import { updatePostVotes, submitPost, editPost, deletePost } from '../actions'

import moment from 'moment/moment.js';
import 'moment/min/locales.min';

class Posts extends Component {

    // initial state, used only for Form field updates.
    state = {
        postModalOpen: false,
        postAuthor: '',
        postTitle: '',
        postBody: '',
        postCategory: '',
        postId: '',
        updatePost: false
    }
    postModalOpen = () => {
        this.setState({
            postModalOpen: true
        })
    }
    closePostModal = () => {
        this.resetPostForm();
    }

    // resets the state properties value
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

    // sets the state properties to the value 
    // of the post to be editted
    editPostHandler(post) {
        this.setState({
            postTitle: post.title,
            postBody: post.body,
            postId: post.id,
            updatePost: true,
            postModalOpen: true
        })
    }

    // submits form data
    submitForm = (e) => {
        e.preventDefault();
        let postData = {};

        // conditional to submit a post for an update or
        // to create a new post.
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

    // updates form field value onChange
    handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }
    updateVote(vote, postId) {
        this.props.submitVote(vote, postId);
    }
    render() {
        let { postModalOpen, postTitle, postCategory, postAuthor, postBody, postId, updatePost } = this.state;
        let { posts } = this.props;
        const category = this.props.match.params.category;
        posts = category && posts ? posts.filter( post => post.category === category ) : posts;
        
        return (
            <section className="posts">
                <h2>Posts</h2>
                <button onClick={this.postModalOpen} className="add-new-post">Add a new post <span className="plus-icon">+</span></button>
                {!!posts && posts.length > 0 ? posts.map(post => {
                    let body = post.body.substring(0, 60);
                    body = body.length >= 60 ? `${body}...` : body;

                    return <article key={post.id}>
                        <header className="post-header">
                            <h3 className="post-title">
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </h3>
                            <div className="post-info">
                                <span>by: {post.author}</span>
                                <span>Votes: {post.voteScore} <button onClick={() => this.updateVote('downVote', post.id)} className="decrease-vote">-</button><button onClick={() => this.updateVote('upVote', post.id)} className="increment-vote">+</button></span>
                            </div>
                        </header>
                        <p className="post-body">{body}</p>
                        <footer className="post-info">
                            <span>Created: {moment(post.timestamp).calendar()}</span>
                            <span>Category: #{post.category}</span>
                            <span>Total comments: {post.commentCount}</span>
                            <span>
                                <button className="edit" onClick={() => this.editPostHandler(post)}>Edit</button>
                                <button className="delete" onClick={() => this.props.deletePost(post.id)}>Delete</button>
                            </span>
                        </footer>
                    </article>;
                }) : <h2>No Posts found! :-(</h2>}
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={postModalOpen}
                    onRequestClose={this.closePostModal}
                    contentLabel='Modal'>
                    <h2>{ updatePost ? "Edit" : "Create a new" } Post</h2>
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
        submitVote: (vote, postId) => dispatch(updatePostVotes(vote, postId)),
        submitPost: (data) => dispatch(submitPost(data)),
        editPost: (data, postId) => dispatch(editPost(data, postId)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);