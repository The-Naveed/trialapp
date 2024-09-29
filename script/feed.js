setInterval(() => {
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // console.log(`${formattedDate}, ${formattedTime}`);
  const time = document.getElementById("time")
  time.innerHTML = `${formattedDate}, ${formattedTime}`
}, 1000);


import {
  getStorage,
  ref,
  getDownloadURL,
  getDatabase,
  child,
  get,
  doc,
  getDoc,
  getDocs,
  db,
  collection,
} from "./firebase.js"

const uName = document.getElementById("name")
uName.innerHTML = localStorage.getItem("Name")
const pic = document.getElementById("img")
pic.src = localStorage.getItem("Profile")


const logout = () => {
  window.location.replace("../index.html")
  // const eMail = document.getElementById("mail").value
  // const password = document.getElementById("pass").value

  // if (!eMail.value) {
  //   alert("Phone number, username or email not found");
  //   return
  // }

  // localStorage.setItem("User Email", eMail)
  // localStorage.setItem("User Password", password)

}

const blog = document.getElementById("blogs")

const storage = getStorage();
const id = localStorage.getItem('User ID')
// console.log(id)

const querySnapshot = await getDocs(collection(db, "Blogs"));
querySnapshot.forEach((doc) => {
  // console.log(doc.id, " => ", doc.data());
  blog.innerHTML += doc.data().post
});



const picture = await getDocs(collection(db, localStorage.getItem("User ID")));
picture.forEach((doc) => {
    localStorage.setItem("Name",doc.data().firstName + " " + doc.data().lastName)
    localStorage.setItem("Profile",doc.data().Picture)
});


const sign = () => {
  window.location.replace("../pages/sign.html")
}

const shift = _ => {
  window.location.replace("../pages/post.html")
}

window.sign = sign
window.logout = logout
window.shift = shift