// screen variables
let homepage;
let information;
let current_body;
let body_goal;
let diet;
let male_body;
let female_body;
let feed;
let cart;

// stat variables
let calories; 
let protein;
let carbs;
let fat;
let height; //in centimeters
let weight;
let age;
let offset;
let gender = "male";
let activity = "sedentary";
let body_type = "";
let goal = ""; //lose, maintain, gain
let diet_pref = "";

// Darian and Jacob
let test = document.getElementById('test');
let test1 = document.getElementById('test1');
let broccoliAndBeefShowing = false;
let sweetAndSourChickenShowing = false;
let veggies = false;
let item_name = "";
let item_img_path = "";
const shopping_cart_names = [];
const shopping_cart_images = [];

let currentCart = [new Recipe("Slow Cooker Chicken Tacos", "Slow-Cooker-Chicken-Tacos.jpg", 600, 12, 15, 21),
new Recipe("Aldredo Dijon Turkey Sandwich", "alfredo-dijon-turkey-sandwich_900x600.jpg", 10, 100, 50, 1)];

// Phil
function Recipe(title, imgurl, calories, fat, carb, protein) {
  this.title = title;
  this.imgurl = "src/recipes/" + imgurl;
  this.calories = calories;
  this.fat = fat;
  this.carb = carb;
  this.protein = protein;
}

let recipes = [
  new Recipe("Slow Cooker Chicken Tacos", "Slow-Cooker-Chicken-Tacos.jpg", 600, 12, 15, 21),
  new Recipe("Aldredo Dijon Turkey Sandwich", "alfredo-dijon-turkey-sandwich_900x600.jpg", 10, 100, 50, 1),
  new Recipe("Simple Chicken And Rice", "", 0, 0, 0, 0),
  new Recipe("Chicken Salad", "", 0, 0, 0, 0),
  new Recipe("Creamy Garlic Chicken Pasta", "", 0, 0, 0, 0),
  new Recipe("Creamy Coconut Sweet Potato", "", 0, 0, 0, 0),
  new Recipe("Salmon Poke Bowl", "", 0, 0, 0, 0),
];

