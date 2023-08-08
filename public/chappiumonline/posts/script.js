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

var data4

auth.onAuthStateChanged((user) => {
  var postsref = database.ref("ChappFriends/" + user.uid);
  postsref.on("value", (snapshot) => {
    data = snapshot.val();
    console.log(data)
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
            data4 = item2[2]
            if (data4 == null) {
              data4 = {likes: [], comments: []};
            }

            console.log(data4)
            post.innerHTML =
              '<div style="align-self: flex-start; width: 100%; display: flex; gap: 10px;"><img style=" width: 50px; height: 50px; object-fit: cover; border-radius: 15px; pointer-events: none; margin: 0; padding: 0;" src="' + data3[3] + '"><p class="title">' +
              data3[0] +
              `</p></div><div style="height: 100%;">`
              // </div><div class="postOpts"><button onclick="
              // like('` + 'ChappPosts/' + item + '/' + index2 + '/2' + `', this, this.lastChild)
              // " id="like ` + item  + " " + index2 + `"><span class="material-icons"> thumb_up </span><span class="notification-badge" id="notificationCount">1</span></button><button class="material-icons">comment</button><button class="material-icons">send</button></div>
            const button = post.lastChild.firstChild
            
            if (data4.likes.length != 0) {
              console.log(post.lastChild.firstChild.lastChild)
              post.lastChild.firstChild.lastChild.style.display = "inline"
            }
            if (data4.likes.includes(auth.currentUser.uid)) {
              button.style.color = "blue"
              console.log("includes")
            } else {
              button.style.color = "white"
              console.log("doesnt include")
            }
            post.setAttribute("data-id", list.children.length);
            post.style.backgroundImage = "url('" + item2[0] +"')"
            post.className = "post";
            list.appendChild(post);
          });
        });
      });
    });
  });
});

function like(item, button, post) {
  console.log(item)
  if (data4.likes.includes(auth.currentUser.uid)) {
    button.style.color = "white"
    data4.likes.splice(data4.likes.indexOf(auth.currentUser.uid), 1)
    if (data4.likes.length == 0) {
      post.style.display = "none"
    console.log(data4.likes.length)
  } else {
    post.style.display = "inline"
      console.log("else", data4.likes.length)
  }
  } else {
    data4.likes.push(auth.currentUser.uid)
    button.style.color = "blue"
  }
  database.ref().child(item).set(data4).then(() => {})
}