const slider = document.querySelector("#slider");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector("#closeBtn");
const navSide = document.querySelector(".side-nav");
const searchLink = document.querySelector("#searchLink");
const searchPage = document.querySelector("#searchPage");
const contact = document.querySelector("#contact");
const contactPage = document.querySelector("#contactPage");
let dataSearch = document.getElementById("dataSearch");
let searchByName = document.getElementById("searchByName");
let searchByLetter = document.getElementById("searchByLetter");
let categories = document.getElementById("categories");
let catData = document.getElementById("catData");
let categoriesPage = document.querySelector(".categoriesPage");
let links = document.querySelectorAll(".nav-menu li");
let rowData = document.getElementById("rowData");
let area = document.getElementById("area");
let ingredients = document.getElementById("ingredients");
let SearchContainer = document.getElementById("SearchContainer");

links.forEach((link) => {
  link.addEventListener("click", () => {
    let navMenuWidth = $(navMenu).innerWidth();
    if ($(navSide).css("left") == "0px") {
      $(navSide).animate({ left: -navMenuWidth }, 500);
      $(slider).removeClass("fa-x");
      $(slider).addClass("fa-sliders");
      $(".links li").animate({ top: "300px" }, 500);
    } else {
      $(navSide).animate({ left: "0px" }, 500);
      $(slider).addClass("fa-x");
      $(slider).removeClass("fa-sliders");

      for (let i = 0; i < 5; i++) {
        $(".links li")
          .eq(i)
          .animate({ top: "0px" }, (i + 5) * 100);
      }
    }
  });
});

function openSideNav() {
  $(navSide).animate({ left: "0px" }, 500);
  $(slider).addClass("fa-x");
  $(slider).removeClass("fa-sliders");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: "0px" }, (i + 5) * 100);
  }
}
function closeSideNav() {
  let navMenuWidth = $(navMenu).innerWidth();
  $(navSide).animate({ left: -navMenuWidth }, 500);
  $(slider).removeClass("fa-x");
  $(slider).addClass("fa-sliders");
  $(".links li").animate({ top: "300px" }, 500);
}
closeSideNav();

