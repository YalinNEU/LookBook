
$(document).ready(function() {
    $('.form-control').keydown(function(e) {
        str=document.getElementsByClassName("form-control")[0].value;
        if (e.which === 13) {
            document.cookie = "searchKey=" + str;
            window.location.href="searchResult.html";
            return false;
        }
    });
});

