var cartCount = 0,
    buy = $('.buy'),
    span = $('.number'),
    cart = $('.cart'),
    minicart = [];
    // totalPrice = [],
    // miniCartPrice;

buy.on('click', addToCart);
cart.on('click', showMiniCart);

function showMiniCart() {
    $('.mini').toggleClass('visible');
}

function addToCart() {
    var prevs = $(this).prev();
    var images = prevs.children("img");
        productName = images.attr("alt");
        miniCartNames = $('.products'),
        names = $('.names');
        // price = $(this).parent().find('.price').text(),
        // priceInt = parseInt(price);
    alert(prevs);
    alert(images);
    alert(productName);
    // totalPrice.push(priceInt);
    // miniCartPrice = totalPrice.reduce(function(a,b){  return a+b });
    // $('.miniprice').text('Total amount: ' + miniCartPrice + ",-");
    minicart.push(productName);
    lastProduct = minicart[minicart.length - 1];
    miniCartNames.text('Your cart lines: ');
    names.append('<p>' + lastProduct + '</p>');

    cartCount++;
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
