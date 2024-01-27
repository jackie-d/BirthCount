import { getFirestore, collection, query, getDocs, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";


const module = {

	firebase: null,
    user: null,
	
	init: function(firebase, user) {
		console.log(firebase);

		this.firebase = firebase;
        this.user = user;

        if ( !user ) {
            location.href = './home';
            return;
        }

		const that = this;

        this.loadData();

	},

    loadData: async function() {
        const db = getFirestore(this.firebase);
        const coll = collection(db, "families", this.user.uid, "birthdates");
        const querySnapshot = await getDocs(coll);

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          $('<li>').text(doc.data().date + ' - ' + doc.data().name).appendTo('#bday-list ul');
        });

        const snapshot = await getCountFromServer(coll);
        $('#people-count-container span').text(snapshot.data().count);
    }

};

export default module;