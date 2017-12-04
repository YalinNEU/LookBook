//checkCache();
var recommandObj = "";
var recommandReady = false;
readRecommand("recommandation.txt");
var ItemInfoObj = "";
var ItemInfoReady = false;
readItemInfo("product_info.txt");
var imgNumberPos = 5;
var constellationPos = 1;

$(document).ready(function(){
    titleFadeIn();
    checkReady();
});

function checkCache() {
    var tokens = window.location.split("?");
    if(tokens.length == 0) 
        return;
    
    var time = tokens[tokens.length - 1];
    var current = localStorage.getItem("currentTime");
    
    if(current != time)
        reload(current);
}

function reload(time) {
    window.location = window.location.href + '?' + time;
}

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
//    console.log(n);
    $("#head" + n).fadeIn(n * 500, nextFadeIn(n + 1));
}

function moveWords(n) {
//    console.log("move...");
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

function getRecommandations(){
    var recommandations = localStorage.getItem("recommandation");
    console.log(recommandations);
    var tags = recommandations.split("#");
    var key = "";
    
    for(i = 0; i < tags.length; i++){
        if(i == constellationPos)
            continue;
        
        key += tags[i];
        if(i != tags.length - 1)
            key += "#";
    }
    
    console.log(key);
    var imgs = recommandObj[key];
//    console.log(imgs);
    
    setBtnLogo(imgs);
    setCarousel(imgs);
    setPrice(imgs);
    setURL(imgs);
    
    if(imgs.length > 6)
        setTopCarousel([imgs[6], imgs[7]]);
}

function setBtnLogo(imgs){
    var logos = $(".btn-lg");
    
    for(i = 0; i < logos.length; i++){
        $(logos[i]).children().attr("src", imgs[i]);
//        console.log($(logos[i]).children());
    }
}

function setTopCarousel(imgs){
    var childImg = $("#topCarousel").find("img");
    
    for(i = 0; i < childImg.length; i++){
        $(childImg[i]).attr("src", imgs[i]);
    }
}

function setCarousel(imgs){
    var carousels = $(".carousel-inner");
//    console.log(carousels.length);
    
    for(i = 0; i < carousels.length; i++){
        var childImg = $(carousels[i]).find("img");
        var path = imgs[i].split("/");
        var tags = path[path.length - 1].split("-");
        var left = "";
        var right = "";
        
        for(l = 0; l < path.length - 1; l++){
            left += path[l] + "/";
        }
        
        for(k = 0; k < tags.length; k++){
            if(k < imgNumberPos){
                left += tags[k] + "-";
            }
            if(k == imgNumberPos){
                var name = tags[k].split(".");
                var extension = name[name.length - 1];
                right += "." + extension;
            }
        }
        
        for(j = 0; j < childImg.length; j++){
            var imgSrc = left + "0" + (j + 1) + right;
            $(childImg[j]).attr("src", imgSrc);
        }
    }
}

function setPrice(imgs){
    var buys = $(".gift-purchase");
    //    console.log(buys.length);
    for(i = 0; i < buys.length; i++){
        var key = imgs[i];
        $(buys[i]).find("p")[0].innerHTML = "$ " + getItemPrice(key);
    }

}

function setURL(imgs){
    var buys = $(".gift-purchase");
    
    for(i = 0; i < buys.length; i++){
        var key = imgs[i];
        $(buys[i]).find("a")[0].href = getItemUrl(key);
//        console.log(key + ":" + getItemUrl(key));
//        $(purchaseLink).attr("href", getItemUrl(key));
    }
}

function readRecommand(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                recommandObj = JSON.parse(rawFile.responseText);
                recommandReady = true;
//                console.log(recommandObj["low#bright#curve"]);
            }
        }
    }
    rawFile.send(null);
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
                ItemInfoReady = true;
            }
        }
    }
    rawFile.send(null);
}

function getItemPrice(key){
    return ItemInfoObj[key].price;
}

function getItemUrl(key){
    return ItemInfoObj[key].url;
}

jQuery(document).ready(function($){
    var $lateral_menu_trigger = $('#cd-menu-trigger'),
        $content_wrapper = $('.cd-main-content');

    // fallback added for IE9 - transition not supported
    var is_explorer_9 = navigator.userAgent.indexOf('MSIE 9') > -1;
    var menuOpen = false;
    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function(event){
        event.preventDefault();
        $lateral_menu_trigger.toggleClass('is-clicked');
        if(!menuOpen){
            $("#cd-lateral-nav").animate({right : "+=260px"}, 400);
            $lateral_menu_trigger.animate({right : "+=260px"}, 400);
            $('body').addClass("overflow-hidden");
            menuOpen = !menuOpen;
        }
        else{
            $("#cd-lateral-nav").animate({right : "-=260px"}, 400);
            $lateral_menu_trigger.animate({right : "-=260px"}, 400);
            $('body').removeClass("overflow-hidden");
            menuOpen = !menuOpen;
        }
//        $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
//            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
//            $('body').toggleClass('overflow-hidden');
//        });
//        $content_wrapper.toggle();
        $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
//        if(is_explorer_9) {
//            $('body').toggleClass('overflow-hidden');
//        }
    });

    //close lateral menu clicking outside the menu itself
    $content_wrapper.on('click', function(event){
        if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
            $lateral_menu_trigger.removeClass('is-clicked');
            $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
            if(is_explorer_9) {
                $('body').removeClass('overflow-hidden');
            }
        }
    });

    //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
});










