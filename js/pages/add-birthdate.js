import { getFirestore, doc, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";


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
        $('#add-button').on('click', function() {
            that.addBirthdate();
        });
    },

    addBirthdate: async function() {
        const $name = $('#name-input');
        const $date = $('#date-input');
        
        const db = getFirestore(this.firebase);

        await addDoc(collection(db, "families", this.user.uid, "birthdates"), {
            name: $name.val(),
            date: $date.val()
        });

        $name.val('');
        $date.val('');
    }

};

export default module;