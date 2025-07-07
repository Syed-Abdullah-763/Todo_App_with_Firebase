
const loginHandle = document.querySelector("#loginHandler")

loginHandle.addEventListener("click", loginHandler)

function loginHandler(loginHandle) {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var users = localStorage.getItem("users");
  var storageCheck = true;

  function showError(errorMsg) {
    var error = document.getElementById("error");

    error.innerHTML = errorMsg;
  }

  if (users == null) {
    storageCheck = false;

    showError("Email and Password is not matched");
  }

  if (storageCheck == true) {
    var userArr = JSON.parse(users);
    var isMatch = false;

    for (var userObj of userArr) {
      if (userObj.email == email.value && userObj.password == password.value) {
        isMatch = true;

        localStorage.setItem("userLogin",JSON.stringify(userObj))
        alert("LogIn Complete")
        // window.location.href = "./home/home.html";
        window.location.replace("./home/home.html")
      }
    }

    if (isMatch == false) {
      showError("Email and Password is not matched");
    }
  }
}