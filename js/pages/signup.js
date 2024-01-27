import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";


const module = {

	firebase: null,
	db: null,
	
	init: function(firebase) {
		console.log(firebase);

		this.firebase = firebase;
		this.db = getFirestore(this.firebase);

		const that = this;
		$('#signupButton').click(function(){
			that.signupByEmail();
		});

		$('#signup-google-button').click(function(){
			that.signupByGoogle();
		});

		$('#signup-facebook-button').click(function(){
			that.signupByFacebook();
		});
	},

	signupByEmail: function() {

		const auth = getAuth(this.firebase);

		const email = $('#email').val();
		const password = $('#password').val();
	
		createUserWithEmailAndPassword(auth, email, password)
		  .then(async (userCredential) => {
		    // Signed up 
		    const user = userCredential.user;
		    console.log(user);
			await this.saveValue(user);
		    location.href = "./?create=true";
		  })
		  .catch((error) => {
		    console.log('error', error);
		  });

	},

	signupByGoogle: function() {
		const provider = new GoogleAuthProvider();

		const auth = getAuth();
		signInWithPopup(auth, provider)
		  .then(async (result) => {
		    const credential = GoogleAuthProvider.credentialFromResult(result);
		    const token = credential.accessToken;
		    const user = result.user;
			await this.saveValue(user);
		    location.href = "./?create=true";
		  }).catch((error) => {
		    console.log('error', error);
		  });
	},

	saveValue: async function(user) {
		const userRef = doc(this.db, "users", user.uid);

		await setDoc(userRef, { name: user.displayName }, {merge: true});
	},

};

export default module;