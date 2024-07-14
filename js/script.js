/// <reference types="../@types/jquery" />

// * global
let searchInputs = document.querySelector("#searchContainer");
let containerOfData = document.querySelector("#dataContainer");


$(document).ready(() => {
  searchWithName("")
})

// * side navbar -------------------------------START

//~ close sidebar nav
function closeSideNav() {
  let navTabWidth = $(".nav-tab").outerWidth();
  // console.log(navTabWidth);
  // console.log("close");
  $(".side-navbar-container").animate({ left: -navTabWidth }, 600)

  $(".toggle-sidebar-icon").addClass("fa-align-justify");
  $(".toggle-sidebar-icon").removeClass("fa-x");


  let $ulNav = $(".ul-nav li");
  $ulNav.each(function (index) {
    $(this).animate({
      top: 200
    }, (index + 5) * 100);
  });
}

//~ open sidebar nav
function openSideNav() {

  $(".side-navbar-container").animate({
    left: 0
  }, 600)

  // console.log("open");
  $(".side-navbar-container").animate({ left: 0 }, 500)

  $(".toggle-sidebar-icon").removeAttr("fa-align-justify");
  $(".toggle-sidebar-icon").addClass("fa-x");

  let $ulNav = $(".ul-nav li");
  $ulNav.each(function (index) {
    $(this).animate({
      top: 0
    }, (index + 5) * 150);
  });
}

//~ activate function of open and close sidebar nav
$(".toggle-sidebar-icon").on("click", function () {
  if ($(".side-navbar-container").css("left") == "0px") {
    closeSideNav()
  }
  else {
    openSideNav()
  }
})


// &--------------------------------------END

// * get categories data from Api and display it in html ----------------------------START

// ~ get categories data
async function getCategories() {
  $(".loading-screen").removeClass("d-none")
  closeSideNav();
  searchInputs.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  let categoriesAll = await response.json();
  let categoriesData = categoriesAll.categories;
  $(".loading-screen").addClass("d-none")

  displayCategories(categoriesData)
  // console.log(categoriesData);
}

