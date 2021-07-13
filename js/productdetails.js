$(document).ready(function () {
  var detailsWrapper = document.getElementById("details-wrapper");
  var leftBigImg = document.getElementById("left-big-img");

  var apiData = null;

  var queryId = +location.search.split("-")[1];

  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + queryId,
    function (productData) {
      apiData = productData;
      function createCard(productDetails) {
        leftBigImg.src = productDetails.preview;

        var heading = document.createElement("h1");
        heading.classList = "details-heading";
        heading.innerHTML = productDetails.name;
        detailsWrapper.appendChild(heading);

        var brand = document.createElement("p");
        brand.classList = "details-brand-name";
        brand.innerHTML = productDetails.brand;
        detailsWrapper.appendChild(brand);

        var price = document.createElement("p");
        var spanTag = document.createElement("span");
        spanTag.classList = "price-value";
        spanTag.innerHTML = productDetails.price;
        price.innerHTML = "Price: Rs ";
        price.appendChild(spanTag);
        detailsWrapper.appendChild(price);

        var descriptionPara = document.createElement("p");
        descriptionPara.innerHTML = "Description";
        detailsWrapper.appendChild(descriptionPara);

        var descDetails = document.createElement("p");
        descDetails.classList = "details-desc-data";
        descDetails.innerHTML = productData.description;
        detailsWrapper.appendChild(descDetails);

        var previewPara = document.createElement("p");
        previewPara.innerHTML = "Product Preview";
        detailsWrapper.appendChild(previewPara);

        previwCard(productDetails); //function call for creating preview card

        var cartBtn = document.createElement("button");
        cartBtn.id = "cart-" + queryId;
        cartBtn.classList.add("btn-add-cart");
        cartBtn.innerHTML = "Add to Cart";
        cartBtn.addEventListener("click", function () {
          this.classList.add("btn-clicked");
          setTimeout(() => {
            this.classList.remove("btn-clicked");
          }, 200);

          var productData = window.localStorage.getItem("product-list");
          productData =
            productData === null || productData === "" ? [] : productData;
          productData = productData.length > 0 ? JSON.parse(productData) : [];

          var posFoundProduct = -1;
          for (var i = 0; i < productData.length; i++) {
            // console.log(productList[i].id);
            if (parseInt(productData[i].id) == parseInt(apiData.id)) {
              posFoundProduct = i;
            }
          }

          if (posFoundProduct > -1) {
            productData[posFoundProduct].count =
              productData[posFoundProduct].count + 1;
            window.localStorage.setItem(
              "product-list",
              JSON.stringify(productData)
            );
          } else {
            apiData.count = 1;
            productData.push(apiData);
            window.localStorage.setItem(
              "product-list",
              JSON.stringify(productData)
            );
          }

          var totalCount = 0;
          for (var i = 0; i < productData.length; i++) {
            totalCount = totalCount + productData[i].count;
          }

          $("#header-cart-count").text(totalCount);
        });

        detailsWrapper.appendChild(cartBtn);
      }

      //function call for creating main card to render html
      createCard(productData);

      // initiate  preview card loop
      function previwCard(productData) {
        var previewImgDiv = document.createElement("div");
        previewImgDiv.classList = "details-product-img-wrapper";

        for (i = 0; i < productData.photos.length; i++) {
          function createpreviewCardsIndex(pdata, i, imageWrapper) {
            //loop function for id or index
            createPreviewCard(pdata, i, imageWrapper);
            //call for creating preview image
          }
          createpreviewCardsIndex(productData, i, previewImgDiv); //call of loop function
        }

        detailsWrapper.appendChild(previewImgDiv);
      }

      //function for creating preview image by loop and adding event listner
      function createPreviewCard(productData, indx, imageWrapperDiv) {
        var previewImg = document.createElement("img");
        previewImg.classList = "details-product-img";
        previewImg.src = productData.photos[indx];
        previewImg.id = indx;
        imageWrapperDiv.appendChild(previewImg);

        if (previewImg.id == 0) {
          previewImg.classList.add("active-card");
        }

        previewImg.addEventListener("click", function btnClicked() {
          leftBigImg.src = productData.photos[indx];
          var allPreviewCard = document.getElementsByClassName(
            "details-product-img"
          );
          for (i = 0; i < allPreviewCard.length; i++) {
            allPreviewCard[i].classList.remove("active-card");
            this.classList.add("active-card");
          }
        });
      }
    }
  );
});

// creating main card to render on html
