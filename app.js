import { auth, signInWithEmailAndPassword } from "./firbase/firebase.js";
const loginHandle = document.querySelector("#loginHandler");



const authCheck = () => {
  const uid = localStorage.getItem("uid")
  
  if(uid){
    window.location.replace("./home/home.html")
  }
}

window.addEventListener("load", authCheck)
loginHandle.addEventListener("click", loginHandler);

async function loginHandler() {
  try {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const response = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("uid" , response.user.uid)

    email = "";
    password = "";

    window.location.replace("./home/home.html");
  } catch (error) {
    alert(error.message);
  }
}