// Main
$(document).ready(function () {
    // ====== Startup ====== 
    console.log("LunchBox")
    homepage = $('#homepage');
    information = $('#information');
    current_body = $('#current_body');
    body_goal = $('#body_goal');
    diet = $('#diet');
    male_body = $('#male_body');
    female_body = $('#female_body');
    feed = $('#feed');
    cart = $('#shopping-cart');

    //hide screens
    information.hide(1);
    current_body.hide(1);
    body_goal.hide(1);
    diet.hide(1);
    male_body.hide(1);
    female_body.hide(1);
    feed.hide(1);
    cart.hide(1);

    //Information Screen
    $("#get_started").click(function(){
      console.log("Get Started!");
      homepage.hide(1);
      information.show(1);
      $('#male').css("background-color", "lightblue");
      //Get Gender 
      $("#male").click(function(){
        gender = "male";
        offset = 5;
        $('#female').css("background-color", "");
        $('#male').css("background-color", "lightblue");
        console.log(gender);
      });
      $("#female").click(function(){
        gender = "female";
        offset = -151;
        $('#male').css("background-color", "");
        $('#female').css("background-color", "lightblue");
        console.log(gender);
      });
      //Get Activity
      $('#exercise').change(function(){ 
        var selectedValue = String(jQuery(this).val());
        console.log(selectedValue);

        if(selectedValue == "sedentary"){
          activity = "sedentary";
        }
        else if(selectedValue == "light"){
          activity = "light";
        }
        else if(selectedValue == "moderate"){
          activity = "moderate";
        }
        else if(selectedValue == "heavy"){
          activity = "heavy";
        }
        else if(selectedValue == "athlete"){
          activity = "athlete";
        }
      });

    });

    //Current Body Screen
    $('#calculate_button').click(function(){
      console.log("Calculated!");
      //Get Age
      age = parseInt($('#age_input').val());
      console.log(age);
      //Get Weight
      let pounds = parseInt($('#weight_input').val());
      weight = pounds * 0.454;
      console.log(weight);
      //Get Height
      let feet = parseInt($('#ft_input').val()); //1 ft = 30.48 cm
      let inches = parseInt($('#in_input').val()); //1 in = 2.54 cm
      height = (feet * 30.48) + (inches * 2.54);
      console.log(height);

      //see if user filled out everything
      if(isNaN(age) || isNaN(weight) || isNaN(feet) || isNaN(inches)){
        alert("Please correctly fill out all forms!");
      }
      else{
        information.hide(1);
        console.log(gender);
        //calcualte BMR, protein, carbs, fat
        calories = ((10 * weight) + (6.25 * height) - (5 * age) + offset);
        if(activity == "sedentary"){
          calories *= 1.25;
        }
        else if(activity == "light"){
          calories *= 1.375;
        }
        else if(activity == "moderate"){
          calories *= 1.55;
        }
        else if(activity == "heavy"){
          calories *= 1.725;
        }
        else if(activity == "athlete"){
          calories *= 1.9;
        }
        console.log(calories);
        protein = calories * 0.3;
        carbs = calories * 0.35;
        fat = calories * 0.35;

        //show current body screens
        if(gender == "male"){
          current_body.show(1);
          male_body.show(1);
        }
        else{
          current_body.show(1);
          female_body.show(1);
        }
      }
    });

    //image clicking
    $("#male_under").click(function(){
      $('#male_under1').css("border-color", "white");
      $('#male_normal1').css("border-color", "transparent");
      $('#male_over1').css("border-color", "transparent");
      body_type = "under";
    });
    $("#male_normal").click(function(){
      $('#male_normal1').css("border-color", "white");
      $('#male_under1').css("border-color", "transparent");
      $('#male_over1').css("border-color", "transparent");
      body_type = "normal";
    });
    $("#male_over").click(function(){
      $('#male_over1').css("border-color", "white");
      $('#male_normal1').css("border-color", "transparent");
      $('#male_under1').css("border-color", "transparent");
      body_type = "over";
    });

    $("#female_under").click(function(){
      $('#female_under1').css("border-color", "white");
      $('#female_normal1').css("border-color", "transparent");
      $('#female_over1').css("border-color", "transparent");
      body_type = "under";
    });
    $("#female_normal").click(function(){
      $('#female_normal1').css("border-color", "white");
      $('#female_under1').css("border-color", "transparent");
      $('#female_over1').css("border-color", "transparent");
      body_type = "normal";
    });
    $("#female_over").click(function(){
      $('#female_over1').css("border-color", "white");
      $('#female_normal1').css("border-color", "transparent");
      $('#female_under1').css("border-color", "transparent");
      body_type = "over";
    });

    //body goal page
    $("#to_body").click(function(){
      if(body_type == ""){
        alert("Please select your current body representation");
      }
      else{
        console.log(body_type);
        current_body.hide(1);
        body_goal.show(1);
      }
    });

    $('#lose_weight_button').click(function(){
      goal = "lose";
    });
    $('#maintain_weight_button').click(function(){
      goal = "maintain";
    });
    $('#gain_weight_button').click(function(){
      goal = "gain";
    });

    //diet preference page
    $("#to_diet").click(function(){
      if(goal == ""){
        alert("Please select your body goal");
      }
      else{
        console.log(goal);
        body_goal.hide(1);
        diet.show(1);
      }
    });

    $('#meats').click(function(){
      diet_pref = "meats";
    });
    $('#vegetarian').click(function(){
      diet_pref = "vegetarian";
    });
    $('#pescetarian').click(function(){
      diet_pref = "pescetarian";
    });
    //feed page
    $("#to_feed").click(function(){
      if(diet_pref == ""){
        alert("Please select a dietary preference");
      }
      else{
        console.log(diet_pref);
        diet.hide(1);
        feed.show(1);
      }
    });

    // $('#test').click(function () {
    //   if (broccoliAndBeefShowing === false) {
    //     let addText = document.getElementById("insert_text")
    //     addText.innerHTML = "<h1>640 Calories</h1>" + "<h3>Macronutrients</h3>" + "<ul><li>45g protein</li>" + "<li>77g fat</li>" + "<li>99g carbohydrates</li>" + "</ul>"
    //     broccoliAndBeefShowing = true
    //   }
    //   else {
    //     let addText = document.getElementById("insert_text")
    //     addText.innerHTML = ""
    //     broccoliAndBeefShowing = false
    //   }
    // });

    // $('#test1').click(function () {
    //   if (sweetAndSourChickenShowing === false) {
    //     let addText = document.getElementById("insert_chicken")
    //     addText.innerHTML = "<h1>450 Calories</h1>" + "<h3>Macronutrients</h3>" + "<ul><li>43g protein</li>" + "<li>76g fat</li>" + "<li>50g carbohydrates</li>" + "</ul>"
    //     sweetAndSourChickenShowing = true
    //   }
    //   else {
    //     let addText = document.getElementById("insert_chicken")
    //     addText.innerHTML = ""
    //     sweetAndSourChickenShowing = false
    //   }
    // });

    // $('#test2').click(function () {
    //   if (veggies === false) {
    //     let addText = document.getElementById("insert_veg")
    //     addText.innerHTML = "<h1>400 Calories</h1>" + "<h3>Macronutrients</h3>" + "<ul><li>33g protein</li>" + "<li>50g fat</li>" + "<li>86g carbohydrates</li>" + "</ul>"
    //     veggies = true
    //   }
    //   else {
    //     let addText = document.getElementById("insert_veg")
    //     addText.innerHTML = ""
    //     veggies = false
    //   }
    // });

    //cart page
    $("#to_cart").click(function(){
      feed.hide(1);
      cart.show(1);

      populateCart();
      updateMacros();
    });

    $(".btn").click(function(){
      item_name = $(this).parent().find('h2').html();
      item_img = $(this).parent().parent().find('img').attr('src');
      if(!(shopping_cart_names.includes(item_name))){
        shopping_cart_names.push(item_name);
        shopping_cart_images.push(item_img);
        $(this).text("Remove From Cart");
        $(this).css('background-color', 'red');
        console.log(shopping_cart_names);
      }
      else{
        const item_index = shopping_cart_names.indexOf(item_name);
        shopping_cart_names.splice(item_index, 1);
        shopping_cart_images.splice(item_index,1);
        $(this).text("Add to Cart");
        $(this).css('background-color', '#9dc183');
        console.log(shopping_cart_names);
      }
    });
});

