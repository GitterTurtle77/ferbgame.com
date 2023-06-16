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

var data;
var data2;

auth.onAuthStateChanged((user) => {
  var postsref = database.ref("ChappFriends/" + user.uid);
  postsref.on("value", (snapshot) => {
    data = snapshot.val();
    data.forEach((item, index) => {
      data[index] = item.split("--")[1];
    });
    let list = document.getElementById("posts");
    list.innerHTML = "";
    data.forEach((item, index) => {
      var postsref2 = database.ref("ChappPosts/" + item);
      postsref2.on("value", (snapshot) => {
        data2 = snapshot.val();
        data2.forEach((item2, index2) => {
          var postsref3 = database.ref("ChappUsers/" + item);
          postsref3.on("value", (snapshot) => {
            var data3 = snapshot.val();
            let post = document.createElement("div");
            post.innerHTML =
              '<img style=" width: 50px; height: 50px; object-fit: cover; border-radius: 15px; pointer-events: none; margin: 0; padding: 0;" src="' + data3[3] + '"><p class="title">' +
              data3[0] +
              "</p></div>";
            post.setAttribute("data-id", list.children.length);
            post.className = "post";
            post.style.backgroundImage = "url(" + item2[0] + ")"
            list.appendChild(post);
          });
        });
      });
    });
  });
});
