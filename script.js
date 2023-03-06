window.onload = function() {
    let cartList = document.getElementsByClassName("cartLink");
    for (let cart of cartList) {
        cart.addEventListener("click", addToCart);
    }

    setAddToCart();
};

function addToCart(e) {
    e.preventDefault();
    let coun = JSON.parse(window.localStorage.getItem("cart"));
    let count = coun != null ? ++coun : 1;
    window.localStorage.setItem("cart", count);
    document.getElementById("cartCount").innerHTML = count;
    console.log("clicked");
}

function setAddToCart() {
    if (localStorage.getItem("cart_items") == null) {
        var cart_items = []
        localStorage.setItem("cart_items", JSON.stringify(cart_items));
    }
}

roundUpTwo = number => {
    return Math.round(number * 100) / 100;
}

checkAndSetItemToCart = (item = null) => {
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
    alert("Item get successfully added to the cart")
}