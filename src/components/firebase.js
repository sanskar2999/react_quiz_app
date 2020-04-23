import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyDpKtHKmbF-Ctvyno1OtpoJJOktnrCx8g4",
  authDomain: "quiz-945b0.firebaseapp.com",
  databaseURL: "https://quiz-945b0.firebaseio.com",
  projectId: "quiz-945b0",
  storageBucket: "quiz-945b0.appspot.com",
  messagingSenderId: "382182315303",
  appId: "1:382182315303:web:26ac40cd7007fa2869c502",
  measurementId: "G-SR2VWYCS29"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
		this.email1;
	}

	login(email, password) {
		this.email1=email;
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		this.email1=email;
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}
    getemail(){
		return this.email1
	}
	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()