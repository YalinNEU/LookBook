
var likeNumber = retrieveLikeNumber();
var span = $('.number');
window.onload = updateLikeCount;

var btnLike = document.getElementsByClassName("blogger-btn");
btnLike.onclick = addToMyLike;
function addToMyLike(e){
    var relocationId = e.name.split(".")[0];
    var imgSrc = "images/blogger/" + e.name + " " + window.location.href;  //image src & relocation id
    var keyStr = "likeBlogger" + likeNumber + "=";
    localStorage.setItem(keyStr, imgSrc);
    likeNumber = likeNumber + 1;
    span.text(likeNumber);
    localStorage.setItem("likeCount", likeNumber);
    $(e).css("border-color", "#ff0000");
    $(e).css("color", "#ff0000");
    $(e).css("font-weight", "120");
}

function retrieveLikeNumber(){
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key == "likeCount") {
            return parseInt(localStorage.getItem(key));
        }
    }
    return 0;
}

function updateLikeCount() {
    span.text(likeNumber);
}

