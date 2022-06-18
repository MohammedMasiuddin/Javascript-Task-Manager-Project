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
let loginPageHtml;
let createTaskPageHtml;
let taskTablePageHtml;
let userid;

let webapp = document.getElementById("webapp");

// fetch("login.module.html")
//   .then((response) => response.text())
//   .then((htmlresponse) => {
//     var parser = new DOMParser();
//     loginPageHtml = parser.parseFromString(htmlresponse, "text/html");
//     console.log(String(loginPageHtml));
//     webapp.innerHTML = loginPageHtml.getElementById("login").innerHTML;
//     LoginPage();
//   });


function LoginPage() {
  let emailInput = document.getElementById("emailInput");
  let passwordInput = document.getElementById("passwordInput");
  let loginBtn = document.getElementById("loginBtn");
  let toggleswitch = document.getElementById("toggleswitch");
  let p = document.getElementById("message");

  console.log(loginBtn);

  loginBtn.onclick = function () {
    console.log(firebase);
    window._firebase
      .signInWithEmailAndPassword(
        window._firebase.auth,
        emailInput.value,
        passwordInput.value
      )
      .then(
        (res) => {
          console.log(res);
          p.innerText = "";
          user = res;
        //   webapp.innerHTML = doc.getElementById("webappDas").innerHTML;
          switchPages(2)

        },
        (err) => {
          emailInput.style.border = "2px solid red";
          passwordInput.style.border = "2px solid red";
          console.log("wrong password and email");
          let p = document.getElementById("message");
          p.innerText = "Invalid Email or Password";
        }
      );
  };

  //   function LoginUser(params) {
  //     div.innerText = "login";
  //     let createTask = document.getElementById("div");
  //     createTask.onclick = function () {};
  //   }
}

function checkuser() {
    console.log(window._firebase.auth.currentUser);
    console.log(window._firebase.auth);
    // console.log(user);
    if (!window._firebase.auth.currentUser) {
        switchPages(1)
    }
}


function TaskTablePage() {
    console.log("task table page");
    let tasklist = document.getElementById("tasklist");
    // checkuser();
    fetch('https://jstaskmanager-default-rtdb.firebaseio.com/tasks.json')
    .then(res => res.json())
    .then( data => {
        console.log(data);
        let tr = document.createElement("tr")
        tr.innerHTML =  `
        <td> ${data[0].id}</td>
        <td>  ${data[0].name }</td>
        <td>  ${data[0].description }</td>
        <td>  ${data[0].startDate}</td>
        <td>  ${data[0].endDate }</td>
        <td>  ${data[0].hourlyRate }</td>
        <td>  ${data[0].totalHours }</td>
        <td>  ${data[0].status }</td>
        <td>  ${data[0].userAssign }</td>
        <td>  ${data[0].costofTask }</td>
        `
        tasklist.appendChild(
       tr
        )
        
    })

}

function switchPages(value) {
    switch (value) {
        case 1:
            webapp.innerHTML = loginPageHtml.getElementById("login").innerHTML;
            LoginPage();
            break;
    
        case 2:            
            webapp.innerHTML = taskTablePageHtml.getElementById("tasktable").innerHTML;
            TaskTablePage();
            break;
    
        case 3:
            webapp.innerHTML = createTaskPageHtml.getElementById("createTask").innerHTML;
            break;
    
        default:
            webapp.innerHTML = loginPageHtml.getElementById("login").innerHTML;
            break;
    }
}


getHtml();

async function getHtml() {
    let loginres = await fetch("login.module.html");
    let Loginhtmlresponse = await loginres.text();

    let createtaskres = await fetch("createTask.module.html");
    let createtaskhtmlresponse = await createtaskres.text();

    let tasktableres = await fetch("tasktable.module.html");
    let taskTablehtmlresponse = await tasktableres.text();

    let parser = new DOMParser();
    
    loginPageHtml = parser.parseFromString(Loginhtmlresponse, "text/html");
    createTaskPageHtml = parser.parseFromString(createtaskhtmlresponse, "text/html");
    taskTablePageHtml = parser.parseFromString(taskTablehtmlresponse, "text/html");

    // webapp.innerHTML = loginPageHtml.getElementById("login").innerHTML;
    switchPages(2)


    console.log(loginPageHtml);
    console.log(createTaskPageHtml);
    console.log(taskTablePageHtml);


}
