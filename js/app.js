// Initialize Firebase
var config = {
    apiKey: "AIzaSyBgzO2wZe4JNl5VThld00JBw0J1vfL7UF8",
    authDomain: "firestoredbtest-f77b4.firebaseapp.com",
    databaseURL: "https://firestoredbtest-f77b4.firebaseio.com",
    projectId: "firestoredbtest-f77b4",
    storageBucket: "firestoredbtest-f77b4.appspot.com",
    messagingSenderId: "984838070173"
  };
  firebase.initializeApp(config); 

  //Initiallize Firestore

  var firestore = firebase.firestore();

  //This snipet is needed to avoid errors in the requests
  const settings = {
     timestampsInSnapshots: true
    };
  firestore.settings(settings);

//This is open repository, so all the data is completelly public

  const docRef = firestore.doc("sample/sampleDoc");
  const outputText = document.querySelector("#infoOutput");
  const intputTextField = document.querySelector("#inputBox");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

  //Save button functionality

  saveButton.addEventListener("click",function(){
    const textToSave = inputBox.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
      status:textToSave
    }).then(function(){
      console.log("Status saved!");
    }).catch(function(error) {
      console.log("There is an error: ",error)
    });
  });
  
 //This allow the app to get the "data form the server" in real time.

  getRealtimeUpdates = function(){
    docRef.onSnapshot(function(doc){
      if (doc && doc.exists){
        const myData = doc.data();
        outputTextField.innerText = myData.status;
      }
    });
  }
  getRealtimeUpdates();