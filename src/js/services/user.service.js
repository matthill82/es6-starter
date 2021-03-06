export default class User {
	constructor(AppConstants, $http) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._$http = $http;

		this.current = null;
	}

	 // Try to authenticate by registering or logging in
	 attemptAuth(type, credentials) {
			   let route = (type === 'login') ? '/login' : '';
			   return this._$http({
				     url: this._AppConstants.api + '/users' + route,
				     method: 'POST',
				     data: {
				       user: credentials
				     }
			   }).then(
	     // On success... function(res) {}
	     (res) => {
	       // Store the user's info for easy lookup
	       this.current = res.data.user;
	       return res;
	     }
	   );
	 }
}