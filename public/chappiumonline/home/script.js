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
var OSid;
var el;

var datashown = [];
var datahidden = [];
var dataimage = [];
var dataid = [];

var run = false;

function loadDoc(site) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", site);
  xhttp.send();
  xhttp.onload = function () {
    document.getElementById("chatdiv").innerHTML = this.responseText;

    document.getElementById("chatdiv").style.width = "100%";
    var collection = document
      .getElementById("content")
      .getElementsByTagName("button");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.border = "2px solid #111111";
    }
    window.setTimeout(function () {
      location.href = site;
    }, 150);
  };
}

auth.onAuthStateChanged((user) => {
  var user = auth.currentUser;
  OneSignal.getUserId(function (userId) {
  OSid = userId;
});

  var postsref8 = database.ref(
    "ChappUsers/" + user.email.split("@").at(0).replaceAll(".", "*")
  );
  postsref8.on("value", (snapshot) => {
    data8 = snapshot.val();

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
    })

      var postsref = database.ref("ChappFriends/" + user.uid);
      postsref.on("value", (snapshot) => {
        if (data != postsref) {
          document.getElementById("list").innerHTML = "";
        }
        const data = snapshot.val();
        if (data != undefined && data.length != 0) {
          data.forEach((element) => {
            datashown.push(element.split("--").at(0));
            datahidden.push(element.split("--").at(1));
            dataid.push(element.split("--").at(3));
            dataimage.push(element.split("--").at(2));
          });

          let list = document.getElementById("list");
          let enable = true;
          list.innerHTML =
            '<li data-id="0" class="chatElement" onclick="loadDoc(`/chappiumonline/ai`)"><img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="https://cdn.glitch.global/622588a2-0031-4722-9f72-13355587a9a2/AI.png?v=1683918064900"/><p style="user-select: none;">Chappium AI</p></li>';
          datashown.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML =
              '<div onclick="loadDoc(`/chappiumonline/chat/?chat=' + datahidden[index] + '&name='+datashown[index]+'&id='+dataid[index]+'`);" style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start;"><img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="' +
              dataimage[index] +
              '"/><p style="user-select: none;">' +
              item +
              '</p></div><button class="material-icons" onclick="showMenu(this.parentElement)">more_vert</button>';
            li.setAttribute("data-id", list.children.length)
            li.className = "chatElement";
            list.appendChild(li);
          });
        } else {
          let list = document.getElementById("list");
          list.innerHTML =
            '<li class="chatElement" data-id="0"><img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="https://cdn.glitch.global/622588a2-0031-4722-9f72-13355587a9a2/AI.png?v=1683918064900"/><p style="user-select: none;">Chappium AI</p></li>';
          list.innerHTML =
            `<li class="chatElement" data-id="0"><img style="pointer-events: none; height: 90px; width: 90px; object-fit: cover; margin-right: 20px; border-radius: 20px;" src="https://cdn.glitch.global/622588a2-0031-4722-9f72-13355587a9a2/AI.png?v=1683918064900"/><p style="user-select: none;">Chappium AI</p></li><li class="chatElement">There's no one here! Get started by adding friends.</li>`;
        }
      });
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
            })
      
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
        showMenu(taskItemInContext)
      }
    });

function showMenu(taskItem) {
      if (taskItem) {
        taskItemInContext = taskItem
        el = taskItem
        console.log(taskItemInContext)
        menu.style.display = "flex"
        document.getElementById("bg").style.display = "flex"
        document.getElementById("item-container").innerHTML = taskItem.firstChild.innerHTML
      } else {
        taskItemInContext = null;
        console.log("off")
      //  toggleMenuOff();
      }
}

function removeFriend() {
  taskItemInContext = el;
  console.log(el)
  var id = taskItemInContext.getAttribute("data-id")
  var user = auth.currentUser;
  var postsref = database.ref(
    "ChappFriends/" + datahidden[id - 1].replace(user.uid, "").replace("->", "")
  );
  var data;
  postsref.on("value", (snapshot) => {
    data = snapshot.val();
    console.log(data.findIndex(element => element.includes(datahidden[id - 1])) != -1)
    if (data.findIndex(element => element.includes(datahidden[id - 1])) != -1) {
      data.splice(data.findIndex(element => element.includes(datahidden[id - 1])), 1)
      database.ref("ChappFriends/" + datahidden[id - 1].replace(user.uid, "").replace("->", "")).set(data);
    }
    console.log(data)
  });
  var postsref2 = database.ref(
    "ChappFriends/" + user.uid
  );
  var data2;
  postsref2.on("value", (snapshot) => {
    data2 = snapshot.val();
    if (data2.findIndex(element => element.includes(datahidden[id - 1])) != -1) {
      data2.splice(data2.findIndex(element => element.includes(datahidden[id - 1])), 1)
      database.ref().child("ChappFriends/" + user.uid).set(data2);
    }
  });
}

function hideMenu() {
  menu.style.display = 'none';
  document.getElementById('bg').style.display = 'none';
}
