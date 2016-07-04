/**
 * Created by matthewhill on 29/06/2016.
 */

class AuthCtrl {
	constructor(User, $state) {
		'ngInject';

		this._User = User;
		this.title = $state.current.title;
		this.authType = $state.current.name.replace('app.', '');
	}

	submitForm() {

		this._User.attemptAuth(this.authType, this.formData).then(
			// success handler
			(res) => {
				this.isSubmitting = true;
				this.user = res.data.user;
			},
			(err) => {
				this.isSubmitting = true;
				console.log(err.data.errors);
			}
		);

		this.isSubmitting = true;
		console.log(this.isSubmitting);
	}

}


export default AuthCtrl;