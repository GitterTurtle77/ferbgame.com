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

var data7;
var data8;

var run = false;

function loadDoc(site) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", site);
  xhttp.send();
  xhttp.onload = function() {
    document.getElementById("chatdiv").innerHTML =
    this.responseText;
    
    document.getElementById("chatdiv").style.width = "100%";
    var collection = document.getElementById("content").getElementsByTagName("button");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.border = "2px solid #111111"
    }
    window.setTimeout(function() {
    location.href = site;
  }, 150)
  }
}

auth.onAuthStateChanged((user) => {
    var user = auth.currentUser;

    var postsref8 = database.ref(
      "ChappUsers/" + user.email.split("@").at(0).replaceAll(".", "*")
    );
    postsref8.on("value", (snapshot) => {
      data8 = snapshot.val();
      
      document.getElementById("profileicon").src = data8[3]

    if (data8.length > 2) {
      
var postsref7 = database.ref("ChappiumUsers/" + data8[2]);
    postsref7.on("value", (snapshot) => {
      data7 = snapshot.val();
    });
      
      var postsref = database.ref("ChappFriends/" + user.uid);
      postsref.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data != undefined && data.length != 0) {

        const datashown = [];
        const datahidden = [];
        const dataimage = [];
        data.forEach((element) => {
          datashown.push(element.split("--").at(0));
          datahidden.push(element.split("--").at(1));
          dataimage.push(element.split("--").at(2));
        });

        let list = document.getElementById("list");
          list.innerHTML = '<li onclick="loadDoc(`/chappiumonline/ai`)"><img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="https://cdn.glitch.global/622588a2-0031-4722-9f72-13355587a9a2/AI.png?v=1683918064900"/><p style="user-select: none;">Chappium AI</p></li>';
          datashown.forEach((item, index) => {
          let li = document.createElement("li");
          li.innerHTML = '<img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="' + dataimage[index] + '"/><p style="user-select: none;">' + item + '</p>'
          li.onclick = function() {loadDoc("/chappiumonline/chat/?chat=" + datahidden[index])}
          list.appendChild(li);
        });
        } else {
          let list = document.getElementById("list");
          list.innerHTML = '<li><img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="https://cdn.glitch.global/622588a2-0031-4722-9f72-13355587a9a2/AI.png?v=1683918064900"/><p style="user-select: none;">Chappium AI</p></li>';
          list.innerHTML = "<li>There's no one here! Get started by adding friends.</li>"
        }
      });
    } else {
      location.href = "/chappiumonline/createprofile/";
    }
    });
});
