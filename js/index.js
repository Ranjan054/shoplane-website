console.log("file have been conected to js");
$(document).ready(function () {

  $(".carousel").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

 

  function createHomePageItems(productList) {
    for (i = 0; i < productList.length; i++) {
      var card = document.createElement("div");
      card.className = "card-wrapper";
      card.id = "item-" + productList[i].id;

      var image = document.createElement("img");
      image.className = "coll-img";
      image.src = productList[i].preview;
      card.appendChild(image);

      var content = document.createElement("div");
      content.className = "coll-content";

      var heading = document.createElement("h3");
      heading.innerHTML = productList[i].name;
      content.appendChild(heading);

      var brandName = document.createElement("p");
      brandName.className = "coll-brand";
      brandName.innerHTML = productList[i].brand;
      content.appendChild(brandName);

      var price = document.createElement("p");
      price.className = "coll-price";
      price.innerHTML = "Rs " + productList[i].price;
      content.appendChild(price);

      card.appendChild(content);

      card.addEventListener("click", function () {
        location.href = "productdetails.html?"+"id"+"="+this.id;
      });

      if (!productList[i].isAccessory) {
        $("#clothe-collection").append(card);
      } else {
        $("#accessories-collection").append(card);
      }
    }
  }

  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    function (productList) {
   
      createHomePageItems(productList);
     
    }
  );
});
