$(document).ready(function () {
  var totalCartPrice = 0;

  function createCheckoutProductCard(data) {
    for (i = 0; i < data.length; i++) {
      var card = $("<div>").addClass("checkout-card");
      var firstDiv = $("<div>");
      var productImg = $("<img>")
        .addClass("checkout-product-img")
        .attr("src", data[i].preview);
      firstDiv.append(productImg);

      var secondDiv = $("<div>");
      var productHeading = $("<h4>").text(data[i].name);
      var productCount = $("<p>").text("x" + data[i].count);
      var amount = $("<span>").text("Amount: Rs ");
      var amountSpan = $("<span>").text(
        parseInt(data[i].count) * parseInt(data[i].price)
      );
      var productAmount = $("<p>").append(amount, amountSpan);
      secondDiv.append(productHeading, productCount, productAmount);

      card.append(firstDiv, secondDiv);
      $("#card-list").append(card);
    }
  }

  var productData = window.localStorage.getItem("product-list");
  productData = productData === null || productData === "" ? [] : productData;
  productData = productData.length > 0 ? JSON.parse(productData) : [];

  createCheckoutProductCard(productData);

  for (var i = 0; i < productData.length; i++) {  
    var totalItemPrice =
      parseFloat(productData[i].count) * parseFloat(productData[i].price);

    totalCartPrice = totalCartPrice + totalItemPrice;
  }

  $("#item-count").text(productData.length);
  $("#total-amount").text(totalCartPrice);

  $('#btn-place-order').click(function() {

    var orderItemArr = [];
    for(var i=0; i<productData.length; i++) {
        var prodObj = {
            "id": productData[i].id,
            "brand": productData[i].brand,
            "name": productData[i].name,
            "price": productData[i].price,
            "preview": productData[i].preview,
            "isAccessory": productData[i].isAccessory
        }

        orderItemArr.push(prodObj);
    }


    var dataObj = {
        amount: totalCartPrice,
        products: orderItemArr
    }
    $.post("https://5d76bf96515d1a0014085cf9.mockapi.io/order", dataObj, function() {
        alert("Order Placed Successfully")
        localStorage.setItem("product-list", []);
        location.assign("/thankyou.html");
    })
})
});
