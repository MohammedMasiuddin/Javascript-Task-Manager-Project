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
let userTablePageHtml;
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
          console.log(res["user"]["email"]);

          const dbrefUser = firebase.ref(window._firebase.database, "/users");
          const recentPostsRef = firebase.query(dbrefUser, firebase.equalTo(res["user"]["email"]),firebase.orderByChild('email'))
          
          firebase.onValue(recentPostsRef, (snapshot) => {
            console.log(snapshot);  
            console.log(snapshot.val());  
            console.log('hu');
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();

              console.log(childData);
              
              if (childData['isAdmin']) {
                // switchPages(2)
                switchPages(4)
              }else{
                switchPages(4)
              }
            });
          });    

          // console.log(dbrefUser);
          // window._firebase.get(dataref).then((snapshot) => {
          //   if (snapshot.exists()) {}
        

          //   webapp.innerHTML = doc.getElementById("webappDas").innerHTML;
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
  // console.log(window._firebase.auth.currentUser);
  // console.log(window._firebase.auth);
  // console.log(user);
  if (!window._firebase.auth.currentUser) {
    switchPages(1);
  }
}

function TaskTablePage() {
  // console.log("task table page");
  let tasklist = document.getElementById("tasklist");
  let createTaskBtn = document.getElementById("createTask");

  createTaskBtn.onclick = function () {
    switchPages(3);
  };

  // checkuser();

  let dataref = firebase.ref(window._firebase.database, "/tasks");

  // console.log(dataref);
  window._firebase.get(dataref).then((snapshot) => {
    if (snapshot.exists()) {
      let data = snapshot.val();
      // console.log(data);
      let dataString = "";

      for (const element in data) {
        // console.log(element);

        let tr = document.createElement("tr");
        dataString = `
           <td> ${data[element].id}</td>
           <td>  ${data[element].name}</td>
           <td>  ${data[element].description}</td>
           <td>  ${new Date(data[element].startDate).toDateString()}</td>
           <td>  ${
             new Date(data[element].endDate).toDateString() != "Invalid Date"
               ? new Date(data[element].endDate).toDateString()
               : "N/a"
           }</td>
           <td>  ${data[element].hourlyRate}</td>
           <td>  ${data[element].totalHours}</td>
           <td>  ${data[element].status}</td>
           <td>  ${data[element].userAssign}</td>
           <td>  ${data[element].hourlyRate * data[element].totalHours}</td>
           `;

        tr.innerHTML = dataString;

        tasklist.appendChild(tr);
      }
    } else {
      console.log("No data available");
    }
  });
}

function CreateTaskTablePage() {
  let backbtn = document.getElementById("BacktotaskTable");
  let createTaskBtn = document.getElementById("createTaskBtn");
  let taskid = document.getElementById("taskid");
  let taskName = document.getElementById("taskName");
  let taskDes = document.getElementById("taskDescription");
  let startDate = document.getElementById("startDate");
  let endDate = document.getElementById("endDate");
  let hourlyRate = document.getElementById("hourlyRate");
  let userASsign = document.getElementById("userASsign");
  // let totalHoursWorked = document.getElementById("totalHoursWorked");

  function checkNumber(value) {
    if (
      isFinite(value) &&
      !isNaN(value) &&
      !(value == "") &&
      !(value == null)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkstring(value) {
    if (value != "" && typeof value == "string") {
      return true;
    } else {
      return false;
    }
  }

  function checkDate(value) {
    console.log(value);
    if (!isNaN(Date.parse(value))) {
      return true;
    } else {
      return false;
    }
  }

  function checkEmail(value) {
    var EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEX.test(value);
  }

  backbtn.onclick = function () {
    switchPages(2);
  };
  // let dataref = firebase.ref(window._firebase.database);
  // const newPostKey = window._firebase.push(
  //   window._firebase.child(dataref, "/tasks1")
  // ).key;

  // console.log(newPostKey);

  createTaskBtn.onclick = function () {
    console.log(
      checkNumber(taskid.value),
      checkNumber(hourlyRate.value),
      checkstring(taskName.value),
      checkstring(taskDes.value),
      checkEmail(userASsign.value)
    );
    if (
      checkDate(startDate.value) &&
      checkDate(endDate.value) &&
      checkNumber(taskid.value) &&
      checkNumber(hourlyRate.value) &&
      checkstring(taskName.value) &&
      checkstring(taskDes.value) &&
      checkEmail(userASsign.value)
    ) {
      console.log("value is good");
      let dataref = firebase.ref(window._firebase.database);
      const newPostKey = window._firebase.push(
        window._firebase.child(dataref, "/tasks")
      ).key;

      // console.log(key);

      const taskData = {
        id: taskid.value,
        name: taskName.value,
        description: taskDes.value,
        startDate: startDate.value,
        endDate: endDate.value,
        hourlyRate: hourlyRate.value,
        totalHours: 0,
        status: "In Progress",
        userAssign: userASsign.value,
      };

      console.log(taskData);

      const updates = {};
      updates["/tasks/" + newPostKey] = taskData;
      // updates["/user-posts/" + uid + "/" + newPostKey] = postData;

      window._firebase
        .update(firebase.ref(window._firebase.database), updates)
        .then((re) => {
          console.log("success");
          alert("successfully data has been uploaded ");
          switchPages(2);
        });
    } else {
      console.log("value is bad");
    }
  };
}

function switchPages(value) {
  switch (value) {
    case 1:
      webapp.innerHTML = loginPageHtml.getElementById("login").innerHTML;
      LoginPage();
      break;

    case 2:
      webapp.innerHTML =
        taskTablePageHtml.getElementById("tasktable").innerHTML;
      TaskTablePage();
      break;

    case 3:
      webapp.innerHTML =
        createTaskPageHtml.getElementById("createTask").innerHTML;
      CreateTaskTablePage();
      break;

    case 4:
      webapp.innerHTML =
        userTablePageHtml.getElementById("userTable").innerHTML;
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

  let usertableres = await fetch("usertable.module.html");
  let usertablehtmlresponse = await usertableres.text();

  let parser = new DOMParser();

  loginPageHtml = parser.parseFromString(Loginhtmlresponse, "text/html");
  createTaskPageHtml = parser.parseFromString(
    createtaskhtmlresponse,
    "text/html"
  );
  taskTablePageHtml = parser.parseFromString(
    taskTablehtmlresponse,
    "text/html"
  );
  userTablePageHtml = parser.parseFromString(
    usertablehtmlresponse,
    "text/html"
  );

  firebase = window._firebase;
  // webapp.innerHTML = loginPageHtml.getElementById("login").innerHTML;
  switchPages(1);

  console.log(loginPageHtml);
  console.log(createTaskPageHtml);
  console.log(taskTablePageHtml);
  console.log(userTablePageHtml);
}
