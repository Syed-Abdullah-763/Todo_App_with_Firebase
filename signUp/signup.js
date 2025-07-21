
import { createUserWithEmailAndPassword, auth, setDoc, db, doc } from "../firbase/firebase.js";

const signupHandle = document.querySelector("#signupHandler")

const authCheck = () => {
  const uid = localStorage.getItem("uid")
  
  if(uid){
    window.location.replace("./home/home.html")
  }
}

window.addEventListener("load", authCheck)
signupHandle.addEventListener("click", signupHandler)

async function signupHandler() {
  try {
    var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const response = await createUserWithEmailAndPassword(auth, email, password)

  const userObj = {
    firstName,
    lastName,
    email,
    uid: response.user.uid,
    imageUrl: false,
  }

  await setDoc(doc(db, "users", response.user.uid), userObj)
  localStorage.setItem("uid" , response.user.uid)
  
      firstName = "";
      lastName = "";
      email = "";
      password = "";

      window.location.replace("../home/home.html")
  } catch (error) {
    alert(error.message)
  }
}