// ~ display categories data
function displayCategories(array) {
  let cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
    <div class="col-md-4 col-lg-3 col-sm-6">
        <div onclick="getcategoryDetails('${array[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
          <img class="w-100" src="${array[i].strCategoryThumb}" alt="categories image">
          <div class="meal-layer position-absolute text-center text-black p-2">
            <h3>${array[i].strCategory}</h3>
            <p>${array[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById("dataContainer").innerHTML = cartona;
}

$(".categoriesAnchor").on("click", () => {
  // console.log("cattttt");
  getCategories()
})
// &--------------------------------------END

// * get area data from Api and display it in html ------------------------------START
// ~ get area data
async function getarea() {
  $(".loading-screen").removeClass("d-none");
  closeSideNav();
  searchInputs.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  let areaAll = await response.json();
  let areaData = areaAll.meals;
  $(".loading-screen").addClass("d-none");

  displayarea(areaData)
  // console.log(areaData);
}


// ~ display area data
function displayarea(array) {
  let cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col-md-4 col-lg-3 col-sm-6 text-center area-cont">
        <div onclick="getareaDetails('${array[i].strArea}')">
          <div class="position-relative overflow-hidden rounded-2 text-white">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${array[i].strArea}</h3>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById("dataContainer").innerHTML = cartona;
}

$(".areaAnchor").on("click", () => {
  // console.log("areaaa");
  getarea()
})


// &--------------------------------------END

// * get ingredient data from Api and display it in html ----------------------------START

// ~ get ingredient data
async function getingredient() {
  $(".loading-screen").removeClass("d-none");
  closeSideNav();
  searchInputs.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  let ingredientAll = await response.json();
  let ingredientData = ingredientAll.meals.slice(0, 20);
  $(".loading-screen").addClass("d-none");

  displayingredient(ingredientData)
  // console.log(ingredientData);
}


// ~ display ingredient data
function displayingredient(array) {
  let cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
    <div onclick="getIngredientsDetails('${array[i].strIngredient}')" class="ingredients col-md-4 col-lg-3 col-sm-6">
                <div class="position-relative overflow-hidden rounded-2 text-white text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${array[i].strIngredient}</h3>
                    <p>
                    <p>${array[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </p>
                </div>
            </div>
    `
  }
  document.getElementById("dataContainer").innerHTML = cartona;
}

$(".ingredientAnchor").on("click", () => {
  // console.log("ingredientaa");
  getingredient()
})


// &--------------------------------------END

// * get meals details of categories and area and Ingredients ------------------------------START

//~ categories
async function getcategoryDetails(category) {
  $(".loading-screen").removeClass("d-none");
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let categoryDetailsAll = await response.json();
  let categoryDetailsData = categoryDetailsAll.meals;
  $(".loading-screen").addClass("d-none");

  displayAllMeals(categoryDetailsData)
  // console.log(categoryDetailsData);
}

//~ area
async function getareaDetails(area) {
  $(".loading-screen").removeClass("d-none");

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let areaDetailsAll = await response.json();
  let areaDetailsData = areaDetailsAll.meals;
  $(".loading-screen").addClass("d-none");

  displayAllMeals(areaDetailsData)
  // console.log(areaDetailsData);
}

//~ ingredients
async function getIngredientsDetails(ingredients) {
  $(".loading-screen").removeClass("d-none");
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  let ingredientsDetailsAll = await response.json();
  let ingredientsDetailsData = ingredientsDetailsAll.meals;
  $(".loading-screen").addClass("d-none");

  displayAllMeals(ingredientsDetailsData)
  console.log(ingredientsDetailsData);
}

// &--------------------------------------END

// * display meals by ((categories and area and Ingredients)) --------------------START
function displayAllMeals(array) {
  let cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
    <div class="col-md-4 col-lg-3 col-sm-6">
        <div onclick="getDetailsOfMeal('${array[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${array[i].strMealThumb}" alt="meal image">
          <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
            <h3>${array[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById("dataContainer").innerHTML = cartona;
}

// &--------------------------------------END

// * get details of each meal and displlay it --------------------START
// ~ get
async function getDetailsOfMeal(mealId) {
  $(".loading-screen").removeClass("d-none");
  searchInputs.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  let detailsForMealAll = await response.json();
  let detailsForMealData = detailsForMealAll.meals[0];
  $(".loading-screen").addClass("d-none");

  displayDetailsOfMeal(detailsForMealData)
  // console.log(detailsForMealData);
}
// ~display
function displayDetailsOfMeal(meal) {
  let cartona = ``;
  cartona += `
            <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="meal details image">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <div class="recipes">
                    <span>${meal.strIngredient1}</span>
                    <span>${meal.strIngredient2}</span>
                    <span>${meal.strIngredient3}</span>
                    <span>${meal.strIngredient4}</span>
                    <span>${meal.strIngredient5}</span>
                    <span>${meal.strIngredient6}</span>
                    <span>${meal.strIngredient7}</span>
                    <span>${meal.strIngredient8}</span>
                    <span>${meal.strIngredient9}</span>
                    <span>${meal.strIngredient10}</span>
                </div>
                <h3>Tags :</h3>
                <span class="meal-tag bg-secondary d-block mb-3">${meal.strTags}</span>
                <a target="_blank" href="${meal.strSource}"
                    class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `
  document.getElementById("dataContainer").innerHTML = cartona;
}
// &--------------------------------------END
// * display search inputs and search by-name and by-first-letter
// ~ display
function displaySearchInputs() {
  closeSideNav();

  document.getElementById("searchContainer").innerHTML = `
  <div class="row py-5 g-3">
      <div class="col-md-6">
        <input onkeyup="searchWithName(this.value)" class="form-control bg-transparent fw-bold text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
        <input onkeyup="searchWithFirstLetter(this.value)" class="form-control bg-transparent fw-bold text-white" maxlength="1" type="text" placeholder="Search By First Letter">
      </div>
      </div>
  `
  containerOfData.innerHTML = "";
}
$(".searchAnchor").on("click", function () {
  // console.log("search");
  displaySearchInputs()
})

//~ search by-name
async function searchWithName(name) {
  try {
    $(".loading-screen").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let allsearch = await response.json();
    let searchResultData = allsearch.meals;
    if (searchResultData) {
      $(".loading-screen").addClass("d-none");
      displayAllMeals(searchResultData);
    }
    else if ((name == "")) {
      name = []
    }
    else {
      Swal.fire("Sorry, no meal with this name was found !");
      $(".loading-screen").addClass("d-none");
    }
  } catch (error) {
    console.log("ERROR");
  }

}

//~ search by-first-letter
async function searchWithFirstLetter(letter) {
  if (letter === "") {
    letter = "a";
  }
  try {
    $(".loading-screen").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let allsearchLetter = await response.json();
    let searchResultDataLetter = allsearchLetter.meals;
    $(".loading-screen").addClass("d-none");

    displayAllMeals(searchResultDataLetter);

  } catch (error) {
    Swal.fire("Sorry, no meal with this name was found !");
    $(".loading-screen").addClass("d-none");
  }
}
// &--------------------------------------END
// * dispaly contact-us in html and validate of the data
// ~ display contact form to user
function displayContactUs() {
  closeSideNav();
  searchInputs.innerHTML = "";

  document.getElementById("dataContainer").innerHTML = `
   <div class="contact d-flex align-content-center justify-content-center vh-100">
            <div class="row py-5 g-4 w-75 m-auto">
                <div class="col-md-6">
                    <input onkeyup="validateAllInputs()" id="nameInput" type="text" class="form-control mb-2" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 d-none">
                        One uppercase letter and then 3 to 8 lowercase letters
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validateAllInputs()" id="mailInput" type="email" class="form-control mb-2 " placeholder="Enter Your Email">
                    <div id="mailAlert" class="alert alert-danger w-100 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validateAllInputs()" id="phoneInput" type="text" class="form-control mb-2 " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validateAllInputs()" id="ageInput" type="number" class="form-control mb-2 " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validateAllInputs()" id="passwordInput" type="password" class="form-control mb-2 " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number*
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validateAllInputs()" id="repasswordInput" type="password" class="form-control mb-2" placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 d-none">
                        Please Make Sure Your Passwords are Matched 
                    </div>
                </div>
                <button disabled id="submitBtn" class="btn btn-outline-danger mx-auto w-25 mt-3">Submit</button>
            </div>
        </div>
  `
  // ~ to check if user touched current iuput and then activate validation when user focus on each input
  $('#nameInput').on('focus', () => {
    nameInputFoucused = true;
    // console.log("focussss");
  });
  $('#mailInput').on('focus', () => {
    emailInputFoucused = true;
  });
  $('#phoneInput').on('focus', () => {
    phoneInputFoucused = true;
  });
  $('#ageInput').on('focus', () => {
    ageInputFoucused = true;
  });
  $('#passwordInput').on('focus', () => {
    passwordInputFoucused = true;
  });
  $('#repasswordInput').on('focus', () => {
    repasswordInputFoucused = true;
  });

}

// ~ calling contact form when user click
$(".contactAnchor").on("click", function () {
  // console.log("contact")
  displayContactUs()
})

// --------------------------------------------
// ~ validate the data on contact form
// ! validate name input
function validateName() {
  let nameInput = document.querySelector("#nameInput")
  let regex = /^[A-Z][a-z]{3,8}$/;
  let text = nameInput.value;
  // console.log(text);
  if (regex.test(text) == true) {
    $("#nameInput").addClass("is-valid");
    $("#nameInput").removeClass("is-invalid");
    return true;
  }
  else {
    $("#nameInput").addClass("is-invalid");
    $("#nameInput").removeClass("is-valid");
    return false;
    // console.log("false");
  }
}

// ! validate mail input
function validateMail() {
  let mailInput = document.querySelector("#mailInput")
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let text = mailInput.value;

  if (regex.test(text) == true) {
    $("#mailInput").addClass("is-valid");
    $("#mailInput").removeClass("is-invalid");
    return true;
  }
  else {
    $("#mailInput").addClass("is-invalid");
    $("#mailInput").removeClass("is-valid");
    return false;
  }
}

// ! validate phone input
function validatePhone() {
  let phoneInput = document.querySelector("#phoneInput")
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let text = phoneInput.value;

  if (regex.test(text) == true) {
    $("#phoneInput").addClass("is-valid");
    $("#phoneInput").removeClass("is-invalid");
    return true;
  }
  else {
    $("#phoneInput").addClass("is-invalid");
    $("#phoneInput").removeClass("is-valid");
    return false;
  }
}

// ! validate age input
function validateAge() {
  let ageInput = document.querySelector("#ageInput")
  let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  let text = ageInput.value;

  if (regex.test(text) == true) {
    $("#ageInput").addClass("is-valid");
    $("#ageInput").removeClass("is-invalid");
    return true;
  }
  else {
    $("#ageInput").addClass("is-invalid");
    $("#ageInput").removeClass("is-valid");
    return false;
  }
}

// ! validate Password input
function validatePassword() {
  let passwordInput = document.querySelector("#passwordInput")
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  let text = passwordInput.value;
  console.log(text);

  if (regex.test(text) == true) {
    $("#passwordInput").addClass("is-valid");
    $("#passwordInput").removeClass("is-invalid");
    return true;
  }
  else {
    $("#passwordInput").addClass("is-invalid");
    $("#passwordInput").removeClass("is-valid");
    return false;
  }
}

// ! validate rePassword input
function validateRePassword() {
  let passwordInput = document.querySelector("#passwordInput")
  let repasswordInput = document.querySelector("#repasswordInput")
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  let text = passwordInput.value;
  let retext = repasswordInput.value;
  console.log(text);
  console.log(retext);

  if (regex.test(retext) == true && text === retext) {
    $("#repasswordInput").addClass("is-valid");
    $("#repasswordInput").removeClass("is-invalid");
    return true;
  }
  else {
    $("#repasswordInput").addClass("is-invalid");
    $("#repasswordInput").removeClass("is-valid");
    return false;
  }
}

// ! validate All inputs

let nameInputFoucused = false;
let emailInputFoucused = false;
let phoneInputFoucused = false;
let ageInputFoucused = false;
let passwordInputFoucused = false;
let repasswordInputFoucused = false;

function validateAllInputs() {
  let submitBtn = document.getElementById("submitBtn")

  if (nameInputFoucused == true) {
    if (validateName() == true) {
      $("#nameAlert").addClass("d-none");
    }
    else {
      $("#nameAlert").removeClass("d-none");
    }
  }
  if (emailInputFoucused == true) {
    if (validateMail() == true) {
      $("#mailAlert").addClass("d-none");
    }
    else {
      $("#mailAlert").removeClass("d-none");
    }
  }
  if (phoneInputFoucused == true) {
    if (validatePhone()) {
      $("#phoneAlert").addClass("d-none");
    }
    else {
      $("#phoneAlert").removeClass("d-none");
    }
  }
  if (ageInputFoucused == true) {
    if (validateAge()) {
      $("#ageAlert").addClass("d-none");
    }
    else {
      $("#ageAlert").removeClass("d-none");
    }
  }
  if (passwordInputFoucused == true) {
    if (validatePassword()) {
      $("#passwordAlert").addClass("d-none");
    }
    else {
      $("#passwordAlert").removeClass("d-none");
    }
  }
  if (repasswordInputFoucused == true) {
    if (validateRePassword()) {
      $("#repasswordAlert").addClass("d-none");
    }
    else {
      $("#repasswordAlert").removeClass("d-none");
    }
  }

  if (validateName() == true &&
    validateMail() == true &&
    validatePhone() == true &&
    validateAge() == true &&
    validatePassword() == true &&
    validateRePassword() == true) {
    submitBtn.removeAttribute("disabled")
    // console.log("okkkkkk");
  }
  else {
    submitBtn.setAttribute("disabled", true)
    // console.log("notttttttok");
  }
}

// & ----------------------------------------------------------END