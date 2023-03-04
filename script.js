window.onload = function() {
    let cartList = document.getElementsByClassName("cartLink");
    for (let cart of cartList) {
        cart.addEventListener("click", addToCart);
    }
};

function addToCart(e) {
    e.preventDefault();
    let coun = JSON.parse(window.localStorage.getItem("cart"));
    let count = coun != null ? ++coun : 1;
    window.localStorage.setItem("cart", count);
    document.getElementById("cartCount").innerHTML = count;
    console.log("clicked");
}