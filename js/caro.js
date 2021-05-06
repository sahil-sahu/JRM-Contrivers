// $(".carousel-item").css({"height":screen.availHeight.toString()+'px' })
// $(".carousel-item img").css({"height":screen.availHeight.toString()+'px' })
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
  $(document).ready(function(){
    $('.parallax').parallax();
  });
$(document).ready(function(){
    $('.slider').slider();
  });
window.onscroll = function() {scrollFunction()};
var new_nav=`
<style>
nav .brand-logo{
  color: #414949;
  background-color:rgba(255, 255, 255, 0);
}
@media only screen and (max-width: 992px) {
  nav{padding:3px 0px 7px 5px;}
  nav .brand-logo{padding:0px;}
  nav .sidenav-trigger{top:55%}
  .ham{
    border: #414949 1px solid;
    width:20px;
    margin-bottom: 3px;
    background-color #414949;
  }
}
nav{
  background-color: rgba(255, 255, 255, 0.75);
  margin-top: 0px;
}
.popys{
    border-bottom: white 0px solid;
    border-top: white 0px solid;
    color: #2f3536;
    letter-spacing: 1px;
}
</style>
`
var old_nav =`
<style>
nav .brand-logo{
  color: white;
  background-color:rgba(196, 196, 196,0.25);
}
@media only screen and (max-width: 992px) {
  nav .brand-logo{padding:20px;}
  nav{padding:0px 0px 0px 10px;}
  nav .sidenav-trigger{top:92.5%}
  .ham{
    border: solid 2px white;
    width:20px;
    margin-bottom: 3px;
    background-color: white;
}
}
nav{
  background-color: rgba(255, 255, 255, 0);
  margin-top: 2em;
}
.popys{
    border-bottom: white 2px solid;
    border-top: white 2px solid;
    font-size: 19px;
    color:white;
    letter-spacing: 0.7px;
}
</style>
`
function scrollFunction() {
  if (document.body.scrollTop > screen.availHeight*0.75|| document.documentElement.scrollTop > screen.availHeight*0.75) {

      if ($(".nav-ani").attr("id") == "old-1"){

        $(".nav-ani").empty();
        $(".nav-ani").append(new_nav);
        $(".nav-ani").attr("id","new-1");
        $(".contact_bar").css("display","none");

      }

        
      }
  else {
    if ($(".nav-ani").attr("id") == "new-1"){

        $(".nav-ani").empty();
        $(".nav-ani").append(old_nav);
        $(".nav-ani").attr("id","old-1");
        $(".contact_bar").css("display","block");
      }
    
  }
}

function x_scroll() {
  document.getElementById('width-identifier').scrollBy(295,0);
    
}
function x_oscroll() {
  document.getElementById('width-identifier').scrollBy(-295,0);
    
}

scroller()
function wait() {
  console.log("itni bhi kya jaldi hai")
}
function real_scroll(num) {
  sccon = document.getElementById("width-identifier").scrollLeft;
  if (num==sccon) {if (sccon>0) {temp = -1}else{temp = 1;};}
  num = sccon;
  document.getElementById('width-identifier').scrollBy(295*temp,0);
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
      num = real_scroll(num);
      }
    };
  setTimeout(tick(i), pause * i);
  }
}

var bigger_anim = `
<div id="styler" style="display:none;">
<style>
.gallery-pics img{filter: brightness(40%);animation: darker;animation-duration: 1s;}
@keyframes darker{
    from{filter: brightness(100%);}
    to{filter: brightness(40%);}
}

.gallery-inner{
    position: absolute;
    display: inline;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
    animation: mymove;
    animation-duration: 1s;
    border: white 1px solid;
    width: 310px;
    height: 150px;
}
@keyframes mymove {
    from {width: 0px;height:0px;opacity: 0;}
    to {width: 315px;height:155px;opacity: 1;}
  }
.gallery-inner h5{color: white;font-size: 20px;padding-top:20% ;animation: font-bigger;animation-duration: 1s;}
@keyframes font-bigger{
    from{font-size: 0px;opacity: 0;}
    to{font-size: 20px;opacity: 1;}
}
</style>
</div>
`
var fadeOut = `
<style>
.gallery-inner{animation: fadeout ;animation-duration: 1s;animation-fill-mode: forwards;}
@keyframes fadeout{
    from{opacity: 1;}
    to{opacity:0;display:none;}
}
.gallery-pics img{filter: brightness(100%);animation: darker;animation-duration: 1s;animation-fill-mode: forwards;}
@keyframes darker{
    from{filter: brightness(40%);}
    to{filter: brightness(100%);}
}
</style>
`

$("document").ready(function () {

     $('.caption').waypoint({
    handler: function (direction) {
      var active = $(this);
      if (direction == "up") active = active.prev();
      $(".m-container").css({"animation-name": "upar_se",
                      "animation-duration": "1.3s",
                      "animation-iteration-count": "1",
                      "transition-timing-function": "ease-in-out",
                      "visibility":"visible"});
    },
    offset: "0%"
  });

  $('.collector h3').waypoint({
    handler: function (direction) {
      var active = $(this);
      if (direction == "up") active = active.prev();
      $("#idhar").css({"animation-name": "idhar",
                      "animation-duration": "1.5s",
                      "animation-iteration-count": "1",
                      "transition-timing-function": "ease-in-out",
                      "visibility":"visible"});
    },
    offset: "15%"
  });
  $('#idhar').waypoint({
    handler: function (direction) {
      var active = $(this);
      if (direction == "up") active = active.prev();
      $("#udhar").css({"animation-name": "udhar",
                      "animation-duration": "1.5s",
                      "animation-iteration-count": "1",
                      "transition-timing-function": "ease-in-out",
                      "visibility":"visible"});
    },
    offset: "0%"
  });
});
