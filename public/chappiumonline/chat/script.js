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

const urlParams = new URLSearchParams(window.location.search);
var chat = urlParams.get("chat");
var OSid;
var name = urlParams.get("name");
var uid = urlParams.get("uid");
document.getElementById("name").innerText = name;

var el;
var executed;
var images = {};

var run = true;
var options = {};

setTimeout(function () {
  function wait() {
    if (auth.currentUser == null) {
      window.setTimeout(function () {
        wait();
      }, 500);
    } else {
      var user = auth.currentUser;
      
      var postsref4 = database.ref("ChappUsers/" + uid);
      postsref4.on("value", (snapshot) => {
        var data4 = snapshot.val();
        if (data4 == null) {
          data4 = [];
        }
        var postsref5 = database.ref("ChappiumUsers/" + data4[2]);
      postsref5.on("value", (snapshot) => {
        var data5 = snapshot.val();
        if (data5 == null) {
          data5 = [];
        }
        console.log("ChappiumUsers/" + data4[2])
      })
      })
      

      var postsref = database.ref("Chapp/" + chat);
      postsref.on("value", (snapshot) => {
        var data = snapshot.val();
        if (data == null) {
          data = [];
        }
        data = data.reverse();

        var postsref3 = database.ref("status/" + uid);
        var data3;
        postsref3.on("value", (snapshot) => {
          data3 = snapshot.val();
          if (data3 == null) {
            console.log(null);
            data3 = {};
          }
          var array = Object.values(data3)
          if (array[1] == "offline") {
            var lastSeen = array[0]
            console.log(lastSeen)
          }
          document.getElementById("status").innerText =
            array[1].charAt(0).toUpperCase() + array[1].slice(1);
        });

        document.getElementById("list").innerHTML = "";

        let list = document.getElementById("list");
        console.log(data);
        data.forEach((item, index) => {
          if (item != "") {
            let li = document.createElement("div");
            if (item.split("-->").at(2) != user.uid) {
              if (item.split("-->").length == 5) {
                if (
                  Object.keys(JSON.parse(item.split("-->").at(4))[0])[0] ==
                  "video"
                ) {
                  li.innerHTML =
                    '<div data-id="' +
                    list.childNodes.length +
                    '" ontouchstart="down(this.lastChild)" ontouchend="up()" onmousedown="down(this.lastChild)" onmouseup="up()" class="messageleft"><div class="imagediv"><img src="' +
                    item.split("-->").at(3) +
                    '" style="height: 50px; width: 50px;" alt="Avatar"/></div><div class="message"><video controls style="width: 200px;" src="' +
                    JSON.parse(item.split("-->").at(4))[0].video +
                    '"/><span class="time-right">' +
                    "</span></div></div>";
                } else {
                  li.innerHTML =
                    '<div data-id="' +
                    list.childNodes.length +
                    '" ontouchstart="down(this.lastChild)" ontouchend="up()" onmousedown="down(this.lastChild)" onmouseup="up()" class="messageleft"><div class="imagediv"><img src="' +
                    item.split("-->").at(3) +
                    '" style="height: 50px; width: 50px;" alt="Avatar"/></div><div class="message"><img style="object-fit: contain; width: 200px; min-height: 200px;" src="' +
                    JSON.parse(item.split("-->").at(4))[0].image +
                    '"/><span class="time-right">' +
                    "</span></div></div>";
                }
              } else {
                li.innerHTML =
                  '<div data-id="' +
                  list.childNodes.length +
                  '" ontouchstart="down(this.lastChild)" ontouchend="up()" onmousedown="down(this.lastChild)" onmouseup="up()" class="messageleft"><div class="imagediv"><img src="' +
                  item.split("-->").at(3) +
                  '" style="height: 50px; width: 50px;" alt="Avatar"/></div><div class="message"><p>' +
                  item.split("-->").at(1) +
                  '<span class="time-right">' +
                  "</span></div></div>";
              }
            } else {
              if (item.split("-->").length == 5) {
                if (
                  Object.keys(JSON.parse(item.split("-->").at(4))[0])[0] ==
                  "video"
                ) {
                  li.innerHTML =
                    '<div data-id="' +
                    list.childNodes.length +
                    '" ontouchstart="down(this.firstChild)" ontouchend="up()" onmousedown="down(this.firstChild)" onmouseup="up()" class="messageright"><div class="message darker"><video controls style="width: 200px;" src="' +
                    JSON.parse(item.split("-->").at(4))[0].video +
                    '"/><span class="time-right">' +
                    '</span></div><div class="imagediv"><img style="height: 50px; width: 50px;" class="right" src="' +
                    item.split("-->").at(3) +
                    '" alt="Avatar"/></div></div>';
                } else {
                  li.innerHTML =
                    '<div data-id="' +
                    list.childNodes.length +
                    '" ontouchstart="down(this.firstChild)" ontouchend="up()" onmousedown="down(this.firstChild)" onmouseup="up()" class="messageright"><div class="message darker"><img style="object-fit: contain; width: 200px; min-height: 200px;" src="' +
                    JSON.parse(item.split("-->").at(4))[0].image +
                    '"/><span class="time-right">' +
                    '</span></div><div class="imagediv"><img style="height: 50px; width: 50px;" class="right" src="' +
                    item.split("-->").at(3) +
                    '" alt="Avatar"/></div></div>';
                }
              } else {
                li.innerHTML =
                  '<div data-id="' +
                  list.childNodes.length +
                  '" ontouchstart="down(this.firstChild)" ontouchend="up()" onmousedown="down(this.firstChild)" onmouseup="up()" class="messageright"><div class="message darker"><p>' +
                  item.split("-->").at(1) +
                  '</p><span class="time-right">' +
                  '</span></div><div class="imagediv"><img style="height: 50px; width: 50px;" class="right" src="' +
                  item.split("-->").at(3) +
                  '" alt="Avatar"/></div></div>';
              }
            }
            li.classList.add("listitem");
            list.appendChild(li);
          }
        });
        function getEventTarget(e) {
          e = e || window.event;
          return e.target || e.srcElement;
        }

        function sndBtnClicked() {
          if (Object.keys(images).length == 0 && document.getElementById("chat").value == "") {
          } else {
            var postsref2 = database.ref(
              "ChappUsers/" + user.uid
            );
            postsref2.on("value", (snapshot) => {
              var data2 = snapshot.val();
              if (
                Object.keys(images).length === 0 &&
                images.constructor === Object
              ) {
                data
                  .reverse()
                  .push(
                    user.displayName +
                      "-->" +
                      document.getElementById("chat").value +
                      "-->" +
                      user.uid +
                      "-->" +
                      data2[3]
                  );
              } else {
                data
                  .reverse()
                  .push(
                    user.displayName +
                      "-->" +
                      document.getElementById("chat").value +
                      "-->" +
                      user.uid +
                      "-->" +
                      data2[3] +
                      "-->" +
                      JSON.stringify(images)
                  );
              }
              database
                .ref()
                .child("Chapp/" + chat)
                .set(data).then(() => {
            });
            options = {
              method: "POST",
              headers: {
                accept: "application/json",
                Authorization:
                  "Basic ZDZmN2UyNTEtOTU2Ni00ZmY0LWFmNjMtZWY4ZDA4NWFkZmFk",
                "content-type": "application/json",
              },
              body: JSON.stringify({
                app_id: "62886539-65fb-497a-9377-a74d6316df99",
                include_player_ids: [OSid],
                contents: { en: document.getElementById("chat").value },
                headings: { en: user.displayName },
                name: "message",
                url: location.href,
              }),
            };
            fetch("https://onesignal.com/api/v1/notifications", options)
              .then((response) => response.json())
              .then(() => {document.getElementById("chat").value = ""; images = {}; document.getElementById("progressDiv").style.display = "none"})
              .catch((err) => console.error(err));
              })
          }
        }
        document
          .getElementById("send")
          .addEventListener("click", sndBtnClicked);
      });
    }
  }
  wait();
}, 500);

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/chappiumonline/home");
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
      location.href = "/chappiumonline/home";
    }, 150);
  };
}

