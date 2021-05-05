import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';

import Home from './pages/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import NotFound from './pages/NotFound';

class App extends Component {
	render() {
		return(
			<Router>
				<main>
					<Header />
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route exact path="/signin" component={ SignIn } />
						<Route exact path="/signup" component={ SignUp } />
						<Route exact path="/user/dashboard" component={ UserDashboard } />
						<Route exact path="/admin/dashboard" component={ AdminDashboard } />
						<Route exact component={ NotFound } />
					</Switch>
				</main>			
			</Router>
		)
	}
}

export default App;