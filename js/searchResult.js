var cookies = [];
var totalDiv = document.getElementById("combo");

var picStr = "";

var ItemInfoObj = "";

readItemInfo("total_images.txt");

$(document).ready(function(){
    retrieveCookie();
    newResultPictures();
});

function newResultPictures(){
    // readItemInfo("total_images.txt");
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].split("=")[0].valueOf() == "searchKey") {
            picStr = cookies[i].split("=")[1];
            break;
        }
    }
    //put search key word into
    document.getElementById("keyword").innerHTML = picStr;
    for(var address in ItemInfoObj) {

        var attributes = ItemInfoObj[address];
        if (attributes.name.toLowerCase().includes(picStr.toLowerCase())) {
            var elem = document.createElement("img");
            elem.setAttribute("src", address);
            addElementPictureDiv(elem, attributes);
        }
    }
}

function retrieveCookie() {
    var strCookie = document.cookie;
    // alert("cookie is "+ strCookie);
    cookies = strCookie.split(";");
}

function addElementPictureDiv(elem, attributesStr) {
    //product-card div
    var card_div = document.createElement('div');
    card_div.className = "product-card";

    //product-img div
    var img_div = document.createElement('div');
    img_div.className = "product-img";

    //product-details div
    var details_div = document.createElement('div');
    details_div.className = "product-details";

    //add to product-card div
    card_div.appendChild(img_div);
    card_div.appendChild(details_div);

    //add image
    img_div.appendChild(elem);

    //create h2, p, a
    var name = document.createElement("h2");
    var seller_name = document.createElement("p");
    var price_number = document.createElement("p");
    var shopLink = document.createElement('a');

    name.setAttribute('class', 'product-name');
    name.innerHTML = attributesStr.name;

    seller_name.setAttribute('class', 'seller');
    seller_name.innerHTML = attributesStr.seller;

    price_number.setAttribute('class', 'price');
    price_number.innerHTML = attributesStr.price;

    shopLink.setAttribute('href', attributesStr.url);
    shopLink.setAttribute('class', 'add-product');
    shopLink.innerHTML = "go to shop!";

    //add to product-details div
    details_div.appendChild(name);
    details_div.appendChild(seller_name);
    details_div.appendChild(price_number);
    details_div.appendChild(shopLink);


    //add to combo div
    totalDiv.appendChild(card_div);
}

function readItemInfo(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                ItemInfoObj = JSON.parse(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
    // alert(ItemInfoObj);
}