$(slider).on("click", () => {
  if ($(navSide).css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
searchLink.addEventListener("click", () => {
  showSearchInputs();
});

function showSearchInputs() {
  SearchContainer.innerHTML = ` <div class="row">
            <div class="col-lg-6">
                <input oninput=""  type="text"  class="form-control bg-white my-5 py-2 text-white"
                    placeholder="Search By Name">
            </div>
    
            <div class="col-lg-6">
                <input oninput=""  type="text" id="searchByLetter" class="form-control bg-white my-5 py-2 text-white"
                    placeholder="Search By First Letter">
            </div>
        </div>`;
  rowData.innerHTML = '';
}


$(document).ready(()=> {
  getMeals("").then(() => {
    $('.loading').fadeOut(500);
    $('body').css('overflow','auto')
  })
})

//APIs
searchLink.addEventListener("click", () => {
  showSearchInputs();
});

function showSearchInputs() {
  SearchContainer.innerHTML = ` <div class="row">
            <div class="col-lg-6">
                <input oninput="getSearchName(this.value);"  type="text"  class="form-control bg-white my-5 py-2 text-white"
                    placeholder="Search By Name">
            </div>
    
            <div class="col-lg-6">
                <input oninput="getSearchByLetter(this.value)"  type="text" id="searchByLetter" class="form-control bg-white my-5 py-2 text-white"
                    placeholder="Search By First Letter">
            </div>
        </div>`;
  rowData.innerHTML = "";
}
async function getSearchName(term) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let res = await api.json();
  console.log(res);
  res.meals ? displayMeals(res.meals) : displayMeals([]);
}

// function displaySearchByName(arr) {
//   let box = ``;
//   for (let i = 0; i < arr.length; i++){
//     box += `<div class="col-md-3 p-3">
//             <div onclick="getDetails(${arr[i].idMeal})" class="card position-relative rounded-2">
//                 <img src="${arr[i].strMealThumb}" alt="">
//                 <div class="card-body position-absolute text-black d-flex align-items-center">
//                     <h3 class="px-2 fw-bold">${arr[i].strMeal}</h3>
//                 </div>
//             </div>
//         </div>`;
//   }
//   rowData.innerHTML = box;
// }

async function getSearchByLetter(letter) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let res = await api.json();
  console.log(res.meals);
  term == ""?  term="a" : "";
  res.meals ? displayMeals(res.meals) : displayMeals([]);
}
// function displaySearchByLetter(arr) {
//   let box = ``;
//   for (let i = 0; i < arr.length; i++){
//     box += `<div class="col-md-3 p-3">
//             <div onclick="getDetails(${arr[i].idMeal})" class="card position-relative rounded-2">
//                 <img src="${arr[i].strMealThumb}" alt="">
//                 <div class="card-body position-absolute text-black d-flex align-items-center">
//                     <h3 class="px-2 fw-bold">${arr[i].strMeal}</h3>
//                 </div>
//             </div>
//         </div>`;
//   }
//   rowData.innerHTML = box;
// }



async function getMeals(term) {
  SearchContainer.innerHTML = "";
  $(".loading").fadeIn(500);
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let res = await api.json();
  $(".loading").fadeOut(500);
  displayMeals(res.meals.slice(0,20));
}

function displayMeals(arr) {
  let boxMeals = ``;
  for (let i = 0; i < arr.length; i++) {
    boxMeals += `<div class="col-md-3 p-3">
            <div onclick="getDetails(${arr[i].idMeal})" class="card position-relative rounded-2">
                <img src="${arr[i].strMealThumb}" alt="">
                <div class="card-body position-absolute text-black d-flex align-items-center">
                    <h3 class="px-2 fw-bold">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
  }
  rowData.innerHTML = boxMeals;

}


async function getCategories() {
  SearchContainer.innerHTML = "";
  $(".loading").fadeIn(500);
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let res = await api.json();
  $(".loading").fadeOut(500);
  displayCategories(res.categories.slice(0,20));
}

function displayCategories(arr) {
  let catBox = ``;
  for (let i = 0; i < arr.length; i++) {
    catBox += `<div class="col-md-3 p-3">
            <div onclick="getCategoryMeals('${
              arr[i].strCategory
            }')" class="card position-relative rounded-2">
                <img src="${arr[i].strCategoryThumb}" alt="">
                <div class="card-body position-absolute top-0 start-0 end-0 bottom-0 text-black text-center px-2 fw-bold">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${
                      arr[i].strCategoryDescription.split(" ", 10).join(" ") +
                      "..."
                    }</p>
                </div>
            </div>
        </div>`;
  }
  rowData.innerHTML = catBox;


}
categories.addEventListener("click", () => {
  getCategories();
});

async function getCategoryMeals(category) {
  $(".loading").fadeIn(500);
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let res = await api.json();
  $(".loading").fadeOut(500);
  displayMeals(res.meals.slice(0, 15));
}

async function getArea() {
  SearchContainer.innerHTML = "";
  $(".loading").fadeIn(500);
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let res = await api.json();
  $(".loading").fadeOut(500);
  displayAreas(res.meals.slice(0,20));
}
function displayAreas(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `<div class="col-md-3 p-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class=" text-center text-white">
                    <i class="fa-solid fa-house-laptop fa-2xl"></i>
                    <h3 class="px-2 fw-bold py-2">${arr[i].strArea}</h3>
               
            </div>
        </div>`;
  }
  rowData.innerHTML = box;
}
area.addEventListener("click", () => {
  getArea();
});

async function getAreaMeals(area) {
  $(".loading").fadeIn(500);
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let res = await api.json();
  $(".loading").fadeOut(500);
  console.log(res.meals);
  displayMeals(res.meals.slice(0, 15));
}


async function getIngredients() {
  SearchContainer.innerHTML = "";
  $(".loading").fadeIn(500);
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let res = await api.json();
  $(".loading").fadeOut(500);
  console.log(res.meals.splice(19, 574));
  displayIngredients(res.meals.slice(0,20));
}
function displayIngredients(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++){
    box += `<div class="col-md-3 p-3">
            <div onclick="getIngredientMeals('${
              arr[i].strIngredient
            }')" class="text-center text-white ">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="px-2 fw-bold my-2">${arr[i].strIngredient}</h3>
                    <p>${
                      arr[i].strDescription.split(" ", 20).join(" ") + "..."
                    }</p>
            </div>
        </div>`;
  }
  rowData.innerHTML = box;
}

ingredients.addEventListener("click", () => {
  getIngredients();
});

async function getIngredientMeals(ingredient) {
  $(".loading").fadeIn(500);
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let res = await api.json();
  $(".loading").fadeOut(500);
  console.log(res.meals);
  displayMeals(res.meals.slice(0,15))
}

async function getDetails(id) {
  SearchContainer.innerHTML = '';
  $(".loading").fadeIn(500);
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let res = await api.json();
  $(".loading").fadeOut(500);
  console.log(res.meals);
  displayDetails(res.meals[0])
}


function displayDetails(meal) {

  let ingredients = ``;
  for (let i = 0; i < 20; i++){
    if (meal[`strIngredient${ i }`]) {
      ingredients += `<li class="alert alert-info mx-2 py-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(',');
  if (!tags) tags = [];
  let tagsStr=``
  for (let i = 0; i < tags.length; i++){
    tagsStr += `<li class="alert alert-danger mx-2 py-1">${tags[i]}</li>`;
  }
  let box = ``;
  
    box += `<div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                <h2 class="text-white fw-bold p-2">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 px-3">
                <h2 class="text-white">Instructions</h2>
                <p class="text-white">${meal.strInstructions}</p>
                    <h4 class="text-white"> <span class="fw-bold px-2">Area:</span>${meal.strArea}</h4>
                    
                    <h4 class="text-white"> <span class="fw-bold px-2">Category:</span>${meal.strCategory}</h4>
                    
                    <h4 class="text-white">Recipes:</h4>
                    <ul class="d-flex flex-wrap list-unstyled text-white">
                        ${ingredients}
                    </ul>
                    <h4 class="text-white">Tags:</h4>
                    <ul class="d-flex flex-wrap list-unstyled text-white">
                        ${tagsStr}
                    </ul>
                    <div class="d-flex ">
                        <a target="_blank"  href="${meal.strSource}" class="btn btn-success text-white mx-2">Source</a>
                        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger text-white">Youtube</a>
                    </div>
            </div>`;
  
  rowData.innerHTML = box;
}

