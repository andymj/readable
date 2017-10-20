import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sortByDate, sortByVotes } from '../actions';

class Sidenav extends Component {
    render() {
        const {categories, posts } = this.props;
        return (
            <aside className="categories">
                <button className="add-new-post">Add a new post <span className="plus-icon">+</span></button>
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
                    {this.props.posts && this.props.posts.length > 0 &&
                    <nav> 
                        <h2>Sort by</h2>
                        <ul className="order-by">
                            <li><button onClick={(event) => { event.preventDefault(); this.props.sortByDate(posts) }}>Date</button></li>
                            <li><button onClick={(event) => { event.preventDefault(); this.props.sortByVotes(posts) }}>Votes</button></li> 
                        </ul>
                    </nav>
                    }
                </section>
            </aside>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);