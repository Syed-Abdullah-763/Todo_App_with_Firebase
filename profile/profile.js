import {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  auth,
  createUserWithEmailAndPassword,
  setDoc,
  signInWithEmailAndPassword,
} from "../firbase/firebase.js";

const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  burgerBtn.classList.toggle("open");
  burgerBtn.setAttribute("aria-expanded", navLinks.classList.contains("open"));
});

const fileInput = document.querySelector("#fileInput");
const selectImg = document.querySelector("#selectImg");

const fileHandler = async () => {
  try {
    const imageChange = document.querySelector("#imageChange")
    const uid = localStorage.getItem("uid")
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "todoApp");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dy618kfxl/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    await updateDoc(doc(db, "users", uid), {
      imageUrl: res.secure_url
    })

    imageChange.src = ""
    imageChange.src = res.secure_url
  } catch (error) {
    console.log(error.message);
  }
};

const fetcUser = async () => {
  const uid = localStorage.getItem("uid");
  const userRes = await getDoc(doc(db, "users", uid));
  const userData = userRes.data();

  const firstname = document.querySelector("#firstName");
  const lastname = document.querySelector("#lastName");
  const email = document.querySelector("#email");
  const imageChange = document.querySelector("#imageChange");

  firstname.value = userData.firstName;
  lastname.value = userData.lastName;
  email.value = userData.email;
  
  if(!imageChange) {
    imageChange.src = "../images/person-icon-blue-15.png";
  }else{
    imageChange.src = userData.imageUrl;
  }
}

window.addEventListener("load", fetcUser)
fileInput.addEventListener("change", fileHandler);
selectImg.addEventListener("click", () => fileInput.click());
