const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotifications = functions
  .region("asia-northeast1")
  .firestore.document("messages/{id}")
  .onCreate((snapshot) => {
    const messageUserId = snapshot.data().uid;
    const messagedisplayName = snapshot.data().displayName;
    const messageBody = snapshot.data().message;
    admin
      .firestore()
      .collection("fcm_tokens")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const tokenUserId = doc.data().uid;
          if (messageUserId === tokenUserId) return;
          const token = doc.id;
          const payload = {
            notification: {
              title: "Message Received",
              body: `${messagedisplayName}: ${messageBody}`,
              click_action: "https://vue-sample-app-eeb9f.web.app/chat",
              sound: "default",
              icon:
                "https://firebasestorage.googleapis.com/v0/b/vue-sample-app-eeb9f.appspot.com/o/badge%2Flogo.png?alt=media&token=6f9cd142-002f-4bad-b1c5-f234ffdffcd5",
            },
          };
          const options = {
            priority: "high",
          };
          admin
            .messaging()
            .sendToDevice(token, payload, options)
            .then(() => {
              console.log("Successfully sent message");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return 0;
  });
