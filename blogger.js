jQuery(document).ready(function($){
    var $lateral_menu_trigger = $('#cd-menu-trigger'),
        $content_wrapper = $('.cd-main-content');

    // fallback added for IE9 - transition not supported
    var is_explorer_9 = navigator.userAgent.indexOf('MSIE 9') > -1;

    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function(event){
        event.preventDefault();
        $lateral_menu_trigger.toggleClass('is-clicked');
        $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $('body').toggleClass('overflow-hidden');
        });
        $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
        if(is_explorer_9) {
            $('body').toggleClass('overflow-hidden');
        }
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


/*add to cart*/
var cartCount = 0,
    buy = $('.favourites'),
    buyProducts = $('.like'),
    span = $('.number');

buy.on('click', addToCart);
buyProducts.on('click', addToCart2);

function addToCart2() {
    var localPicture = $(this).parent().find('img').attr('src');
    // alert("src: " + localPicture);
    document.cookie = 'id' + cartCount + "=" + localPicture;
    cartCount = cartCount + 1;
    span.text(cartCount);

    span.text(cartCount);
    clearTimeout(time);
    if(span.hasClass('update')){
        span.removeClass('update');
        span.addClass('updateQuantity');
        var time = setTimeout(function(){
            span.removeClass('updateQuantity');
            span.addClass('update');
        }, 700);
    } else{
        span.addClass('update');
    }

    // $(this).addClass('ok');
    // var timeOk = setTimeout(function(){
    //     self.removeClass('ok');
    // }, 1000);
}
function addToCart() {
    var self = $(this),
        picture = $(this).parent().parent().prev().find('div').find('img').attr('src');
    document.cookie = 'id' + cartCount + "=" + picture;
    // alert("cookie is: " + document.cookie);
    // alert("address is:" + picture);


    cartCount = cartCount + 1;
    span.text(cartCount);
    clearTimeout(time);
    if(span.hasClass('update')){
        span.removeClass('update');
        span.addClass('updateQuantity');
        var time = setTimeout(function(){
            span.removeClass('updateQuantity');
            span.addClass('update');
        }, 700);
    } else{
        span.addClass('update');
    }

    // $(this).addClass('ok');
    // var timeOk = setTimeout(function(){
    //     self.removeClass('ok');
    // }, 1000);
}









