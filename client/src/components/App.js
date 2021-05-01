import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';

import Home from './Home';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import NotFound from './NotFound';

class App extends Component {
	render() {
		return(
			<BrowserRouter>
				<main>
					<Header />
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route path="/signin" component={ SignIn } />
						<Route path="/signup" component={ SignUp } />
						<Route component={ NotFound } />
					</Switch>
				</main>			
			</BrowserRouter>
		)
	}
}

export default App;