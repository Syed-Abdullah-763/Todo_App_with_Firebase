import { auth, signInWithEmailAndPassword } from "./firbase/firebase.js";
const loginHandle = document.querySelector("#loginHandler");

loginHandle.addEventListener("click", loginHandler);

async function loginHandler() {
  try {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const userAuth = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("uid" , userAuth.user.uid)

    email = "";
    password = "";

    window.location.replace("./home/home.html");
  } catch (error) {
    alert(error.message);
  }
}
