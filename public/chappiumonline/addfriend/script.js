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
var db = firebase.database

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
        var data11;        
        var postsref11 = database.ref("ChappBlocked/" + data[1]);
                postsref11.on("value", (snapshot) => {
                  data11 = snapshot.val();
                  if (data11 == null) {
                    data11 = []
                  }
        if (data11.includes(user.uid)) {
          document.getElementById("error").innerText =
            "BLOCKED"
        } else {
                  
        if (data == null) {
          document.getElementById("error").innerText =
            "This user does not exist";
        } else {
          var postsref2 = database.ref("ChappUsers/" + user.uid);
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
                    !data5.includes(data3[1] + "->" + data[1] + "--" + data3[1])
                  ) {
                    data4.push(data3[1] + "->" + data[1] + "--" + data[1]);

                    data5.push(data3[1] + "->" + data[1] + "--" + data3[1]);

                    database
                      .ref()
                      .child("ChappReceived/" + data[1])
                      .set(data5);
                  }

                  database
                    .ref()
                    .child("ChappSent/" + user.uid)
                    .set(data4);

                  var options = {
                    method: "POST",
                    headers: {
                      accept: "application/json",
                      Authorization:
                        "Basic ZDZmN2UyNTEtOTU2Ni00ZmY0LWFmNjMtZWY4ZDA4NWFkZmFk",
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      app_id: "62886539-65fb-497a-9377-a74d6316df99",
                      include_player_ids: [data[3]],
                      contents: {
                        en: user.displayName + " wants to be your friend",
                      },
                      headings: { en: "Friend Request" },
                      name: "message",
                    }),
                  };
                  console.log(options);
                  console.log("hello world");
                  setTimeout(function () {
                    fetch("https://onesignal.com/api/v1/notifications", options)
                      .then((response) => response.json())
                      .then((response) => console.log(response))
                      .catch((err) => console.error(err));
                    location.href = "/chappiumonline/home";
                  }, 200);
                });
              });
            });
          });
        }
        }
        })
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
}

function acceptBtnClick(data) {
  var otherUID = data.split("--")[1];
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

        data7.splice(data, 1);

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

  var postsref8 = database.ref("ChappFriends/" + otherUID);
  console.log(otherUID);
  postsref8.on("value", (snapshot) => {
    var data8 = snapshot.val();
    if (data8 == null || data8 == undefined) {
      data8 = [];
    }
    var postsref9 = database.ref("ChappSent/" + otherUID);
    postsref9.on("value", (snapshot) => {
      var data9 = snapshot.val();
      console.log(data.split("--")[0])

      data9.forEach((item, index) => {
        if (item.includes(user.uid)) {
          data = item;
        }
      });
      console.log(data, data8);

      if (!data8.includes(data)) {
        data8.push(data);

        data9.splice(data, 1);
        console.log(data9);
        console.log(data8);
        database
          .ref()
          .child("status/Chats/" + data.split("--")[0])
          .set({last_changed: [db.ServerValue.TIMESTAMP]});

        database
          .ref()
          .child("ChappSent/" + otherUID)
          .set(data9);
        database
          .ref()
          .child("ChappFriends/" + otherUID)
          .set(data8);
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
      console.log(data9);

      data9.forEach((item, index) => {
        if (item.includes(user.uid)) {
          data = item;
        }
      });

      if (!data8.includes(data)) {
        data9.splice(data);

        database
          .ref()
          .child("ChappSent/" + data.split("--")[1].split("->")[0])
          .set(data9);
        location.href = "/chappiumonline/home";
      }
    });
  });
}

auth.onAuthStateChanged((user) => {
  var user = auth.currentUser;

  var postsref6 = database.ref("ChappReceived/" + user.uid);
  postsref6.on("value", (snapshot) => {
    var data6 = snapshot.val();

    let list = document.getElementById("received");
    let li = document.createElement("div");
    list.innerHTML = "";
    data6.forEach((item, index) => {
      var postsref10 = database.ref("ChappUsers/" + item.split("--")[1])
      var data10;
      postsref10.on("value", (snapshot) => {
        data10 = snapshot.val();
        console.log(data10)
      li.className = "listElement";
      li.innerHTML =
        '<div style="float: left; display: flex; flex-direction: row;"><img style="float: left; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="' +
        data10[3] +
        '"/><p style="text-align: left; width: 100%; font-size: 20px;">' +
        data10[0] +
        '</p></div><div style="display: flex; float: right;"><button id="accept" onclick="acceptBtnClick(`' +
        item +
        '`)"><span class="material-icons">done</span></button><button id="decline" onclick="declineBtnClick(`' +
        item +
        '`)"><span class="material-icons">close</span></button></div>';
      list.appendChild(li);
    });
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

  var user = auth.currentUser;

  var postsref6 = database.ref("ChappSent/" + user.uid);
  postsref6.on("value", (snapshot) => {
    var data6 = snapshot.val();

    let list = document.getElementById("sent");
    let li = document.createElement("div");
    list.innerHTML = "";
    data6.forEach((item, index) => {
      var postsref10 = database.ref("ChappUsers/" + item.split("--")[1])
      var data10;
      postsref10.on("value", (snapshot) => {
        data10 = snapshot.val();
        console.log(data10)
      li.className = "chatElement";
      li.innerHTML =
        '<div style="float: left; display: flex; flex-direction: row;"><img style="float: left; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="' +
        data10[3] +
        '"/><p style="text-align: left; width: 100%; font-size: 20px;">' +
        data10[0] +
        '</p></div>';
      list.appendChild(li);
    });
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
});