// ADD FUNCTIONS HERE:
function populateFeed() {

}

function html_feed(title) {
  // innerHTML for feed
}

// title, imgurl, calories, fat, carb, protein

function populateCart() {
  for(var i = 0; i < currentCart.length; i++) {
    let cartItem = currentCart[i];
    html_cart(cartItem.title,
              cartItem.imgurl,
              cartItem.calories,
              cartItem.fat,
              cartItem.carb,
              cartItem.protein);
  }
}

function html_cart(title, imgurl, cal, fat, carb, protein) {
  // innerHTML for cart
  document.getElementById("recipe-list").innerHTML +=
    "<li class=\"recipe-list-item\">" +
      "<div class=\"recipe-card-image\">" +
        "<img src=\"" + imgurl + "\" alt=\"\">" +
      "</div>" +
      "<div class=\"recipe-title\">" + title + "</div>" +
      "<div class=\"recipe-macros\">" +
        "<span id=\"\" class=\"calorie-count\">" + cal + "</span> calories, " +
        "<span id=\"\" class=\"fat-count\">" + fat + "</span> fats, " +
        "<span id=\"\" class=\"carb-count\">" + carb + "</span> carbs, " +
        "<span id=\"\" class=\"protein-count\">" + protein + "</span> protein" +
      "</div>" +
    "</li>";
}

function updateMacros() {
  var pcal = 0, pfat = 0, pcarb = 0, pprotein = 0;

  for(var i = 0; i < currentCart.length; i++) {
    let cartItem = currentCart[i];
    console.log("this is: " + cartItem.title + " " + cartItem.calories);
    pcal += cartItem.calories;
    pfat += cartItem.fat;
    pcarb += cartItem.carb;
    pprotein += cartItem.protein;
  }

  console.log("updatiung macros " + pcal);

  document.getElementById("p-calorie-count").textContent = pcal;
  document.getElementById("p-fat-count").textContent = pfat;
  document.getElementById("p-carb-count").textContent = pcarb;
  document.getElementById("p-protein-count").textContent = pprotein;
}