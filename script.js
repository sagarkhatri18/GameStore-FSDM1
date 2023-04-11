window.onload = function () {
  cartCounter();
  fetchLoginData();
};

cartCounter = () => {
  var counter = 0;
  var copyCartItems = JSON.parse(localStorage.getItem("cart_items"));
  if (copyCartItems != null) {
    copyCartItems.forEach((element, key) => {
      counter = counter + parseInt(element.count);
    });
    if (parseInt(counter) > 0) {
      document.getElementById("cart_counter").innerHTML = "- (" + counter + ")";
    } else {
      document.getElementById("cart_counter").innerHTML = "";
    }
  } else {
    localStorage.setItem("cart_items", JSON.stringify([]));
  }
};

checkAndSetItemToCart = (item = null) => {
  // debugger
  var cartItems = JSON.parse(localStorage.getItem("cart_items"));
  var clickedProduct =
    item == null
      ? localStorage.getItem("clicked_product")
      : JSON.stringify(item);

  var clickedJson = JSON.parse(clickedProduct);
  var clickedId = clickedJson.id;
  var clickedStock = clickedJson.stock;
  var added = true;

  if (cartItems.length == 0) {
    cartItems.push({
      count: 1,
      id: clickedId,
      data: clickedProduct,
      stock: --clickedStock,
    });
  } else {
    var productIdArray = [];
    cartItems.forEach((element, key) => {
      var productId = JSON.parse(element.data).id;
      productIdArray.push(productId);
    });

    if (productIdArray.includes(clickedId)) {
      var index = productIdArray.indexOf(clickedId);
      if (cartItems[index].count < clickedStock) {
        cartItems[index].count++;
        cartItems[index].stock--;
      } else {
        added = false;
      }
    } else {
      cartItems.push({
        count: 1,
        id: clickedId,
        data: clickedProduct,
        stock: --clickedStock,
      });
    }
  }

  if (added) {
    $.toast({
      heading: "Item Added",
      text: "Item get successfully added to the cart",
      showHideTransition: "slide",
      icon: "success",
      position: "bottom-right",
      allowToastClose: true,
    });
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    cartCounter();
  } else
    $.toast({
      heading: "Quantity not in stock",
      text: "Selected quantity is not available",
      showHideTransition: "slide",
      position: "bottom-right",
      allowToastClose: true,
      bgColor: "red",
      textColor: "white",
    });
};

reduce_item_in_cart = (item) => {
  var cartItems = JSON.parse(localStorage.getItem("cart_items"));
  var clickedId = item.id;
  var productIdArray = [];
  var added = true;

  cartItems.forEach((element, key) => {
    var productId = JSON.parse(element.data).id;
    productIdArray.push(productId);
  });

  if (productIdArray.includes(clickedId)) {
    var index = productIdArray.indexOf(clickedId);
    var { count, stock } = cartItems[index];
    if (count > 1) {
      cartItems[index].count--;
      cartItems[index].stock++;
    } else {
      added = false;
      console.log("Not able to reduce the cart item");
    }
  } else {
    console.log("item to remove doesn't exist");
  }
  localStorage.setItem("cart_items", JSON.stringify(cartItems));
  cartCounter();
};

// get executed when "Add To Cart" button from the product was clicked
addToCart = (item) => checkAndSetItemToCart(item);

/* Login features start */
var credentials = [];

/* Categories */

// fetch login data from the JSON file
const fetchLoginData = () => {
  $.ajax({
    url: "./data/login.json",
    dataType: "json",
    success: function (data) {
      credentials.push(data.users);
    },
    error: function (err) {
      console.log(err);
    },
  });
};

var checkLoggedIn = localStorage.getItem("loggedIn");

$("#sign_in_menu").html(checkLoggedIn === "true" ? "Logout" : "Sign In");

$("#sign_in_menu").on("click", function () {
  if (checkLoggedIn === "true") {
    logout();
  } else {
    $("#exampleModal").modal("show");
  }
});

$("#login-submit").on("click", function () {
  var email = $(`#email_address`);
  var password = $(`#password`);
  var isInputset = !(email.val() == "" || password.val() == "");

  email.next().html(email.val() == "" ? "This field is required" : "");
  password.next().html(password.val() == "" ? "This field is required" : "");

  if (isInputset) {
    var bothMatch = false;
    $.each(credentials[0], function (key, val) {
      if (val.email_address == email.val() && val.password == password.val()) {
        return (bothMatch = true);
      }
    });

    password
      .next()
      .html(!bothMatch ? "Sorry, wrong e-mail address or password" : "");
    if (bothMatch) {
      localStorage.setItem("loggedIn", true);
      window.location.reload();
    } else {
      localStorage.setItem("loggedIn", false);
    }
  }
});

// get cexecuted when the user clicked logout menu
function logout() {
  localStorage.setItem("loggedIn", false);
  window.location.reload();
}
// convert the string to slug
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

roundUpTwo = (number) => Math.round(number * 100) / 100;
