export default class User {
	constructor(JWT, AppConstants, $http, $state, $q) {
		'ngInject';

		this._JWT = JWT;
		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$state = $state;
		this._$q = $q;

		this.current = null;
	}

	// Try to authenticate by registering or logging in
	attemptAuth(type, credentials) {
		let route = (type === 'login') ? '/login' : '';
		return this._$http( {
			url   : this._AppConstants.api + '/users' + route,
			method: 'POST',
			data  : {
				user: credentials
			}
		} ).then(
			// On success... function(res) {}
			(res) => {

				// Storing the users auth token in localstorage
				this._JWT.save(res.data.user.token);

				// Store the user's info for easy lookup
				this.current = res.data.user;
				return res;
			}
		);
	}

	logout() {
		//set User.current to null
		this.current = null;
		//delete the JWT token in localStorage
		this._JWT.destroy();
		// Do a hard reload of current state to ensure all data is flushed
		this._$state.go(this._$state.$current, null, { reload : true });
	}


	verifyAuth() {
		let deferred = this._$q.defer();

		// lets check fot the token first
		if(!this._JWT.get()) {
			deferred.resolve(false);
			return deferred.promise;
		}

		// if there's a JWT token & user is already set up
		if(this.current) {
			deferred.resolve(true);
		} else {

			this._$http({
				url: this._AppConstants.api + '/user',
				method : 'GET'
			}).then(
				(res) => {
					this.current = res.data.user;
					deferred.resolve(true);
				},
				// If an error hapens, that means the user's toke was invalid
				(err) => {
					this._JWT.destroy();
					deferred.resolve(false);
				}
				// Reject automatically handled by auth interceptor
				// Will boot them to the homepage
			);
		}

		return deferred.promise;
	}

	ensureAuthIs(bool) {
		let deferred = this._$q.defer();

		this.verifyAuth().then(
			(authValid) => {
			if(authValid !== bool) {
				this._$state.go('app.home');
				deferred.resolve(false);
			} else {
				deferred.resolve(true)
			}
		});

		return deferred.promise;
	}
}











