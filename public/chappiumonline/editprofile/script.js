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

var imageUrl;

var run = false;

function wait() {
  if (auth.currentUser == null) {
    window.setTimeout(wait, 500);
  } else {
    var user = auth.currentUser;
    
    var postsref2 = database.ref(
      "ChappUsers/" + user.email.split("@").at(0).replaceAll(".", "*")
    );
    postsref2.on("value", (snapshot) => {
      data2 = snapshot.val();

    var postsref = database.ref(
      "ChappiumUsers/" + data2[2]
    );
    postsref.on("value", (snapshot) => {
      data = snapshot.val();
    })
      
      document.getElementById("profileicon").src = data2[3]
      document.getElementById("displayname").innerText = data2[0]
      document.getElementById("username").innerText = data2[2]
    });
  }
}
wait();

function editDisplayName() {
  document.getElementById("displayname").contentEditable = true;
  document.getElementById("displayname").focus();
}

function editUserName() {
  document.getElementById("username").contentEditable = true;
  document.getElementById("username").focus();
}

function displayNameDone(){
  document.getElementById("displayname").contentEditable = false;
}

function userNameDone() {
  document.getElementById("username").contentEditable = false;
}

function editProfilePic() {
  document.getElementById("imgupload").click();
}

function saveProfile() {
  
  var displayName = document.getElementById("displayname").innerText;
    data[0] = displayName
    data2[0] = displayName
    database.ref().child("ChappiumUsers/" + document.getElementById("username").innerText).set(data);
    database.ref().child("ChappUsers/" + auth.currentUser.email.split("@").at(0).replaceAll(".", "*")).set(data2);
  
  if (document.getElementById("imgupload").files.length != 0) {
    
    const ref = storage.ref();
    const file = document.getElementById("imgupload").files[0];
    const name = data2[2];
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      console.log(url)
      document.getElementById("profileicon").src = url;
      imageUrl = url
      
      data[2] = url
      database.ref().child("ChappiumUsers/" + data2[2]).set(data);
      data2[3] = url
      database.ref().child("ChappUsers/" + auth.currentUser.email.split("@").at(0).replaceAll(".", "*")).set(data2);
    })
  }
  
    var userName = document.getElementById("username").innerText;
    document.getElementById("username").contentEditable = false;
    var prev = data2[2];
    data2[2] = userName
    database.ref().child("ChappiumUsers/" + userName).set(data);
    database.ref().child("ChappUsers/" + auth.currentUser.email.split("@").at(0).replaceAll(".", "*")).set(data2);
  
  let chatRef = database.ref("/ChappiumUsers/"+ prev);
  chatRef.remove();
  
  location.href = "/chappiumonline/home";
}