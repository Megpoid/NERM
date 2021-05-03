import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';

import Home from './pages/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import NotFound from './pages/NotFound';

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