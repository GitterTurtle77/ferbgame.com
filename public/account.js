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
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
var user = auth.currentUser;

setTimeout(function () {
  user = auth.currentUser;
  const btn = document.getElementById("loginBtn");
  if (user == null) {
    btn.href = "https://www.ferbgame.com/account/login";
    btn.textContent = "Login";
    location.href = "https://www.ferbgame.com/account/login";
  } else {
    const email = user.email;
    const name = user.displayName;
    
    btn.href = "https://www.ferbgame.com/account";
    btn.textContent = name;
    
    document.getElementById("email").innerHTML = email;
    document.getElementById("name").innerHTML = name;

    document
      .getElementById("logoutBtn")
      .addEventListener("click", logoutBtnClicked);
    function logoutBtnClicked() {
      auth.signOut();
      location.href = "https://www.ferbgame.com";
    }
    
  }
}, 1000);

function editName() {
  if (document.getElementById("name").isContentEditable) {
    document.getElementById("name").contentEditable = false;
    document.getElementById("name").style.border = '0px';
    document.getElementById("edit").innerHTML = '<span class="material-symbols-rounded"> edit </span>';
    
    user.updateProfile({
        displayName: document.getElementById("name").textContent,
      });
      database.ref().child("ChappUsers/" + user.email.split("@").at(0).replaceAll(".", "*")).set([document.getElementById("name").textContent, user.uid]);
    
    setTimeout(function () {
      location.reload()
    }, 500);
  } else {
    document.getElementById("name").contentEditable = true;
    document.getElementById("name").style.border = '2px solid white';
    document.getElementById("edit").innerHTML = '<span class="material-symbols-rounded"> done </span>';
  }
}   

function passreset() {
    auth.sendPasswordResetEmail(user.email)
    alert('Password reset email sent');
}