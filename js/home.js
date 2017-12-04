var originWidth = "";
var originMarginBot = "";
//var originFontSize = "";
var isMobile = false; //initiate as false
var formValues;
var submitting = false;
var budgetHighlight = "#DAA520";

$(document).ready(function(){
//	$('.my-background-video').bgVideo();
    detectDevice();
    
//    $('#personalize').click(function() {
//        
//    });
  
    
    $('#recommendation').click(function() {
        openSurvey();
    });
    
    $("#blogger-hint").fadeIn(2000);
    arrowAnimation();
    
    $('#blogger-hint, #personalize').click(function() {
        $("body").animate({scrollTop : $('#bloggers').offset().top - 50}, 1000);
    });
    
    $( "#slider" ).slider({
      range: "min",
      value: 50,
      min: 0,
      max: 100,
      slide: function( event, ui ) {
          var val = ui.value;
//          var r = Math.round(val / 100 * 255);
//          var b = Math.round((100 - val) / 100 * 255);
//          var g = Math.round(val * 0.7 / 100 * 255);
          var r = 205;
          var b = 120;
          var g = 205;
          $( ".ui-slider-range" ).css("background-color", "rgba(" + (r + val * 0.5) + "," + (g + val * 0.5) + "," + b + "," + (0.2 + val * 0.8 / 100) + ")");
          if(val === 0){
              $("#amount").text('$ ' + val);
          }
          else if (val === 100){
              $("#amount").text('>$ ' + val * 10);
          }
          else{
              $("#amount").text('$ ' + val * 10);
          }
          
          if(val <= 50){
              $(".budget-label").css("color", budgetHighlight);
              $(".budget-label-max").css("color", "black");
          }
          else{
              $(".budget-label").css("color", "black");
              $(".budget-label-max").css("color", budgetHighlight);
          }
      }
    });
    
    $(".submit-button").click(function(){
        if(submitting) return;
        
        submitting = true;
        originWidth = $(".submit-button").css("width");
//        originBot = $(".submit-button").css("bottom");
//        originFontSize = $(".submit-button").css("font-size");
        $(".submit-button").css("width", "+=40px");
        $(".spinner").show();
		var resetTimeout = setTimeout(function(){submit();}, 3500);
        $(".submit-button").animate({borderTopColor: "#C71585"}, 625).animate({borderLeftColor: "#C71585"}, 625)
        .animate({borderBottomColor: "#C71585"}, 625).animate({borderRightColor: "#C71585"}, 625);
        
        $(".main-label").animate({color: "#C71585"}, 3000);
//        $(".submit-button").css("color", "#C71585");
        console.log("Submit...");
        
    });
    
    $(".survey-cancel").click(function() {
        if(submitting) return;
        closeSurvey();
    })
    
    setUpSlider();
    
});

function openSurvey() {
    $('body').addClass("stop-scrolling");
    if(isMobile)
        $('body').bind('touchmove', function(e){e.preventDefault()});
    $('.survey').show();
    resetButton();
    $('.survey').addClass("scrolling");
    $('.survey').scrollTop(0);
    resetForm();
}

function resetButton(){
    $(".submit-button").css("border-color", "black");
    $(".main-label").css("color", "black");
}

function arrowAnimation() {
    $("#hint-arrow").animate({top: "8px"}, 500).animate({top: "0px"}, 500);
    setTimeout(arrowAnimation, 1000);
}

function submit(){
    $(".spinner").hide();
    $(".submit-button").css("width", originWidth);
    closeSurvey();
//    $("#button-hint").fadeIn(1000);
    
    submitting = false;
    formValues = $(".form-container").serializeArray();
    
    var tags = "";
    
    for(i = 0; i < formValues.length; i++){
        tags += $(formValues[i]).attr("value");
        tags += "#";
    }
    
    if($( "#slider" ).slider("value") <= 50){
        tags += "low";
    }
    else{
        tags += "high";
    }
    
    localStorage.setItem("recommandation", tags);
//    var currentTime = new Date().getTime();
    window.location = "gift.html";
//    localStorage.setItem("currentTime", currentTime);
}

function setUpSlider() {
    var val = $( "#slider" ).slider("value");
    var r = Math.round(val / 100 * 255);
    var b = Math.round((100 - val) / 100 * 255);
    var g = Math.round(val * 0.7 / 100 * 255);
    $( ".ui-slider-range" ).css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    $("#amount").text('$ ' + val * 10);
    
    if(val <= 50){
        $(".budget-label").css("color", budgetHighlight);
        $(".budget-label-max").css("color", "black");
    }
    else{
        $(".budget-label").css("color", "black");
        $(".budget-label-max").css("color", budgetHighlight);
    }
    
    $(".survey").hide();
}

function resetForm() {
    $( "#slider" ).slider("value", 50);
    var val = $( "#slider" ).slider("value");
    var r = 205;
    var b = 120;
    var g = 205;
    $( ".ui-slider-range" ).css("background-color", "rgba(" + (r + val * 0.5) + "," + (g + val * 0.5) + "," + b + "," + (0.2 + val * 0.8 / 100) + ")");
    document.getElementsByClassName("form-container")[0].reset();
}

function closeSurvey() {
    $('body').removeClass("stop-scrolling");
    if(isMobile)
        $('body').unbind('touchmove');
    $('.survey').removeClass("scrolling");
    $(".survey").hide();
}

function detectDevice(){
    // device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    
    console.log("Mobile : " + isMobile);
}

