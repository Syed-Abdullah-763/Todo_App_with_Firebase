const updateUserBtn = document.querySelector("#updateUserBtn")
const logoutUserBtn = document.querySelector("#logoutUserBtn")


updateUserBtn.addEventListener("click", updateUser)
logoutUserBtn.addEventListener("click", logoutHandler)


function getUserData() {
    var userData = JSON.parse(localStorage.getItem("userLogin"))
    
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    firstName.value = userData.firstName
    lastName.value = userData.lastName
    email.value = userData.email
    password.value = userData.password
    
}


function updateUser() {
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var updatedObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    }

    var userArr = JSON.parse(localStorage.getItem("users"))
    var userlogin = JSON.parse(localStorage.getItem("userlogin"))
    var index;

    for(var i = 0; i < userArr.length; i++) {
        if (userArr[i].email == email.value) {
            index = i
        }
    }

    userArr[index] = updatedObj;

    localStorage.setItem("userLogin", JSON.stringify(updatedObj))
    localStorage.setItem("users", JSON.stringify(userArr))
}


function logoutHandler() {
    localStorage.removeItem("userLogin")

    window.location.href = "../index.html"
}