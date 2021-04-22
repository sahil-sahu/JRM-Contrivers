$(".carousel-item").css({"height":screen.availHeight*0.65.toString()+'px' })
$(".dropdown-trigger").dropdown();
$(document).ready(function(){
    $('.sidenav').sidenav();
  });
  $(document).ready(function(){
    $('.parallax').parallax();
  });
  function x_scroll() {
    document.getElementById('width-identifier').scrollBy(365,0);
      
  }
  function x_oscroll() {
    document.getElementById('width-identifier').scrollBy(-365,0);
      
  }
  scroller();
  function wait() {
    console.log("itni bhi kya jaldi hai")
  }
  function real_scroll(num) {
    sccon = document.getElementById("width-identifier").scrollLeft;
    if ((num)==sccon) {if (sccon>0) {temp = -1}else{temp = 1;};}
    num = sccon;
    document.getElementById('width-identifier').scrollBy(365*temp,0);
    return sccon;
  }
  // $("#width-identifier").hover(changer(true),changer(false));
  function scroller() {
    var num = 0;
    var pause = 4500;
    for (var i = 1; i <= 20000; i++) {
    var tick = function(i) {
      return function() {
        fuck = true;
        if (i>4) {
        }
        try {
          num = real_scroll(num);
        } catch (error) {
          //PASS
        }
        }
      };
    setTimeout(tick(i), pause * i);
    }
  }
$("#hoverit").hover(function(){
  $("nav:nth-child(2)").fadeIn();
  $("nav:nth-child(2)").css({"display":"block","visibility":"visible"});
})
$("nav:nth-child(2)").hover(function(){$("nav:nth-child(2)").fadeIn();},function(){$("nav:nth-child(2)").fadeOut();});