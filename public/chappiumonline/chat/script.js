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

const urlParams = new URLSearchParams(window.location.search);
var chat = urlParams.get("chat");
var OSid = urlParams.get("id");
var name = urlParams.get("name");
document.getElementById("name").innerText = name;

var el;

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

      var postsref = database.ref("Chapp/" + chat);
      postsref.on("value", (snapshot) => {
        var data = snapshot.val().reverse();
        if (data == null) {
          data = [];
        }

        document.getElementById("list").innerHTML = "";

        let list = document.getElementById("list");

        data.forEach((item) => {
          if (item != "") {
            let li = document.createElement("div");
            if (item.split("-->").at(2) != user.uid) {
              li.innerHTML =
                '<div data-id="' +
                list.childNodes.length +
                '" ontouchstart="down(this)" ontouchend="up()" onmousedown="down(this)" onmouseup="up()" class="messageleft"><div class="imagediv"><img src="' +
                item.split("-->").at(3) +
                '" alt="Avatar"/></div><div class="message"><p>' +
                item.split("-->").at(1) +
                '</p><span class="time-right">' +
                "</span></div></div>";
            } else {
              li.innerHTML =
                '<div data-id="' +
                list.childNodes.length +
                '" ontouchstart="down(this)" ontouchend="up()" onmousedown="down(this)" onmouseup="up()" class="messageright"><div class="message darker"><p>' +
                item.split("-->").at(1) +
                '</p><span class="time-right">' +
                '</span></div><div class="imagediv"><img class="right" src="' +
                item.split("-->").at(3) +
                '" alt="Avatar"/></div></div>';
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
          if (document.getElementById("chat").value != "") {
            var postsref2 = database.ref(
              "ChappUsers/" + user.email.split("@")[0].replaceAll(".", "*")
            );
            postsref2.on("value", (snapshot) => {
              var data2 = snapshot.val();
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
              database
                .ref()
                .child("Chapp/" + chat)
                .set(data);
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
                small_icon: "message_icon.png",
                url: location.href,
              }),
            };
            console.log(options);
            console.log("hello world");
            fetch("https://onesignal.com/api/v1/notifications", options)
              .then((response) => response.json())
              .then((response) => console.log(response))
              .catch((err) => console.error(err));
            setTimeout(function () {
              document.getElementById("chat").value = "";
            }, 200);
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
    console.log(
      document.getElementById("content").getElementsByTagName("button")
    );
    var collection = document
      .getElementById("content")
      .getElementsByTagName("button");
    for (let i = 0; i < collection.length; i++) {
      console.log(collection[i]);
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
    taskItemInContext = taskItem;
    if (taskItem.className == "message darker") {
      document.getElementById("deleteItem").style.display = "block";
    } else {
      document.getElementById("deleteItem").style.display = "none";
    }
    el = taskItem;
    console.log(taskItem);
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
  console.log(el);
  id = taskItemInContext.firstChild.getAttribute("data-id");
  console.log(id);
  var user = auth.currentUser;
  var postsref = database.ref("Chapp/" + chat);
  postsref.on("value", (snapshot) => {
    data = snapshot.val();
    something()
  });
}

var something = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      console.log(data);
      console.log(data.length - id - 1);
      data.splice(data.length - id - 1, 1);
      console.log(data);
      database.ref("Chapp/" + chat).set(data);
      window.setTimeout(function(){executed = false;}, 1000)
    }
  };
})();

function copyMessage() {
  console.log(taskItemInContext.firstChild.innerText);
  navigator.clipboard.writeText(
    taskItemInContext.firstChild.innerText
  );
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
