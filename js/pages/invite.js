import { getFirestore, doc, addDoc, collection, query, or, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";


const module = {

	firebase: null,
    user: null,
	
	init: function(firebase, user) {
		console.log(firebase);

		this.firebase = firebase;
        this.user = user;

		const that = this;

        this.initUX();

	},

    initUX: function() {
        const that = this;
        $('#invite-button').on('click', function() {
            that.invite();
        });
		$('#email-input').keypress((e) => {
			if ( e.keyCode == 13 ) {
				that.invite();
			}
		});
    },

    invite: async function() {
        const $email = $('#email-input');
        
        const db = getFirestore(this.firebase);

        await addDoc(collection(db, "invites", this.user.uid, "inviteds"), {
            email: $email.val(),
			host: location.protocol + location.hostname
        });

        $email.val('');
		alert('Request sent');
    }

};

export default module;