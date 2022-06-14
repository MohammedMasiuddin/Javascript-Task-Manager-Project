
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js'


// // Add Firebase products that you want to use
// import  {getAuth, signInWithEmailAndPassword}  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js'
// // import { firestore } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js'

// const firebaseConfig = {
//     // ...


//     apiKey: "AIzaSyDKBJpKaA6A9CnKaqt5f91O8rJalQooofg",
//     authDomain: "jstaskmanager.firebaseapp.com",
//     projectId: "jstaskmanager",
//     storageBucket: "jstaskmanager.appspot.com",
//     messagingSenderId: "103834274996",
//     appId: "1:103834274996:web:12771f2555b2386f7fdbe1"



// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

var firebase;

let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let loginBtn = document.getElementById("loginBtn");
let toggleswitch = document.getElementById("toggleswitch");
let div = document.getElementById("div");


loginBtn.onclick = function () { 
    console.log("clicked");
    console.log(firebase);
    window._firebase.signInWithEmailAndPassword(window._firebase.auth,emailInput.value,passwordInput.value)
    .then(
        res => {
            console.log(res);
            LoginUser()
        },
        err => console.log("wrong password and email")
    )   

 }


function LoginUser(params) {
    div.innerText = "login"
    let createTask = document.getElementById("div");
    createTask.onclick = function () { 
        
     }
}