function showContactPage() {
  rowData.innerHTML = `<div class="container min-vh-100 d-flex align-items-center justify-content-center w-75">
            <div class="row py-5 g-3">
                <div class="col-6">
                    <input oninput="inputsValidation()" id="userName" type="text" class="form-control bg-white " placeholder="Enter Your Name">
                </div>
                <div class="col-md-6">
                    <input oninput="inputsValidation()" id="userMail" type="email" class="form-control bg-white " placeholder="Enter Your Email">
                </div>
                <div class="col-md-6">
                    <input oninput="inputsValidation()" id="phoneNumber" type="number" class="form-control bg-white "
                        placeholder="Your Phone Number">
                </div>
                <div class="col-md-6">
                    <input oninput="inputsValidation()" id="userAge" type="number" class="form-control bg-white " placeholder="Your Age">
                </div>
                <div class="col-md-6">
                    <input oninput="inputsValidation()" id="userPass" type="password" class="form-control bg-white " placeholder="Enter Password">
                </div>
                <div class="col-md-6">
                    <input oninput="inputsValidation()" id="rePass" type="password" class="form-control bg-white " placeholder="RePassword">
                </div>
                <div class="row text-center g-3">
                    <div class="col-12">
                        <button id="submitBtn" class="btn btn-outline-danger" disabled type="button">Submit</button>
                    </div>
                    <div class="col-12">
                    <div id="alertBox" class="alert  bg-danger-subtle text-danger rounded-2 my-4 w-100 d-none">Not
                        Valid</div>
                </div>
                </div>
                

            </div>
        </div>`;
}

contact.addEventListener('click', function () {
  showContactPage();
})

function inputsValidation() {
  if (
    nameInput() &&
    mailInput() &&
    phoneInput() &&
    ageInput() &&
    passInput() &&
    repassInput()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
    document.getElementById("alertBox").classList.add("d-none");
    
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
    document.getElementById("alertBox").classList.remove("d-none");
    
  }
}
function nameInput() {
  return (
    /^[a-zA-Z ]+$/.test(document.getElementById('userName').value)
  );
}
function mailInput() {
  return (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      document.getElementById("userMail").value)
  );
}
function phoneInput() {
  return (
    /^([0-9]{11})$/.test(document.getElementById("phoneNumber").value)
  );
}
function ageInput() {
  return (
    /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("userAge").value)
  )
}
function passInput() {
  return (
     /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/.test(
    document.getElementById("userPass").value
  )
  )
}
function repassInput() {
  return (
    document.getElementById("rePass").value ==
    document.getElementById("userPass").value
  );
}



//validation

// userName.addEventListener("input", (e) => {
//   validateInputs(e.target);
// });
// userMail.addEventListener("input", (e) => {
//   validateInputs(e.target);
// });
// phoneNumber.addEventListener("input", (e) => {
//   validateInputs(e.target);
// });
// userAge.addEventListener("input", (e) => {
//   validateInputs(e.target);
// });
// userPass.addEventListener("input", (e) => {
//   validateInputs(e.target);
// });
// rePass.addEventListener("input", (e) => {
//   validateInputs(e.target);
// });
// function validateInputs(ele) {
//   let regex = {
//     userName: /^[a-zA-Z0-9_-]{3,16}$/,
//     userMail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/,
//     phoneNumber: /^([0-9]{11})$/,
//     userAge: /[0-1]{1}[0-9]{0,2}/,
//     userPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$/,
//     rePass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$/,
//   };

//   if (regex[ele.id].test(ele.value)) {
//     submitBtn.removeAttribute("disabled");
//     alertBox.classList.add("d-none");
//   } else {
//     alertBox.classList.remove("d-none");
//     submitBtn.setAttribute("disabled");
//   }
// }
// contact.addEventListener("click", function () {
//   rowData.innerHTML = '';
//   contactPage.classList.remove("d-none");
//   searchPage.classList.add("d-none");
// });
