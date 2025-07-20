import {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "../firbase/firebase.js";

// Burger menu toggle
const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  burgerBtn.classList.toggle("open");
  burgerBtn.setAttribute("aria-expanded", navLinks.classList.contains("open"));
});

const addBtn = document.querySelector("#addBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
let todoUser;

addBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", clearAllTodos);

const routeCheck = () => {
  const uid = localStorage.getItem("uid")

  if(!uid) {
    window.location.replace("../index.html")
  }
}
window.addEventListener("load", routeCheck);

const fetchUserData = async () => {
  try {
    const userUid = localStorage.getItem("uid");
    const user = await getDoc(doc(db, "users", userUid));
    todoUser = user.data();
  } catch (error) {
    alert(error.message);
  }
};

const fetchMyTodos = async () => {
  try {
    const userUid = localStorage.getItem("uid");
    const querySnapShot = await getDocs(
      query(collection(db, "todos"), where("uid", "==", userUid))
    );

    querySnapShot.forEach((doc) => {
      const todoData = doc.data();
      const todoId = doc.id;

      renderUI(todoData, todoId);
    });
  } catch (error) {
    console.log(error.message);
  }
};

function renderUI(tododata, todoId) {
  var parent = document.getElementById("parent");

  parent.innerHTML += `<li id="${todoId}">
          <h4>${tododata.value}</h4>
          <p>(${tododata.date}) ${tododata.time}</p>
          <div class="btns">
            <button class="edit editBtn">Edit</button>
            <button class="delete deleteBtn">Delete</button>
          </div>
        </li>`;
}

async function addTodo() {
  try {
    let todoInput = document.getElementById("todoInput").value;

    if (!todoInput) {
      return;
    }

    const newDate = new Date();
    let hours = newDate.getHours();
    let zone = "am";

    if (hours >= 12) {
      hours = hours - 12;
      zone = "pm";
    }

    const todoObj = {
      value: todoInput,
      email: todoUser.email,
      uid: todoUser.uid,
      date: `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`,
      time: `${hours}:${newDate.getMinutes()}${zone}`,
    };

    const response = await addDoc(collection(db, "todos"), todoObj);

    todoInput = "";
    renderUI(todoObj, response.id);
  } catch (error) {
    console.log(error.message);
  }
}

// Adds one global event listener to the parent element.
// This is called event delegation, and it works even for dynamically added elements.
document.getElementById("parent").addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    deleteval(e);
  } else if (e.target.classList.contains("editBtn")) {
    editVal(e);
  }
});

async function deleteval(e) {
  try {
    const li = e.target.closest("li");
    const todoId = li.id;

    const confirmDelete = confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "todos", todoId));
    li.remove();
  } catch (error) {
    alert("Delete failed: " + error.message);
    console.error(error);
  }
}

async function editVal(el) {
  try {
    const editBtn = el.target;
    const liElement = el.target.closest("li");
    const h4 = liElement.querySelector("h4");

    if (editBtn.innerHTML === "Done") {
      const input = liElement.querySelector("input");
      const newDate = new Date();
      let hours = newDate.getHours();
      let zone = "am";

      if (hours > 12) {
        hours -= 12;
        zone = "pm";
      }

      await updateDoc(doc(db, "todos", liElement.id), {
        value: input.value,
        date: `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`,
        time: `${hours}:${newDate.getMinutes()}${zone}`,
      });

      const newh4 = document.createElement("h4");
      newh4.textContent = input.value;
      liElement.replaceChild(newh4, input);

      editBtn.innerHTML = "Edit";
    } else {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = h4.textContent;
      inputField.setAttribute("class", "inputField");

      liElement.replaceChild(inputField, h4);

      editBtn.innerHTML = "Done";
    }
  } catch (error) {
    alert("Error editing todo: " + error.message);
    console.error(error);
  }
}

async function clearAllTodos() {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));

    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "todos", docSnap.id))
    );

    await Promise.all(deletePromises);

    window.location.reload();
  } catch (error) {
    console.log("Error deleting collection:", error.message);
  }
}

window.fetchMyTodos = fetchMyTodos;
window.fetchUserData = fetchUserData;
