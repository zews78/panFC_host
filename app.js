const express = require('express');
const app = express();
var firebase = require('firebase');
var admin = require("firebase-admin");
const bodyParser = require("body-parser");
const { uuid } = require('uuidv4');
// import {v4 as uuidv4} from 'uuid';

var PORT = process.env.PORT || 5000

//need to parse HTTP request body
app.use(bodyParser.json());

// const db = admin.database();



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



app.use(express.static('public'));
// to recognise incoming request object as array/string
app.use(express.urlencoded({ extended: false }));










// const db = firebase.database();




app.get('/', (req, res) => {
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
      var adminReference = firebase.database().ref("/admin/");
      adminReference.once("value",
      function (snapshot){
        dataValue=snapshot.val();
        console.log(dataValue.uid);
        res.render('userInfo.ejs', { userArr, dataValue });
      })
    });
});


  
app.listen(PORT, ()=>{
console.log(`listening on ${ PORT }`)
});
