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
var data3;
var data4 = [];
var data5 = [];

var executed = false;

function addBtnClicked() {
  if (executed == false) {
    var user = auth.currentUser;

    if (document.getElementById("friendname").value != "") {
      var postsref = database.ref(
        "ChappiumUsers/" + document.getElementById("friendname").value
      );
      postsref.on("value", (snapshot) => {
        data = snapshot.val();
        if (data == null) {
          document.getElementById("error").innerText = "This user does not exist"
        } else {

        var postsref2 = database.ref(
          "ChappUsers/" + user.email.split("@").at(0).replaceAll(".", "*")
        );
        postsref2.on("value", (snapshot) => {
          data2 = snapshot.val();

          var postsref3 = database.ref("ChappiumUsers/" + data2[2]);
          postsref3.on("value", (snapshot) => {
            data3 = snapshot.val();

            var postsref4 = database.ref("ChappReceived/" + data3[1]);
            postsref4.on("value", (snapshot) => {
              data4 = snapshot.val();
              if (data4 == null) {
                data4 = [];
              }

              var postsref5 = database.ref("ChappSent/" + data[1]);
              postsref5.on("value", (snapshot) => {
                data5 = snapshot.val();
                if (data5 == null) {
                  data5 = [];
                }

                if (
                  !data5.includes(
                    data3[0] +
                      "--" +
                      data3[1] +
                      "->" +
                      data[1] +
                      "--" +
                      data3[2] +
                      "--" +
                      data3[3]
                  )
                ) {
                  
                  if (data[3] == undefined) {
                    data.splice(3,1)
                  }
                  data4.push(
                    data[0] + "--" + data3[1] + "->" + data[1] + "--" + data[2] + "--" + data[3]
                  );
                  
                  data5.push(
                    data3[0] +
                      "--" +
                      data3[1] +
                      "->" +
                      data[1] +
                      "--" +
                      data3[2] +
                      "--" +
                      data3[3]
                  );

                  database
                    .ref()
                    .child("ChappReceived/" + data[1])
                    .set(data5);
                }

                database
                  .ref()
                  .child("ChappSent/" + user.uid)
                  .set(data4);

                location.href = "/chappiumonline/home";
              });
            });
          });
        });
        }
      });
    }
    executed = true;
  }
}

document.getElementById("addfriend").addEventListener("click", addBtnClicked);

function openTab(tabName, tab) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var y = document.getElementsByClassName("tabbutton");
  for (i = 0; i < y.length; i++) {
    y[i].style.backgroundColor = "#111111";
  }
  document.getElementById(tabName).style.display = "block";
  tab.style.backgroundColor = "black";
  if (tabName == "ReceivedRequests") {
    var user = auth.currentUser;

    var postsref6 = database.ref("ChappReceived/" + user.uid);
    postsref6.on("value", (snapshot) => {
      var data6 = snapshot.val();

      let list = document.getElementById("received");
      let li = document.createElement("li");
      list.innerHTML = "";
      data6.forEach((item, index) => {
        li.className = "chatElement";
        li.innerHTML =
          '<img style="height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="' +
          item.split("--")[2] +
          '"/><p style="text-align: left; width: 100%;">' +
          item.split("--")[0] +
          '</p><div style="display: flex; justify-content: flex-end;"><button id="accept" onclick="acceptBtnClick(`' +
          item +
          '`)"><span class="material-icons">done</span></button><button id="decline" onclick="declineBtnClick(`'+ item +'`)"><span class="material-icons">close</span></button></div>';
        list.appendChild(li);
      });
      function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
      }

      var ul = document.getElementById("received");
      ul.onclick = function (event) {
        var target = getEventTarget(event);
      };
    });
  } else {
    var user = auth.currentUser;

    var postsref6 = database.ref("ChappSent/" + user.uid);
    postsref6.on("value", (snapshot) => {
      var data6 = snapshot.val();

      let list = document.getElementById("sent");
      let li = document.createElement("li");
      list.innerHTML = "";
      data6.forEach((item, index) => {
        li.innerHTML =
          '<img style="height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="' +
          item.split("--")[2] +
          '"/><p>' +
          item.split("--")[0] +
          "</p>";
        li.className = "chatElement";
        list.appendChild(li);
      });
      function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
      }

      var ul = document.getElementById("sent");
      ul.onclick = function (event) {
        var target = getEventTarget(event);
      };
    });
  }
}

function acceptBtnClick(data) {
  var user = auth.currentUser;
  var postsref6 = database.ref("ChappFriends/" + user.uid);
  postsref6.on("value", (snapshot) => {
    var data6 = snapshot.val();
    if (data6 == null || data6 == undefined) {
      data6 = [];
    }
    var postsref7 = database.ref("ChappReceived/" + user.uid);
    postsref7.on("value", (snapshot) => {
      var data7 = snapshot.val();

      if (!data6.includes(data)) {
        data6.push(data);

        data7.splice(data);

        database
          .ref()
          .child("ChappReceived/" + user.uid)
          .set(data7);
        database
          .ref()
          .child("ChappFriends/" + user.uid)
          .set(data6);
      }
    });
  });
  
  var postsref8 = database.ref(
    "ChappFriends/" + data.split("--")[1].split("->")[0]
  );
  postsref8.on("value", (snapshot) => {
    var data8 = snapshot.val();
    if (data8 == null || data8 == undefined) {
      data8 = [];
    }
    var postsref9 = database.ref(
      "ChappSent/" + data.split("--")[1].split("->")[0]
    );
    postsref9.on("value", (snapshot) => {
      var data9 = snapshot.val();
      console.log(data9)
      
      data9.forEach((item, index) => {
        if (item.includes(user.uid)) {
          data = item;
        }
      })
      
      if (!data8.includes(data)) {
        data8.push(data);

        data9.splice(data);
        console.log(data8);
        console.log(data9);

        database
          .ref()
          .child("ChappSent/" + data.split("--")[1].split("->")[0])
          .set(data9);
        database
          .ref()
          .child("ChappFriends/" + data.split("--")[1].split("->")[0])
          .set(data8);
        location.href = "/chappiumonline/home"
      }
    });
  });
}

function declineBtnClick(data) {
  var user = auth.currentUser;
  var postsref6 = database.ref("ChappFriends/" + user.uid);
  postsref6.on("value", (snapshot) => {
    var data6 = snapshot.val();
    if (data6 == null || data6 == undefined) {
      data6 = [];
    }
    var postsref7 = database.ref("ChappReceived/" + user.uid);
    postsref7.on("value", (snapshot) => {
      var data7 = snapshot.val();

      if (!data6.includes(data)) {
        data7.splice(data);

        database
          .ref()
          .child("ChappReceived/" + user.uid)
          .set(data7);
      }
    });
  });
  
  var postsref8 = database.ref(
    "ChappFriends/" + data.split("--")[1].split("->")[0]
  );
  postsref8.on("value", (snapshot) => {
    var data8 = snapshot.val();
    if (data8 == null || data8 == undefined) {
      data8 = [];
    }
    var postsref9 = database.ref(
      "ChappSent/" + data.split("--")[1].split("->")[0]
    );
    postsref9.on("value", (snapshot) => {
      var data9 = snapshot.val();
      console.log(data9)
      
      data9.forEach((item, index) => {
        if (item.includes(user.uid)) {
          data = item;
        }
      })
      
      if (!data8.includes(data)) {
        data9.splice(data);

        database
          .ref()
          .child("ChappSent/" + data.split("--")[1].split("->")[0])
          .set(data9);
        location.href = "/chappiumonline/home"
      }
    });
  });
}

