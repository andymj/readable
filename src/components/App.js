import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

import * as readableAPI from "../utils/readableAPI";
import { getPosts, getCategories, sortByDate, sortByVotes } from '../actions';

import { ConnectedRouter, push } from 'react-router-redux'
import { Route } from 'react-router'

import { connect } from 'react-redux'

import moment from 'moment/moment.js';
import 'moment/min/locales.min';

import Home from './Home';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Route exact path="/" component={Home} />
			</div>
		);
	}
}

export default App;
