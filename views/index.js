firebase.auth.Auth.Persistence.LOCAL;


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        window.location.href="";
    }
})



function login(){
    
    var userEmail=document.getElementById("username_login").value;
    var userPassword=document.getElementById("password_login").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
       if(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : "+ errorMessage);

       }
       else{
        window.alert("Logged in : ");
       }
        // ...
      });
      
}
function logout(){
    firebase.auth.signOut().then(function(){
        window.alert("Loged Out ");

    }).catch(function(error){
        window.alert("Error logging out");

    });
}