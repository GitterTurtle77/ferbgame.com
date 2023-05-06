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
var postsref = database.ref("ChappiumUsers");
    postsref.on("value", (snapshot) => {
      data = snapshot.val();
    });
var imageUrl;

function wait() {
  if (auth.currentUser == null) {
    window.setTimeout(wait, 500);
  } else {
    var postsref2 = database.ref("ChappUsers/" + auth.currentUser.email.split("@").at(0).replaceAll(".", "*"));
    postsref2.on("value", (snapshot) => {
      data2 = snapshot.val();
    });
  }
}
wait()



function clicked() {
if (document.getElementById("username").value == null || document.getElementById("username").value == "" && document.getElementById("upload").files[0] == undefined) {
  document.getElementById("error").innerText = "Please enter a username and upload a profile picture";
} else if (document.getElementById("username").value == null || document.getElementById("username").value == "" && document.getElementById("upload").files[0] != undefined) {
  document.getElementById("error").innerText = "Please enter a username";
} else if (document.getElementById("username").value != null && document.getElementById("username").value != "" && document.getElementById("upload").files[0] == undefined) {
  document.getElementById("error").innerText = "Please upload a profile picture";
} else {
  
    if (!data.hasOwnProperty(document.getElementById("username").value)) {
      if (document.getElementById("username").value.includes(".") || document.getElementById("username").value.includes("#") || document.getElementById("username").value.includes("$") || document.getElementById("username").value.includes("[") || document.getElementById("username").value.includes("]")) {
        document.getElementById("error").innerText = 'Usernames cannot contain ".", "#", "$", "[" or "]"';
      } else {
        const ref = storage.ref();
      const file = document.getElementById("upload").files[0];
      const name = document.getElementById("username").value;
      const metadata = {
         contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
      document.querySelector("#image").src = url;
      imageUrl = url
        
        database.ref().child("ChappiumUsers/" + document.getElementById("username").value).set([auth.currentUser.displayName, auth.currentUser.uid, url]);
        data2.push(document.getElementById("username").value, url)
        database.ref().child("ChappUsers/" + auth.currentUser.email.split("@").at(0).replaceAll(".", "*")).set(data2);
        location.href = "/chappiumonline/home"
        })
      }
        
    } else {
      document.getElementById("error").innerText = "Username already taken";
    };
}
}


