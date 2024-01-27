import { getFirestore, collection, query, getDocs, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";


const module = {

	firebase: null,
    user: null,
	
	init: async function(firebase, user) {
		console.log(firebase);

		this.firebase = firebase;
        this.user = user;

        if ( !user ) {
            location.href = './home.html';
            return;
        }

		const that = this;

        await this.loadData();
        
        this.initFx();

	},

    loadData: async function() {
        const db = getFirestore(this.firebase);
        const coll = collection(db, "families", this.user.uid, "birthdates");
        const querySnapshot = await getDocs(coll);

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const $item = $('<li>');
          $('<span>').addClass('fa fa-cake px-2').appendTo($item);
          $('<span>').text(doc.data().name + ' @ ' + doc.data().date).appendTo($item);
          $('#bday-list ul li:last-child').before($item);
        });

        const snapshot = await getCountFromServer(coll);
        $('#people-count-container span').text(snapshot.data().count);
    },

    initFx: function() {
        $('#bday-list ul li:not(.sample)').on('mouseover', function() {
            $(this).addClass('highlight');
        });
        $('#bday-list ul li').on('mouseout', function() {
            $(this).removeClass('highlight');
        });
    }

};

export default module;