import {
  getDoc,
  doc,
  db,
} from "../firbase/firebase.js"


const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  burgerBtn.classList.toggle("open");
  burgerBtn.setAttribute("aria-expanded", navLinks.classList.contains("open"));
});

const routeCheck = () => {
  const uid = localStorage.getItem("uid")
  
  if(!uid) {
    window.location.replace("../index.html")
  }
}

async function fetchUser() {
  try {
  const h1 = document.getElementById("h1")
  const dp = document.getElementById("dp")
  const card = document.getElementById("card");
  const uid = localStorage.getItem("uid");
  const userDoc = await getDoc(doc(db, "users", uid));
  const userData = userDoc.data();
  let profileUrl;
  
  if(!userData.imageUrl) {
    profileUrl = "../images/person-icon-blue-15.png";
  } else {
    profileUrl = userData.imageUrl;
  }

  dp.src = `${profileUrl}`
  h1.innerHTML = `${userData.firstName} ${userData.lastName}`
  
  } catch (error) {
    console.log(error.message);
  }
}

const logOutHandler = () => {
  localStorage.removeItem("uid");
  window.location.replace("../index.html");
}

window.addEventListener("load", routeCheck);
window.addEventListener("load", fetchUser);
window.logOutHandler = logOutHandler;
