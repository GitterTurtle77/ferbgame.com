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
var storage = firebase.storage();

var data7;
var data8;
var data9;
var groupmembers = [];

var executed = false;

function wait() {
  if (auth.currentUser == null) {
    window.setTimeout(wait, 500);
  } else {
    var user = auth.currentUser;

    var postsref8 = database.ref(
      "ChappUsers/" + user.uid
    );
    postsref8.on("value", (snapshot) => {
      data8 = snapshot.val();

    if (data8.length > 2) {
      
var postsref7 = database.ref("ChappiumUsers/" + data8[2]);
    postsref7.on("value", (snapshot) => {
      data7 = snapshot.val();
    });
      
      var postsref8 = database.ref("ChappFriends/" + user.uid);
      postsref8.on("value", (snapshot) => {
        const data8 = snapshot.val();
        
        var postsref9 = database.ref("ChappGroups/");
  postsref9.on("value", (snapshot) => {
    data9 = snapshot.val();
    if (data9 == null) {
      data9 = [];
    }
  })
        if (data8 != undefined && data8.length != 0) {

        const datashown = [];
        const datahidden = [];
        const dataimage = [];
          var datauid = [];
          document.getElementById("list").innerHTML = "";
        data8.forEach((item, index) => {
          var postsref10 = database.ref("ChappUsers/" + item.split("--")[1])
      var data10;
      postsref10.on("value", (snapshot) => {
        data10 = snapshot.val();
        console.log(data10)
          datashown.push(data10[0]);
            datahidden.push(item.split("--").at(0));
            dataimage.push(data10[3]);
            datauid.push(data10[1]);
        load(item, index)
      })
      })
          function load(item, index) {
        let list = document.getElementById("list");
          let li = document.createElement("li");
          li.innerHTML = '<div style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start;"><img style="pointer-events: none; height: 60px; width: 60px; object-fit: cover; margin-right: 15px; border-radius: 15px;" src="' +
              dataimage[index] +
              '"/><p style="user-select: none;">' +
              datashown[index] +
              '</p></div><div style="display: flex; justify-content: flex-end;"><button><span class="material-icons">add</span></button></div>'
          li.onclick = function() {li.style.display = "none"; if (datahidden[index].split("->").indexOf(user.uid) == 0) {groupmembers.push(datahidden[index].split("->")[1])} else {groupmembers.push(datahidden[index].split("->")[0])} console.log(groupmembers)}
        li.className = "chatElement";
        list.appendChild(li);
          }
        } else {
          let list = document.getElementById("list");
          list.innerHTML = "";
          list.innerHTML = "<li>There's no one here! Get started by adding friends.</li>"
        }
      });
    } else {
      location.href = "/chappiumonline/createprofile/";
    }
    });
  }
}
wait();

function createGroup() {
  if (executed == false) {
    if (document.getElementById("upload").files.length === 0 && document.getElementById("groupname").value == "" && groupmembers.length == 0) {
      document.getElementById("error").innerText = "Please upload an icon, select members and create a name"
    } else if (document.getElementById("upload").files.length == 0 && document.getElementById("groupname").value == "") {
      document.getElementById("error").innerText = "Please upload an icon and create a name"
    } else if (document.getElementById("groupname").value == "" && groupmembers.length == 0) {
      document.getElementById("error").innerText = "Please select members and create a name"
    } else if (document.getElementById("upload").files.length == 0 && groupmembers.length == 0) {
      document.getElementById("error").innerText = "Please upload an icon and select members"
    } else if (document.getElementById("groupname").value == "") {
      document.getElementById("error").innerText = "Please create a name"
    } else if (document.getElementById("upload").files.length == 0) {
      document.getElementById("error").innerText = "Please upload an icon"
    } else if (groupmembers.length == 0) {
      document.getElementById("error").innerText = "Please select members"
    } else {
    var groupid = genGroupID()
    console.log(groupid)
    const ref = storage.ref();
      const file = document.getElementById("upload").files[0];
      const name = groupid.toString();
      const metadata = {
         contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task.then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        
        create(groupid, url)
      });
      
    }
}
}

function create(groupid, imageUrl) {
  var user = auth.currentUser;
  var postsref5 = database.ref("ChappFriends/" + user.uid);
              postsref5.on("value", (snapshot) => {
                var data5 = snapshot.val();
                if (data5 == null) {
                  data5 = [];
                }
                if (
                  !data5.includes(
                    document.getElementById("groupname").value +
                      "--" +
                      groupid +
                      "--" +
                      imageUrl
                  )
                ) {
                data5.push(document.getElementById("groupname").value + "--" + groupid + "--" + imageUrl)
                database
                  .ref()
                  .child("ChappFriends/" + user.uid)
                  .set(data5);
                }
    groupmembers.forEach((item, index) => {
      console.log(item)

            var postsref4 = database.ref("ChappFriends/" + item);
            postsref4.on("value", (snapshot) => {
              var data4 = snapshot.val();
              if (data4 == null) {
                data4 = [];
              }
              console.log(data4)

                if (
                  !data4.includes(
                    document.getElementById("groupname").value +
                      "--" +
                      groupid +
                      "--" +
                      imageUrl
                  )
                ) {
                  data4.push(
                    document.getElementById("groupname").value + "--" + groupid + "--" + imageUrl
                  );

                  
                }

              database
                    .ref()
                    .child("ChappFriends/" + item)
                    .set(data4);

                location.href = "/chappiumonline/home";
              });
            });
      });
    executed = true;
}

function genGroupID() {
   
  const id = Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000)
   if (data9.includes(id)) {
     window.setTimeout(function(){genGroupID()},100)
   } else {
     data9.push(id)
     database.ref("ChappGroups").set(data9);
     return id;
   }
}
