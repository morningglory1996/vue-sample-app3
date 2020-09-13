importScripts("https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "943740645399",
});

const messaging = firebase.messaging();
