window.onload = function() {
    cartCounter();
};

cartCounter = () => {
    var counter = 0;
    var copyCartItems = JSON.parse(localStorage.getItem("cart_items"));
    (copyCartItems).forEach((element, key) => {
        counter = counter + parseInt(element.count);
    });
    if (parseInt(counter) > 0) {
        document.getElementById("cart_counter").innerHTML = "- (" + counter + ")";
    } else {
        document.getElementById("cart_counter").innerHTML = "";
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
    cartCounter();
}