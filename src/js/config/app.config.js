import authInterceptors from './auth.interceptor';

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
	'ngInject';

	// push our interceptor for auth
	$httpProvider.interceptors.push( authInterceptors );

	$locationProvider.html5Mode( false );

	$stateProvider
		.state( 'app', {
			abstract   : true,
			templateUrl: 'layout/app-view.html',
			resolve    : {
				auth: (User) => {
					return User.verifyAuth();
				}
			}
		} );

	$urlRouterProvider.otherwise( '/' );

}

export default AppConfig;
