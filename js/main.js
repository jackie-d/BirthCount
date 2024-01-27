import firebase from './firebase-loader.js';


let user = null;


$(() => {init()});

async function init() {

	console.log('init');

	user = await initAuth();

	const pageId = $('body').attr("id");
	switch(pageId) {
		case 'dashboard':
			initDashboard();
			break;
		case 'add-birthdate':
			initBirthdate();
			break;
		case 'signup':
			initSignup();
			break;
		case 'login':
			initLogin();
			break;
		case 'profile':
			initProfile();
			break;
		case 'invite':
			initInvite();
			break;
		default:
			console.log('Init default case page id');
	}

}


function initAuth(){
	return import("./services/auth.js").then((authModule) => {
		authModule = authModule.default;
		return authModule.init(firebase).then((user) => {
			initLayoutOnAuth(user);
			return user;
		})
	});
}


let toastBootstrap;

function initSignup() {
	import("./pages/signup.js").then((signupModule) => {
		signupModule = signupModule.default;
		signupModule.init(firebase);
	});
}

function initLogin() {
	import("./pages/login.js").then((loginModule) => {
		loginModule = loginModule.default;
		loginModule.init(firebase, user);
	});
}

function initDashboard() {
	import("./pages/dashboard.js").then((dashboardModule) => {
		dashboardModule = dashboardModule.default;
		dashboardModule.init(firebase, user);
	});
}

function initBirthdate() {
	import("./pages/add-birthdate.js").then((dashboardModule) => {
		dashboardModule = dashboardModule.default;
		dashboardModule.init(firebase, user);
	});
}

function initProfile() {
	import("./pages/profile.js").then((profileModule) => {
		profileModule = profileModule.default;
		profileModule.init(firebase, user);
	});
}

function initInvite() {
	import("./pages/invite.js").then((inviteModule) => {
		inviteModule = inviteModule.default;
		inviteModule.init(firebase, user);
	});
}

function initLayoutOnAuth(user) {

	console.log(user);


	if ( user ) {
		$('#topbar-user').show();
	} else {
		$('#topbar-signup').show();
	}


}