window.onload = function() {
    cartCounter();
    fetchLoginData();
};

cartCounter = () => {
    var counter = 0;
    var copyCartItems = JSON.parse(localStorage.getItem("cart_items"));
    if (copyCartItems != null) {
        (copyCartItems).forEach((element, key) => {
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
}

roundUpTwo = number => Math.round(number * 100) / 100;

checkAndSetItemToCart = (item = null) => {
    debugger
    var copyCartItems = JSON.parse(localStorage.getItem("cart_items"));
    var clickedProduct = (item == null) ? localStorage.getItem("clicked_product") : JSON.stringify(item);

    if (copyCartItems.length == 0) {
        (copyCartItems).push({
            "count": 1,
            "id": JSON.parse(clickedProduct).id,
            "data": clickedProduct
        });
    } else {

        var productIdArray = [];
        (copyCartItems).forEach((element, key) => {
            var productId = JSON.parse(element.data).id;
            productIdArray.push(productId);
        });


        var clickedProductId = JSON.parse(clickedProduct).id;
        if (productIdArray.includes(clickedProductId)) {
            var index = productIdArray.indexOf(clickedProductId)
            copyCartItems[index].count++;
        } else {
            copyCartItems.push({
                "count": 1,
                "id": clickedProductId,
                "data": clickedProduct
            })
        }
    }

    localStorage.setItem("cart_items", JSON.stringify(copyCartItems));

    $.toast({
        heading: 'Item Adeed',
        text: 'Item get successfully added to the cart',
        showHideTransition: 'slide',
        icon: 'success',
        position: 'top-right',
        allowToastClose: true
    })

    cartCounter();
}

// convert the string to slug
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// get executed when "Add To Cart" button from the product was clicked
addToCart = (item) => checkAndSetItemToCart(item)


/* Login features start */
var credentials = [];

// fetch login data from the JSON file
const fetchLoginData = () => {
    $.ajax({
        url: './data/login.json',
        dataType: 'json',
        success: function(data) {
            credentials.push(data.users)
        },
        error: function(err) {
            console.log(err)
        }
    });
}


var checkLoggedIn = localStorage.getItem('loggedIn')

$('#sign_in_menu').html(checkLoggedIn === 'true' ? 'Logout' : 'Sign In')

$('#sign_in_menu').on('click', function() {
    if (checkLoggedIn === 'true') {
        logout()
    } else {
        $("#exampleModal").modal('show')
    }
})

$('#login-submit').on('click', function() {
    var email = $(`#email_address`);
    var password = $(`#password`);
    var isInputset = !(email.val() == "" || password.val() == "")

    email.next().html(email.val() == "" ? 'This field is required' : '')
    password.next().html(password.val() == "" ? 'This field is required' : '')

    if (isInputset) {
        var bothMatch = false;
        $.each(credentials[0], function(key, val) {
            if (val.email_address == email.val() && val.password == password.val()) {
                return bothMatch = true;
            }
        });

        password.next().html(!bothMatch ? 'Sorry, wrong e-mail address or password' : '')
        if (bothMatch) {
            localStorage.setItem('loggedIn', true)
            window.location.reload();
        } else {
            localStorage.setItem('loggedIn', false)
        }
    }
})

// get cexecuted when the user clicked logout menu
function logout() {
    localStorage.setItem('loggedIn', false)
    window.location.reload();
}