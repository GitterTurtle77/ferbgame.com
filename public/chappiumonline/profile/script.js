// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBfeywEPS4TMjovDiADBTg1alVUMsdzPTI",
    authDomain: "sclauncher-6c284.firebaseapp.com",
    databaseURL: "https://sclauncher-6c284-default-rtdb.firebaseio.com",
    projectId: "sclauncher-6c284",
    storageBucket: "sclauncher-6c284.appspot.com",
    messagingSenderId: "794326267495",
    appId: "1:794326267495:web:f2e628326b0d30215686c2",
    measurementId: "G-CG0S6KTREB",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  var storage = firebase.storage();
  
  var data;
  var data2;
  
  const urlParams = new URLSearchParams(window.location.search);
  var uid = urlParams.get("uid");;
  
  var imageUrl;
  
  var run = false;
  
      
      var postsref2 = database.ref(
        "ChappUsers/" + uid
      );
      postsref2.on("value", (snapshot) => {
        data2 = snapshot.val();
  
      var postsref = database.ref(
        "ChappiumUsers/" + data2[2]
      );
      postsref.on("value", (snapshot) => {
        data = snapshot.val();
        document.getElementById("profileicon").src = data2[3]
        document.getElementById("displayname").innerText = data2[0]
        document.getElementById("username").innerText = data2[2]
        })
      });