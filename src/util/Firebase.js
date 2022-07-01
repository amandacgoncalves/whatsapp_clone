import firebase from 'firebase'
//const firebase = require ('firebase');
require('firebase/firestore');

export class Firebase {

    constructor () {

        this._config = {
            apiKey: "AIzaSyAXEmal-ug5Bo4zN-nMiBljwxCmTIWtec4",       
            authDomain: "whatsapp-clone-d41d6.firebaseapp.com",        
            projectId: "whatsapp-clone-d41d6",        
            storageBucket: "gs://whatsapp-clone-d41d6.appspot.com",      
            messagingSenderId: "583583946958",
            appId: "1:583583946958:web:7016afe4a479c0b013189f",
            measurementId: "G-GD018CPVY9"
          };//this config

        this.init();

    };//this init

    init() {
        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config)
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            window._initializedFirebase = true;
        };
    };//init

    static db() {
        return firebase.firestore();
    };// static db

    static hd() {
        return firebase.storage();
    };//static hd 

    initAuth() {

        return new Promise((s,f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result =>{
                let token = result.credential.accessToken;
                let user = result.user;
                        s({
                            user,
                            token
                        });
            })
            .catch(err =>{
                f(err);
            });

        });//return

    };//init auth

};//export class