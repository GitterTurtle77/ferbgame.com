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

const btn = document.getElementById("loginBtn");
btn.href = "https://www.ferbgame.com/account/login";
btn.textContent = "Login";

function checkFlag() {
  var user = auth.currentUser;
  if (user == null) {
    window.setTimeout(
      checkFlag,
      100
    ); /* this checks the flag every 100 milliseconds*/
  } else {
    const name = user.displayName;
    btn.href = "https://www.ferbgame.com/account";
    btn.textContent = name;
  }
}
checkFlag();
