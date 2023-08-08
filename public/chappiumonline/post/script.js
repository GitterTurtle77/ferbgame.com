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
const storage = firebase.storage();

var data;

(function () {
      var width = 1000; // We will scale the photo width to this
      var height = 0; // This will be computed based on the input stream

      var streaming = false;

      var video = null;
      var canvas = null;
      var photo = null;
      var startbutton = null;
  
      var facing = "user";

      function startup() {
        video = document.getElementById("video");
        canvas = document.getElementById("canvas");
        photo = document.getElementById("photo");
        startbutton = document.getElementById("startbutton");

        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then(function (stream) {
            video.srcObject = stream;
            video.play();
          })
          .catch(function (err) {
            console.log("An error occurred: " + err);
          });

        video.addEventListener(
          "canplay",
          function (ev) {
            if (!streaming) {
              height = video.videoHeight / (video.videoWidth / width);

              if (isNaN(height)) {
                height = width / (4 / 3);
              }

              video.setAttribute("width", width);
              video.setAttribute("height", height);
              canvas.setAttribute("width", width);
              canvas.setAttribute("height", height);
              streaming = true;
            }
          },
          false
        );

        startbutton.addEventListener(
          "click",
          function (ev) {
            takepicture();
            ev.preventDefault();
          },
          false
        );

        clearphoto();
      }

      function clearphoto() {
        var context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        data = canvas.toDataURL("image/png")
      
        photo.setAttribute("src", data);
      }

      function takepicture() {
        var context = canvas.getContext("2d");
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.setTransform(-1,0,0,1,canvas.width,0);
          context.drawImage(video, 0, 0, width, height);

          var data = canvas.toDataURL("image/png");
          photo.setAttribute("src", data);
          video.style.display = "none";
          photo.style.display = "block";
          document.getElementById("topnav").style.visibility = "visible";
        } else {
          clearphoto();
        }
      }
  
  function handleVideo(cameraFacing) {
  const constraints = {
    video: {
      facingMode: {
        exact: cameraFacing
      }
    }
  }
  return constraints
};

function turnVideo(constraints) {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      var context = canvas.getContext("2d");
      video.srcObject = stream
      video.play()
      video.onloadeddata = () => {
        context.height = video.videoHeight
      }
    })

}

document.querySelector("#rotate").addEventListener("click", () => {
  if (facing == "user") {
    turnVideo(handleVideo("environment"));
    facing = "environment"
    video.style.webkitTransform = "scaleX(1)"
    video.style.transform = "scaleX(1)"
  } else {
    turnVideo(handleVideo("user"));
    facing = "user"
    video.style.webkitTransform = "scaleX(-1)"
    video.style.transform = "scaleX(-1)"
  }
})

      window.addEventListener("load", startup, false);
    })();

function send() {
  document.getElementById("bg").style.display = "flex"
  const ref = storage.ref();
  const file = document.getElementById("photo").src
  const name = Math.random() + ".png";
  const metadata = {
    contentType: file.type,
  };

  const task = ref.child(name).putString(file, 'data_url')
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      var data2 = [];
      database
        .ref()
        .child("ChappPosts/" + auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          data2 = snapshot.val();
        if (data2 == null) {
          data2 = []
        }
        data2.push([url, firebase.database.ServerValue.TIMESTAMP])
        database.ref().child("ChappPosts/" + auth.currentUser.uid).set(data2);
        document.getElementById("bg").style.display = "none"
        document.getElementById("video").style.display = "block";
        document.getElementById("photo").style.display = "none";
        document.getElementById("topnav").style.visibility = "hidden";
        });
 
    });
}

function cancel() {
  document.getElementById("video").style.display = "block";
  document.getElementById("photo").style.display = "none";
  document.getElementById("topnav").style.visibility = "hidden";
}