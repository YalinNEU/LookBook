// var recommandObj = "";
// var recommandReady = false;
// readRecommand("recommandation.txt");
// var ItemInfoObj = "";
// var ItemInfoReady = false;
// readItemInfo("product_info.txt");
// var imgNumberPos = 5;
var constellationPos = 1;
window.onload = findBloggers();

$(document).ready(function(){
    titleFadeIn();
    checkReady();
});

function checkReady(){
    if(recommandReady && ItemInfoReady){
        getRecommandations();
    }
    else{
        setTimeout(checkReady, 100);
    }
}

function titleFadeIn(){
    $(".gift-head").css("left", "0");
//    $(".gift-head").css("top", "0");

    nextFadeIn(1);
    setTimeout(moveWords(1), 3000);
}

function nextFadeIn(n) {
    if(n > 10) return;
    console.log(n);
    $("#head" + n).fadeIn(n * 500, nextFadeIn(n + 1));
}

function moveWords(n) {
    console.log("move...");
    if(n == 1){
        $("#head1, #head2, #head3, #head4").animate({top : "100px"}, 500, moveWords(n + 1));
    }
    else if(n == 2){
        $("#head5").animate({top : "200px"}, 500, moveWords(n + 1));
    }
    else{
        $("#head6, #head7, #head8, #head9, #head10").animate({top : "300px"}, 500);
        return;
    }
}

// function getRecommandations(){
//     var recommandations = localStorage.getItem("recommandation");
//     console.log(recommandations);
//     var tags = recommandations.split("#");
//     var key = "";
//
//     for(i = 0; i < tags.length; i++){
//         if(i == constellationPos)
//             continue;
//
//         key += tags[i];
//         if(i != tags.length - 1)
//             key += "#";
//     }
//
//     console.log(key);
//     var imgs = recommandObj[key];
// //    console.log(imgs);
//
//     setBtnLogo(imgs);
//     setCarousel(imgs);
//     setPrice(imgs);
//     setURL(imgs);
// //    var itemKey = imgs[4];
// //    console.log(getItemPrice(itemKey));
// //    console.log(getItemUrl(itemKey));
// }
//
// function setBtnLogo(imgs){
//     var logos = $(".btn-lg");
//
//     for(i = 0; i < logos.length; i++){
//         $(logos[i]).children().attr("src", imgs[i]);
// //        console.log($(logos[i]).children());
//     }
// }
//
// function setCarousel(imgs){
//     var carousels = $(".carousel-inner");
// //    console.log(carousels.length);
//
//     for(i = 0; i < carousels.length; i++){
//         var childImg = $(carousels[i]).find("img");
//         var path = imgs[i].split("/");
//         var tags = path[path.length - 1].split("-");
//         var left = "";
//         var right = "";
//
//         for(l = 0; l < path.length - 1; l++){
//             left += path[l] + "/";
//         }
//
//         for(k = 0; k < tags.length; k++){
//             if(k < imgNumberPos){
//                 left += tags[k] + "-";
//             }
//             if(k == imgNumberPos){
//                 var name = tags[k].split(".");
//                 var extension = name[name.length - 1];
//                 right += "." + extension;
//             }
//         }
//
//         for(j = 0; j < childImg.length; j++){
//             var imgSrc = left + "0" + (j + 1) + right;
//             $(childImg[j]).attr("src", imgSrc);
//         }
//     }
// }
//
// function setPrice(imgs){
//     var buys = $(".gift-purchase");
//     //    console.log(buys.length);
//     for(i = 0; i < buys.length; i++){
//         var key = imgs[i];
//         $(buys[i]).find("p")[0].innerHTML = "$ " + getItemPrice(key);
//     }
//
// }
//
// function setURL(imgs){
//     var buys = $(".gift-purchase");
//
//     for(i = 0; i < buys.length; i++){
//         var key = imgs[i];
//         $(buys[i]).find("a")[0].href = getItemUrl(key);
// //        console.log(key + ":" + getItemUrl(key));
// //        $(purchaseLink).attr("href", getItemUrl(key));
//     }
// }
//
// function readRecommand(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 recommandObj = JSON.parse(rawFile.responseText);
//                 recommandReady = true;
// //                console.log(recommandObj["low#bright#curve"]);
//             }
//         }
//     }
//     rawFile.send(null);
// }
//
// function readItemInfo(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 ItemInfoObj = JSON.parse(rawFile.responseText);
//                 ItemInfoReady = true;
//             }
//         }
//     }
//     rawFile.send(null);
// }
//
// function getItemPrice(key){
//     return ItemInfoObj[key].price;
// }
//
// function getItemUrl(key){
//     return ItemInfoObj[key].url;
// }


/* add like bloggers to div*/

function findBloggers(){
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes("likeBlogger")) {
            var keyStr = localStorage.key(i);
            var value = localStorage.getItem(keyStr);
            addBloggers(value);
        }
    }
}
function addBloggers(s) {
    var totalDiv = document.getElementById("blogger-body");

    var imgSrcString = s.split(" ")[0];
    var relocationId = s.split(" ")[1];

    var bigDiv = document.createElement("div");
    bigDiv.setAttribute("class", "col-sm-4");

    var imgDiv = document.createElement("div");
    var imgAdd = document.createElement("img");
    imgDiv.setAttribute("class", "btn btn-info btn-lg");
    imgDiv.setAttribute("data-toggle", "modal");
    imgAdd.setAttribute("src", imgSrcString);
    imgAdd.setAttribute("class", "blogger-img");
    imgDiv.appendChild(imgAdd);

    var giftPurchaseDiv = document.createElement("div");
    var link = document.createElement("a");
    var viewButton = document.createElement("button");
    var smallDiv = document.createElement("div");
    var text = document.createElement("p");
    var giftPurchasePriceDiv = document.createElement("div");
    var textPrice = document.createElement("p");

    giftPurchaseDiv.setAttribute("class", "viewDetails");

    link.setAttribute("target", "_blank");
    link.setAttribute("href", relocationId);
    giftPurchaseDiv.appendChild(link);

    text.innerHTML = "Details";

    giftPurchasePriceDiv.setAttribute("class", "blogger-name");
    textPrice.innerHTML = imgSrcString.split("/")[3].split("-")[0].toUpperCase();
    giftPurchasePriceDiv.appendChild(textPrice);

    giftPurchaseDiv.appendChild(giftPurchasePriceDiv);


    link.appendChild(smallDiv);
    smallDiv.appendChild(viewButton);
    viewButton.appendChild(text);

    bigDiv.appendChild(imgDiv);
    bigDiv.appendChild(giftPurchaseDiv);


   totalDiv.appendChild(bigDiv);

}
