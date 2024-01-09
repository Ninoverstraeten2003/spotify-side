// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: "AIzaSyDmlSs0k7etgdZzTNStzQBnEGs3CtoVOC4",
//   authDomain: "spotify-side.firebaseapp.com",
//   projectId: "spotify-side",
//   storageBucket: "spotify-side.appspot.com",
//   messagingSenderId: "187693962038",
//   appId: "1:187693962038:web:5a5d93bb19913f34bd1997",
//   measurementId: "G-BSZQS14EFS",
// };

// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getUsers() {
//   const usersCol = collection(db, "users");
//   const userSnapshot = await getDocs(usersCol);
//   const userList = userSnapshot.docs.map((doc) => doc.data());
//   return userList;
// }

// export { getUsers };