function clickInsideElement(e, className, className2) {
  el = e.srcElement || e.target;

  if (el.classList.contains(className) || el.classList.contains(className2)) {
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

var taskItemClassName = "message";
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
    console.log(taskItem);
    executed = false;
    taskItemInContext = taskItem;
    if (taskItem.className == "message darker") {
      document.getElementById("deleteItem").style.display = "block";
    } else {
      document.getElementById("deleteItem").style.display = "none";
    }
    el = taskItem;
    menu.style.display = "flex";
    document.getElementById("bg").style.display = "flex";
    document.getElementById("item-container").innerHTML =
      taskItem.parentElement.innerHTML;
  } else {
    taskItemInContext = null;
    //  toggleMenuOff();
  }
}

var data;
var id;

function deleteMessage() {
  taskItemInContext = el;
  id = taskItemInContext.parentElement.getAttribute("data-id");
  var user = auth.currentUser;
  var postsref = database.ref("Chapp/" + chat);
  postsref.on("value", (snapshot) => {
    data = snapshot.val();
    something();
  });
}

var something = (function () {
  executed = false;
  return function () {
    if (!executed) {
      executed = true;
      data.splice(data.length - id - 1, 1);
      database.ref("Chapp/" + chat).set(data);
    }
  };
})();

function copyMessage() {
  console.log(taskItemInContext);
  navigator.clipboard.writeText(taskItemInContext.firstChild.innerText);
}

function hideMenu() {
  menu.style.display = "none";
  document.getElementById("bg").style.display = "none";
}

function menu_toggle() {}
var timeout_id;
function down(e) {
  timeout_id = setTimeout(function () {
    showMenu(e);
  }, 1000);
}

function up() {
  clearTimeout(timeout_id);
}

document.getElementById("pic").onclick = function () {
  document.getElementById("file").click();
};

const fileInput = document.getElementById("file");
fileInput.onchange = () => {
  Array.from(document.getElementById("file").files).forEach(uploadImage);
};

function uploadImage(item) {
  const file = item;
  const name =
    chat +
    "/" +
    file.name.split(".")[0] +
    Math.random().toString().split(".")[1] +
    "." +
    file.name.split(".")[1];
  const metadata = {
    contentType: file.type,
  };
  const ref = storage.ref();
  const task = ref.child(name).put(file, metadata);
  document.getElementById("progressImage").src = URL.createObjectURL(file)
  task
    .on('state_changed', (data) => {
        document.getElementById("progressDiv").style.display = "flex"
        var percent = (data.bytesTransferred/data.totalBytes) * 100  
        document.documentElement.style.setProperty('--progress', percent + "%")
    })
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
    document.getElementById("progressBlur").style.opacity = 0
    document.getElementById("progress-bar").style.opacity = 0
      images[Object.keys(images).length] = {
        [file.type.toString().split("/")[0]]: url,
      };
    console.log(Object.values(images)[0])
    });
}