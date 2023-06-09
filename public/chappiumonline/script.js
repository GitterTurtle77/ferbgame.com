firebase.auth().onAuthStateChanged((user) => {
var uid = firebase.auth().currentUser.uid;

// Create a reference to this user's specific status node.
// This is where we will store data about being online/offline.
var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
var d = new Date();

// We'll create two constants which we will write to 
// the Realtime database when this device is offline
// or online.
var isOfflineForDatabase = {
    state: 'offline',
    last_changed: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + String(d.getMinutes()).padStart(2, '0'),
};

var isOnlineForDatabase = {
    state: 'online',
    last_changed: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + String(d.getMinutes()).padStart(2, '0'),
};

// Create a reference to the special '.info/connected' path in 
// Realtime Database. This path returns `true` when axconnected
// and `false` when disconnected.
firebase.database().ref('info/connected').on('value', function(snapshot) {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() == false) {
        return;
    };

    // If we are currently connected, then use the 'onDisconnect()' 
    // method to add a set which will only trigger once this 
    // client has disconnected by closing the app, 
    // losing internet, or any other means
    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
        // The promise returned from .onDisconnect().set() will
        // resolve as soon as the server acknowledges the onDisconnect() 
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

        // We can now safely set ourselves as 'online' knowing that the
        // server will mark us as offline once we lose connection
        isOfflineForDatabase.last_changed = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + String(d.getMinutes()).padStart(2, '0'),
        userStatusDatabaseRef.set(isOnlineForDatabase);
    });
});
})
