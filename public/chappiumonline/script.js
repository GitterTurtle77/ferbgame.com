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

var run = false;

var isIos;
if (
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i)
) {
  if ("standalone" in window.navigator && window.navigator.standalone) {
    isIos = false;
  } else {
    isIos = true
  }
} else {
  isIos = false;
}

var isAndroid = false;

if (isIos) {
    document.getElementById("iOS").style.display = "block";
} else if (isAndroid) {
    document.getElementById("Android").style.display = "block";
}
onAuthStateChanged(auth, (user) => {
      if (user) {
        location.href = "/chappiumonline/home";
      } else {
        document.getElementById("Account").style.display = "block";
      }
}