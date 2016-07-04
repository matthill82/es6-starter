class AuthCtrl {
	constructor(User, $state) {
		'ngInject';

		this._User = User;
		this.title = $state.current.title;
		this.authType = $state.current.name.replace( 'app.', '' );
	}

	submitForm() {

		this._User.attemptAuth( this.authType, this.formData ).then(
			// success handler
			(res) => {
				this.isSubmitting = true;
				this.user = res.data.user;
			},
			(err) => {
				this.isSubmitting = true;
				this.errors = err.data.errors;
				console.log( err.data.errors );
			}
		);

		this.isSubmitting = true;
		console.log( this.isSubmitting );
	}

}

export default AuthCtrl;