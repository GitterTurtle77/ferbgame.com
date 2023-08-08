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
  var data7;
  var data8 = [];
  var data11 = {};
  var OSid;
  var el;
  
  var datashown = [];
  var datahidden = [];
  var dataimage = [];
  var dataid = [];
  var datauid = [];
  var datasort = {}
  var keys
  
  var run = false;
  
  function loadDoc(site) {
      document.getElementById("iFrame").src = site;
      localStorage.setItem("open", site)
  }
  
  if (localStorage.getItem("open") != null) {
    document.getElementById("iFrame").src = localStorage.getItem("open")
  }
  
  auth.onAuthStateChanged((user) => {
    OneSignal.getUserId(function (userId) {
      OSid = userId;
    });
  
    var postsref8 = database.ref("ChappUsers/" + user.uid);
    postsref8.on("value", (snapshot) => {
      data8 = snapshot.val();
      if (data8 == null || data8 == undefined) {
        var postsref10 = database.ref("ChappUsers/" + user.email.split("@").at(0).replaceAll(".", "*"));
        postsref10.on("value", (snapshot) => {
          data8 = snapshot.val();
          database.ref().child("ChappUsers/" + user.uid).set(data8)
        });
      }
  
      document.getElementById("profileicon").src = data8[3];
  
      if (data8.length > 2) {
        var postsref7 = database.ref("ChappiumUsers/" + data8[2]);
        postsref7.on("value", (snapshot) => {
          data7 = snapshot.val();
          if (data7.length == 4 && !data7.includes(OSid)) {
            data7.splice(3, 1);
            data7.push(OSid);
            database
              .ref()
              .child("ChappiumUsers/" + data8[2])
              .set(data7);
          } else if (!data7.includes(OSid)) {
            data7.push(OSid);
            database
              .ref()
              .child("ChappiumUsers/" + data8[2])
              .set(data7);
          }
        });
        data = []
        var postsref = database.ref("ChappFriends/" + user.uid);
        postsref.on("value", (snapshot) => {
          data = snapshot.val();
           //update()
          var postsref11 = database.ref(
                "status/Chats/"
              );
          postsref11.on("value", (snapshot) => {
          data11 = snapshot.val();
            if (data11 == null || data11 == undefined) {
              data11 = {}
            }
          update()
              })
            });
          function update() {
            document.getElementById("list").innerHTML = "";
            datashown = [];
            datahidden = [];
            dataid = [];
            dataimage = [];
            datauid = [];
            datasort = {}
            if (data != undefined && data.length != 0) {
              if (data11 != undefined && data11 != null) {
                console.log("data", data11)
            data.forEach((item) => {
              
                datasort[item] = data11[item.split("--").at(0)].last_changed
                });
              // Get an array of the keys:
                keys = Object.keys(datasort);
  
                // Then sort by using the keys to lookup the values in the original object:
                keys.sort((a, b) => datasort[b] - datasort[a]);
              keys.forEach((element) => {
                var postsref9 = database.ref(
                "ChappUsers/" + element.split("--").at(1)
              );
              var data9;
              postsref9.on("value", (snapshot) => {
                data9 = snapshot.val();
                datashown.push(data9[0]);
              datahidden.push(element.split("--").at(0));
              dataimage.push(data9[3]);
              datauid.push(data9[1]);
                complete()
              });
            });
              function complete() {
            let list = document.getElementById("list");
            let enable = true;
            list.innerHTML = "";
            keys.forEach((item, index) => {
              let li = document.createElement("li");
              console.log("d11", data11[datahidden[index]])
              if (data11[datahidden[index]][user.uid] != undefined && data11[datahidden[index]][user.uid] != null) {
                console.log(datashown[index])
                li.innerHTML =
                '<div onclick="loadDoc(`/chappiumonline/chat/?chat=' +
                datahidden[index] +
                "&name=" +
                datashown[index] +
                "&uid=" +
                datauid[index] +
                '`);" style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start;"><img style="pointer-events: none; height: 60px; width: 60px; object-fit: cover; margin-right: 15px; border-radius: 15px;" src="' +
                dataimage[index] +
                '"/><p style="user-select: none;">' +
                datashown[index] +
                '</p></div><p style="font-size: 15px; color: #888888; white-space: nowrap;">'+
                data11[datahidden[index]][user.uid].status +
                '</p><button class="material-icons" onclick="showMenu(this.parentElement)">more_vert</button>';
              } else {
                li.innerHTML =
                '<div onclick="loadDoc(`/chappiumonline/chat/?chat=' +
                datahidden[index] +
                "&name=" +
                datashown[index] +
                "&uid=" +
                datauid[index] +
                '`);" style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start;"><img style="pointer-events: none; height: 60px; width: 60px; object-fit: cover; margin-right: 15px; border-radius: 15px;" src="' +
                dataimage[index] +
                '"/><p style="user-select: none;">' +
                datashown[index] +
                '</p></div><p style="font-size: 15px; color: #888888; white-space: nowrap;"></p><button class="material-icons" onclick="showMenu(this.parentElement)">more_vert</button>';
              }
              li.setAttribute("data-id", list.children.length);
              li.className = "chatElement";
              list.appendChild(li);
          })
              }
          } else {
            let list = document.getElementById("list");
            list.innerHTML = "";
            list.innerHTML = `<li class="chatElement">There's no one here! Get started by adding friends.</li>`;
          }
            }
          }
        var data4;
        var postsref4 = database.ref("ChappReceived/" + data8[1]);
        postsref4.on("value", (snapshot) => {
          data4 = snapshot.val();
          if (data4 == null) {
            data4 = [];
          }
          if (data4.length != 0) {
            document.getElementById("notificationCount").style.display = "inline";
          } else {
            document.getElementById("notificationCount").style.display = "none";
          }
        });
      } else {
        location.href = "/chappiumonline/createprofile/";
      }
    });
  });
  
  function clickInsideElement(e, className) {
    el = e.srcElement || e.target;
  
    if (el.classList.contains(className)) {
      return el;
    } else {
      while ((el = el.parentNode)) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }
  
    return false;
  }
  
  var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";
  
  var taskItemClassName = "chatElement";
  var taskItemInContext;
  
  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;
  
  var menu = document.querySelector("#context-menu");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;
  
  var windowWidth;
  var windowHeight;
  
  document.addEventListener("contextmenu", function (e) {
    taskItemInContext = clickInsideElement(e, taskItemClassName);
    if (taskItemInContext) {
      e.preventDefault();
      showMenu(taskItemInContext);
    }
  });
  
  function showMenu(taskItem) {
    if (taskItem) {
      taskItemInContext = taskItem;
      el = taskItem;
      menu.style.display = "flex";
      document.getElementById("bg").style.display = "flex";
      document.getElementById("item-container").innerHTML =
        taskItem.firstChild.innerHTML;
    } else {
      taskItemInContext = null;
      //  toggleMenuOff();
    }
  }
  
  function removeFriend() {
    console.log(el)
    taskItemInContext = el;
    var id = taskItemInContext.getAttribute("data-id");
    var user = auth.currentUser;
    var postsref = database.ref(
      "ChappFriends/" + keys[id].split("--")[1]
    );
    var data;
    postsref.get().then((snapshot) => {
      data = snapshot.val();
      console.log(data)
      if (
        data.findIndex((element) => element.includes(keys[id].split("--")[1])) != -1
      ) {
        data.splice(
          data.findIndex((element) => element.includes(keys[id].split("--")[1])),
          1
        );
        console.log(keys[id].split("--")[1])
        console.log("ChappFriends/" + keys[id].split("--")[1])
        database
          .ref(
            "ChappFriends/" +
              keys[id].split("--")[1]
          )
          .set(data).then(() => {
        
    var postsref2 = database.ref("ChappFriends/" + user.uid);
    var data2;
    postsref2.get().then((snapshot) => {
      data2 = snapshot.val();
      console.log(keys[id])
      if (
        data2.findIndex((element) => element.includes(keys[id])) != -1
      ) {
        data2.splice(
          data2.findIndex((element) => element.includes(keys[id])),
          1
        );
        console.log(data2)
        database
          .ref()
          .child("ChappFriends/" + user.uid)
          .set(data2);
      }
    });
          })
        }
    });
  }
  
  function viewProfile() {
    taskItemInContext = el;
    var id = taskItemInContext.getAttribute("data-id");
    location.href = "/chappiumonline/profile?uid=" + keys[id].split("--")[1]
  }
  
  function block() {
    taskItemInContext = el;
    var id = taskItemInContext.getAttribute("data-id");
    database.ref().child("ChappBlocked/" + auth.currentUser.uid).get().then((snapshot) => {
      var data12 = snapshot.val()
      if (data12 == null) {
        data12 = []
      }
      data12.push(keys[id].split("--")[1])
      database.ref().child("ChappBlocked/" + auth.currentUser.uid).set(data12).then(() => {
        removeFriend()
      })
    })
  }
  
  function hideMenu() {
    menu.style.display = "none";
    document.getElementById("bg").style.display = "none";
  }
  