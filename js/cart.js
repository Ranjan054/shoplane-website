$(document).ready(function() {
    var productData = window.localStorage.getItem("product-list");
    productData = productData === null || productData === "" ? [] : productData;
    productData = productData.length > 0 ? JSON.parse(productData) : [];

    var totalCount = 0;
    for(var i=0; i<productData.length; i++) {
        totalCount = totalCount + productData[i].count;
    }

    $("#header-cart-count").text(totalCount);
})