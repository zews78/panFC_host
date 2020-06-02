const express = require('express');
const app = express();
var firebase = require('firebase');
var admin = require("firebase-admin");
const bodyParser = require("body-parser");
const { uuid } = require('uuidv4');
// import {v4 as uuidv4} from 'uuid';

//need to parse HTTP request body
app.use(bodyParser.json());

// const db = admin.database();

var serviceAccount = require("./config/fbServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://walkthrough-968e7.firebaseio.com"
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB05uvl4J9YRH7AP-AL4QkZrXBjpOGeiM0",
  authDomain: "walkthrough-968e7.firebaseapp.com",
  databaseURL: "https://walkthrough-968e7.firebaseio.com",
  projectId: "walkthrough-968e7",
  storageBucket: "walkthrough-968e7.appspot.com",
  messagingSenderId: "1007004101770",
  appId: "1:1007004101770:web:c3f7a4e08f3c8b72931173"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name);

// const mysql= require('mysql');
// app.get('/', (req,res)=>{
//     res.render('hello.ejs');
// });

// firebase.auth.Auth.Persistence.LOCAL;

// firebase.auth().onAuthStateChanged(function(user){
//     if(user){
//         window.location.href="";
//     }
// })



app.use(express.static('public'));
// to recognise incoming request object as array/string
app.use(express.urlencoded({ extended: false }));


// const connection= mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'hoster'
// });




// connection.connect(function(err){
//     if(err) throw err;
//     console.log('connected!');

// });

// function login() {

//   var userEmail = document.getElementById("username_login").value;
//   var userPassword = document.getElementById("password_login").value;

//   firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
//     // Handle Errors here.
//     if (error) {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       window.alert("Error : " + errorMessage);

//     }
//     else {
//       window.alert("Logged in : ");
//     }
//     // ...
//   });

// }

// function checkAuth(req, res, next) {
//     if (req.headers.authtoken) {
//       admin.auth().verifyIdToken(req.headers.authtoken)
//         .then(() => {
//           next()
//         }).catch(() => {
//           res.status(403).send('Unauthorized')
//         });
//     } else {
//       res.status(403).send('Unauthorized')
//     }
//   }

//   app.use('/', checkAuth)




function logout() {
  firebase.auth.signOut().then(function () {
    window.alert("Loged Out ");

  }).catch(function (error) {
    window.alert("Error logging out");

  });
}

// const db = firebase.database();

app.get('/', (req, res) => {
  //display this page
  res.render('signup.ejs');
  //Insert key,value pair to database
  // firebase.database().ref('/admin').set({testUser: 'working1'});
  
  console.log("working");
  // console.log(uuid());
});

function signup(){
  // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });
  console.log("clicked");
}




// app.post('/main',(req, res)=>{
//     var name = req.body.Name;
//     var fname = req.body.Fname;
//     var email = req.body.Email;
//     var phone = req.body.Phone;
//     var address = req.body.Address;
//     var district = req.body.District;
//     var pincode = req.body.Pincode;
//     var postOffice = req.body.PostOffice;
//     var state = req.body.State;
//     var aadharNumber = req.body.AadharNumber;
//     var UID = uuid();
//     var referencePath = '/requests/'+  +'/';
//     var userReference = firebase.database().ref(referencePath);
//     var userData = { Uid:UID, Name:name,Father_Name:fname,Email:email, Phone_no:phone, Address:address, District:district, Pincode:pincode, Post_Office:postOffice, State:state, Aadhar_Number:aadharNumber}
//     // userDatas = [userData];
//     userReference.update(userData);
//     //display this page
//     console.log(userData);
//     // console.log(userDatas.Uid);
//     res.render('main.ejs',{userData});
// });


app.get('/userInfo', (req, res) => {
  //display this page
  var userReference = firebase.database().ref("/requests/");
  userReference.on("value",
    function (snapshot) {
      var data = snapshot.val();
      // console.log(data ,"data");
      // res.json(data);
      var userArr = [];
      snapshot.forEach((childSnapshot)=>{
        var key =childSnapshot.key;
        var childData = childSnapshot.val();
        // console.log(key);
        // console.log(childData, "child data");
        // var i = 0;
        childSnapshot.forEach((innerChild)=>{
          var finalKey = innerChild.key;
          var finalValue = innerChild.val();
          userArr.push(finalValue);
          // var convertToJSON = 
          // console.log("hooooooola",finalValue);
          // console.log(finalKey);
          // i++;
        })
        userReference.off("value");
      })
      console.log(userArr[0]);
      res.render('userInfo.ejs',{userArr});
    });
});

app.get('/userForm', (req, res) => {
  //display this page
  res.render('userForm.ejs');
});

// app.get('/index', (req,res)=>{
//     connection.query('SELECT * FROM Travel_List',
//     (error, results)=>{
//         // console.log(results);
//         res.render('index.ejs',{item:results});
//         }
//     );
// });






app.listen(3001);