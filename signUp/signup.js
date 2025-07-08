
import { createUserWithEmailAndPassword, auth, setDoc, db, doc } from "../firbase/firebase.js";

const signupHandle = document.querySelector("#signupHandler")

signupHandle.addEventListener("click", signupHandler)

async function signupHandler() {
  try {
    var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const userAuth = await createUserWithEmailAndPassword(auth, email, password)

  const userObj = {
    firstName,
    lastName,
    email,
    uid: userAuth.user.uid,
  }

  await setDoc(doc(db, "users", userAuth.user.uid,), userObj)
  
      firstName = "";
      lastName = "";
      email = "";
      password = "";

      window.location.replace("../home/home.html")
  } catch (error) {
    alert(error.message)
  }
}
